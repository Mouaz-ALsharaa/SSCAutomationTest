import { expect as expectChai } from 'chai'
import LoginPage from '../pageobjects/login.page.js'
import agentDashboard from '../pageobjects/agent/agentDashboard.js'
import loginPage from '../pageobjects/login.page.js'
import componant from '../pageobjects/componant/componant.js'

describe('Login-Agent', async() => {
    var options={
        userName:"memo",
        userNameError:"memoooo",
        PasswordError:"asdadhhh",
        email:"mouaz@salahsoft.com",
        WrongEmail:"eeerr@sssss.com"
    }
    const Userpass=await componant.generatePassword()

    it('Check License', async() => {
        await browser.pause(500)
        await LoginPage.open()
        await browser.setupInterceptor();
        await browser.pause(3000)
        await browser.waitUntil( async() =>(await loginPage.btnSignIn.isDisplayed()));
        await browser.pause(3000)
      var request = await browser.getRequest(0);
      await browser.pause(1000)
      expectChai(request.response.body.AdditionalData.IsAgent||request.response.body.AdditionalData.data.length>0).to.be.true
    }),
    it('Check data', async() => {
        await browser.pause(500)
        await LoginPage.open()
        await browser.setupInterceptor();
        await LoginPage.loginAgent(options.userName, Userpass.toString())
       await browser.pause(2000)
        var request = await browser.getRequest(1);
        expectChai(request.response.body.Code).to.not.equal("-100")
       await loginPage.btnClose.click()
    }),
    it('ResetPass-Sucss', async() => {
        await browser.pause(500)
        await LoginPage.open()
        await browser.pause(500)
        await loginPage.btnAgent.click();
        await browser.pause(3000)
        await loginPage.inputUsername.setValue(options.userName);
        await browser.pause(500)
        await loginPage.btnResetPass.click()
        await browser.pause(500)
        await loginPage.inptEmail.setValue(options.email)
        await browser.pause(1000)
        await loginPage.btnSend.click()
        await browser.pause(1000)
        await loginPage.btnOk.click()
        await browser.pause(1500)
        const mass =(await componant.mail()).toString()
       await LoginPage.open()
       await browser.pause(1000)
       await LoginPage.loginAgent(options.userName, mass)
       await browser.pause(1000)
       await loginPage.btnClose.click()
       await browser.pause(1000)
       await loginPage.inptUserName.setValue(options.userName)
       await browser.pause(100)
       await loginPage.passOldPass.setValue(mass)
       await browser.pause(100)
       await loginPage.passNewPass.setValue(Userpass.toString())
       await browser.pause(100)
       await loginPage.passConfirmPass.setValue(Userpass.toString())
       await browser.pause(100)
       await loginPage.btnSave.click()
       await browser.pause(1000)
       await loginPage.btnClose.click()
       await browser.pause(100)
       await LoginPage.open()
       await browser.pause(100)
       await LoginPage.loginAgent(options.userName, Userpass.toString())
       await browser.pause(1000)
       await agentDashboard.logout()
    }),
    it('ResetPass-Wrong-Email', async() => {
        await browser.pause(500)
        await LoginPage.open()
        await browser.pause(500)
        await loginPage.btnAgent.click();
        await browser.pause(3000)
        await loginPage.inputUsername.setValue(options.userName);
        await browser.pause(500)
        await loginPage.btnResetPass.click()
        await browser.pause(500)
        await loginPage.inptEmail.setValue(options.WrongEmail)
        await browser.pause(1000)
        await loginPage.btnSend.click()
        await browser.pause(1000)
        await browser.setupInterceptor();
        await loginPage.btnOk.click()
       await browser.pause(3000)
        var request = await browser.getRequest(0);
        expectChai(request.response.body.Code).to.equal("-100")
       await loginPage.btnClose.click()
     
    }),
    it('Login-Agent-Sucess-Whithout-Otp', async() => {
        await browser.pause(500)
        await LoginPage.open()
        await browser.pause(500)
        await LoginPage.loginAgent(options.userName, Userpass.toString())
        await browser.pause(2000)
        await agentDashboard.logout()
    }),
    it('Login-Agent-faild-Whithout-Otp-UserNameError', async() => {
        await browser.pause(500)
        await LoginPage.open()
        await browser.setupInterceptor();
        await LoginPage.loginAgent(options.userNameError, Userpass.toString())
       await browser.pause(2000)
        var request = await browser.getRequest(2);
        expectChai(request.response.body.Code).to.equal("UserNameError")
      
       await loginPage.btnClose.click()
    
    }),
    it('Login-Agent-faild-Whithout-Otp-PasswordError', async() => {
    await browser.pause(500)
        await LoginPage.open()
        await browser.setupInterceptor();
        await LoginPage.loginAgent(options.userName, options.PasswordError)
       await browser.pause(2000)
        var request = await browser.getRequest(2);
        expectChai(request.response.body.Code).to.equal("PasswordError")
       await loginPage.btnClose.click()
    }),
    it('Login-Agent-Sucess-Whithout-Otp-with-failuer-count', async() => {
        await browser.pause(500)
        await LoginPage.open()
        await browser.setupInterceptor();
        await LoginPage.loginAgent(options.userName, Userpass.toString())
        await browser.pause(2000)
        var request = await browser.getRequest(2);
        expectChai(request.response.body.Code).to.equal("11")
        await loginPage.btnClose.click()
         await browser.pause(500)
        await agentDashboard.logout()
    })
    it('Login-Agent-faild-and-close-account', async() => {
            await browser.pause(500)
            await LoginPage.open()
            await LoginPage.loginAgent(options.userName, options.PasswordError)
            await browser.pause(2000)
            await loginPage.btnClose.click()
            await LoginPage.loginAgent(options.userName, options.PasswordError)
            await browser.pause(2000)
            await loginPage.btnClose.click()
            await browser.setupInterceptor();
            await LoginPage.loginAgent(options.userName, options.PasswordError)
            await browser.pause(2000)
            var request = await browser.getRequest(0);
            expectChai(request.response.body.Code).to.equal("PasswordErrorWithMultipleTimes")
            await browser.pause(500)
            await loginPage.btnClose.click()
            await browser.pause(500)
            await LoginPage.loginAgent(options.userName, Userpass.toString())
             await browser.pause(1000)
             await loginPage.btnClose.click()
             await browser.pause(1000)
             await agentDashboard.logout()
        })
    it('Login-Agent-Sucess-Whithout-Otp', async() => {
            await browser.pause(500)
            await LoginPage.open()
            await browser.pause(500)
            await LoginPage.loginAgent(options.userName, Userpass.toString())
            await browser.pause(2000)
            await LoginPage.open()
            await browser.setupInterceptor();
        await LoginPage.loginAgent(options.userName, Userpass.toString())
       await browser.pause(2000)
        var request = await browser.getRequest(2);
        expectChai(request.response.body.Code).to.equal("-4")
        await loginPage.btnClose.click()
        })
        

})


