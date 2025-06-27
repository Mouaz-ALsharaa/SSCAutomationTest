import { expect as expectChai } from 'chai'
import { Key } from 'webdriverio'
import appServices from '../../../../../Services/appServices.js'

import UserRemittanceOperation from '../../../../../pageobjects/user/UserRemittanceOperation.js'
import cardServices from '../../../../../Services/cardServices.js'
import fileServices from '../../../../../Services/fileServices.js'


class preparationIncomingRemittanceUser
{
    
    async InComRem(TransferDelivery,CurDelivery,senderName,benficName,prposfile,firstTime){
    var options={
     Account:"hamz",
     Amount: await appServices.generateNumber(4),
      Relation: "BROTH",
      Country: "iraq",
      City: "bagh",
      agent:"all age",
      branch:"بغد"

  }
    await UserRemittanceOperation.btnMovementstab.click()
    const requestafter1= await appServices.getrequestbyurl('/Remittance/GetRecRemGrid',async function(){await UserRemittanceOperation.btnSearch.click()})
    const requestAdditionalDataafter1 =requestafter1.response.body.AdditionalData.length
    await UserRemittanceOperation.btnIncomingRemittancetab.click()
    await appServices.select(UserRemittanceOperation.slctTransferDelivery, TransferDelivery)
    await browser.pause(500)
    if (TransferDelivery==1){

      await browser.pause(500)
      await UserRemittanceOperation.autoCountryDestination.click()
      await browser.pause(500)
      await appServices.autocompleteNonWoutEnter(options.Country, UserRemittanceOperation.autoCountryDestination, UserRemittanceOperation.dropdownCountryDestination, 0,()=>{})
          await browser.pause(1000)
         await appServices.select(UserRemittanceOperation.slctDestiCity, 1)
         await browser.pause(1000)
         await UserRemittanceOperation.autoAgent.click()
         await browser.pause(500)   
         await appServices.autocompleteNonWoutEnter(options.agent, UserRemittanceOperation.autoAgent, UserRemittanceOperation.dropdownAgent, 0,()=>{})

    }
    else{
    await appServices.autocompleteNonWoutEnter(options.branch,UserRemittanceOperation.autoBranch,UserRemittanceOperation.dropdownAccount,1,()=>{})
      //await appServices.select(UserRemittanceOperation.slctBranch, 1)

    }



    await browser.pause(500)

     await appServices.select(UserRemittanceOperation.slctCurDelivery, CurDelivery)
     await browser.pause(2000)
     await UserRemittanceOperation.curAmountDelivery.click()
     await browser.keys([Key.Ctrl, 'a'])
     await browser.pause(1000)
     await appServices.AddNum(options.Amount)
     await browser.pause(500)
     await browser.keys([Key.Tab])
     await browser.pause(500)
     await UserRemittanceOperation.autoAccount.click()
     await browser.pause(500)
     await appServices.autocompleteNonWoutEnter(options.Account,UserRemittanceOperation.autoAccount,UserRemittanceOperation.dropdownAccount,0,()=>{})

    await browser.pause(500)
  // await componant.autocompleteNonWoutEnter(options.Country,UserRemittanceOperation.autoCountrySource,UserRemittanceOperation.dropdownCountrySource,0,()=>{})

  // await browser.pause(500)
  // await componant.select(UserRemittanceOperation.slctCity, 1)
if(firstTime){


await cardServices.fillSmailCard(senderName,true)
await browser.pause(1000)
await cardServices.fillSmailCard(benficName)
}
else {
    
await cardServices.selectCard(UserRemittanceOperation.autoSenderName,senderName)
await browser.pause(1000)
await cardServices.selectCard(UserRemittanceOperation.autoBeneficiaryName,benficName)
await browser.pause(2000)
}


       await appServices.autocompleteNonWoutEnter(options.Relation, UserRemittanceOperation.autoRelationshipSenderBenefıcary, UserRemittanceOperation.dropdownRelationshipSenderBenefıcary, 0,()=>{})

      let RemmitUID1 =""

     if (firstTime){
      await browser.pause(500)
               await UserRemittanceOperation.btnSave.click()
              await browser.pause(1000)
     }

     else{
     const requestsave1= await appServices.getrequestbyurl('/Remittance/SaveRemRec',async function(){ await UserRemittanceOperation.btnSave.click()})
     const requestsaveSuccess1 =requestsave1.response.body.Success
      RemmitUID1 =requestsave1.response.body.AdditionalData
     expectChai(requestsaveSuccess1).to.be.true
    await browser.pause(1000)
     }
       await browser.pause(1000)

       await UserRemittanceOperation.btnClose0.click()
       await UserRemittanceOperation.btnMovementstab.click()
       const request1= await appServices.getrequestbyurl('/Remittance/GetRecRemGrid',async function(){await UserRemittanceOperation.btnSearch.click()})
       const requestAdditionalData1 =request1.response.body.AdditionalData
       expectChai(requestAdditionalData1.length).to.equal(requestAdditionalDataafter1+1)
       await browser.pause(1000)
 //================================Read============================================================
 await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()
 await browser.pause(1000)

 const requestApprove= await appServices.getrequestbyurl('/Statments/ApproveRem',async function(){await browser.pause(500);await UserRemittanceOperation.btnApprove.click()})
 const requestApproveAdditionalData =requestApprove.response.body.Success
 expectChai(requestApproveAdditionalData).to.be.true

 await UserRemittanceOperation.btnOk.click()
 if(!firstTime){
  await fileServices.writePropInFile('IncomingRemit.json',prposfile,RemmitUID1)
}

 if(firstTime){

  await browser.pause(1000)

//     //================================PRINT============================================================
      const requestprint= await appServices.getrequestbyurl('/Remittance/RemRecPrint',async function(){
        await UserRemittanceOperation.btnPrint.click();
        await browser.waitUntil(async function () {return ((await UserRemittanceOperation.spinner.isDisplayed())==false)},
         { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
         await browser.switchWindow('/RemOperations/RemittIn/0');
     })
       const requestprintAdditionalData =requestprint.response.body.Success
       expectChai(requestprintAdditionalData).to.be.true

//     //==========================PrintKyc===============================================================

    //    const requestprintKyc= await appServices.getrequestbyurl('/Statments/PrintKYC',async function(){
    //       await UserRemittanceOperation.btnKYC.click();
    //       await browser.waitUntil(async function () {return ((await UserRemittanceOperation.spinner.isDisplayed())==false)},
    //        { timeout: 500000, timeoutMsg: 'expected text to be different after 500s' })
    //        await browser.switchWindow('/RemOperations/RemittRec/0');
    //    })
    //      const requestprintKycAdditionalData =requestprintKyc.response.body.Success
    //      expectChai(requestprintKycAdditionalData).to.be.true
     

//    //===============================lock=================================================================
      const requestlock= await appServices.getrequestbyurl('/Remittance/LockRemittArriv',async function(){await UserRemittanceOperation.btnLock.click(),  await UserRemittanceOperation.btnOk.click()})
       const requestlockAdditionalData =requestlock.response.body.Success
       expectChai(requestlockAdditionalData).to.be.true
       await UserRemittanceOperation.btnOk.click()
       await browser.pause(500)
       await UserRemittanceOperation.btnMovementstab.click()
       await browser.pause(1000)
       const requestreadlock= await appServices.getrequestbyurl('/Remittance/GetRemittByID',async function(){await UserRemittanceOperation.btnSearch.click(), await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
       const requestreadlockAdditionalData =requestreadlock.response.body.AdditionalData.Lock_Status
       expectChai(requestreadlockAdditionalData).to.be.true
//  //===================================Unlock=============================================================
       const requestUnLock= await appServices.getrequestbyurl('/Remittance/UnLockRemittArriv',async function(){await UserRemittanceOperation.btnUnLock.click(),  await UserRemittanceOperation.btnOk.click()})
       const requestUnLockAdditionalData =requestUnLock.response.body.Success
       expectChai(requestUnLockAdditionalData).to.be.true
       await UserRemittanceOperation.btnOk.click()
       await browser.pause(500)
       await UserRemittanceOperation.btnMovementstab.click()
       await browser.pause(1000)

       const requestreadUnlock= await appServices.getrequestbyurl('/Remittance/GetRemittByID',async function(){await UserRemittanceOperation.btnSearch.click(), await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
       const requestreadUnlockAdditionalData =requestreadUnlock.response.body.AdditionalData.Lock_Status
       expectChai(requestreadUnlockAdditionalData).to.be.false
      await browser.pause(500)
//  //=====================================Cancel=============================================
      const requestCancel= await appServices.getrequestbyurl('/Remittance/CancelRemRec',async function(){await UserRemittanceOperation.btnCancel.click(),  await UserRemittanceOperation.btnOk.click()})
      const requestCancelAdditionalData =requestCancel.response.body.Success
      expectChai(requestCancelAdditionalData).to.be.true
      await UserRemittanceOperation.btnOk.click()
      await UserRemittanceOperation.btnMovementstab.click()
       await browser.pause(1000)
       const requestreadCancel= await appServices.getrequestbyurl('/Remittance/GetRemittByID',async function(){await UserRemittanceOperation.btnSearch.click(), await $("table tbody tr:nth-child(1) td:nth-last-child(1)").click()})
       const requestreadCancelAdditionalData =requestreadCancel.response.body.AdditionalData.Cancel_Status
       expectChai(requestreadCancelAdditionalData).to.be.true

       await browser.pause(1000)


 }

 await UserRemittanceOperation.btnNew.click()



  }
}
export default new preparationIncomingRemittanceUser();
