import { expect as expectChai } from 'chai'
import LoginPage from '../../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../../pageobjects/agent/agentDashboard.js'
import UserDashboard from '../../../../../pageobjects/user/UserDashboard.js'
import componant from '../../../../../pageobjects/componant/componant.js'
import UserRemittanceOperation from '../../../../../pageobjects/user/UserRemittanceOperation.js'
import { Key } from 'webdriverio'
//import UserMangment from '../../../../pageobjects/user/UserMangment.js'
//import UserAddTeller from '../../../../pageobjects/user/UserAddTeller.js'
import UserAccountMangment from '../../../../../pageobjects/user/UserAccountMangment.js'

describe('AccountCard', async() => {
    var options={
        userAdmin:"admin",
        userNameError:"memoooo",
        PasswordAdmin:"Admin@2023",
       Account:"hamz",
       Amount: await componant.generateNumber(4),
        email:"mouaz@salahsoft.com",
        WrongEmail:"eeerr@sssss.com",
        Discount:await componant.generateNumber(2),
        commission:await componant.generateNumber(2),
        Tax:await componant.generateNumber(2),
        checkNum:await componant.generateNumber(5),
        benfic:await componant.generateName(),
        drwer:await componant.generateName(),
        DraweeBank:"test"
    }


   xit('AccountCard', async() => {

        await browser.pause(2000)
        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        await browser.pause(1000)
        await UserDashboard.btnAccounts.click()
        await browser.pause(500)
        await UserDashboard.btnAccountManagement.click()
    for (let j = 0; j < 1000; ++j) 
    {
        await browser.pause(2000)
        await UserDashboard.btnAccountsList.click()
        await browser.pause(2000)
         var AccountName =await componant.generateNumber(3)
         var AccountName1 =await componant.generateNumber(2)
         
        const Acc10= await UserAccountMangment.AccountTree(14)
        Acc10.click()
        await browser.pause(500)
          const Acc101= await UserAccountMangment.AccountTree(141)
          Acc101.click()
          await browser.pause(500)
          await UserAccountMangment.AddAgentAccount.click()
          await browser.pause(500)
          const AgentName = 'Agent1'+AccountName+AccountName1
          await UserAccountMangment.inptAccName.setValue(AgentName)
           await browser.pause(500)
           await browser.pause(500)
           const maincurr =await UserAccountMangment.AddAccCheck(1)
           await browser.pause(500)
            maincurr.click()
            await UserAccountMangment.btnSave.click()
            await browser.pause(750)
            await UserAccountMangment.btnOk.click()
            await browser.pause(750)
          //await browser.keys([Key.Escape])

          await UserDashboard.btnCustomersList.click()
          await componant.autocompleteNonWoutEnter(AgentName,UserRemittanceOperation.autoAccount,UserRemittanceOperation.dropdownAccount,0,()=>{})
          await browser.pause(500)
          await UserAccountMangment.btnNew.click()
          await browser.pause(500)
          await UserAccountMangment.inptAgent.setValue(AgentName)
          await UserAccountMangment.inptAuthorizedAcc.setValue(AgentName)
          await browser.pause(1000)
          await componant.select(UserRemittanceOperation.slctCity, 1)
          await UserAccountMangment.inptPhone.setValue(await componant.generateNumber(9))
          await browser.pause(1000)
          await UserAccountMangment.btnAdditionalData.click()
          await browser.pause(1000)
          await UserAccountMangment.inptEmail.setValue(AgentName+"@"+AgentName+".com")
          await browser.pause(1000)
          
            await UserAccountMangment.btnSave.click()
            await browser.pause(1000)
            await browser.keys([Key.Escape])
    }
        await agentDashboard.logout()
    })

    it('AccountCard-Adduser', async() => {

        await browser.pause(2000)
        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        await browser.pause(1000)
        await UserDashboard.btnAccounts.click()
        await browser.pause(500)
        await UserDashboard.btnAccountManagement.click()

          await UserDashboard.btnCustomersList.click()
          await componant.autocompleteNonWoutEnter("Agent101996",UserRemittanceOperation.autoAccount,UserRemittanceOperation.dropdownAccount,0,()=>{})
          await browser.pause(500)
          await $("//tbody/tr[contains(@class,'')]/td[9]/button[1]").click()
         await browser.pause(1000)
          await UserAccountMangment.btnApiUsers.click()
          await browser.pause(750)
          for (let j = 0; j < 1000; ++j) 
          {
            var AccountName =await componant.generateNumber(3)
            var AccountName1 =await componant.generateNumber(2)
            const UserAgentName = 'UserAgent'+AccountName+AccountName1
            await browser.pause(500)
            await componant.select($('#slctAccount'), 1)
            await browser.pause(750)
          await $("#inptUserName").setValue(UserAgentName)
          await browser.pause(500)
          await $$("#inptEmail")[1].setValue(UserAgentName+"@"+UserAgentName+".com")
          await browser.pause(500)
          await $("#inptBrSymbol").setValue("001")
          await browser.pause(500)
          await componant.select($('#slctValidGroup'), 1)
          await browser.pause(500)
          await $("//input[@name='Active']").click()
          await browser.pause(500)



            await $$("#btnSave")[1].click()

            await browser.waitUntil(async function () {return ((await UserRemittanceOperation.spinner.isDisplayed())==false)},
            { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
            //await browser.pause(1500)
            await browser.keys([Key.Escape])
         

    }
        await agentDashboard.logout()
    })
    
 } )