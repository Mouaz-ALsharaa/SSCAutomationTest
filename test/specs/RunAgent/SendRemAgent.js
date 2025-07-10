import agentDashboard from '../../pageobjects/agent/agentDashboard.js'
import LoginPage from '../../pageobjects/login.page.js'
import componant from '../../pageobjects/componant/componant.js'
import Operations from '../../pageobjects/componant/Operation.js'

describe('First', async () => {
   var options = {
      userName: "ضياء3",
      password: "Admin@2023",
   }
         it('SendRem', async () => {
            await browser.pause(2000)
            await LoginPage.open()
            await browser.pause(2000)
            const LogIn = await componant.getrequestbyurl('/Login/LogIn', async function () { await LoginPage.loginAgent(options.userName, options.password) })
            const RemOption = LogIn.response.body.AdditionalData.Options.RemOption
            const centralBank = LogIn.response.body.AdditionalData.Options.IsCentralBank
            const DefaultSender = LogIn.response.body.AdditionalData.Options.DefaultSender
            const Version_Kind = LogIn.response.body.AdditionalData.Options.Version_Kind
            const RemCode = LogIn.response.body.AdditionalData.Options.RemCode
            if ((centralBank == 1) || (centralBank == 0 && RemOption == 0)) {
                  describe('SendRemWhite', async () => {
                       it('SendRemmit in base currancy', async () => {
                        await Operations.RecWhiteRemAgent(Version_Kind,0,0,"NUID")
                     }),
                     it('SendRemmit API in base currancy', async () => {
                        await Operations.RecWhiteRemAgent(Version_Kind,1,0,"ApiUID")
                         await browser.pause(1000)
                        await agentDashboard.logout()
                     })
                  })
            }
            else {
               describe('SendRemBlack', async () => {
                  it('SendRemmitBlack', async () => {
                  //======اصدار حوالة على نافذة الاسود عادية بعملة الاساس==========
                    await Operations.RecBlackRemAgent(DefaultSender,0,0,"NUID",false)
                    await browser.pause(1000)
                     //======اصدار حوالة على نافذة الاسود عادية بعملة غير عملة الاساس==========
                    await Operations.RecBlackRemAgent(DefaultSender,0,1,"CUID",false)
                    await browser.pause(1000)
                     //======اصدار حوالة على نافذة الاسود api بعملة الاساس==========
                    await Operations.RecBlackRemAgent(DefaultSender,1,0,"ApiUID",true)
                    await browser.pause(1000)
                     //======اصدار حوالة على نافذة الاسود api بعملةغير عملة الاساس==========
                    await Operations.RecBlackRemAgent(DefaultSender,1,1,"ApiUIDC",true)
                    await browser.pause(1000)
                     await agentDashboard.logout()

                  })
               })
            }
         }) 
})
