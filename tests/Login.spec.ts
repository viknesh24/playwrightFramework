import { test, expect } from '@playwright/test'
import { TestConfig } from '../test.config'
import { MyAccountPage } from '../pages/MyAccountPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

let config: TestConfig;
let accpage: MyAccountPage;
let homepage: HomePage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl); //navigation to the app url
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
    accpage = new MyAccountPage(page);
})

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.close();

})

test('userlogin using config file @sanity',async()=>{
     await homepage.clickMyAccount()
     await homepage.clickLogin()

     await loginPage.setEmail(config.email)
     await loginPage.setPassword(config.password)
await loginPage.clickLogin()

const loggedin = await accpage.isMyAccountPageExists()
expect(loggedin).toBeTruthy()

})




