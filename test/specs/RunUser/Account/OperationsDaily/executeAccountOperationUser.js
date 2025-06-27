import { expect as expectChai } from 'chai' 
import LoginPage from '../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../pageobjects/agent/agentDashboard.js'
import componant from '../../../../pageobjects/componant/componant.js'
import preparationAccountOperationUser from './preparationAccountOperationUser.js'

var options={
   userAdmin:"admin",
   userNameError:"memoooo",
   PasswordAdmin:"Admin@2023",
  Account:"hamz",
}
describe('AccountOperation', async() => {
  
xit('tm<<مقبوضات كاملة', async() => {
        await browser.pause(2000)
        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        await preparationAccountOperationUser.AccountOperation(0,0,0,true)
        //await agentDashboard.logout()
    }),
xit('مقبوضات على عملة ثانية', async() => {

      await preparationAccountOperationUser.AccountOperation(0,0,1,false)
     
  }),
xit('AccountOperation-Receipts-شيك مصرف ', async() => {
   // await browser.pause(2000)
   // await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
   // await browser.pause(1000)
   // await UserDashboard.btnAccounts.click()
   // await browser.pause(500)
   await browser.pause(500)
   await UserDashboard.btnAccountingQueries.click()
   await UserDashboard.btnLedger.click()
   await componant.autocompleteNonWoutEnter(options.Account,UserLedger.autoAccounts,UserLedger.dropdownAccount,0,()=>{})
   const requestBalanceafter= await componant.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await UserLedger.btnSearch.click()})
const requestBalanceafteAdditionalData1 =requestBalanceafter.response.body.AdditionalData
   await UserDashboard.btnOperationsDaily.click()
   await browser.pause(500)
  await UserDashboard.btnReceipts.click()
  await UserAccountOperation.btnMovmentstab.click()
 const requestafter= await componant.getrequestbyurl('/Operation/GetDailyOperation',async function(){await UserLedger.btnSearch.click()})
 const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
 await UserAccountOperation.btnReceiptstab.click()
 await browser.pause(500)
  await componant.select(UserAccountOperation.slctTeller, 0)
  const teller=UserAccountOperation.slctTeller
  const teller_f=await teller.getValue()
  await browser.pause(500)
  await componant.select(UserAccountOperation.slctCurrency, 0) 
  const Currency=UserAccountOperation.slctCurrency
  const Currency_f=await Currency.getValue()
  await componant.select(UserAccountOperation.slctMethod, 1) 
   await browser.pause(500)
   await componant.select(UserAccountOperation.slccheckORpay, 0) 
   await browser.pause(1000)
   await UserAccountOperation.btnenter.click()
   await browser.pause(500)
   await UserAccountOperation.inptNoCheck.setValue(options.checkNum)
   await browser.pause(500)
   await UserAccountOperation.inptDraweeBank.setValue(options.DraweeBank)
   await browser.pause(500)
   await UserAccountOperation.inptBeneficiary.setValue(options.benfic)
   await browser.pause(500)
   await UserAccountOperation.inptDrawerName.setValue(options.drwer)
   await UserAccountOperation.btnOk.click()

  await componant.autocompleteNonWoutEnter(options.Account,UserAccountOperation.autoAccount,UserAccountOperation.dropdownAccount,0,()=>{})
  await browser.pause(500)
console.log("UserAccountOperation.autoAccount.getValue()",await UserAccountOperation.autoAccount.getValue())
   await componant.AddNum(options.Amount)
   await browser.pause(500)
   await UserAccountOperation.inptDiscount.setValue(options.Discount)
   const Total = UserAccountOperation.inptAmount
   const total_f = await Total.getValue()
   await browser.pause(500)
   await UserAccountOperation.btnSave.click()
   await browser.pause(500)
   await UserAccountOperation.btnOk.click()
   await browser.pause(500)
   await UserAccountOperation.btnClose.click()
   await browser.pause(500)
   await UserAccountOperation.btnMovmentstab.click()
   await browser.pause(500)
  const request= await componant.getrequestbyurl('/Operation/GetDailyOperation',async function(){await UserAccountOperation.btnSearch.click()})
  const requestAdditionalData =request.response.body.AdditionalData
  expectChai(requestAdditionalData.length).to.equal(requestAdditionalDataafter+1)
   await UserDashboard.btnAccountingQueries.click()
   await UserDashboard.btnLedger.click()
   await browser.pause(3000)

   await componant.autocompleteNonWoutEnter(options.Account,UserLedger.autoAccounts,UserLedger.dropdownAccount,0,()=>{})
   const request1 = await componant.getrequestbyurl('/AccStatements/GetAccountStatement', async function () { await UserLedger.btnSearch.click() })
                   const requestAdditionalData1 = request1.response.body.AdditionalData
                   for (let i = 0; i < requestAdditionalData1.length; ++i) {

                      if (requestAdditionalData1[i].la_Currency_name === requestAdditionalData[0].Currency_Name) {
                         await $$("#btnNotes")[i].click()
                         await browser.pause(2000)
                         expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
                         +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") +
                          +total_f.replace(/,/g, "")) - Math.abs(
                               +requestAdditionalData1[i].Credit.replace(/,/g, "") - 
                           +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
                      }
                   }
                   await UserDashboard.btnOperationsDaily.click()
   await browser.pause(500)

   //>>>>>>>>>>>>>ReadTest<<<<<<<<<<<<<<<<<<<
  await UserDashboard.btnReceipts.click()
  await UserAccountOperation.btnMovmentstab.click()
  await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()
  await browser.pause(500)
  const teller1=UserAccountOperation.slctTeller
  const teller_ff=await teller1.getValue()
  await browser.pause(500)
  const Currency1=UserAccountOperation.slctCurrency
  const Currency_ff=await Currency1.getValue()
  expectChai(total_f.replace(/,/g, "")).to.equal(options.Amount+'.00')
  expectChai(teller_f).to.equal(teller_ff)
  expectChai(Currency_f).to.equal(Currency_ff)
  await browser.pause(500)
 
   // await agentDashboard.logout()

}),
xit('AccountOperation-Receipts-مصرف دفعة', async() => {
  
   await browser.pause(500)
   await UserDashboard.btnAccountingQueries.click()
   await UserDashboard.btnLedger.click()
   await componant.autocompleteNonWoutEnter(options.Account,UserLedger.autoAccounts,UserLedger.dropdownAccount,0,()=>{})
   const requestBalanceafter= await componant.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await UserLedger.btnSearch.click()})
