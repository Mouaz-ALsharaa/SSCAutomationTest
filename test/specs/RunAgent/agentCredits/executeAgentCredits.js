import { expect as expectChai } from 'chai'
import LoginPage from '../../../pageobjects/login.page.js'
import agentDashboard from '../../../pageobjects/agent/agentDashboard.js'
import AgentCredit from '../../../pageobjects/agent/AgentCredit.js'
import preparationAgentCredits from './preparationAgentCredits.js'
import LoginDataService from '../../../Services/loginDataService.js'

describe('Login-Agent', async() => {


    xit('Check Credits permission', async() => {
    
        await LoginPage.open()
        await LoginPage.loginAgent(LoginDataService.loginData.userName, LoginDataService.loginData.password)
        expectChai(await AgentCredit.btnCredits.isDisplayed()).to.be.true
       await agentDashboard.logout()

    }),
    
    it('Create_Credit', async() => {
       await LoginPage.open()
       await LoginPage.loginAgent(LoginDataService.loginData.userName, LoginDataService.loginData.password)
//=====================اعتماد عادي بعملة الاساس =========================
        await preparationAgentCredits.agent_Credit(0,0)
//=====================اعتماد عادي بعملة غير عملة الاساس =========================
        await preparationAgentCredits.agent_Credit(1,0)
//=====================اعتماد API بعملة الاساس =========================
        await preparationAgentCredits.agent_Credit(0,1)
       await agentDashboard.logout()
    })
})