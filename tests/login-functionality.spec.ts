import { test, expect } from "@playwright/test";

test.describe("Wiley Online Library - Login Automation", () => {
  test("TC_F_02: Verify user can log in with valid credentials", async ({ page }) => {
    // Step 1: Navigate to the Wiley Online Library login page
    await page.goto("https://wiley.scienceconnect.io/login", {
      waitUntil: "networkidle",
    });

    // Step 2: Fill in the email field
    await page.fill('input[name="email"]', "chalanim374@gmail.com");

    // Step 3: Click the "continue" button
    await page.click('button#sign-in-btn');

    // Step 4: Verify redirection to the password page
    await expect(page).toHaveURL("https://wiley.scienceconnect.io/login/password");

    // Step 5: Fill in the password field
    await page.fill('input[name="password"]', ".hT@JwdHJk327rm");

    // Step 6: Click the "continue" button on the password page
    await page.click('button#password-sign-in-btn');

    // Step 7: Verify the user is redirected to the dashboard page
    await expect(page).toHaveURL("https://wiley.scienceconnect.io/dashboard");

    // Log a success message
    console.log("Test passed: User logged in successfully and was redirected to the dashboard.");
  });
});