const requestBalanceafteAdditionalData1 =requestBalanceafter.response.body.AdditionalData
   await UserDashboard.btnOperationsDaily.click()
   await browser.pause(500)
  await UserDashboard.btnReceipts.click()
  await UserAccountOperation.btnMovmentstab.click()
 const requestafter= await componant.getrequestbyurl('/Operation/GetDailyOperation',async function(){await UserLedger.btnSearch.click()})
 const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
 await UserAccountOperation.btnReceiptstab.click()
 await browser.pause(500)
  await componant.select(UserAccountOperation.slctTeller, 0)
  const teller=UserAccountOperation.slctTeller
  const teller_f=await teller.getValue()
  await browser.pause(500)
  await componant.select(UserAccountOperation.slctCurrency, 0) 
  const Currency=UserAccountOperation.slctCurrency
  const Currency_f=await Currency.getValue()
  await componant.select(UserAccountOperation.slctMethod, 1) 
   await browser.pause(500)
   await componant.select(UserAccountOperation.slccheckORpay, 1) 
   await browser.pause(1000)
   await UserAccountOperation.btnenter.click()
   await browser.pause(500)
   await UserAccountOperation.inptNotificatNo.setValue(options.checkNum)
  
   await UserAccountOperation.btnOk.click()

  await componant.autocompleteNonWoutEnter(options.Account,UserAccountOperation.autoAccount,UserAccountOperation.dropdownAccount,0,()=>{})
  await browser.pause(500)
