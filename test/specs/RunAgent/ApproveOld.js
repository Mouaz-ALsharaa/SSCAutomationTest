import LoginPage from '../../pageobjects/login.page.js'
import agentDashboard from '../../pageobjects/agent/agentDashboard.js'
import UserDashboard from '../../pageobjects/user/UserDashboard.js'
import UserQuickRem from '../../pageobjects/user/UserQuickRem.js'
import componant from '../../pageobjects/componant/componant.js'
import appServices from '../../Services/appServices.js'



describe ("Approve",async ()=>{
    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023",

    }
 it ("Approveee",async ()=>{
    await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
    await browser.pause(3000)
    await UserDashboard.btnQuickRemittance.click()
    await browser.pause(3000)
    await UserQuickRem.btnTransactionSearchApi.click()
    await browser.pause(3000)
    await appServices.select(UserQuickRem.slcAgentApi,1)
    await browser.pause(3000)
    await UserQuickRem.btnSearch.click()
    await browser.pause(2000)
    //await appServices.select(UserQuickRem.slct,3)
    await browser.pause(2000)
    await $("table tbody").scrollIntoView()
    //await browser.scroll(0, 200)
    await browser.pause(2000)
    await $("table tbody tr:nth-last-child(2) td:nth-last-child(1)").click()
    await browser.pause(2000)
    await UserQuickRem.btnOk.click()
    await browser.pause(2000)
   // await appServices.select(UserQuickRem.slct,3)
    await browser.pause(2000)
    await $("table tbody").scrollIntoView()
    await browser.pause(2000)
    await $("table tbody tr:nth-last-child(1) td:nth-last-child(1)").click()
    await browser.pause(2000)
    await UserQuickRem.btnOk.click()
    await browser.pause(2000)

    await agentDashboard.logout()
 })



})