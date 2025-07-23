import { expect as expectChai } from 'chai'
import LoginPage from '../../../pageobjects/login.page.js'
import agentDashboard from '../../../pageobjects/agent/agentDashboard.js'
import loginPage from '../../../pageobjects/login.page.js'
import componant from '../../../pageobjects/componant/componant.js'

describe('Login-User', async() => {
    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023",
        PasswordAdminError:"Admin@2022",

    }

    it('User-login-Admin', async() => {
        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        await agentDashboard.logout()
    }),
    it('User-login-Admin-PasswordError', async() => {

        const PasswordError = await componant.getrequestbyurl('/Login/LogIn', async function () {  await LoginPage.loginUser(options.userAdmin,options.PasswordAdminError) })
        expectChai(PasswordError.response.body.Code).to.equal("PasswordError")
        await loginPage.btnClose.click()
    }),
    it('User-login-Admin-sucess-with-error-try', async() => {
        const PasswordError = await componant.getrequestbyurl('/Login/LogIn', async function () {  await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin) })
        expectChai(PasswordError.response.body.Code).to.equal("SuccessWithSomePreviousErroneousAttempts")
        await loginPage.btnClose.click()
        await agentDashboard.logout()
    })

})


