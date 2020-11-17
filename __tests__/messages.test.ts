const english = {};
const norwegian = {};

interface ErrorMessage{
  error : string;
  message? : string;
}

function showError(language: any, errorMessage: ErrorMessage): string {
  const { error, message } = errorMessage;
  if (error === "serverError") {
    return `The server returned an error: ${message}`;
  }
  return "Something went wrong";
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
  it("shows a message in norwegian",() =>{
    expect(showError(norwegian,{error :"generalError"})).toEqual("Noe gikk galt");
  })
});
