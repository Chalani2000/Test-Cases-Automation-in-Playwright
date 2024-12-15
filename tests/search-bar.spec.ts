import { test, expect } from "@playwright/test";
test.describe("Wiley Online Library Search Bar Automation", () => {
  test.beforeEach(async ({ page }) => {
    // Set custom HTTP headers for the browser session
    await page.setExtraHTTPHeaders({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    });
// Navigate to Wiley Online Library with a wait condition
await page.goto("https://onlinelibrary.wiley.com/", {
  waitUntil: "networkidle",
  timeout: 60000, // 1 minute timeout
});

  });
  test("Search for a keyword in the search bar", async ({ page }) => {
    // Locate the search bar and fill in the search term
    const searchBar = page.locator('[role="search"] input');
    await searchBar.fill("Science");
// Submit the search
await searchBar.press("Enter");

// Verify the URL contains the expected search query
await expect(page).toHaveURL(/.*doSearch.*AllField=Science/, {
  timeout: 60000, // 1 minute timeout
});

// Verify that the search results page displays the expected text
const searchResultsText = page.locator("text=Search results for 'Science'");
await expect(searchResultsText).toBeVisible({ timeout: 60000 });

  });
});
