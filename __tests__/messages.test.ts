interface GeneralError {
  code: "generalError";
}

interface ServerError {
  code: "serverError";
  errorMessage: string;
}

type ErrorMessages = GeneralError | ServerError | IllegalArgument;

interface ApplicationLanguage {
  generalError: string;
  serverError: (errorMessage: string) => string;
  illegalArgument: (key: string, value: string) => string;
}

interface IllegalArgument {
  code: "illegalArgument";
  key: string;
  value: string;
}

function showError(language: ApplicationLanguage, error: ErrorMessages) {
  switch (error.code) {
    case "generalError":
      return language.generalError;
    case "serverError":
      const { errorMessage } = error;
      return language.serverError(errorMessage);
    case "illegalArgument":
      const { key, value } = error;
      return language.illegalArgument(key, value);
  }
}

const english: ApplicationLanguage = {
  generalError: "Something went wrong",
  serverError: (errorMessage) => "Server return an error : " + errorMessage,
  illegalArgument: (key, value) =>
    "The value is illegal for " + key + ":" + value,
};
const norwegian: ApplicationLanguage = {
  generalError: "Noe gikk galt",
  serverError: (errorMessage) => "Server return an error " + errorMessage,
  illegalArgument: (key, value) =>
    "Verdien for '" + key + "' er ikke tillat: " + value,
};

describe("messages", () => {
  it("shows a message in english", () => {
    expect(showError(english, { code: "generalError" })).toBe(
      "Something went wrong"
    );
  });
  it("shows a message with an argument", () => {
    expect(
      showError(english, {
        code: "serverError",
        errorMessage: "database timeout",
      })
    ).toBe("Server return an error : database timeout");
  });

  it("shows a message in Norvegian", () => {
    expect(showError(norwegian, { code: "generalError" })).toBe(
      "Noe gikk galt"
    );
  });

  it("shows a message with multiple arguments", () => {
    expect(
      showError(norwegian, {
        code: "illegalArgument",
        key: "foo",
        value: "bar",
      })
    ).toEqual("Verdien for 'foo' er ikke tillat: bar");
  });
});
