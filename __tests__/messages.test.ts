function showError(language: any, error: any) {
  return "";
}

const english = {};

describe("messages", () => {
  it("shows a message in english", () => {
    expect(showError(english, { code: "generalError" })).toBe(
      "Something went wrong"
    );
  });

  it.todo("shows a message in another language");
});
