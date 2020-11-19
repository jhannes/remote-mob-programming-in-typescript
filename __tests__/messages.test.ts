interface Message {
  error: string;
}
function showMessage(language: any, message: Message) {
  return "Something went wrong";
}

const english = {};

describe("messages", () => {
  it("shows a message in english", () => {
    expect(showMessage(english, { error: "generalError" })).toBe(
      "Something went wrong"
    );
  });
  it("shows a meessage in english with two parameters",() =>{
    expect(showMessage(english,{error : "serverError",errorMessage :"no database connection"})).toBe(
      "Server return an error : no database connection"
    )
  })
});
