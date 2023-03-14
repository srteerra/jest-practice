import { launch } from "puppeteer";

describe("My Page", () => {
  let page;

  beforeAll(async () => {
    // Launch a browser instance and navigate to the HTML page
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("file://" + __dirname + "/../src/index.html");
  });

  afterAll(async () => {
    // Close the browser instance
    await browser.close();
  });

  test("has a title", async () => {
    const title = await page.title();
    expect(title).toBe("My Page");
  });

  test("has a heading", async () => {
    const heading = await page.$eval("h1", (el) => el.textContent);
    console.log(`The heading integration contains "${heading.textContent}"`);
    expect(heading).toBe("Welcome to My Page");
  });

  test("has a paragraph", async () => {
    const paragraph = await page.$eval("p", (el) => el.textContent);
    console.log(
      `The paragraph integration contains "${paragraph.textContent}"`
    );
    expect(paragraph).toBe("This is a paragraph.");
  });

  test("has a list", async () => {
    const list = await page.$("ul");
    console.log(`The list integration contains "${list.textContent}"`);
    expect(list).not.toBeNull();

    const items = await list.$$("li");
    expect(items.length).toBe(3);
    expect(await items[0].getProperty("textContent")).toBe("Item 1");
    expect(await items[1].getProperty("textContent")).toBe("Item 2");
    expect(await items[2].getProperty("textContent")).toBe("Item 3");
  });
});
