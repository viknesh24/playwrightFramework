import { test, expect } from '@playwright/test'
import { TestConfig } from '../test.config'
import { HomePage } from '../pages/HomePage';
import { DataProvider } from '../utils/dataProvider'
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { log } from 'node:console';

//Load JSON Data
// const jsonPath ='data/logindata.json'
// const jsonTestData = DataProvider.getTestDataFromJson(jsonPath)

// for(const data of jsonTestData){
//     test(`Login Test with json data: ${data.testName} @datadriven`,async({page})=>{
//  const config = new TestConfig();
//     await page.goto(config.appUrl); //navigation to the app url

//      const homepage = new HomePage(page);
//       await homepage.clickMyAccount()
//      await homepage.clickLogin()

//         const loginPage = new LoginPage(page);
//         await loginPage.setEmail(data.email)
//      await loginPage.setPassword(data.password)
// await loginPage.clickLogin()

//     })
// }



//Load CSV Data
const csvPath ='data/logindata.csv'
const csvTestData = DataProvider.getTestDataFromCsv(csvPath)

for(const data of csvTestData){
    test(`Login Test with csv data: ${data.testName} @datadriven`,async({page})=>{
 const config = new TestConfig();
    await page.goto(config.appUrl); //navigation to the app url

     const homepage = new HomePage(page);
      await homepage.clickMyAccount()
     await homepage.clickLogin()

        const loginPage = new LoginPage(page);
    //     await loginPage.setEmail(data.email)
    //  await loginPage.setPassword(data.password)
    //await loginPage.clickLogin()
    await loginPage.login(data.email,data.password)


    })
}