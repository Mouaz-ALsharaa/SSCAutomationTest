import LoginPage from '../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../pageobjects/agent/agentDashboard.js'
import UserDashboard from '../../../../pageobjects/user/UserDashboard.js'
import componant from '../../../../pageobjects/componant/componant.js'
import UserRemittanceOperation from '../../../../pageobjects/user/UserRemittanceOperation.js'
import Operations from '../../../../pageobjects/componant/Operation.js'

describe('RemOutwardUser', async() => {

    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023"
    }
     //-----------  حوالة صادرة----------------------

   it('RemOutwardUser', async() => {
        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        await browser.pause(1000)
        await UserDashboard.btnRemittance.click()
        await browser.pause(1000)
        await UserDashboard.btnRemittanceOperations.click()
        await browser.pause(1000)
        await UserRemittanceOperation.RemittanceOutward.click()
        await browser.pause(1500)
        //===========RemOutward===================
        await Operations.RemOutward("NUIDEX")

        await agentDashboard.logout()
 
    })

    })