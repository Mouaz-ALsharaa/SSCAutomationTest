
import LoginPage from '../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../pageobjects/agent/agentDashboard.js'
import UserDashboard from '../../../../pageobjects/user/UserDashboard.js'
import componant from '../../../../pageobjects/componant/componant.js'
import Operations from '../../../../pageobjects/componant/Operation.js'
import UserRemittanceOperation from '../../../../pageobjects/user/UserRemittanceOperation.js'

describe('RemittanceSend', async() => {
    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023",
        Sendername: await componant.generateName(),
        Benficname:await componant.generateName()
    }
    //-------------ExternalRemitt------------------------
   it('RemOperation-RemittanceSend-Read-Edit-lock-Unlock-print-Delete', async() => {
        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        await browser.pause(1000)
        const option= await componant.readfile('option.json')
        await UserDashboard.btnRemittance.click()
        await browser.pause(500)
        const fildRequerd = await componant.getrequestbyurl('/Service/GetCardRequirement', async function () { await browser.pause(2000);  await UserDashboard.btnRemittanceOperations.click() })
        const fildRequerdAdd = fildRequerd.response.body.AdditionalData
        await browser.pause(500)
        await UserRemittanceOperation.btnRemittanceSend.click()                                                                                                                                                                                                                                                                                                                                                             
        await browser.pause(500)
 await Operations.RecRem(1,await options.Sendername,await options.Benficname,0,"",option,fildRequerdAdd)  
  //============================ReExternalRemitt======================================= 
await Operations.RecRem(1,await options.Sendername,await options.Benficname,0,"NUID",option)    
//============================ReExternalRemittCur=======================================     
await Operations.RecRem(1,await options.Sendername,await options.Benficname,1,"NUIDEX",option)
//============================InternalRemitt=======================================    
await Operations.RecRem(0,await options.Sendername,await options.Benficname,0,"NUIDIN",option)
//============================InternalRemittAnotherCurr=======================================    
await Operations.RecRem(0,await options.Sendername,await options.Benficname,1,"NUIDINC",option)
await browser.pause(3000)
        await agentDashboard.logout()
       
    })
})
