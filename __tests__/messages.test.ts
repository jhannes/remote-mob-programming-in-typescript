import { english, errorType, norwegian } from "../src/common/error-configuration-data";
import { showError } from "../src/message";


describe("messages", () => {
  

  it("shows a message in norwegian", () => {
    expect(
      showError(norwegian, { error: errorType.illegalArgument, key: "foo", value: "bar", errorMessage: '' })
    ).toEqual("Verdien for 'foo' er ikke tillat: bar");
  });
 

  it("shows a message in english", () => {
    expect(
      showError(english, { error: errorType.ServerError, key: "", value: "", errorMessage: 'Typescript error tested' })
    ).toEqual("The server returned an error: Typescript error tested");
  });
  
});
