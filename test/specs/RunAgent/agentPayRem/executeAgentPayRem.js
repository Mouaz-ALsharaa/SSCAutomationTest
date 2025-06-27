
import agentDashboard from '../../../pageobjects/agent/agentDashboard.js'
import LoginPage from '../../../pageobjects/login.page.js'
import appServices from '../../../Services/appServices.js'
import preparationAgentPayRem from './preparationAgentPayRem.js'
import LoginDataService from '../../../Services/loginDataService.js'

describe('PayRem', async () => {
    

   it('payRemmit in base currancy', async () => {
      
       await LoginPage.open()
      
                   await agentDashboard.ChangeLang(1)
               
      
       const LogIn = await appServices.getrequestbyurl('/Login/LogIn', async function () { await LoginPage.loginAgent(LoginDataService.loginData.PayUserName, LoginDataService.loginData.PayPassword) })
       const RemCode = LogIn.response.body.AdditionalData.Options.RemCode

       await preparationAgentPayRem.payRemAgent(0,"NUID",RemCode)

      

        await preparationAgentPayRem.payRemAgent(0,"CUID",RemCode)
      
       await agentDashboard.logout()
    }),
    it('payRemmit-API in base currancy', async () => {

     await LoginPage.open()
  
     await agentDashboard.ChangeLang(1)

     const LogIn = await appServices.getrequestbyurl('/Login/LogIn', async function () { await LoginPage.loginAgent(LoginDataService.loginData.PayUserName, LoginDataService.loginData.PayPassword) })
     const RemCode = LogIn.response.body.AdditionalData.Options.RemCode
     await preparationAgentPayRem.payRemAgent(1,"ApiUID",RemCode)
   
     await preparationAgentPayRem.payRemAgent(1,"ApiUIDC",RemCode)
    
     await agentDashboard.logout()
  })
 })