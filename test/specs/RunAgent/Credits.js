import { expect as expectChai } from 'chai'
import LoginPage from '../../pageobjects/login.page.js'
import agentDashboard from '../../pageobjects/agent/agentDashboard.js'
import AgentCredit from '../../pageobjects/agent/AgentCredit.js'
import AgentBalances from '../../pageobjects/agent/AgentBalances.js'
import loginPage from '../../pageobjects/login.page.js'
import componant from '../../pageobjects/componant/componant.js'
import Operation from '../../pageobjects/componant/Operation.js'
import { Key } from 'webdriverio'


describe('Login-Agent', async() => {
    var options={
        userName:"ضياء3",
        password:"Admin@2023",
    }


    xit('Check Credits permission', async() => {
        await browser.pause(500)
        await LoginPage.open()
       await browser.pause(1000)
        await LoginPage.loginAgent(options.userName, options.password)
        await browser.pause(5000)
        expectChai(await AgentCredit.btnCredits.isDisplayed()).to.be.true
        await browser.pause(1000)
       await agentDashboard.logout()

    }),
    
    it('Create_Credit', async() => {
        await browser.pause(500)
       await LoginPage.open()
       await browser.pause(1000)
        await LoginPage.loginAgent(options.userName, options.password)
        await Operation.agent_Credit(0,0)
        await browser.pause(1000)
        await Operation.agent_Credit(1,0)
        await browser.pause(1000)
        await Operation.agent_Credit(0,1)
        await browser.pause(1000)
       await agentDashboard.logout()
    })
})