import { expect as expectChai } from 'chai'
import LoginPage from '../../pageobjects/login.page.js'
import agentDashboard from '../../pageobjects/agent/agentDashboard.js'
import loginPage from '../../pageobjects/login.page.js'
import componant from '../../pageobjects/componant/componant.js'

describe('Login-User', async() => {
    var options={
        userAdmin:"admin",
        userNameError:"memoooo",
        PasswordAdmin:"Admin@2023",
        PasswordAdminError:"Admin@2022",
        email:"mouaz@salahsoft.com",
        WrongEmail:"eeerr@sssss.com"
    }

    it('User-login-Admin', async() => {
        await browser.pause(2000)
        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        await browser.pause(500)
        await agentDashboard.logout()
    }),
    it('User-login-Admin-PasswordError', async() => {
        await browser.pause(2000)
        const PasswordError = await componant.getrequestbyurl('/Login/LogIn', async function () {  await LoginPage.loginUser(options.userAdmin,options.PasswordAdminError) })
        expectChai(PasswordError.response.body.Code).to.equal("PasswordError")
        await loginPage.btnClose.click()
        await browser.pause(500)
    }),
    it('User-login-Admin-sucess-with-error-try', async() => {
        await browser.pause(2000)
        const PasswordError = await componant.getrequestbyurl('/Login/LogIn', async function () {  await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin) })
        expectChai(PasswordError.response.body.Code).to.equal("SuccessWithSomePreviousErroneousAttempts")
        await loginPage.btnClose.click()
        await browser.pause(500)
        await agentDashboard.logout()
    })

})


