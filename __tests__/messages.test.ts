interface GeneralError {
  error: keyof ApplicationLanguage;
}

interface ServerError extends GeneralError {
  errorMessage: string;
}

interface IllegalArgument extends GeneralError {
  property: string;
  value: string;
}

type Message = GeneralError | ServerError | IllegalArgument;

interface ApplicationLanguage {
  generalError: string;
  serverError: (errorMessage: string) => string;
  illegalArgument: (property: string, value: string) => string;
}

function showMessage(language: ApplicationLanguage, message: Message) {
  const { error } = message;
  switch (error) {
    case "generalError":
      return language.generalError;
    case "serverError":
      const { errorMessage } = message as ServerError;
      return language.serverError(errorMessage);
    case "illegalArgument":
      const { property, value } = message as IllegalArgument;
      return language.illegalArgument(property, value);
  }
}

const english: ApplicationLanguage = {
  generalError: `Something went wrong`,
  serverError: (errorMessage) => `Server return an error : ${errorMessage}`,
  illegalArgument: (property: string, value: string) => `The value is illegal for ${property}: ${value}`
};
const norwegian: ApplicationLanguage = {
  generalError: `Noe gikk galt`,
  serverError: (errorMessage) => `Serveren returnerte en feil: ${errorMessage}`,
  illegalArgument: (property: string, value: string) => `Verdien for ${property} er ikke tillat: ${value}`
};

describe("messages", () => {

  it("shows a message in english", () => {
    expect(showMessage(english, { error: "generalError" })).toBe(
      "Something went wrong"
    );
  });

  it("shows a meessage in english with two parameters", () => {
    expect(
      showMessage(english, {
        error: "serverError",
        errorMessage: "no database connection",
      })
    ).toBe("Server return an error : no database connection");
  });

  it("shows a message in Norwegian", () => {
    expect(showMessage(norwegian, { error: "generalError" })).toBe(
      "Noe gikk galt"
    );
  });

  it("shows a message in Norwegian with key and value paramaters", () => {
    expect(showMessage(norwegian, { error: "illegalArgument", property: "foo", value: "bar" })).toBe(
      "Verdien for foo er ikke tillat: bar"
    );
  });
});
