const LocalValues = ["en", "no"] as const;

type Locale = typeof LocalValues[number];

type Message =
  | { code: "generalError" | "networkError" }
  | { code: "illegalWeekday"; weekday: string }
  | { code: "illegalEmailDomain"; email: string; allowedDomains: string[] };

type LanguageStrings = {
  generalError: string;
  networkError: string;
  illegalWeekday(arg: { weekday: string }): string;
  illegalEmailDomain(arg: { email: string; allowedDomains: string[] }): string;
};
type LanguageBundle = Record<Locale, LanguageStrings>;

const languages: LanguageBundle = {
  no: {
    generalError: "En feil har inntruffet",
    networkError: "En nettverksfeil har inntruffet",
    illegalWeekday: ({ weekday }) => "",
    illegalEmailDomain: () => "",
  },
  en: {
    generalError: "An error has occurred",
    networkError: "",
    illegalWeekday: ({ weekday }) => `'${weekday}' is not a day of the week`,
    illegalEmailDomain: ({ email, allowedDomains }) =>
      `Email must be in ${allowedDomains.join(" or ")}, was: ${email}`,
  },
};

function localizedMessage(message: Message, locale: Locale): string {
  if (message.code === "illegalWeekday") {
    return languages[locale][message.code](message);
  }
  if (message.code === "illegalEmailDomain") {
    return languages[locale][message.code](message);
  }
  return languages[locale][message.code];
}

describe("messages", () => {
  it("shows a message in english", () => {
    expect(localizedMessage({ code: "generalError" }, "en")).toBe(
      "An error has occurred"
    );
  });

  it("shows a message in norwegian", () => {
    expect(localizedMessage({ code: "generalError" }, "no")).toBe(
      "En feil har inntruffet"
    );
  });

  it("shows other messages", () => {
    expect(localizedMessage({ code: "networkError" }, "no")).toBe(
      "En nettverksfeil har inntruffet"
    );
  });

  it("shows message with argument", () => {
    expect(
      localizedMessage({ code: "illegalWeekday", weekday: "Payday" }, "en")
    ).toBe("'Payday' is not a day of the week");
  });

  it("shows message with array argument", () => {
    expect(
      localizedMessage(
        {
          code: "illegalEmailDomain",
          email: "bar@example.net",
          allowedDomains: ["example.org", "example.com"],
        },
        "en"
      )
    ).toBe("Email must be in example.org or example.com, was: bar@example.net");
  });

  it("shows message with more array argument", () => {
    expect(
      localizedMessage(
        {
          code: "illegalEmailDomain",
          email: "bar@example.net",
          allowedDomains: ["example.org", "example.com", "foo.example.com"],
        },
        "en"
      )
    ).toBe(
      "Email must be in example.org, example.com or foo.example.com, was: bar@example.net"
    );
  });
});
