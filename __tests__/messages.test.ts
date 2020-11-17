const english: ApplicationLanguage = {
  generalError: "Something went wrong",
  serverError: (message: string) => "The server returned an error: " + message,
  illegalArgument: (property: string, value: string) =>
    `The value is illegal for ${property}: ${value}`,
};
const norwegian: ApplicationLanguage = {
  generalError: "Noe gikk galt",
  serverError: (message: string) => "erveren returnerte en feil: " + message,
  illegalArgument: (property: string, value: string) =>
    `Verdien for ${property} er ikke tillatt: ${value}`,
};

interface GeneralError {
  error: "generalError";
}

interface ServerError {
  error: "serverError";
  message: string;
}

interface IllegalArgument {
  error: "illegalArgument";
  property: string;
  value: string;
}

type ErrorMessages = GeneralError | ServerError | IllegalArgument;

interface ApplicationLanguage {
  generalError: string;
  serverError: (message: string) => string;
  illegalArgument: (property: string, value: string) => string;
}

function showError(
  language: ApplicationLanguage,
  errorMessage: ErrorMessages
): string {
  if (errorMessage.error === "generalError") {
    return language.generalError;
  } else if (errorMessage.error === "serverError") {
    const { message } = errorMessage;
    return language.serverError(message);
  }
  const { property, value } = errorMessage;
  return language.illegalArgument(property, value);
}
describe("messages", () => {
  it("shows a message in english", () => {
    expect(showError(english, { error: "generalError" })).toEqual(
      "Something went wrong"
    );
  });
  it("shows a message in english with a parameter", () => {
    expect(
      showError(english, { error: "serverError", message: "Database timeout" })
    ).toEqual("The server returned an error: Database timeout");
  });
  it("shows a message in norwegian", () => {
    expect(showError(norwegian, { error: "generalError" })).toEqual(
      "Noe gikk galt"
    );
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
