describe("My Page", () => {
  let page;

  beforeAll(() => {
    // Load the HTML page into a JSDOM instance
    const fs = require("fs");
    const html = fs.readFileSync("src/index.html", "utf8");
    const { JSDOM } = require("jsdom");
    const dom = new JSDOM(html);
    page = dom.window.document;
  });

  test("has a title", () => {
    expect(page.title).toBe("My Page");
    console.log("The page contains a title");
  });

  test("has a heading", () => {
    const heading = page.querySelector("h1");
    console.log("The page contains a heading");
    expect(heading.textContent).toBe("Welcome to My Page");
  });

  test("has a paragraph", () => {
    const paragraph = page.querySelector("p");
    console.log("The page contains a paragraph");
    expect(paragraph.textContent).toBe("This is a paragraph.");
  });

  test("has a list", () => {
    const list = page.querySelector("ul");
    console.log("The page contains a list");
    expect(list).not.toBeNull();

    const items = list.querySelectorAll("li");
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe("Item 1");
    expect(items[1].textContent).toBe("Item 2");
    expect(items[2].textContent).toBe("Item 3");
  });
});
