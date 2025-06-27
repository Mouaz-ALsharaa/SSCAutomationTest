import Page from './page.js';
import componant from '../pageobjects/componant/componant.js'
import agentDashboard from './agent/agentDashboard.js';
class LoginPage extends Page {

    get inputUsername () {
        return $('#inptUsername');
    }
    get inputPassword () {
        return $('#passPassword');
    }
    get btnAgent () {
        return $('#btnAgent');
    }
    get btnUser () {
        return $('#btnUser');
    }

    get btnSignIn () {
        return $('#LogInFormBtn');
    }
    
    get btnClose () {
        return $('#btnClose');
    }
    get inptUserName () {
        return $('#inptUserName');
    }
    get passOldPass () {
        return $('#passOldPass');
    }
    get passNewPass () {
        return $('#passNewPass');
    }
    get passConfirmPass () {
        return $('#passConfirmPass');
    }
    get btnSave () {
        return $('#btnSave');
    }
    get btnResetPass () {
        return $('#btnForgotPass');
    }
    get inptEmail () {
        return $('#inptEmail');
    }
    get selectUserType () {
        return $('#slct');
    }
    get btnSend () {
        return $('#btnSend');
    }
    get btnOk () {
        return $('#btnOk');
    }
    get btnOkkk () {
        return $('#btnموافق');
    }
    get btnNext () {
        return $('#btnNext');
    }
    open () {
        return super.open('Signin');
    }

    async loginAgent (username, password) {
     
       

        await this.btnAgent.click();
      
        await this.inputUsername.setValue(username);
       
        await this.inputPassword.setValue(password);
      
        await this.btnSignIn.click();
    }
    async loginUser (username, password) {
        await browser.maximizeWindow()
        //await browser.pause(2000)
        await browser.url("https://app.salahsoft.net/");
        await browser.waitUntil(async function () {return ((await $$(".mt-5")[1].isDisplayed())==true)})
        await browser.pause(1000)
        await agentDashboard.ChangeLang(1)
        await browser.disableInterceptor()
        await browser.setupInterceptor() 
        await browser.pause(2000)
        await $("#btnLogIn").click()
        let lolo=''
        
     await browser.pause(3000)
       let fofo=await browser.getRequests();
        for (let i = 0; i < fofo.length;++i)
            if (fofo[i].url.includes('/Login/GetUserType'))
              lolo =fofo[i]
        await this.btnUser.click()
        await browser.pause(2000)
         if(lolo.response.body.AdditionalData.LogInState.ActivateSubBranches==false){
            await browser.pause(500)
            await this.inputUsername.setValue(username)
            await browser.pause(500)
            await this.inputPassword.setValue(password)
            await browser.pause(500)
            await componant.select(this.selectUserType,2)
           const sign= await this.btnSignIn
            const requestafter= await componant.getrequestbyurl('/Login/LogIn',async function(){ await sign.click()})
            const requestAdditionalDataafter =requestafter.response.body.AdditionalData.Options
            await componant.writePropInFile('option.json',"option",requestAdditionalDataafter)
         }
         else {
            await this.inputUsername.setValue(username) 
            await browser.pause(500)
            await this.btnNext.click()
            await browser.pause(500)
            await this.inputPassword.setValue(password)
            await browser.pause(500)
            const sign1= this.btnSignIn
            const requestafter1= await componant.getrequestbyurl('/Login/LogIn',async function(){   await sign1.click()})
            const requestAdditionalDataafter1 =requestafter1.response.body.AdditionalData.Options
            await componant.writePropInFile('option.json',"option",requestAdditionalDataafter1)
         }
  
     
     
     
    }
    async loginNewUser (username) {
        await browser.maximizeWindow()
        await browser.waitUntil(async function () {return ((await $$(".mt-5")[1].isDisplayed())==true)})
        await browser.pause(1000)
        await browser.disableInterceptor()
        await browser.setupInterceptor() 
        await browser.pause(2000)
        await $("#btnLogIn").click()
        let lolo=''
     await browser.pause(3000)
       let fofo=await browser.getRequests();
        for (let i = 0; i < fofo.length;++i)
            if (fofo[i].url.includes('/Login/GetUserType'))
              lolo =fofo[i]
        await this.btnUser.click()
        await browser.pause(2000)
         if(lolo.response.body.AdditionalData.LogInState.ActivateSubBranches==false){
            await browser.pause(500)
            await this.inputUsername.setValue(username)
          
            await browser.pause(500)
            await this.btnSignIn.click()
         }
         else {
            await this.inputUsername.setValue(username) 
            await browser.pause(500)
            await this.btnNext.click()
          
            await browser.pause(500)
            await this.btnSignIn.click()
         }
     
    }

    
}
export default new LoginPage();
