import { expect as expectChai } from 'chai'
import { Key } from 'webdriverio'
import componant from '../../pageobjects/componant/componant.js'
import UserRemittanceOperation from '../../pageobjects/user/UserRemittanceOperation.js'

class Operations{
    async PayRem (prpos,fildRequerdAdd,first,fileName){
if(!fileName)
fileName='dataUSER.json'
        var options={
            ImgPath: "/SSCTFS/SSC_DEV/SSCAutomationTest/test/Images/01.JPG"
        }
      const file= await componant.readfile(fileName)
      await UserRemittanceOperation.btnMovementstab.click()
      const requestafter= await componant.getrequestbyurl('/Remittance/GetPayRemGrid',async function(){await UserRemittanceOperation.btnSearch.click()})
        const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
      await UserRemittanceOperation.btnPaymentCashtab.click()
      await UserRemittanceOperation.radioGeneralNumber.click()
      await browser.pause(1000)
      await UserRemittanceOperation.inptPaySearch.setValue(file.UIDs[prpos])
      await browser.pause(1000)
      const requestSearchRemIN= await componant.getrequestbyurl('/Remittance/RemPaySearchAll',async function(){await browser.keys([Key.Enter])})
      const reqSearchRemADIN =requestSearchRemIN.response.body.AdditionalData
      expectChai(reqSearchRemADIN).to.be.not.empty
      const requestOpenRemIN= await componant.getrequestbyurl('/Remittance/RemPaySearch',async function(){ await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
      const reqOpenRemSucessIN =requestOpenRemIN.response.body.Success
      expectChai(reqOpenRemSucessIN).to.be.true
      await browser.pause(500)
      if(fildRequerdAdd){
        await UserRemittanceOperation.IconOpenCard.click()
        await componant.fillLargeCard(fildRequerdAdd,true)
            await browser.pause(1000)
      }
if (first){
      await componant.AddImage(options.ImgPath, UserRemittanceOperation.imgUploadInput) 
    }
      await UserRemittanceOperation.btnSave.click()
      await browser.pause(1000)
      await UserRemittanceOperation.btnOk.click()
      await browser.pause(1000)

        if (prpos == "NUID"|| prpos == "NUIDIN") {

            await UserRemittanceOperation.btnOk.click()
            await browser.pause(1000)
        }

      await UserRemittanceOperation.btnClose.click()
      await UserRemittanceOperation.btnMovementstab.click()
        const request= await componant.getrequestbyurl('/Remittance/GetPayRemGrid',async function(){await UserRemittanceOperation.btnSearch.click()})
        const requestAdditionalData =request.response.body.AdditionalData
        expectChai(requestAdditionalData.length).to.equal(requestAdditionalDataafter+1)
    }
    async RecRem (deliveryMethod,sendername,benficname,CurDelivery,prposfile,option,firstTime){
      var options={
        Relation: "BROTH"
    }


      await UserRemittanceOperation.btnMovementstab.click()
      const requestafter1= await componant.getrequestbyurl('/Remittance/GetRecRemGrid',async function(){await UserRemittanceOperation.btnSearch.click()})
      const requestAdditionalDataafter1 =requestafter1.response.body.AdditionalData.length
      await UserRemittanceOperation.btnRemittanceSendtab.click()
      await componant.select(UserRemittanceOperation.slctTeller, 0)
      await componant.select(UserRemittanceOperation.slctTransferDelivery, deliveryMethod)
  if (firstTime){
    await UserRemittanceOperation.autoSenderName.setValue(sendername)
    await browser.keys([Key.Enter])
    await browser.pause(2000)
    await UserRemittanceOperation.btnClose.click()
    await browser.pause(1000)
    await browser.keys([Key.Enter])
    await browser.pause(2000)
    await UserRemittanceOperation.PhoneNuminternal.setValue(await componant.generateNumber(10))
     await componant.fillLargeCard(firstTime)
     await browser.pause(2000)
    await componant.fillSmailCard(benficname)
    await browser.pause(2000)
    if(option.UIDs.option.IsCentralBank==1){
      await browser.pause(2000)
      await browser.keys([Key.Escape])
 }

  }
else{
      await componant.selectCard(UserRemittanceOperation.autoSenderName,sendername)
      await browser.pause(1000)
      await componant.selectCard(UserRemittanceOperation.autoBeneficiaryName,benficname)
      if(option.UIDs.option.IsCentralBank==1){
        await browser.pause(2000)
        await $("//tbody/tr[1]/td[4]/button[1]").click()
   }
      await browser.pause(2000)
    }
   
        
      await componant.autocompleteNonWoutEnter(options.Relation, UserRemittanceOperation.autoRelationshipSenderBenefıcary, UserRemittanceOperation.dropdownRelationshipSenderBenefıcary, 0,()=>{})
      await browser.pause(2000)
       await componant.select(UserRemittanceOperation.slctCurDelivery, CurDelivery)
       await browser.pause(2000)
       await UserRemittanceOperation.curAmountDelivery.click()
       await browser.keys([Key.Ctrl, 'a'])
       await browser.pause(2000)
       await componant.AddNum(await componant.generateNumber(4))
       await browser.pause(500)
       await browser.keys([Key.Tab])
       await browser.pause(500)
       let RemmitUID1 =""

       if (firstTime){
        await browser.pause(500)
                 await UserRemittanceOperation.btnSave.click()
                await browser.pause(1000)
       }

       else{
        const requestsave= await componant.getrequestbyurl('/Remittance/SaveRemRec',async function(){ await UserRemittanceOperation.btnSave.click(); await browser.pause(1000);})
       const requestsaveCarryOnData =requestsave.response.body.CarryOnData[0].WarningExeption
       console.log("requestsaveCarryOnData",requestsaveCarryOnData)
       expectChai(requestsaveCarryOnData).to.be.equal(840)
       const requestsave1= await componant.getrequestbyurl('/Remittance/SaveRemRec',async function(){await UserRemittanceOperation.btnOk.click()})
       const requestsaveSuccess1 =requestsave1.response.body.Success
        RemmitUID1 =requestsave1.response.body.AdditionalData
       expectChai(requestsaveSuccess1).to.be.true
      await browser.pause(1000)
       }
      if(option.UIDs.option.ShowMsg_Confirm==1){
        await browser.pause(2000)
      await UserRemittanceOperation.btnConfirm.click()
      await browser.pause(1000)
      await UserRemittanceOperation.btnOk.click()
   }
      await browser.pause(1000)
      await UserRemittanceOperation.btnClose0.click()
      await UserRemittanceOperation.btnMovementstab.click()
      const request1= await componant.getrequestbyurl('/Remittance/GetRecRemGrid',async function(){await UserRemittanceOperation.btnSearch.click()})
      const requestAdditionalData1 =request1.response.body.AdditionalData
      expectChai(requestAdditionalData1.length).to.equal(requestAdditionalDataafter1+1)

      await browser.pause(1000)
 //================================Read============================================================
      await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()
     await browser.pause(1000)
//==================================Approve==========================================================

const requestApprove1= await componant.getrequestbyurl('/Statments/ApproveRem',async function(){await browser.pause(500);await UserRemittanceOperation.btnApprove.click(), await UserRemittanceOperation.btnOk.click()})
const requestApproveAdditionalData1 =requestApprove1.response.body.Success
expectChai(requestApproveAdditionalData1).to.be.true
await browser.pause(1000)

if(!firstTime){
  await componant.writePropInFile('dataUSER.json',prposfile,RemmitUID1)
}
  //================================PRINT====================================
if(firstTime){
  const requestprint= await componant.getrequestbyurl('/Remittance/RemRecPrint',async function(){
    await UserRemittanceOperation.btnPrint.click();
    await browser.waitUntil(async function () {return ((await UserRemittanceOperation.spinner.isDisplayed())==false)},
     { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
     await browser.switchWindow('/RemOperations/RemittRec/0');
 })
   const requestprintAdditionalData =requestprint.response.body.Success
   expectChai(requestprintAdditionalData).to.be.true
   //==========================PrintKyc===============================================================

      // const requestprintKyc= await componant.getrequestbyurl('/Statments/PrintKYC',async function(){
      //    await UserRemittanceOperation.btnKYC.click();
      //    await browser.waitUntil(async function () {return ((await UserRemittanceOperation.spinner.isDisplayed())==false)},
      //     { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
      //     await browser.switchWindow('/RemOperations/RemittRec/0');
      // })
      //   const requestprintKycAdditionalData =requestprintKyc.response.body.Success
      //   expectChai(requestprintKycAdditionalData).to.be.true


   //===============================lock=================================================================
   const requestlock= await componant.getrequestbyurl('/Remittance/LockRemittArriv',async function(){await UserRemittanceOperation.btnLock.click(),  await UserRemittanceOperation.btnOk.click()})
   const requestlockAdditionalData =requestlock.response.body.Success
   expectChai(requestlockAdditionalData).to.be.true
   await UserRemittanceOperation.btnOk.click()
   await browser.pause(500)
   await UserRemittanceOperation.btnMovementstab.click()
   await browser.pause(1000)
   const requestreadlock= await componant.getrequestbyurl('/Remittance/GetRemittByID',async function(){await UserRemittanceOperation.btnSearch.click(), await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
   const requestreadlockAdditionalData =requestreadlock.response.body.AdditionalData.Lock_Status
   expectChai(requestreadlockAdditionalData).to.be.true
//===================================Unlock=============================================================
   const requestUnLock= await componant.getrequestbyurl('/Remittance/UnLockRemittArriv',async function(){await UserRemittanceOperation.btnUnLock.click(),  await UserRemittanceOperation.btnOk.click()})
   const requestUnLockAdditionalData =requestUnLock.response.body.Success
   expectChai(requestUnLockAdditionalData).to.be.true
   await UserRemittanceOperation.btnOk.click()
   await browser.pause(500)
   await UserRemittanceOperation.btnMovementstab.click()
   await browser.pause(1000)
   const requestreadUnlock= await componant.getrequestbyurl('/Remittance/GetRemittByID',async function(){await UserRemittanceOperation.btnSearch.click(), await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
   const requestreadUnlockAdditionalData =requestreadUnlock.response.body.AdditionalData.Lock_Status
   expectChai(requestreadUnlockAdditionalData).to.be.false
  await browser.pause(500)
//=====================================Cancel=============================================
  const requestCancel= await componant.getrequestbyurl('/Remittance/CancelRemRec',async function(){await UserRemittanceOperation.btnCancel.click(),  await UserRemittanceOperation.btnOk.click()})
  const requestCancelAdditionalData =requestCancel.response.body.Success
  expectChai(requestCancelAdditionalData).to.be.true
  await UserRemittanceOperation.btnOk.click()
  await UserRemittanceOperation.btnMovementstab.click()
   await browser.pause(1000)
   const requestreadCancel= await componant.getrequestbyurl('/Remittance/GetRemittByID',async function(){await UserRemittanceOperation.btnSearch.click(), await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
   const requestreadCancelAdditionalData =requestreadCancel.response.body.AdditionalData.Cancel_Status
   expectChai(requestreadCancelAdditionalData).to.be.true
   await browser.pause(1000)

}

await UserRemittanceOperation.btnNew.click()

    } 
   
    async InComRem(TransferDelivery,CurDelivery,senderName,benficName,prposfile,firstTime){
      var options={
       Account:"hamz",
       Amount: await componant.generateNumber(4),
        Relation: "BROTH",
        Country: "iraq",
        City: "bagh",
        agent:"all age"
    }
      await UserRemittanceOperation.btnMovementstab.click()
      const requestafter1= await componant.getrequestbyurl('/Remittance/GetRecRemGrid',async function(){await UserRemittanceOperation.btnSearch.click()})
      const requestAdditionalDataafter1 =requestafter1.response.body.AdditionalData.length
      await UserRemittanceOperation.btnIncomingRemittancetab.click()
      await componant.select(UserRemittanceOperation.slctTransferDelivery, TransferDelivery)
      await browser.pause(500)
      if (TransferDelivery==1){

        await browser.pause(500)
        await UserRemittanceOperation.autoCountryDestination.click()
        await browser.pause(500)
        await componant.autocompleteNonWoutEnter(options.Country, UserRemittanceOperation.autoCountryDestination, UserRemittanceOperation.dropdownCountryDestination, 0,()=>{})
            await browser.pause(1000)
           await componant.select(UserRemittanceOperation.slctDestiCity, 0)
           await browser.pause(1000)
           await UserRemittanceOperation.autoAgent.click()
           await browser.pause(500)
           await componant.autocompleteNonWoutEnter(options.agent, UserRemittanceOperation.autoAgent, UserRemittanceOperation.dropdownAgent, 0,()=>{})

      }
      else{
        await componant.select(UserRemittanceOperation.slctBranch, 1)
      }

 

      await browser.pause(500)

       await componant.select(UserRemittanceOperation.slctCurDelivery, CurDelivery)
       await browser.pause(2000)
       await UserRemittanceOperation.curAmountDelivery.click()
       await browser.keys([Key.Ctrl, 'a'])
       await browser.pause(1000)
       await componant.AddNum(options.Amount)
       await browser.pause(500)
       await browser.keys([Key.Tab])
       await browser.pause(500)
       await componant.autocompleteNonWoutEnter(options.Account,UserRemittanceOperation.autoAccount,UserRemittanceOperation.dropdownAccount,0,()=>{})

      await browser.pause(500)
    // await componant.autocompleteNonWoutEnter(options.Country,UserRemittanceOperation.autoCountrySource,UserRemittanceOperation.dropdownCountrySource,0,()=>{})

    // await browser.pause(500)
    // await componant.select(UserRemittanceOperation.slctCity, 1)
if(firstTime){

  
  await componant.fillSmailCard(senderName,true)
  await browser.pause(1000)
  await componant.fillSmailCard(benficName)
}
else {
      
  await componant.selectCard(UserRemittanceOperation.autoSenderName,senderName)
  await browser.pause(1000)
  await componant.selectCard(UserRemittanceOperation.autoBeneficiaryName,benficName)
  await browser.pause(2000)
}


         await componant.autocompleteNonWoutEnter(options.Relation, UserRemittanceOperation.autoRelationshipSenderBenefıcary, UserRemittanceOperation.dropdownRelationshipSenderBenefıcary, 0,()=>{})

        let RemmitUID1 =""

       if (firstTime){
        await browser.pause(500)
                 await UserRemittanceOperation.btnSave.click()
                await browser.pause(1000)
       }

       else{
       const requestsave1= await componant.getrequestbyurl('/Remittance/SaveRemRec',async function(){ await UserRemittanceOperation.btnSave.click()})
       const requestsaveSuccess1 =requestsave1.response.body.Success
        RemmitUID1 =requestsave1.response.body.AdditionalData
       expectChai(requestsaveSuccess1).to.be.true
      await browser.pause(1000)
       }
         await browser.pause(1000)

         await UserRemittanceOperation.btnClose0.click()
         await UserRemittanceOperation.btnMovementstab.click()
         const request1= await componant.getrequestbyurl('/Remittance/GetRecRemGrid',async function(){await UserRemittanceOperation.btnSearch.click()})
         const requestAdditionalData1 =request1.response.body.AdditionalData
         expectChai(requestAdditionalData1.length).to.equal(requestAdditionalDataafter1+1)
         await browser.pause(1000)
   //================================Read============================================================
   await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()
   await browser.pause(1000)

   const requestApprove= await componant.getrequestbyurl('/Statments/ApproveRem',async function(){await browser.pause(500);await UserRemittanceOperation.btnApprove.click()})
   const requestApproveAdditionalData =requestApprove.response.body.Success
   expectChai(requestApproveAdditionalData).to.be.true

   await UserRemittanceOperation.btnOk.click()
   if(!firstTime){
    await componant.writePropInFile('IncomingRemit.json',prposfile,RemmitUID1)
  }

   if(firstTime){

    await browser.pause(1000)
 
//     //================================PRINT============================================================
        const requestprint= await componant.getrequestbyurl('/Remittance/RemRecPrint',async function(){
          await UserRemittanceOperation.btnPrint.click();
          await browser.waitUntil(async function () {return ((await UserRemittanceOperation.spinner.isDisplayed())==false)},
           { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
           await browser.switchWindow('/RemOperations/RemittIn/0');
       })
         const requestprintAdditionalData =requestprint.response.body.Success
         expectChai(requestprintAdditionalData).to.be.true
 
//     //==========================PrintKyc===============================================================
 
//        // const requestprintKyc= await componant.getrequestbyurl('/Statments/PrintKYC',async function(){
//        //    await UserRemittanceOperation.btnKYC.click();
//        //    await browser.waitUntil(async function () {return ((await UserRemittanceOperation.spinner.isDisplayed())==false)},
//        //     { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
//        //     await browser.switchWindow('/RemOperations/RemittRec/0');
//        // })
//        //   const requestprintKycAdditionalData =requestprintKyc.response.body.Success
//        //   expectChai(requestprintKycAdditionalData).to.be.true
       
 
//    //===============================lock=================================================================
        const requestlock= await componant.getrequestbyurl('/Remittance/LockRemittArriv',async function(){await UserRemittanceOperation.btnLock.click(),  await UserRemittanceOperation.btnOk.click()})
         const requestlockAdditionalData =requestlock.response.body.Success
         expectChai(requestlockAdditionalData).to.be.true
         await UserRemittanceOperation.btnOk.click()
         await browser.pause(500)
         await UserRemittanceOperation.btnMovementstab.click()
         await browser.pause(1000)
         const requestreadlock= await componant.getrequestbyurl('/Remittance/GetRemittByID',async function(){await UserRemittanceOperation.btnSearch.click(), await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
         const requestreadlockAdditionalData =requestreadlock.response.body.AdditionalData.Lock_Status
         expectChai(requestreadlockAdditionalData).to.be.true
//  //===================================Unlock=============================================================
         const requestUnLock= await componant.getrequestbyurl('/Remittance/UnLockRemittArriv',async function(){await UserRemittanceOperation.btnUnLock.click(),  await UserRemittanceOperation.btnOk.click()})
         const requestUnLockAdditionalData =requestUnLock.response.body.Success
         expectChai(requestUnLockAdditionalData).to.be.true
         await UserRemittanceOperation.btnOk.click()
         await browser.pause(500)
         await UserRemittanceOperation.btnMovementstab.click()
         await browser.pause(1000)
 
         const requestreadUnlock= await componant.getrequestbyurl('/Remittance/GetRemittByID',async function(){await UserRemittanceOperation.btnSearch.click(), await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
         const requestreadUnlockAdditionalData =requestreadUnlock.response.body.AdditionalData.Lock_Status
         expectChai(requestreadUnlockAdditionalData).to.be.false
        await browser.pause(500)
//  //=====================================Cancel=============================================
        const requestCancel= await componant.getrequestbyurl('/Remittance/CancelRemRec',async function(){await UserRemittanceOperation.btnCancel.click(),  await UserRemittanceOperation.btnOk.click()})
        const requestCancelAdditionalData =requestCancel.response.body.Success
        expectChai(requestCancelAdditionalData).to.be.true
        await UserRemittanceOperation.btnOk.click()
        await UserRemittanceOperation.btnMovementstab.click()
         await browser.pause(1000)
         const requestreadCancel= await componant.getrequestbyurl('/Remittance/GetRemittByID',async function(){await UserRemittanceOperation.btnSearch.click(), await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
         const requestreadCancelAdditionalData =requestreadCancel.response.body.AdditionalData.Cancel_Status
         expectChai(requestreadCancelAdditionalData).to.be.true
 
         await browser.pause(1000)


   }

   await UserRemittanceOperation.btnNew.click()



    }
    async RemOutward (prpos,fileName){

      if(!fileName)
      fileName='IncomingRemit.json'
              var options={
                  ImgPath: "/SSCTFS/SSC_DEV/SSCAutomationTest/test/Images/01.JPG",
                  Account:"hamz"
              }
            const file= await componant.readfile(fileName)
            await UserRemittanceOperation.btnMovementstab.click()
            const requestafter= await componant.getrequestbyurl('/Remittance/GetAllRemGrid',async function(){await UserRemittanceOperation.btnSearch.click()})
              const requestAdditionalDataafter =requestafter.response.body.AdditionalData.length
            await UserRemittanceOperation.btnRemOutwardtab.click()
            await UserRemittanceOperation.radioGeneralNumber.click()
            await browser.pause(1000)
            await UserRemittanceOperation.inptPaySearch.setValue(file.UIDs[prpos])
            await browser.pause(1000)
            const requestSearchRemIN= await componant.getrequestbyurl('/Remittance/RemPaySearchAll',async function(){await browser.keys([Key.Enter])})
            const reqSearchRemADIN =requestSearchRemIN.response.body.AdditionalData
            expectChai(reqSearchRemADIN).to.be.not.empty
            const requestOpenRemIN= await componant.getrequestbyurl('/Remittance/RemPaySearch',async function(){ await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
            const reqOpenRemSucessIN =requestOpenRemIN.response.body.Success
            expectChai(reqOpenRemSucessIN).to.be.true
            await browser.pause(500)
            await componant.AddImage(options.ImgPath, UserRemittanceOperation.imgUploadInput) 
            await browser.pause(500)
            await componant.autocompleteNonWoutEnter(options.Account,UserRemittanceOperation.autoAccount,UserRemittanceOperation.dropdownAccount,0,()=>{})
            await browser.pause(1000)
            await browser.keys([Key.Tab]) 
            await browser.pause(2000)
            await UserRemittanceOperation.btnSave.click()
            await browser.pause(1000)

            await UserRemittanceOperation.btnClose.click()
            await UserRemittanceOperation.btnMovementstab.click()
              const request= await componant.getrequestbyurl('/Remittance/GetAllRemGrid',async function(){await UserRemittanceOperation.btnSearch.click()})
              const requestAdditionalData =request.response.body.AdditionalData
              expectChai(requestAdditionalData.length).to.equal(requestAdditionalDataafter+1)
    }
  }
  export default new Operations();