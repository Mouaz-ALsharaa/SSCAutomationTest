import { expect as expectChai } from 'chai'
import LoginPage from '../../../pageobjects/login.page.js'
import agentDashboard from '../../../pageobjects/agent/agentDashboard.js'
import UserDashboard from '../../../pageobjects/user/UserDashboard.js'

import UserUserMangment from '../../../pageobjects/user/UserUserMangment.js'

import componant from '../../../pageobjects/componant/componant.js'
import fs from '../../../../node_modules/fs-js/index.js'
import { Key } from 'webdriverio'


describe('AccountOperation', async() => {
    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023",
        // userName:await componant.generateName(),
         userPassword: await componant.generatePassword()
    }
    //--------------اضافة صندوق ------------------------

   it('Add-User-Sucess', async() => {
       for( let i =0; i<500; i++){

      const  userName=await componant.generateName2()
      //let  userPassword= await componant.generatePassword()

        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        await browser.pause(1000)
        await UserDashboard.btnTools.click()
        await browser.pause(1000)
        await UserUserMangment.btnManagementUsers.click()
        await browser.pause(2000)
        await UserUserMangment.btnNewCustomer.click()
        await browser.pause(1000)
        await UserUserMangment.inptUserName.setValue(userName)
        await browser.pause(1000)
        await componant.select(UserUserMangment.slctGroup,5)
        await browser.pause(1000)

        const saverequest = await componant.getrequestbyurl('/UsersManagement/SaveUser', async function () {   await UserUserMangment.btnSave.click() })
       const  requestsaveSuccess = saverequest.response.body.Success
           expectChai(requestsaveSuccess).to.be.true
        //await UserUserMangment.btnSave.click()
        await browser.pause(1000)
        await UserUserMangment.btnOk.click()
             await browser.pause(3000)
             await agentDashboard.logout()
             await browser.pause(1000)
             await LoginPage.loginNewUser(userName)
             await browser.pause(1000)
             await UserUserMangment.btnClose0.click()
             await browser.pause(1000)
             await UserUserMangment.inptUserName.click()
             await browser.keys([Key.Ctrl, 'a'])
             await UserUserMangment.inptUserName.setValue(userName)
             await browser.pause(1000)
             await UserUserMangment.passNewPass.setValue(options.userPassword)
             await browser.pause(1000)
             await UserUserMangment.passConfirmPass.setValue(options.userPassword)
             await browser.pause(1000)

             await UserUserMangment.btnSave.click()
             await browser.pause(1500)
             await LoginPage.loginUser(userName,options.userPassword)
             await browser.pause(2000)
             const existUsers =await JSON.parse( await fs.readFileSync("user.json"));
             const UserInfo ={userName:userName,userPassword:options.userPassword}
             await  existUsers.push(UserInfo)
             const data =await JSON.stringify(existUsers);
           await fs.writeFile("user.json", data, (error) => {
  if (error) {
    console.error(error);
    throw error;
  }
  console.log("data.json written correctly");
});
await browser.pause(1000)
 await agentDashboard.logout()
 await browser.pause(1000)
       
}
        
    })
})