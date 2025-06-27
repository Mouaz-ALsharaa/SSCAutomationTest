import LoginPage from '../../../pageobjects/login.page.js'
import agentDashboard from '../../../pageobjects/agent/agentDashboard.js'
import preparationAgentExchangeCurrencies from './preparationAgentExchangeCurrencies.js'
import LoginDataService from '../../../Services/loginDataService.js'


describe('Login-Agent', async() => {

    it('Exchang-buy-Curr-USD/TRY', async() => {
     
        await LoginPage.open()
        await agentDashboard.ChangeLang(1)
        await LoginPage.loginAgent(LoginDataService.loginData.userName, LoginDataService.loginData.password)
//============حركة شراء ==================================
    await preparationAgentExchangeCurrencies.AgentExchangeCurrencies('Buy')
//============حركة بيع=======================================
    await preparationAgentExchangeCurrencies.AgentExchangeCurrencies('Sale')
    
       await agentDashboard.logout()
    })
})
    