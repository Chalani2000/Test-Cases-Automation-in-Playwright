import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setExtraHTTPHeaders({
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
  });
  await page.goto("https://onlinelibrary.wiley.com/", {
    waitUntil: "networkidle",
    timeout: 5 * 60000,
  });
});

// Test subject section accordion expand
test("Test subject section accordion expand", async ({ page }) => {
  await page
    .getByRole("button", { name: "Agriculture, Aquaculture &" })
    .click();
  await expect(page.getByRole("button", { name: "Agriculture, Aquaculture &" })).toBeVisible();
});

// Test subject section content visibility after accordion expand
test("Test subject section content visibility", async ({ page }) => {
  await page
    .getByRole("button", { name: "Agriculture, Aquaculture &" })
    .click();
  await expect(page.getByLabel("Agriculture, Aquaculture &")).toBeVisible();
});
