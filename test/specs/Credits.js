import { expect as expectChai } from 'chai'
import LoginPage from '../pageobjects/login.page.js'
import agentDashboard from '../pageobjects/agent/agentDashboard.js'
import AgentCredit from '../pageobjects/agent/AgentCredit.js'
import AgentBalances from '../pageobjects/agent/AgentBalances.js'
import loginPage from '../pageobjects/login.page.js'
import componant from '../pageobjects/componant/componant.js'
import { Key } from 'webdriverio'


describe('Login-Agent', async() => {
    var options={
        userName:"ضياء4",
        password:"Admin@2022",
        Note:"TestTestTest",
        Amount:"90",
        Account:"شرك"
    }
    const Userpass=await componant.generatePassword()

    it('Check Credits permission', async() => {
        await browser.pause(500)
        await LoginPage.open()
       // await browser.setupInterceptor();
       await browser.pause(1000)
        await LoginPage.loginAgent(options.userName, options.password)
        await browser.pause(5000)
        expectChai(await AgentCredit.btnCredits.isDisplayed()).to.be.true
        await browser.pause(1000)
       await agentDashboard.logout()

    }),
    
    it('Create_Credit_internal_in_primary_curr_with_print', async() => {
        await browser.pause(500)
       await LoginPage.open()
       await browser.pause(1000)
        await LoginPage.loginAgent(options.userName, options.password)
         await browser.pause(1000)
     await AgentBalances.btnBalances.click()
     const requestBalanceafter= await componant.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await AgentCredit.btnSearch.click()})
     const requestBalanceafteAdditionalData1 =requestBalanceafter.response.body.AdditionalData
    console.log('requestBalanceafter',requestBalanceafteAdditionalData1)
    await browser.pause(500)
        expectChai(await AgentCredit.btnCredits.isDisplayed()).to.be.true
        await browser.pause(500)
        await AgentCredit.btnCredits.click()
        await browser.pause(500)
        expectChai(await AgentCredit.btnCreditApproval.isDisplayed()).to.be.true
        await browser.pause(500)
        await AgentCredit.btnCreditApproval.click()
        await browser.pause(500)
        await AgentCredit.CridetTab.click()
       await AgentCredit.radioOutward.click()
      const requestafter= await componant.getrequestbyurl('/Adjustment/GetAgentAdjustments',async function(){await AgentCredit.btnSearch.click()})
      const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
      await browser.pause(500)
      await AgentCredit.CridetApprovalTab.click()
      await browser.pause(1000)
        await componant.select(AgentCredit.selectID0Currnce,0)
        await browser.pause(500)
        await componant.select(AgentCredit.selectID1Dest,0)
        await browser.pause(500)
        await componant.autocompleteNonWoutEnter(options.Account,AgentCredit.AutocompleteAcc2,AgentCredit.dropdownAccount,0)
        await browser.pause(2000)
        await componant.AddNum(options.Amount)
        await browser.keys([Key.Tab])
        await browser.pause(3000)
        await AgentCredit.inptNote.setValue(options.Note)
        await browser.pause(3000)
        await browser.keys([Key.Tab])
        await browser.pause(500)
        const Commission =await AgentCredit.inptCommission
        await browser.pause(3000)
        const Total=AgentCredit.inptTotal
        const total_f=await Total.getValue()
        await browser.pause(3000)
        expectChai(parseFloat(options.Amount) + parseFloat(await Commission.getValue())).to.equal(parseFloat(await Total.getValue()))
           await browser.pause(500)
        await AgentCredit.btnSave.click()
         await browser.pause(1000)
         await AgentCredit.btnPrint.click()
        await browser.pause(500)
        await AgentCredit.btnOk.click()
         await browser.pause(500)
         await browser.disableInterceptor()
        await browser.setupInterceptor()
        await AgentCredit.btnOk.click()
     await browser.pause(1000)
      await browser.waitUntil(async function () {return ((await AgentCredit.spinner.isDisplayed())==false)},
       { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
       await browser.switchWindow('/Credit/CreditTransfer');
       await browser.pause(500)
       await AgentCredit.CridetTab.click()
       await browser.pause(500)
       await AgentCredit.radioOutward.click()
       await browser.pause(500)
      const request= await componant.getrequestbyurl('/Adjustment/GetAgentAdjustments',async function(){await AgentCredit.btnSearch.click()})
      const requestAdditionalData =request.response.body.AdditionalData
      expectChai(requestAdditionalData.length).to.equal(requestAdditionalDataafter+1)
      expectChai(requestAdditionalData[requestAdditionalData.length-1].AdjustValue).to.equal(parseInt(options.Amount))
      await browser.pause(1000)
       await agentDashboard.btnReturn.click()
       await browser.pause(500)
        await AgentBalances.btnBalances.click()
      const request1= await componant.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await AgentCredit.btnSearch.click()})
      const requestAdditionalData1 =request1.response.body.AdditionalData
       for (let i=0; i<requestAdditionalData1.length-1;){

         if(requestAdditionalData1[i].la_Currency_name===requestAdditionalData[requestAdditionalData.length-1].Currency_1){

                 await $$("#btnNotes")[i].click()
                 await browser.pause(2000)
                //console.log("lolololololol",total_f)  
                //console.log('requestBalanceafter',+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "")- +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, ""))
                //console.log('requestBalancebefore',+requestAdditionalData1[i].Credit.replace(/,/g, "")- +requestAdditionalData1[i].Debt.replace(/,/g, ""))
                expectChai(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "")- +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") - +total_f.replace(/,/g, "")).to.equal(+requestAdditionalData1[i].Credit.replace(/,/g, "")- +requestAdditionalData1[i].Debt.replace(/,/g, "")) 
                i = requestAdditionalData1.length-1 
         }else{
            console.log("fofoffofo")
            i++

         }
       }

        await browser.pause(1000)
       await agentDashboard.logout()

    }),
    
    it('Create_Credit_internal_in_second_curr_with_print', async() => {
      await browser.pause(500)
     await LoginPage.open()
     await browser.pause(1000)
      await LoginPage.loginAgent(options.userName, options.password)
       await browser.pause(1000)
   await AgentBalances.btnBalances.click()
   const requestBalanceafter= await componant.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await AgentCredit.btnSearch.click()})
   const requestBalanceafteAdditionalData1 =requestBalanceafter.response.body.AdditionalData
  console.log('requestBalanceafter',requestBalanceafteAdditionalData1)
  await browser.pause(500)
      expectChai(await AgentCredit.btnCredits.isDisplayed()).to.be.true
      await browser.pause(500)
      await AgentCredit.btnCredits.click()
      await browser.pause(500)
      expectChai(await AgentCredit.btnCreditApproval.isDisplayed()).to.be.true
      await browser.pause(500)
      await AgentCredit.btnCreditApproval.click()
      await browser.pause(500)
      await AgentCredit.CridetTab.click()
     await AgentCredit.radioOutward.click()
    const requestafter= await componant.getrequestbyurl('/Adjustment/GetAgentAdjustments',async function(){await AgentCredit.btnSearch.click()})
    const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
    await browser.pause(500)
    await AgentCredit.CridetApprovalTab.click()
    await browser.pause(1000)
      await componant.select(AgentCredit.selectID0Currnce,1)
      await browser.pause(500)
      await componant.select(AgentCredit.selectID1Dest,0)
      await browser.pause(500)
      await componant.autocompleteNonWoutEnter(options.Account,AgentCredit.AutocompleteAcc2,AgentCredit.dropdownAccount,0)
      await browser.pause(2000)
      await componant.AddNum(options.Amount)
      await browser.keys([Key.Tab])
      await browser.pause(3000)
      await AgentCredit.inptNote.setValue(options.Note)
      await browser.pause(3000)
      await browser.keys([Key.Tab])
      await browser.pause(500)
      const Commission =await AgentCredit.inptCommission
      await browser.pause(3000)
      const Total=AgentCredit.inptTotal
      const total_f=await Total.getValue()
      await browser.pause(3000)
      expectChai(parseFloat(options.Amount) + parseFloat(await Commission.getValue())).to.equal(parseFloat(await Total.getValue()))
         await browser.pause(500)
      await AgentCredit.btnSave.click()
       await browser.pause(1000)
       await AgentCredit.btnPrint.click()
      await browser.pause(500)
      await AgentCredit.btnOk.click()
       await browser.pause(500)
       await browser.disableInterceptor()
      await browser.setupInterceptor()
      await AgentCredit.btnOk.click()
   await browser.pause(1000)
    await browser.waitUntil(async function () {return ((await AgentCredit.spinner.isDisplayed())==false)},
     { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
     await browser.switchWindow('/Credit/CreditTransfer');
     await browser.pause(500)
     await AgentCredit.CridetTab.click()
     await browser.pause(500)
     await AgentCredit.radioOutward.click()
     await browser.pause(500)
    const request= await componant.getrequestbyurl('/Adjustment/GetAgentAdjustments',async function(){await AgentCredit.btnSearch.click()})
    const requestAdditionalData =request.response.body.AdditionalData
    expectChai(requestAdditionalData.length).to.equal(requestAdditionalDataafter+1)
    expectChai(requestAdditionalData[requestAdditionalData.length-1].AdjustValue).to.equal(parseInt(options.Amount))
    await browser.pause(1000)
     await agentDashboard.btnReturn.click()
     await browser.pause(500)
      await AgentBalances.btnBalances.click()
    const request1= await componant.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await AgentCredit.btnSearch.click()})
    const requestAdditionalData1 =request1.response.body.AdditionalData
     for (let i=0; i<requestAdditionalData1.length-1;){

       if(requestAdditionalData1[i].la_Currency_name===requestAdditionalData[requestAdditionalData.length-1].Currency_1){

               await $$("#btnNotes")[i].click()
               await browser.pause(2000)
              //console.log("lolololololol",total_f)  
              //console.log('requestBalanceafter',+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "")- +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, ""))
              //console.log('requestBalancebefore',+requestAdditionalData1[i].Credit.replace(/,/g, "")- +requestAdditionalData1[i].Debt.replace(/,/g, ""))
              expectChai(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "")- +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") - +total_f.replace(/,/g, "")).to.equal(+requestAdditionalData1[i].Credit.replace(/,/g, "")- +requestAdditionalData1[i].Debt.replace(/,/g, "")) 
              i = requestAdditionalData1.length-1 
       }else{
          console.log("fofoffofo")
          i++

       }
     }

      await browser.pause(1000)
     await agentDashboard.logout()

  }),
  it('Create_Credit_API_in_primary_curr_with_print', async() => {
    await browser.pause(500)
   await LoginPage.open()
   await browser.pause(1000)
    await LoginPage.loginAgent(options.userName, options.password)
     await browser.pause(1000)
 await AgentBalances.btnBalances.click()
 const requestBalanceafter= await componant.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await AgentCredit.btnSearch.click()})
 const requestBalanceafteAdditionalData1 =requestBalanceafter.response.body.AdditionalData
