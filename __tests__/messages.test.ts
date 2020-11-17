//define possible error typrs
interface IGeneralError {
  code: "GeneralError";
}
interface IServerError {
  code: "ServerError";
  errorMessage: string;
}
interface IIllegalArgument {
  code: "IllegalArgument";
  key: string;
  value: string;
}
//define them all as errors through discriminated union
type IError = IGeneralError | IServerError | IIllegalArgument;

//Different error message templates for each type of error in different languages
interface IMessageTemplate {
  generalError: string;
  serverError: (error: IServerError) => string;
  illegalArgument: (error: IIllegalArgument) => string;
}
const english: IMessageTemplate = {
  generalError: "Something went wrong",
  serverError: ({ errorMessage }) =>
    `The server returned an error: ${errorMessage}`,
  illegalArgument: ({ key, value }) =>
    `The value is illegal for ${key} : ${value}`,
};
const norwegian: IMessageTemplate = {
  generalError: "Noe gikk galt",
  serverError: ({ errorMessage }) =>
    `Serveren returnerte en feil: ${errorMessage}`,
  illegalArgument: ({ key, value }) =>
    `Verdien for '${key}' er ikke tillat: ${value}`,
};

//use relavant template based on the error type and language and return error message
function showError(messageTemplate: IMessageTemplate, error: IError): string {
  switch (error.code) {
    case "GeneralError":
      return messageTemplate.generalError;
    case "ServerError":
      return messageTemplate.serverError(error);
    case "IllegalArgument":
      return messageTemplate.illegalArgument(error);
  }
}
describe("Messages", () => {
  it("Shows a message in english", () => {
    expect(showError(english, { code: "GeneralError" })).toEqual(
      "Something went wrong"
    );
  });
  it("Shows a message with an argument in english", () => {
    expect(
      showError(english, {
        code: "ServerError",
        errorMessage: "Database timeout",
      })
    ).toEqual("The server returned an error: Database timeout");
  });
  it("Shows a formatted message witn multiple arguments in english", () => {
    expect(
      showError(english, { code: "IllegalArgument", key: "foo", value: "bar" })
    ).toEqual("The value is illegal for foo : bar");
  });
  it("Shows a message in Norwegian", () => {
    expect(showError(norwegian, { code: "GeneralError" })).toEqual(
      "Noe gikk galt"
    );
  });
  it("Shows a message with an argument in Norwegian", () => {
    expect(
      showError(norwegian, {
        code: "ServerError",
        errorMessage: "Database-tidsavbrudd",
      })
    ).toEqual("Serveren returnerte en feil: Database-tidsavbrudd");
  });
  it("Shows a formatted message witn multiple arguments in Norwegian", () => {
    expect(
      showError(norwegian, {
        code: "IllegalArgument",
        key: "foo",
        value: "bar",
      })
    ).toEqual("Verdien for 'foo' er ikke tillat: bar");
  });
});
