const english: ApplicationLanguage = {
  generalError: "Something went wrong",
};
const norwegian: ApplicationLanguage = {
  generalError: "Noe gikk galt",
};

interface GeneralError {
  error: "generalError";
}

interface ServerError {
  error: "serverError";
  message?: string;
}

interface IllegalArgument {
  error: "illegalArgument";
  property: string;
  value: string;
}

type ErrorMessages = GeneralError | ServerError | IllegalArgument;

interface ApplicationLanguage {
  generalError: string;
}

function showError(
  language: ApplicationLanguage,
  errorMessage: ErrorMessages
): string {
  if (errorMessage.error === "generalError") {
    return language.generalError;
  } else if (errorMessage.error === "serverError") {
    const { message } = errorMessage;
    return `The server returned an error: ${message}`;
  }
  return "";
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
    ).toEqual("Noe gikk galt");
  });
});
