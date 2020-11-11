import { norwegian } from "../src/common/error-configuration-data";
import { showError } from "../src/message";


describe("messages", () => {
  it.todo("shows a message in english");

  it.todo("shows a message in another language");

  expect(
    showError(norwegian, { error: "illegalArgument", key: "foo", value: "bar", errorMessage: '' })
  ).toEqual("Verdien for 'foo' er ikke tillat: bar");
});
