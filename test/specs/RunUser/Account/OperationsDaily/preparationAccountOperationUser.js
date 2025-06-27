
import { expect as expectChai } from 'chai'
import { Key } from 'webdriverio'
import appServices from "../../../../Services/appServices.js"
import cardServices from "../../../../Services/cardServices.js"
import UserDashboard from "../../../../pageobjects/user/UserDashboard.js"
import UserAccountOperation from "../../../../pageobjects/user/UserAccountOperation.js"
import UserLedger from "../../../../pageobjects/user/UserLedger.js"

class preparationAccountOperationUser {

async  AccountOperation (operationType,Teller,Curr,first){
    var options={

     Account:"hamz",
     Amount: await appServices.generateNumber(4),
      Discount:await appServices.generateNumber(2),
      commission:await appServices.generateNumber(2),
      Tax:await appServices.generateNumber(2),
      checkNum:await appServices.generateNumber(5),
      benfic:await cardServices.generateName(),
      drwer:await cardServices.generateName(),
      DraweeBank:"test"
  }
    await browser.pause(5000)
    await UserDashboard.btnAccounts.click()
    await browser.pause(500)
    await UserDashboard.btnAccountingQueries.click()
    await browser.pause(500)
    await UserDashboard.btnAccounts.click()
    await browser.pause(500)
    await UserDashboard.btnLedger.click()
    await browser.pause(500)
    await appServices.autocompleteNonWoutEnter(options.Account,UserLedger.autoAccounts,UserLedger.dropdownAccount,0,()=>{})
    const requestBalanceafter= await appServices.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await UserLedger.btnSearch.click()})
 const requestBalanceafteAdditionalData1 =requestBalanceafter.response.body.AdditionalData
 await UserDashboard.btnAccounts.click()
 await browser.pause(500)
 await UserDashboard.btnOperationsDaily.click()
    await browser.pause(500)

    switch (operationType) {
      case 0://مقبوضات
        await UserDashboard.btnReceipts.click()
        break;
      case 1://مدفوعات
      await UserDashboard.btnPayments.click()
        break;
      case 2://ايداع بالحساب
        await UserDashboard.btnPayByAccount.click()
        break;
      case 3://سحب من حساب 
      await UserDashboard.CatchfromAccount.click()
        break;
      case 4:
        await UserDashboard.Orderedtopay.click()
        break;
    }
 
   await UserAccountOperation.btnMovmentstab.click()
  const requestafter= await appServices.getrequestbyurl('/Operation/GetDailyOperation',async function(){await UserLedger.btnSearch.click()})
  const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
  await UserAccountOperation.btnReceiptstab.click()
  await browser.pause(1000)
   await appServices.select(UserAccountOperation.slctTeller, Teller)
   const teller=UserAccountOperation.slctTeller
   const teller_f=await teller.getValue()
   await browser.pause(1000)
   await appServices.select(UserAccountOperation.slctCurrency, Curr) 
   const Currency=UserAccountOperation.slctCurrency
   const Currency_f=await Currency.getValue()
    await browser.pause(1000)
   await appServices.autocompleteNonWoutEnter(options.Account,UserAccountOperation.autoAccount,UserAccountOperation.dropdownAccount,0,()=>{})
   await browser.pause(1000)
 console.log("UserAccountOperation.autoAccount.getValue()",await UserAccountOperation.autoAccount.getValue())
 if(operationType==2 || operationType==3 ){
  await browser.keys([Key.Tab])   
 }

 await appServices.AddNum(options.Amount)
    await browser.pause(500)

    switch (operationType) {
      case 0:
        await browser.keys([Key.Tab]) 
        await browser.keys([Key.Tab]) 
        await appServices.AddNum(options.Discount)
        await browser.pause(1000)
        break;
      case 1:
        await browser.keys([Key.Tab]) 
        await browser.keys([Key.Tab]) 
        await appServices.AddNum(options.Discount)
        await browser.pause(1000)
      
        break;
      case 2:
        await browser.keys([Key.Tab]) 
        await browser.pause(1000)
        await browser.keys([Key.ArrowDown]) 
        //await componant.select(UserAccountOperation.slctKindComm,1)
        await browser.pause(1000)
        await browser.keys([Key.Tab]) 
        await browser.keys([Key.Tab]) 
        await appServices.AddNum(options.commission)
        break;
      case 3://سحب من حساب 
      await browser.keys([Key.Tab]) 
      await browser.pause(1000)
      await browser.keys([Key.ArrowDown]) 
      //await componant.select(UserAccountOperation.slctKindComm,1)
      await browser.pause(1000)
      await browser.keys([Key.Tab]) 
      await browser.keys([Key.Tab]) 
      await appServices.AddNum(options.commission)
        break;
        case 4:
          await appServices.select(UserAccountOperation.slctTax,1)
          await UserAccountOperation.inptTax.setValue(options.Tax)
          break;
    }
  

    const Total = UserAccountOperation.inptTotal
    const total_f = await Total.getValue()
    await browser.pause(1000)
    await UserAccountOperation.btnSave.click()
    await browser.pause(1000)
    await UserAccountOperation.btnOk.click()
    await browser.pause(1000)
    //await UserAccountOperation.btnOk.click()
    await browser.pause(1000)
    await UserAccountOperation.btnMovmentstab.click()
    await browser.pause(1000)
   const request= await appServices.getrequestbyurl('/Operation/GetDailyOperation',async function(){await UserAccountOperation.btnSearch.click()})
   const requestAdditionalData =request.response.body.AdditionalData
   expectChai(requestAdditionalData.length).to.equal(requestAdditionalDataafter+1)

    await UserDashboard.btnAccountingQueries.click()
    await UserDashboard.btnLedger.click()
    await browser.pause(500)
    await UserDashboard.btnAccounts.click()
    await browser.pause(3000)

    await appServices.autocompleteNonWoutEnter(options.Account,UserLedger.autoAccounts,UserLedger.dropdownAccount,0,()=>{})
    const request1 = await appServices.getrequestbyurl('/AccStatements/GetAccountStatement', async function () { await UserLedger.btnSearch.click() })
                    const requestAdditionalData1 = request1.response.body.AdditionalData
                    for (let i = 0; i < requestAdditionalData1.length; ++i) {

                      if (requestAdditionalData1[i].la_Currency_name === requestAdditionalData[0].Currency_Name) {
                        await $$("#btnNotes")[i].click()
                        await browser.pause(2000)

                        switch (operationType) {
                          case 0://مقبوضات
                            expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
                              +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") +
                              +options.Amount.replace(/,/g, "")) - Math.abs(
                                +requestAdditionalData1[i].Credit.replace(/,/g, "") -
                                +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
                            break;

                          case 1://مدفوعات
                            expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
                              +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") -
                              +options.Amount.replace(/,/g, "")) - Math.abs(
                                +requestAdditionalData1[i].Credit.replace(/,/g, "") -
                                +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
                            break;
                          case 2://ايداع بالحساب
                            expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
                              +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") +
                              +options.Amount.replace(/,/g, "")) - Math.abs(
                                +requestAdditionalData1[i].Credit.replace(/,/g, "") -
                                +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
                            break;
                          case 3://سحب من حساب 
                            expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
                              +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") -
                              +options.Amount.replace(/,/g, "")) - Math.abs(
                                +requestAdditionalData1[i].Credit.replace(/,/g, "") -
                                +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
                            break;
                          case 4:
                            await UserDashboard.Orderedtopay.click()
                            break;
                        }
                      }
                    }
                 
                    await UserDashboard.btnAccounts.click()
                    await browser.pause(500)
                    await UserDashboard.btnOperationsDaily.click()
    await browser.pause(500)

    //>>>>>>>>>>>>>ReadTest<<<<<<<<<<<<<<<<<<<
    switch (operationType) {
      case 0:
        await UserDashboard.btnReceipts.click()
        break;
      case 1:
        await UserDashboard.btnPayments.click()
        break;
        case 2://ايداع بالحساب
        await UserDashboard.btnPayByAccount.click()
        break;
      case 3://سحب من حساب 
      await UserDashboard.CatchfromAccount.click()
        break;
      case 4:
        await UserDashboard.Orderedtopay.click()
        break;
    }
   await UserAccountOperation.btnMovmentstab.click()
   await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()
   await browser.pause(1000)
   const teller1=UserAccountOperation.slctTeller
   const teller_ff=await teller1.getValue()
   await browser.pause(1000)
   const Currency1=UserAccountOperation.slctCurrency
   const Currency_ff=await Currency1.getValue()

   switch (operationType) {
    case 0:
      expectChai(total_f.replace(/,/g, "")).to.equal((options.Amount-options.Discount)+'.00')
      break;
    case 1:
      expectChai(total_f.replace(/,/g, "")).to.equal((options.Amount-options.Discount)+'.00')
      break;
      case 2://ايداع بالحساب
 
      break;
    case 3://سحب من حساب 
  
      break;
    case 4:

      break;
  }
   



   expectChai(teller_f).to.equal(teller_ff)
   expectChai(Currency_f).to.equal(Currency_ff)
   await browser.pause(1000)
  
 if (first){
  //>>>>>>>>>>>>>EditTest<<<<<<<<<<<<<<<<<<<
   await UserAccountOperation.btnEdit.click()
   await browser.pause(1000)
   await UserAccountOperation.btnOk.click()
   await browser.pause(1000)
   await UserAccountOperation.btnMovmentstab.click()
   await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()
   const teller11=UserAccountOperation.slctTeller
   const teller_fff=await teller11.getValue()
   const Currency11=UserAccountOperation.slctCurrency
   const Currency_fff=await Currency11.getValue()
   switch (operationType) {
    case 0:
      expectChai(total_f.replace(/,/g, "")).to.equal((options.Amount-options.Discount)+'.00')
      break;
    case 1:
      expectChai(total_f.replace(/,/g, "")).to.equal((options.Amount - options.Discount)+'.00')
      break;
      case 2://ايداع بالحساب
 
      break;
    case 3://سحب من حساب 
  
      break;
    case 4:

      break;
  }
   


   expectChai(teller_f).to.equal(teller_fff)
   expectChai(Currency_f).to.equal(Currency_fff)
   await browser.pause(1000)


   //>>>>>>>>>>>LockTest<<<<<<<<<<<<<<<<
   await UserAccountOperation.btnLock.click()
   await browser.pause(1000)
   await UserAccountOperation.btnOk.click()
   await browser.pause(1000)
   await UserAccountOperation.btnMovmentstab.click()
   await browser.pause(1000)
   const GetCashOperationByID = await appServices.getrequestbyurl('/Operation/GetCashOperationByID', async function () {  await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
   expectChai(GetCashOperationByID.response.body.AdditionalData.Lock_Status).to.be.true

   //>>>>>>>>>>>UnLockTest<<<<<<<<<<<<<<<<
   await browser.pause(1000)
   await UserAccountOperation.btnUnLock.click()
   await browser.pause(1000)
   await UserAccountOperation.btnOk.click()
   await browser.pause(1000)
   await UserAccountOperation.btnMovmentstab.click()
   await browser.pause(1000)
   const GetCashOperationByID1 = await appServices.getrequestbyurl('/Operation/GetCashOperationByID', async function () {  await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
   expectChai(GetCashOperationByID1.response.body.AdditionalData.Lock_Status).to.be.false
   await browser.pause(1000)

    //>>>>>>>>>>>CancelTest<<<<<<<<<<<<<<<<
   await UserAccountOperation.btnCancel.click()
   await browser.pause(1000)
    await UserAccountOperation.btnOk.click()
    await browser.pause(1000)
    await UserAccountOperation.btnOk.click()
    await browser.pause(1000)
    await UserAccountOperation.btnMovmentstab.click()
   const GetCashOperationByID2 = await appServices.getrequestbyurl('/Operation/GetCashOperationByID', async function () {  await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
   expectChai(GetCashOperationByID2.response.body.AdditionalData.Cancel_Status).to.be.true

   await UserAccountOperation.btnNew.click()


   await UserAccountOperation.btnMovmentstab.click()
   await browser.pause(1000)
   const requestafterr= await appServices.getrequestbyurl('/Operation/GetDailyOperation',async function(){await UserLedger.btnSearch.click()})
   const requestAdditionalDataafterr =requestafterr.response.body.AdditionalData.length
   await UserAccountOperation.btnReceiptstab.click()
   await browser.pause(1000)
    await appServices.select(UserAccountOperation.slctTeller, Teller)
    await browser.pause(1000)
    await appServices.select(UserAccountOperation.slctCurrency, Curr) 
     await browser.pause(1000)
     await UserAccountOperation.autoAccount.click()
     await browser.pause(1000)
    await appServices.autocompleteNonWoutEnter(options.Account,UserAccountOperation.autoAccount,UserAccountOperation.dropdownAccount,0,()=>{})
    await browser.pause(1000)
  console.log("UserAccountOperation.autoAccount.getValue()",await UserAccountOperation.autoAccount.getValue())
  if(operationType==2 || operationType==3 ){
    await browser.keys([Key.Tab])   
   }
  await appServices.AddNum(options.Amount)
     await browser.pause(1000)
     switch (operationType) {
      case 0:
        await browser.keys([Key.Tab]) 
        await browser.keys([Key.Tab]) 
        await appServices.AddNum(options.Discount)
        break;
      case 1:
        await browser.keys([Key.Tab]) 
        await browser.keys([Key.Tab]) 
        await appServices.AddNum(options.Discount)
      
        break;
      case 2:
        await browser.keys([Key.Tab]) 
        await browser.keys([Key.ArrowDown]) 
        //await componant.select(UserAccountOperation.slctKindComm,1)
        await browser.pause(500)
        await browser.keys([Key.Tab]) 
        await browser.keys([Key.Tab]) 
        await appServices.AddNum(options.commission)
        break;
      case 3://سحب من حساب 
      await browser.keys([Key.Tab]) 
      await browser.keys([Key.ArrowDown]) 
      //await componant.select(UserAccountOperation.slctKindComm,1)
      await browser.pause(500)
      await browser.keys([Key.Tab]) 
      await browser.keys([Key.Tab]) 
      await browser.pause(1000)
      await appServices.AddNum(options.commission)
      break;
        case 4:
          await appServices.select(UserAccountOperation.slctTax,1)
          await UserAccountOperation.inptTax.setValue(options.Tax)
          break;
    }
  
     await browser.pause(1000)
     await UserAccountOperation.btnSave.click()
     await browser.pause(1000)
     await UserAccountOperation.btnOk.click()
    //  await browser.pause(500)
    //  await UserAccountOperation.btnOk.click()
     await browser.pause(1000)
     await UserAccountOperation.btnMovmentstab.click()
     await browser.pause(1000)
    const requestt= await appServices.getrequestbyurl('/Operation/GetDailyOperation',async function(){await UserAccountOperation.btnSearch.click()})
    const requestAdditionalDataa =requestt.response.body.AdditionalData
    expectChai(requestAdditionalDataa.length).to.equal(requestAdditionalDataafterr+1)
    await browser.pause(1000)
         await UserDashboard.btnOperationsDaily.click()
     await browser.pause(1000)
     switch (operationType) {
      case 0:
        await UserDashboard.btnReceipts.click()
        break;
      case 1:
        await UserDashboard.btnPayments.click()
        break;
        case 2://ايداع بالحساب
        await UserDashboard.btnPayByAccount.click()
        break;
      case 3://سحب من حساب 
      await UserDashboard.CatchfromAccount.click()
        break;
      case 4:
        await UserDashboard.Orderedtopay.click()
        break;
    }
    await UserAccountOperation.btnMovmentstab.click()
    await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()
    await browser.pause(1000)
  await UserAccountOperation.btnPrint.click()
  switch (operationType) {
    case 0:
      await browser.waitUntil(async function () {return ((await UserAccountOperation.spinner.isDisplayed())==false)},
      { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
      await browser.switchWindow('/AccOperations/CashOperations/Receive/0');
      await browser.pause(500)
      break;
    case 1:
      await browser.waitUntil(async function () {return ((await UserAccountOperation.spinner.isDisplayed())==false)},
           { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
          await browser.switchWindow('/AccOperations/CashOperations/Payment/0');
          await browser.pause(500)
      break;
    case 2:
           await browser.waitUntil(async function () {return ((await UserAccountOperation.spinner.isDisplayed())==false)},
         { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
         await browser.switchWindow('/AccOperations/CashOperations/Deposit/0');
        await browser.pause(500)
      break;
    case 3://سحب من حساب 
    await browser.waitUntil(async function () {return ((await UserAccountOperation.spinner.isDisplayed())==false)},
    { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
    await browser.switchWindow('/AccOperations/CashOperations/Withdraw/0');
      break;
    case 4:
      await browser.waitUntil(async function () {return ((await UserAccountOperation.spinner.isDisplayed())==false)},
     { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
     await browser.switchWindow('/AccOperations/CashOperations/CashOrder/0');
      break;
  }
   
      await UserAccountOperation.btnDelete.click()
      await browser.pause(1000)
     await UserAccountOperation.btnOk.click()
     await browser.pause(1000)
     await UserAccountOperation.btnOk.click()
     await browser.pause(1000)
      await UserAccountOperation.btnMovmentstab.click()
     await browser.pause(1000)
    const request11= await appServices.getrequestbyurl('/Operation/GetDailyOperation',async function(){await UserAccountOperation.btnSearch.click()})
    const request11AdditionalData =request11.response.body.AdditionalData.length
    expectChai(request11AdditionalData).to.equal(requestAdditionalDataa.length -1 )
    await browser.pause(1000)
    await browser.pause(1000)
  
  }
  await UserDashboard.btnAccounts.click()
   } 

   async adjustment (curruncy1,curruncy2,operationType){
    var options={
      Account:"hamz",
      Amount: await appServices.generateNumber(4),
       Discount:await appServices.generateNumber(2),
       commission:await appServices.generateNumber(2),
       Tax:await appServices.generateNumber(2),
       checkNum:await appServices.generateNumber(5),
       benfic:await cardServices.generateName(),
       drwer:await cardServices.generateName(),
       DraweeBank:"test"
   }
    await browser.pause(1000)
    await UserDashboard.btnAccounts.click()
    await browser.pause(500)
    await UserDashboard.btnAccountingQueries.click()
    await browser.pause(500)
    await UserDashboard.btnAccounts.click()
    await browser.pause(500)
    await UserDashboard.btnLedger.click()
    await browser.pause(500)
    await appServices.autocompleteNonWoutEnter(options.Account,UserLedger.autoAccounts,UserLedger.dropdownAccount,0,()=>{})
    const requestBalanceafter= await appServices.getrequestbyurl('/AccStatements/GetAccountStatement',async function(){await UserLedger.btnSearch.click()})
 const requestBalanceafteAdditionalData1 =requestBalanceafter.response.body.AdditionalData
 await UserDashboard.btnAccounts.click()
 await browser.pause(500)
    await UserDashboard.btnOperationsDaily.click()
    await browser.pause(500)
   await UserDashboard.Adjustment.click()
   await browser.pause(500)
   await UserAccountOperation.btnMovmentstab.click()
  const requestafter= await appServices.getrequestbyurl('/Adjustment/GetAdjustments',async function(){await UserLedger.btnSearch.click()})
  const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
  await UserAccountOperation.btnAdjustmenttab.click()
  await browser.pause(500)

  switch (operationType) {
    case 'debt':
    await UserAccountOperation.radioDebt.click()
      break;
    case 'credt':
    await UserAccountOperation.radioCredit.click()
      break;
  }
 


 
 await appServices.select(UserAccountOperation.slctCurrency, curruncy1) 
 const Currency=UserAccountOperation.slctCurrency
   const Currency_f=await Currency.getValue()
 await appServices.autocompleteNonWoutEnter(options.Account,UserAccountOperation.DebtAcc,UserAccountOperation.dropdownAccount,0,()=>{})
 await browser.pause(500)
 await browser.keys([Key.Tab]) 
 await browser.pause(1000)
 await browser.keys([Key.Ctrl, 'a'])
 await browser.pause(500)
 await appServices.AddNum(options.Amount)
 await browser.pause(500)
 await appServices.select(UserAccountOperation.slctCurrency1, curruncy2) 
 await browser.pause(500)
 const Currency2=UserAccountOperation.slctCurrency1
   const Currency_2=await Currency2.getValue()
 await browser.pause(500)
 await appServices.autocompleteNonWoutEnter(options.Account,UserAccountOperation.autoAccount,UserAccountOperation.dropdownAccount1,0,()=>{})
 
  const amount = await UserAccountOperation.inptAmount
  const amount_f=await amount.getValue()
    await browser.pause(500)
    await UserAccountOperation.btnSave.click()
    await browser.pause(500)
    await UserAccountOperation.btnClose.click()
    await browser.pause(500)
    await UserAccountOperation.btnMovmentstab.click()
    await browser.pause(500)
   const request= await appServices.getrequestbyurl('/Adjustment/GetAdjustments',async function(){await UserAccountOperation.btnSearch.click()})
   const requestAdditionalData =request.response.body.AdditionalData
   expectChai(requestAdditionalData.length).to.equal(requestAdditionalDataafter+1)

   await browser.pause(500)
  // await UserDashboard.btnAccounts.click()
   await browser.pause(2000)
    await UserDashboard.btnAccountingQueries.click()
    await UserDashboard.btnLedger.click()
    await browser.pause(3000)
    await appServices.autocompleteNonWoutEnter(options.Account,UserLedger.autoAccounts,UserLedger.dropdownAccount,0,()=>{})
    const request1 = await appServices.getrequestbyurl('/AccStatements/GetAccountStatement', async function () { await UserLedger.btnSearch.click() })
                    const requestAdditionalData1 = request1.response.body.AdditionalData
                    for (let i = 0; i < requestAdditionalData1.length; ++i) {
 
                       if (requestAdditionalData1[i].la_Currency_name === requestAdditionalData[0].Currency_1) {
                          await $$("#btnNotes")[i].click()
                          await browser.pause(2000)
                          switch (operationType) {
                            case 'debt'://مدين
                            expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
                            +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") +
                             +amount_f.replace(/,/g, "")) - Math.abs(
                                  +requestAdditionalData1[i].Credit.replace(/,/g, "") - 
                              +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
                              break;
  
                            case 'credt'://دائن
                            expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
                            +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") -
                             +amount_f.replace(/,/g, "")) -Math.abs(
                                  +requestAdditionalData1[i].Credit.replace(/,/g, "") - 
                              +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
                              break;

                          }

                       }
                    }
                    await UserDashboard.btnOperationsDaily.click()
    await browser.pause(500)
 
    //>>>>>>>>>>>>>ReadTest<<<<<<<<<<<<<<<<<<<
   await UserDashboard.Adjustment.click()
   await UserAccountOperation.btnMovmentstab.click()
   await UserAccountOperation.btnSearch.click()
   await browser.pause(500)
   await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()
   await browser.pause(2000)
   const Currency1=UserAccountOperation.slctCurrency
   const Currency_ff=await Currency1.getValue()
   const Currency22=UserAccountOperation.slctCurrency1
   const Currency_22=await Currency22.getValue()
   console.log('Currency_f',Currency_f)
   console.log('Currency_ff',Currency_ff)
   console.log('Currency_2',Currency_2)
   console.log('Currency_22',Currency_22)
   await browser.pause(500)
    expectChai(amount_f.replace(/,/g, "")).to.equal(options.Amount+'.00')
    expectChai(Currency_f).to.equal(Currency_ff)
    expectChai(Currency_2).to.equal(Currency_22)
    await browser.pause(500)
  
 
  //>>>>>>>>>>>>>EditTest<<<<<<<<<<<<<<<<<<<
   await UserAccountOperation.btnEdit.click()
   await browser.pause(500)
   await UserAccountOperation.btnClose.click()
   await UserAccountOperation.btnMovmentstab.click()
   await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()
   const Currency11=UserAccountOperation.slctCurrency
   const Currency_fff=await Currency11.getValue()
 
   const Currency33=UserAccountOperation.slctCurrency1
   const Currency_33=await Currency33.getValue()
 
    expectChai(amount_f.replace(/,/g, "")).to.equal(options.Amount+'.00')
 
    expectChai(Currency_ff).to.equal(Currency_fff)
 
    expectChai(Currency_22).to.equal(Currency_33)
 
    await browser.pause(500)
 
 
   //>>>>>>>>>>>LockTest<<<<<<<<<<<<<<<<
   await UserAccountOperation.btnLock.click()
   await browser.pause(500)
   await UserAccountOperation.btnClose.click()
   await UserAccountOperation.btnMovmentstab.click()
   const GetCashOperationByID = await appServices.getrequestbyurl('/Adjustment/GetAdjustByID', async function () {await UserLedger.btnSearch.click();  await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
   expectChai(GetCashOperationByID.response.body.AdditionalData.Lock_Status).to.be.true
 
   //>>>>>>>>>>>UnLockTest<<<<<<<<<<<<<<<<
   await UserAccountOperation.btnUnLock.click()
   await browser.pause(500)
   await UserAccountOperation.btnClose.click()
   await UserAccountOperation.btnMovmentstab.click()
   const GetCashOperationByID1 = await appServices.getrequestbyurl('/Adjustment/GetAdjustByID', async function () {await UserLedger.btnSearch.click();  await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
   expectChai(GetCashOperationByID1.response.body.AdditionalData.Lock_Status).to.be.false
 
    //>>>>>>>>>>>CancelTest<<<<<<<<<<<<<<<<
   await UserAccountOperation.btnCancel.click()
   await browser.pause(500)
    await UserAccountOperation.btnOk.click()
    await browser.pause(500)
    await UserAccountOperation.btnClose.click()
    await browser.pause(500)
    await UserAccountOperation.btnMovmentstab.click()
    await browser.pause(500)
   const GetCashOperationByID2 = await appServices.getrequestbyurl('/Adjustment/GetAdjustByID', async function () {await UserLedger.btnSearch.click();  await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
   expectChai(GetCashOperationByID2.response.body.AdditionalData.Cancel_Status).to.be.true
 
    await UserAccountOperation.btnNew.click()
 
    await UserAccountOperation.btnMovmentstab.click()
    const requestafter1= await appServices.getrequestbyurl('/Adjustment/GetAdjustments',async function(){await UserLedger.btnSearch.click()})
    const requestAdditionalDataafter1 =requestafter1.response.body.AdditionalData.length
    await UserAccountOperation.btnAdjustmenttab.click()
    await browser.pause(500)

    switch (operationType) {
      case 'debt':
      await UserAccountOperation.radioDebt.click()
        break;
      case 'credt':
      await UserAccountOperation.radioCredit.click()
        break;
    }
   
   await appServices.select(UserAccountOperation.slctCurrency, 0) 
   await appServices.autocompleteNonWoutEnter(options.Account,UserAccountOperation.DebtAcc,UserAccountOperation.dropdownAccount,0,()=>{})
   await browser.pause(500)
   await browser.keys([Key.Tab]) 
   await browser.pause(1000)
   await browser.keys([Key.Ctrl, 'a'])
   await appServices.AddNum(options.Amount)
   await browser.pause(500)
   await appServices.select(UserAccountOperation.slctCurrency1, 1) 
   await browser.pause(500)
  
   await browser.pause(500)
   await appServices.autocompleteNonWoutEnter(options.Account,UserAccountOperation.autoAccount,UserAccountOperation.dropdownAccount1,0,()=>{})
   
   
      await browser.pause(500)
      await UserAccountOperation.btnSave.click()
      await browser.pause(500)
      await UserAccountOperation.btnClose.click()
      await browser.pause(500)
      await UserAccountOperation.btnMovmentstab.click()
      await browser.pause(500)
     const requestt= await appServices.getrequestbyurl('/Adjustment/GetAdjustments',async function(){await UserAccountOperation.btnSearch.click()})
     const requestAdditionalDatat =requestt.response.body.AdditionalData
     expectChai(requestAdditionalDatat.length).to.equal(requestAdditionalDataafter1+1)
 
     await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()
 
    await browser.pause(500)
  await UserAccountOperation.btnPrint.click()
    await browser.waitUntil(async function () {return ((await UserAccountOperation.spinner.isDisplayed())==false)},
      { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
      await browser.switchWindow('/AccOperations/Adjustment/0');
      await browser.pause(500)
 
      await UserAccountOperation.btnDelete.click()
      await browser.pause(500)
     await UserAccountOperation.btnOk.click()
     await browser.pause(500)
     await UserAccountOperation.btnClose.click()
     await browser.pause(500)
      await UserAccountOperation.btnMovmentstab.click()
     await browser.pause(500)
    const request11= await appServices.getrequestbyurl('/Adjustment/GetAdjustments',async function(){await UserAccountOperation.btnSearch.click()})
    const request11AdditionalData =request11.response.body.AdditionalData.length
    expectChai(request11AdditionalData).to.equal(requestAdditionalDatat.length -1 )
    await browser.pause(1000)
  
     //await agentDashboard.logout()
   }

  }
export default new preparationAccountOperationUser();