console.log('requestBalanceafter',requestBalanceafteAdditionalData1)
await browser.pause(500)
    expectChai(await AgentCredit.btnCredits.isDisplayed()).to.be.true
    await browser.pause(500)
    await AgentCredit.btnCredits.click()
    await browser.pause(500)
    expectChai(await AgentCredit.btnCreditApproval.isDisplayed()).to.be.true
    await browser.pause(500)
    await AgentCredit.btnCreditApproval.click()
    await browser.pause(500)
    await AgentCredit.CridetTab.click()
   await AgentCredit.radioOutward.click()
  const requestafter= await componant.getrequestbyurl('/Adjustment/GetAgentAdjustments',async function(){await AgentCredit.btnSearch.click()})
  const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
  await browser.pause(500)
  await AgentCredit.CridetApprovalTab.click()
  await browser.pause(1000)
    await componant.select(AgentCredit.selectID0Currnce,0)
    await browser.pause(500)
    await componant.select(AgentCredit.selectID1Dest,1)
    await browser.pause(500)
    await componant.autocompleteNonWoutEnter(options.Account,AgentCredit.AutocompleteAcc2,AgentCredit.dropdownAccount,0)
    await browser.pause(2000)
    await componant.AddNum(options.Amount)
    await browser.keys([Key.Tab])
    await browser.pause(3000)
    await AgentCredit.inptNote.setValue(options.Note)
    await browser.pause(3000)
    await browser.keys([Key.Tab])
    await browser.pause(500)
    const Commission =await AgentCredit.inptCommission
    await browser.pause(3000)
    const Total=AgentCredit.inptTotal
    const total_f=await Total.getValue()
    await browser.pause(3000)
    expectChai(parseFloat(options.Amount) + parseFloat(await Commission.getValue())).to.equal(parseFloat(await Total.getValue()))
       await browser.pause(500)
    await AgentCredit.btnSave.click()
     await browser.pause(1000)
     await AgentCredit.btnPrint.click()
    await browser.pause(500)
    await AgentCredit.btnOk.click()
     await browser.pause(500)
     await browser.disableInterceptor()
    await browser.setupInterceptor()
    await AgentCredit.btnOk.click()
 await browser.pause(1000)
  await browser.waitUntil(async function () {return ((await AgentCredit.spinner.isDisplayed())==false)},
   { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
   await browser.switchWindow('/Credit/CreditTransfer');
   await browser.pause(500)
   await AgentCredit.CridetTab.click()
   await browser.pause(500)
   await AgentCredit.radioOutward.click()
   await browser.pause(500)
  const request= await componant.getrequestbyurl('/Adjustment/GetAgentAdjustments',async function(){await AgentCredit.btnSearch.click()})
  const requestAdditionalData =request.response.body.AdditionalData
  expectChai(requestAdditionalData.length).to.equal(requestAdditionalDataafter+1)
  expectChai(requestAdditionalData[requestAdditionalData.length-1].AdjustValue).to.equal(parseInt(options.Amount))
  await browser.pause(1000)
   await agentDashboard.btnReturn.click()
   await browser.pause(500)
    await AgentBalances.btnBalances.click()
  const request1= await componant.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await AgentCredit.btnSearch.click()})
  const requestAdditionalData1 =request1.response.body.AdditionalData
   for (let i=0; i<requestAdditionalData1.length-1;){

     if(requestAdditionalData1[i].la_Currency_name===requestAdditionalData[requestAdditionalData.length-1].Currency_1){

             await $$("#btnNotes")[i].click()
             await browser.pause(2000)
           // console.log("lolololololol",total_f)  
            //console.log('requestBalanceafter',+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "")- +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, ""))
            //console.log('requestBalancebefore',+requestAdditionalData1[i].Credit.replace(/,/g, "")- +requestAdditionalData1[i].Debt.replace(/,/g, ""))
            expectChai(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "")- +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") - +total_f.replace(/,/g, "")).to.equal(+requestAdditionalData1[i].Credit.replace(/,/g, "")- +requestAdditionalData1[i].Debt.replace(/,/g, "")) 
            i = requestAdditionalData1.length-1 
     }else{
        console.log("fofoffofo")
        i++

     }
   }

    await browser.pause(1000)
   await agentDashboard.logout()

})

})