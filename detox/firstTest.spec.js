// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md

describe("Example", () => {
  beforeEach(async () => {
    await device.relaunchApp({ delete: true })
  })

  it("should have the welcome screen first and login button visible", async () => {
    await expect(element(by.text("Login"))).toBeVisible()
  })

  it("should have the welcome screen first and register button visible", async () => {
    await expect(element(by.text("Register"))).toBeVisible()
  })

  it("should go to login screen after selecting login", async () => {
    await element(by.text("Login")).tap()
    await expect(element(by.id("LoginScreen.LoginButton"))).toBeVisible()
  })

  it("should go to the register screen after selecting register", async () => {
    await element(by.text("Register")).tap()
    await expect(element(by.id("RegisterScreen.RegisterButton"))).toBeVisible()
  })

  it("should be able to go back from Login Screen to Welcome Screen", async () => {
    await element(by.text("Login")).tap()
    await element(by.id("Header.Icon")).tap()
    await expect(element(by.text("Register"))).toBeVisible()
  })
})
