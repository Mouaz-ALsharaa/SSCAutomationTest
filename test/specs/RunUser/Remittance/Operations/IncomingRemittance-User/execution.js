import LoginPage from '../../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../../pageobjects/agent/agentDashboard.js'
import UserDashboard from '../../../../../pageobjects/user/UserDashboard.js'
import componant from '../../../../../pageobjects/componant/componant.js'
import UserRemittanceOperation from '../../../../../pageobjects/user/UserRemittanceOperation.js'
import Operation from '../../../../../pageobjects/componant/Operation.js'

describe('RemOperation-IncomingRemittance', async() => {
    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023",
       Account:"hamz",
       Amount: await componant.generateNumber(4),
        Sendername: await componant.generateName(),
        benfic:await componant.generateName(),
        Relation: "BROTH"
    }

    it('RemOperation-IncomingRemittance', async() => {
      await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
      await browser.pause(1000)
      await UserDashboard.btnRemittance.click()
      await browser.pause(500)
        await UserDashboard.btnRemittanceOperations.click()
        await browser.pause(500)
      await UserRemittanceOperation.btnIncomingRemittance.click()
      await browser.pause(500)
      
await Operation.InComRem(1,1,options.Sendername,options.benfic,"",true)

await Operation.InComRem(1,2,options.Sendername,options.benfic,"NUIDEX")


await Operation.InComRem(0,1,options.Sendername,options.benfic,"NUIDIN")

await Operation.InComRem(0,2,options.Sendername,options.benfic,"NUIDINC")


      await agentDashboard.logout() 
     })

})
