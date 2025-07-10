import { expect as expectChai } from 'chai'
import LoginPage from '../../pageobjects/login.page.js'
import agentDashboard from '../../pageobjects/agent/agentDashboard.js'
import AgentExchange from '../../pageobjects/agent/AgentExchange.js'
import AgentCredit from '../../pageobjects/agent/AgentCredit.js'
import AgentBalances from '../../pageobjects/agent/AgentBalances.js'
import loginPage from '../../pageobjects/login.page.js'
import componant from '../../pageobjects/componant/componant.js'
import { Key } from 'webdriverio'


describe('Login-Agent', async() => {
    var options={
        userName:"ضياء3",
        password:"Admin@2023",
    }

    it('Exchang-buy-Curr-USD/TRY', async() => {
        await browser.pause(500)
        await LoginPage.open()
       await browser.pause(1000)
        await LoginPage.loginAgent(options.userName, options.password)
        await browser.pause(2000)
        await agentDashboard.btnCurrExchange.click()
        await browser.pause(2000)
        await AgentExchange.ExchingMoveTab.click()
        const requestafter= await componant.getrequestbyurl('/Adjustment/GetAdjustments',async function(){await AgentExchange.btnSearch.click()})
        console.log('requestafter',requestafter)
      const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
      await browser.pause(2000)
      await AgentExchange.ExchingTab.click()
      await $("table tbody tr:nth-child(1)").click()
      await  AgentExchange.inptUSD.click()
      await browser.keys([Key.Ctrl, 'a'])
      await componant.AddNum("100")
      await AgentExchange.btnBuyOpp.click()
      await browser.pause(2000)
      await AgentExchange.btnClose.click()
      await AgentExchange.ExchingMoveTab.click()
      console.log('requestafter',requestafter)
        const requestbefore= await componant.getrequestbyurl('/Adjustment/GetAdjustments',async function(){await AgentExchange.btnSearch.click()})
      const requestAdditionalDatabefore =requestbefore.response.body.AdditionalData
      expectChai(requestAdditionalDatabefore.length).to.equal(requestAdditionalDataafter+1)
      await browser.pause(2000)
       await agentDashboard.logout()

    }),
    it('Exchang-sale-Curr-USD/TRY', async() => {
      await browser.pause(500)
      await LoginPage.open()
     await browser.pause(1000)
      await LoginPage.loginAgent(options.userName, options.password)
      await browser.pause(2000)
      await agentDashboard.btnCurrExchange.click()
      await browser.pause(2000)
      await AgentExchange.ExchingMoveTab.click()
      const requestafter= await componant.getrequestbyurl('/Adjustment/GetAdjustments',async function(){await AgentExchange.btnSearch.click()})
      console.log('requestafter',requestafter)
    const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
    await browser.pause(2000)
    await AgentExchange.ExchingTab.click()
    await $("table tbody tr:nth-child(1)").click()
    await  AgentExchange.inptUSD.click()
    await browser.keys([Key.Ctrl, 'a'])
    await componant.AddNum("100")
    await AgentExchange.btnSaleOpp.click()
    await browser.pause(2000)
    await AgentExchange.btnClose.click()
    await AgentExchange.ExchingMoveTab.click()
    console.log('requestafter',requestafter)
      const requestbefore= await componant.getrequestbyurl('/Adjustment/GetAdjustments',async function(){await AgentExchange.btnSearch.click()})
    const requestAdditionalDatabefore =requestbefore.response.body.AdditionalData
    expectChai(requestAdditionalDatabefore.length).to.equal(requestAdditionalDataafter+1)
    await browser.pause(2000)
     await agentDashboard.logout()

  })
})
    