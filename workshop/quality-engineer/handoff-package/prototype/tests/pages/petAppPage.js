// Simple Page Object Model for the Happy Paws prototype
// Encapsulates common actions and element locators
class PetAppPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page
    // selectors
    this.addPetButton = 'button[aria-label="Add a new pet"]'
    this.addFormSection = 'section.form'
    this.savePetButton = 'button[aria-label="Save the new pet"]'
    this.backButton = 'button[aria-label="Return to pet list"]'
    this.petCardsContainer = '.cards'
    this.nameInput = 'section.form input:not([placeholder])'
    this.photoUrlInput = 'section.form input[placeholder="https://..."]'
    this.typeSelect = 'section.form select'
  }

  async gotoHome() {
    await this.page.goto('/')
  }

  async openAddPetForm() {
    await this.page.click(this.addPetButton)
    await this.page.waitForSelector(this.addFormSection)
  }

  async fillNewPet({ name, photoUrl, type }) {
    if (name) await this.page.locator(this.nameInput).first().fill(name)
    if (photoUrl) await this.page.fill(this.photoUrlInput, photoUrl)
    if (type) await this.page.selectOption(this.typeSelect, type)
  }

  async savePet() {
    await this.page.click(this.savePetButton)
  }

  async waitForPetProfile(name) {
    await this.page.waitForSelector(`h2:has-text("${name}")`)
  }

  async returnToList() {
    await this.page.click(this.backButton)
    await this.page.waitForSelector(this.petCardsContainer)
  }

  petCard(name) {
    return this.page.locator(`.card:has-text("${name}")`).first()
  }
}

module.exports = { PetAppPage }

