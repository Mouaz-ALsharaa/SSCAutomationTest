import LoginPage from '../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../pageobjects/agent/agentDashboard.js'
import UserDashboard from '../../../../pageobjects/user/UserDashboard.js'
import componant from '../../../../pageobjects/componant/componant.js'
import Operations from '../../../../pageobjects/componant/Operation.js'
import UserRemittanceOperation from '../../../../pageobjects/user/UserRemittanceOperation.js'

describe('PayRemUser', async() => {

    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023"
    }
     //--------------دفع حوالة-----------------------

   it('PayRemUser', async() => {
        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        await browser.pause(1000)
        await UserDashboard.btnRemittance.click()
        await browser.pause(1000)
        const fildRequerd = await componant.getrequestbyurl('/Service/GetCardRequirement', async function () { await browser.pause(2000);  await UserDashboard.btnRemittanceOperations.click() })
        const fildRequerdAdd = fildRequerd.response.body.AdditionalData
        await browser.pause(1000)
        await UserRemittanceOperation.PaymentCash.click()
        await browser.pause(1500)
        //===========PayRemUser===================
        await Operations.PayRem("NUID",fildRequerdAdd,"first")
        //========RePayRemUserIN==================
       await Operations.PayRem("NUIDIN")
        //========RePayRemUserEX==================
         await Operations.PayRem("NUIDEX")
       //========RePayRemUserNUIDINC==============
           await Operations.PayRem("NUIDINC")

        await agentDashboard.logout()
 
    })

    })