
import LoginPage from '../../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../../pageobjects/agent/agentDashboard.js'
import UserDashboard from '../../../../../pageobjects/user/UserDashboard.js'
import UserRemittanceOperation from '../../../../../pageobjects/user/UserRemittanceOperation.js'
import appServices from '../../../../../Services/appServices.js'
import cardServices from '../../../../../Services/cardServices.js'
import fileServices from '../../../../../Services/fileServices.js'
import preparationRemittanceSendUser from './preparationRemittanceSendUser.js'



describe('RemittanceSend', async() => {
    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023",
        Sendername: await cardServices.generateName(),
        Benficname:await cardServices.generateName()
    }
    //-------------ExternalRemitt------------------------
   it('RemOperation-RemittanceSend-Read-Edit-lock-Unlock-print-Delete', async() => {
        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        await browser.pause(1000)
        const option= await fileServices.readfile('option.json')
        await browser.pause(2000)
        await UserDashboard.btnRemittance.click()
        await browser.pause(3000)
        const fildRequerd = await appServices.getrequestbyurl('/Service/GetCardRequirement', async function () { await browser.pause(2000);  await UserDashboard.btnRemittanceOperations.click();await browser.pause(3000); })
        const fildRequerdAdd = fildRequerd.response.body.AdditionalData
        await browser.pause(2000)
        await UserRemittanceOperation.btnRemittanceSend.click()                                                                                                                                                                                                                                                                                                                                                             
        await browser.pause(2000)
 await preparationRemittanceSendUser.RemSend(1,await options.Sendername,await options.Benficname,0,"",option,fildRequerdAdd) 
 await browser.pause(1000) 
  //============================ReExternalRemitt======================================= 
await preparationRemittanceSendUser.RemSend(1,await options.Sendername,await options.Benficname,0,"NUID",option)    
//============================ReExternalRemittCur=======================================     
//await preparationRemittanceSendUser.RemSend(1,await options.Sendername,await options.Benficname,1,"NUIDEX",option)
//============================InternalRemitt=======================================    
//await preparationRemittanceSendUser.RemSend(0,await options.Sendername,await options.Benficname,0,"NUIDIN",option)
//============================InternalRemittAnotherCurr=======================================    
//await preparationRemittanceSendUser.RemSend(0,await options.Sendername,await options.Benficname,1,"NUIDINC",option)
await browser.pause(3000)
        await agentDashboard.logout()
       
    })
})
