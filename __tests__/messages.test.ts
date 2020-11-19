
function showMessage(language, message) {
}

const english = {};

describe("messages", () => {
  it("shows a message in english", () => {
    expect(showMessage(english, { error: "generalError" }))
      .toBe("Something went wrong");
  });

});
