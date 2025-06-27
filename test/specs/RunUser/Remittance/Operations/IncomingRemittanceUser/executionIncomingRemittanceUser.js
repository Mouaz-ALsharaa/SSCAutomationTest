import LoginPage from '../../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../../pageobjects/agent/agentDashboard.js'
import UserDashboard from '../../../../../pageobjects/user/UserDashboard.js'
import UserRemittanceOperation from '../../../../../pageobjects/user/UserRemittanceOperation.js'
import appServices from '../../../../../Services/appServices.js'
import cardServices from '../../../../../Services/cardServices.js'
import preparationIncomingRemittanceUser from './preparationIncomingRemittanceUser.js'


describe('RemOperation-IncomingRemittance', async() => {
    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023",
       Account:"hamz",
       Amount: await appServices.generateNumber(4),
        Sendername: await cardServices.generateName(),
        benfic:await cardServices.generateName(),
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
      
await preparationIncomingRemittanceUser.InComRem(1,0,options.Sendername,options.benfic,"",true)

await preparationIncomingRemittanceUser.InComRem(1,1,options.Sendername,options.benfic,"NUIDEX")


await preparationIncomingRemittanceUser.InComRem(0,0,options.Sendername,options.benfic,"NUIDIN")

await preparationIncomingRemittanceUser.InComRem(0,1,options.Sendername,options.benfic,"NUIDINC")


      await agentDashboard.logout() 
     })

})
