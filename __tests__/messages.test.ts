interface Message {
  error: "generalError" | "serverError";
  errorMessage?: string;
}

function showMessage(language: ApplicationLanguage, message: Message) {
  if (message.error == "generalError") {
    return language.generalError;
  } else if (message.error == "serverError") {
    return language.serverError(message.errorMessage!);
  }
}

interface ApplicationLanguage {
  generalError: string;
  serverError: (message: string) => string;
}

const english: ApplicationLanguage = {
  generalError: `Something went wrong`,
  serverError: (message) => `Server return an error : ${message}`,
};
const norwegian: ApplicationLanguage = {
  generalError: `Noe gikk galt`,
  serverError: (message) => `The server returned an error: ${message}`,
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
});
