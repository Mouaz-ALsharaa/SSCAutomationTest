import { expect as expectChai } from 'chai'
import { Key } from 'webdriverio'
import appServices from '../../../Services/appServices.js'
import AgentBalances from '../../../pageobjects/agent/AgentBalances.js'
import AgentCredit from '../../../pageobjects/agent/AgentCredit.js'
import agentDashboard from '../../../pageobjects/agent/agentDashboard.js'

class preparationAgentCredits {

    async agent_Credit (currancyId,destKind){
        var options={
          userName:"ضياء3",
          password:"Admin@2022",
          Note:"TestTestTest",
          Amount:await appServices.generateNumber(3),
          Account:"شرك",
      }
     
         await AgentBalances.btnBalances.click()
         const requestBalanceafter= await appServices.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await AgentCredit.btnSearch.click()})
         const requestBalanceafteAdditionalData1 =requestBalanceafter.response.body.AdditionalData
            expectChai(await AgentCredit.btnCredits.isDisplayed()).to.be.true
            await AgentCredit.btnCredits.click()
            expectChai(await AgentCredit.btnCreditApproval.isDisplayed()).to.be.true
            await AgentCredit.btnCreditApproval.click()
            await AgentCredit.CridetTab.click()
           await AgentCredit.radioOutward.click()
          const requestafter= await appServices.getrequestbyurl('/Adjustment/GetAgentAdjustments',async function(){await AgentCredit.btnSearch.click()})
          const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
          await AgentCredit.CridetApprovalTab.click()
            await appServices.select(AgentCredit.selectID0Currnce,currancyId)    
            await appServices.select(AgentCredit.selectID1Dest,destKind) 
            await appServices.autocompleteNonWoutEnter(options.Account,AgentCredit.AutocompleteAcc2,AgentCredit.dropdownAccount,0,()=>{})
            await appServices.AddNum(options.Amount)
            await browser.keys([Key.Tab])
            await AgentCredit.inptNote.setValue(options.Note)
            await browser.keys([Key.Tab])
            const Commission =await AgentCredit.inptCommission
            const Total=AgentCredit.inptTotal
            const total_f=await Total.getValue()
            expectChai(parseFloat(options.Amount) + parseFloat(await Commission.getValue())).to.equal(parseFloat(await Total.getValue()))
            await AgentCredit.btnSave.click()         
             await AgentCredit.btnOk.click()    
             await AgentCredit.btnPrint.click()  
             await AgentCredit.btnOk.click()
               await browser.waitUntil(async function () {return ((await AgentCredit.spinner.isDisplayed())==false)},
                 { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
                 await browser.switchWindow('/Credit/CreditTransfer');
           await AgentCredit.CridetTab.click()
           await AgentCredit.radioOutward.click()
          const request= await appServices.getrequestbyurl('/Adjustment/GetAgentAdjustments',async function(){await AgentCredit.btnSearch.click()})
          const requestAdditionalData =request.response.body.AdditionalData
          expectChai(requestAdditionalData.length).to.equal(requestAdditionalDataafter+1)
          expectChai(requestAdditionalData[requestAdditionalData.length-1].AdjustValue).to.equal(options.Amount+'.00')
           await agentDashboard.btnReturn.click()
            await AgentBalances.btnBalances.click()
          const request1= await appServices.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await AgentCredit.btnSearch.click()})
          const requestAdditionalData1 =request1.response.body.AdditionalData
           for (let i=0; i<requestAdditionalData1.length-1;){
             if(requestAdditionalData1[i].la_Currency_name===requestAdditionalData[requestAdditionalData.length-1].Currency_1){
                     await $$("#btnNotes")[i].click()
                    expectChai(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "")- +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") - +total_f.replace(/,/g, "")).to.equal(+requestAdditionalData1[i].Credit.replace(/,/g, "")- +requestAdditionalData1[i].Debt.replace(/,/g, "")) 
                    i = requestAdditionalData1.length-1 
             }else{
                i++
             }
           }
    
           await $("#btnHome").click()
     
    
      }

}

export default new preparationAgentCredits();