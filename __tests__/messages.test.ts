const english: ApplicationLanguage = {
  generalError: () => "Something went wrong",
  serverError: ({ message }) => "The server returned an error: " + message,
  illegalArgument: ({ property, value }) =>
    `The value is illegal for ${property}: ${value}`,
};

const norwegian: ApplicationLanguage = {
  generalError: () => "Noe gikk galt",
  serverError: ({ message }) => "erveren returnerte en feil: " + message,
  illegalArgument: ({ property, value }) =>
    `Verdien for ${property} er ikke tillatt: ${value}`,
};

interface GeneralError {
  error: keyof ApplicationLanguage;
}

interface ServerError extends GeneralError {
  message: string;
}

interface IllegalArgument extends GeneralError {
  property: string;
  value: string;
}

type ErrorMessages = GeneralError | ServerError | IllegalArgument;

interface ApplicationLanguage {
  generalError: (error: GeneralError) => string;
  serverError: (error: ServerError) => string;
  illegalArgument: (error: IllegalArgument) => string;
}

function showError(
  language: ApplicationLanguage,
  errorMessage: ErrorMessages
): string {
  return language[errorMessage.error](errorMessage as any);
}

describe("messages", () => {
  it("shows a message in english", () => {
    expect(
      showError(english, {
        error: "generalError",
      })
    ).toEqual("Something went wrong");
  });
  it("shows a message in english with a parameter", () => {
    expect(
      showError(english, {
        error: "serverError",
        message: "Database timeout",
      })
    ).toEqual("The server returned an error: Database timeout");
  });

  it("shows a message in norwegian", () => {
    expect(
      showError(norwegian, {
        error: "generalError",
      })
    ).toEqual("Noe gikk galt");
  });

  it("shows a message in norwegian with two mparameters", () => {
    expect(
      showError(norwegian, {
        error: "illegalArgument",
        property: "foo",
        value: "hoo",
      })
    ).toEqual("Verdien for foo er ikke tillatt: hoo");
  });
});