console.log("UserAccountOperation.autoAccount.getValue()",await UserAccountOperation.autoAccount.getValue())
   await componant.AddNum(options.Amount)
   await browser.pause(500)
   await UserAccountOperation.inptDiscount.setValue(options.Discount)
   const Total = UserAccountOperation.inptAmount
   const total_f = await Total.getValue()
   await browser.pause(500)
   await UserAccountOperation.btnSave.click()
   await browser.pause(500)
   await UserAccountOperation.btnOk.click()
   await browser.pause(500)
   await UserAccountOperation.btnClose.click()
   await browser.pause(500)
   await UserAccountOperation.btnMovmentstab.click()
   await browser.pause(500)
  const request= await componant.getrequestbyurl('/Operation/GetDailyOperation',async function(){await UserAccountOperation.btnSearch.click()})
  const requestAdditionalData =request.response.body.AdditionalData
  expectChai(requestAdditionalData.length).to.equal(requestAdditionalDataafter+1)
   await UserDashboard.btnAccountingQueries.click()
   await UserDashboard.btnLedger.click()
   await browser.pause(3000)

   await componant.autocompleteNonWoutEnter(options.Account,UserLedger.autoAccounts,UserLedger.dropdownAccount,0,()=>{})
   const request1 = await componant.getrequestbyurl('/AccStatements/GetAccountStatement', async function () { await UserLedger.btnSearch.click() })
                   const requestAdditionalData1 = request1.response.body.AdditionalData
                   for (let i = 0; i < requestAdditionalData1.length; ++i) {

                      if (requestAdditionalData1[i].la_Currency_name === requestAdditionalData[0].Currency_Name) {
                         await $$("#btnNotes")[i].click()
                         await browser.pause(2000)
                         expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
                         +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") +
                          +total_f.replace(/,/g, "")) - Math.abs(
                               +requestAdditionalData1[i].Credit.replace(/,/g, "") - 
                           +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
                      }
                   }
                   await UserDashboard.btnOperationsDaily.click()
   await browser.pause(500)

   //>>>>>>>>>>>>>ReadTest<<<<<<<<<<<<<<<<<<<
  await UserDashboard.btnReceipts.click()
  await UserAccountOperation.btnMovmentstab.click()
  await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()
  await browser.pause(500)
  const teller1=UserAccountOperation.slctTeller
  const teller_ff=await teller1.getValue()
  await browser.pause(500)
  const Currency1=UserAccountOperation.slctCurrency
  const Currency_ff=await Currency1.getValue()
  expectChai(total_f.replace(/,/g, "")).to.equal(options.Amount+'.00')
  expectChai(teller_f).to.equal(teller_ff)
  expectChai(Currency_f).to.equal(Currency_ff)
  await browser.pause(500)
 
    await agentDashboard.logout()

})
})
describe('AccountOperation', async() => {
xit('tm<<مدفوعات كاملة', async() => {
   await browser.pause(2000)
      await preparationAccountOperationUser.AccountOperation(1,0,0,true)    
     // await agentDashboard.logout()
    })
   })

    describe('AccountOperation', async() => {
xit('tm<<<ايداع بالحساب', async() => {
   await browser.pause(1000)
   //await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
   await browser.pause(1000)
   await preparationAccountOperationUser.AccountOperation(2,0,0,true)
   await browser.pause(1000)

  })
})

  describe('AccountOperation', async() => {
xit('tm<<سحب من حساب', async() => {
   await browser.pause(2000)
   await preparationAccountOperationUser.AccountOperation(3,0,0,false)
   await browser.pause(1000)
   await agentDashboard.logout()

}),
xit('امر صرف', async() => {
  
   await browser.pause(2000)
   await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
   await preparationAccountOperationUser.AccountOperation(4,0,0,false)
    await agentDashboard.logout()
 })
})

 //-----------------------تســـــــوية----------------------------
 describe('AccountOperation', async() => {
 it('tm<<<AccountOperation-adjustment-Debt-Read-Edit-lock-Unlock-print-Delete', async() => {
   await browser.pause(2000)
   await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
   await preparationAccountOperationUser.adjustment(0,1,'debt')
   await agentDashboard.logout()
 }),

 it('AccountOperation-adjustment-credit-Read-Edit-lock-Unlock-print-Delete', async() => {
   await browser.pause(2000)
 await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
   await preparationAccountOperationUser.adjustment(0,1,'credt')
   await browser.pause(1000)
    await agentDashboard.logout()
 })

})


