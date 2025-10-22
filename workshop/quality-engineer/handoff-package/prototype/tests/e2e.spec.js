const { test, expect } = require('@playwright/test')
const { PetAppPage } = require('./pages/petAppPage')

test.beforeEach(async ({ request }) => {
  // reset server state using baseURL
  await request.post('/api/reset')
})

test('pet intake flow - add pet appears in list', async ({ page }) => {
  const app = new PetAppPage(page)
  await app.gotoHome()
  await app.openAddPetForm()

  const petName = 'Mittens'
  await app.fillNewPet({ name: petName, photoUrl: 'https://placekitten.com/400/300', type: 'Cat' })
  await app.savePet()
  await app.waitForPetProfile(petName)
  await app.returnToList()

  await expect(app.petCard(petName)).toBeVisible()
})
