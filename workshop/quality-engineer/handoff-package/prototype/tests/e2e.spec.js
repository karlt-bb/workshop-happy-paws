const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ request }) => {
  // reset server state using baseURL
  await request.post('/api/reset')
})

test('pet intake flow - add pet appears in list', async ({ page }) => {
  await page.goto('/')
  // navigate to Add Pet form
  await page.click('button[aria-label="Add a new pet"]')
  await page.waitForSelector('section.form')

  const petName = 'Mittens'
  // fill name (first input without placeholder)
  const nameInput = page.locator('section.form input:not([placeholder])').first()
  await nameInput.fill(petName)

  // fill photo URL (optional but included for realism)
  await page.fill('section.form input[placeholder="https://..."]', 'https://placekitten.com/400/300')

  // change type to Cat for coverage
  await page.selectOption('section.form select', 'Cat')

  // save the pet
  await page.click('button[aria-label="Save the new pet"]')

  // wait for profile view (h2 with pet name)
  await page.waitForSelector(`h2:has-text("${petName}")`)

  // go back to list
  await page.click('button[aria-label="Return to pet list"]')
  await page.waitForSelector('.cards')

  // locate card in list
  const card = page.locator('.card:has-text("Mittens")').first()
  await expect(card).toBeVisible()
})
