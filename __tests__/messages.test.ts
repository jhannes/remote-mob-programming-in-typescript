function showError(language: any, error: any) {
  return "Something went wrong";
}

const english = {};

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

  it.todo("shows a message in another language");
});
