interface Message {
  error: "generalError" | "serverError";
  errorMessage?: string;
}

function showMessage(language: any, message: Message) {
  if (message.error == "generalError") {
    return "Something went wrong";
  } else if (message.error == "serverError") {
    return "Server return an error : " + message.errorMessage;
  }
}

const english = {};
const norwegian = {};

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
});
