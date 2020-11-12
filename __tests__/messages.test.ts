interface ErrorMessages{
   code:string;
   errorMessage?:string;
}
function showError(language: any, error: ErrorMessages) {
  if (error.code == "serverError") {
    const {code,  errorMessage} = error;
    return "Server return an error : " + errorMessage;
  } else {
    return "Something went wrong";
  }
}

const english = {};
const norwegian = {};

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
});
