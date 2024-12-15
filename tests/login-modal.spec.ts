import { test, expect } from "@playwright/test";
test.describe("Test Login Modal open/close", () => {
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
test("Test login modal open", async ({ page }) => {
    await page.click("text=Log in or Register");
    await expect(page.locator("#loginPopupHead")).toContainText("Log in to Wiley Online Library");
    await expect(page.getByLabel("Email or Customer ID")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your password")).toBeVisible();
    const loginButton = page.getByRole("button", { name: "Log In" });
    await expect(loginButton).toBeDisabled();
  });
test("Test login modal close", async ({ page }) => {
    await page.click("text=Log in or Register");
    await page.getByLabel("Cancel").click();
    await expect(page.locator("#loginPopupHead")).toBeHidden();
  });
});
