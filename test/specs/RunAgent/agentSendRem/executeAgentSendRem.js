 import agentDashboard from '../../../pageobjects/agent/agentDashboard.js'
 import LoginPage from '../../../pageobjects/login.page.js'
 import appServices from '../../../Services/appServices.js'
 import preparationAgentSendRem from './preparationAgentSendRem.js'
 import LoginDataService from '../../../Services/loginDataService.js'


describe('First', async () => {

         it('SendRem', async () => {
            browser.setTimeout({ 'implicit': 4000 })
            await LoginPage.open()
            await agentDashboard.ChangeLang(1)
            const LogIn = await appServices.getrequestbyurl('/Login/LogIn', async function () { await LoginPage.loginAgent(LoginDataService.loginData.userName, LoginDataService.loginData.password) })
            const RemOption = LogIn.response.body.AdditionalData.Options.RemOption
            const centralBank = LogIn.response.body.AdditionalData.Options.IsCentralBank
            const DefaultSender = LogIn.response.body.AdditionalData.Options.DefaultSender
            const Version_Kind = LogIn.response.body.AdditionalData.Options.Version_Kind
            const RemCode = LogIn.response.body.AdditionalData.Options.RemCode
         
            if ((centralBank == 1) || (centralBank == 0 && RemOption == 0)) {
                  describe('SendRemWhite', async () => {
                       it('SendRemmit in base currancy', async () => {
                        await preparationAgentSendRem.RecWhiteRemAgent(Version_Kind,0,0,"NUID")
                     }),
                     it('SendRemmit API in base currancy', async () => {
                        await preparationAgentSendRem.RecWhiteRemAgent(Version_Kind,1,0,"ApiUID")
                        await agentDashboard.logout()
                     })
                  })
            }
            else {
               describe('SendRemBlack', async () => {
                  it('SendRemmitBlack', async () => {
                  //======اصدار حوالة على نافذة الاسود عادية بعملة الاساس==========
                    await preparationAgentSendRem.RecBlackRemAgent(DefaultSender,0,0,"NUID",false)
                 
                     //======اصدار حوالة على نافذة الاسود عادية بعملة غير عملة الاساس==========
                    await preparationAgentSendRem.RecBlackRemAgent(DefaultSender,0,1,"CUID",false)
                
                     //======اصدار حوالة على نافذة الاسود api بعملة الاساس==========
                    await preparationAgentSendRem.RecBlackRemAgent(DefaultSender,1,0,"ApiUID",true)
           
                     //======اصدار حوالة على نافذة الاسود api بعملةغير عملة الاساس==========
                    await preparationAgentSendRem.RecBlackRemAgent(DefaultSender,1,1,"ApiUIDC",true)
            
                     await agentDashboard.logout()

                  })
               })
            }
         }) 
})
