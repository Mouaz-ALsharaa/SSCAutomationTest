import { expect as expectChai } from 'chai'
import LoginPage from '../../../pageobjects/login.page.js'
import agentDashboard from '../../../pageobjects/agent/agentDashboard.js'
import loginPage from '../../../pageobjects/login.page.js'
import appServices from '../../../Services/appServices.js'

describe('Login-Agent', async() => {
    var options={
        userName:"memo",
        userNameError:"memoooo",
        PasswordError:"asdadhhh",
        email:"mouaz@salahsoft.com",
        WrongEmail:"eeerr@sssss.com"
    }
    var Userpass=await appServices.generatePassword()

    it('Check License', async() => {
    
        await LoginPage.open()
        const request= await appServices.getrequestbyurl('/Login/GetUserType',async function(){  await browser.waitUntil( async() =>(await loginPage.btnSignIn.isDisplayed()));})
      expectChai(request.response.body.AdditionalData.IsAgent||request.response.body.AdditionalData.data.length>0).to.be.true
    }),
    it('Check data', async() => {
       
        await LoginPage.open()
       const request= await appServices.getrequestbyurl('/Login/GetUserType',async function(){ await LoginPage.loginAgent(options.userName, Userpass.toString())})
        expectChai(request.response.body.Code).to.not.equal("-100")
       await loginPage.btnClose.click()
    }),
    it('ResetPass-Sucss', async() => {
     
        await LoginPage.open()
   
        await loginPage.btnAgent.click();
      
        await loginPage.inputUsername.setValue(options.userName);
    
        await loginPage.btnResetPass.click()
      
        await loginPage.inptEmail.setValue(options.email)
   
        await loginPage.btnSend.click()
    
        await loginPage.btnOk.click()
        await browser.pause(90000)
        const mass =(await appServices.mail()).toString()
        
       await LoginPage.open()
     
       await LoginPage.loginAgent(options.userName, mass)
      
       await loginPage.btnOkkk.click()
       await browser.pause(1500)
       await loginPage.inptUserName.setValue(options.userName)
      
       await loginPage.passOldPass.setValue(mass)
   
       await loginPage.passNewPass.setValue(Userpass.toString())
     
       await loginPage.passConfirmPass.setValue(Userpass.toString())
     
       await loginPage.btnSave.click()

       await loginPage.btnOk.click()
     
       await LoginPage.open()
     
       await LoginPage.loginAgent(options.userName, Userpass.toString())
   
       await agentDashboard.logout()
    }),
   it('ResetPass-Wrong-Email', async() => {
      
        await LoginPage.open()
       
        await loginPage.btnAgent.click();
     
        await loginPage.inputUsername.setValue(options.userName);
       
        await loginPage.btnResetPass.click()
     
        await loginPage.inptEmail.setValue(options.WrongEmail)
  
        await loginPage.btnSend.click()
        
        const request= await appServices.getrequestbyurl('/Login/ResetLogInPassword',async function(){  await loginPage.btnOk.click() })

        expectChai(request.response.body.Code).to.equal("-100")
       await loginPage.btnClose.click()
     
    }),
   it('Login-Agent-Sucess-Whithout-Otp', async() => {
      
        await LoginPage.open()
    
        await LoginPage.loginAgent(options.userName, Userpass.toString())
    
        await agentDashboard.logout()
    }),
    it('Login-Agent-faild-Whithout-Otp-UserNameError', async() => {
      
        await LoginPage.open()
      
       const request= await appServices.getrequestbyurl('/Login/LogIn',async function(){    await browser.pause(1000); await LoginPage.loginAgent(options.userNameError, Userpass.toString())})
        expectChai(request.response.body.Code).to.equal("UserNameError")
      
       await loginPage.btnClose.click()
    
    }),
    it('Login-Agent-faild-Whithout-Otp-PasswordError', async() => {
   
        await LoginPage.open()
     
       const request= await appServices.getrequestbyurl('/Login/LogIn',async function(){ await browser.pause(1000); await LoginPage.loginAgent(options.userName, options.PasswordError)})
        expectChai(request.response.body.Code).to.equal("PasswordError")
       await loginPage.btnClose.click()
    }),
    it('Login-Agent-Sucess-Whithout-Otp-with-failuer-count', async() => {
      
        await LoginPage.open()
        const request= await appServices.getrequestbyurl('/Login/LogIn',async function(){  await browser.pause(1000); await LoginPage.loginAgent(options.userName, Userpass.toString())})
        expectChai(request.response.body.Code).to.equal("11")
        await loginPage.btnClose.click()
   
        await agentDashboard.logout()
    })
   it('Login-Agent-faild-and-close-account', async() => {
       
            await LoginPage.open()

            await LoginPage.loginAgent(options.userName, options.PasswordError)
      
            await loginPage.btnClose.click()

            await LoginPage.loginAgent(options.userName, options.PasswordError)
         
            await loginPage.btnClose.click()

            const request= await appServices.getrequestbyurl('/Login/LogIn',async function(){  await browser.pause(1000); await LoginPage.loginAgent(options.userName, options.PasswordError)})
 
            expectChai(request.response.body.Code).to.equal("PasswordErrorWithMultipleTimes")
          
            await loginPage.btnClose.click()
          
            await LoginPage.loginAgent(options.userName, Userpass.toString())
       
             await loginPage.btnClose.click()
  
             await agentDashboard.logout()
        })
    xit('Login-Agent-Sucess-Whithout-Otp', async() => {
            await browser.pause(1000)
            await LoginPage.open()
            await browser.pause(1000)
            await LoginPage.loginAgent(options.userName, Userpass.toString())
            await browser.pause(2000)
            await LoginPage.open()
        const request= await appServices.getrequestbyurl('/Login/LogIn',async function(){  await browser.pause(1000); await LoginPage.loginAgent(options.userName, Userpass.toString())})
       await browser.pause(2000)
        expectChai(request.response.body.Code).to.equal("-4")
        await loginPage.btnClose.click()
        })
})


