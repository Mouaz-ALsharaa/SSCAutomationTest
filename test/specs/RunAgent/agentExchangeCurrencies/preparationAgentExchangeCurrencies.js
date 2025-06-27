import { expect as expectChai } from 'chai'
import agentDashboard from '../../../pageobjects/agent/agentDashboard.js'
import AgentExchange from '../../../pageobjects/agent/AgentExchange.js'
import appServices from '../../../Services/appServices.js'
import { Key } from 'webdriverio'

class preparationAgentExchangeCurrencies {
    async AgentExchangeCurrencies (operationKind){
        await agentDashboard.btnCurrExchange.click()
        await AgentExchange.ExchingMoveTab.click()
        const requestafter= await appServices.getrequestbyurl('/Adjustment/GetAdjustments',async function(){await AgentExchange.btnSearch.click()})
        console.log('requestafter',requestafter)
      const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
      await AgentExchange.ExchingTab.click()
      await $("table tbody tr:nth-child(2)").click()
      await  AgentExchange.inptUSD.click()
      await browser.keys([Key.Ctrl, 'a'])
      await appServices.AddNum("100")
   operationKind=='Buy'? await AgentExchange.btnBuyOpp.click():await AgentExchange.btnSaleOpp.click()
      await AgentExchange.btnOk.click()
      await AgentExchange.ExchingMoveTab.click()
      console.log('requestafter',requestafter)
        const requestbefore= await appServices.getrequestbyurl('/Adjustment/GetAdjustments',async function(){await AgentExchange.btnSearch.click()})
      const requestAdditionalDatabefore =requestbefore.response.body.AdditionalData
      expectChai(requestAdditionalDatabefore.length).to.equal(requestAdditionalDataafter+1)
      await agentDashboard.btnHome.click()
      
    }
}
export default new preparationAgentExchangeCurrencies()