const english ={};
function showError(language : any, error:any):string
{
  return "Something went wrong";
}
describe("messages", () => {
  it("shows a message in english",()=>{
    expect(
      showError(english, { error: "generalError"})
    ).toEqual("Something went wrong");
    
  });
  it("shows a message in english with a parameter",()=>{
    expect(
      showError(english, { error: "serverError", message:"Database timeout"})
    ).toEqual("The server returned an error: Database timeout");
    
  });

});
