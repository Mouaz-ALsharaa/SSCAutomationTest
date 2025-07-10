import agentDashboard from '../pageobjects/agent/agentDashboard.js'
import LoginPage from '../pageobjects/login.page.js'
import AgentRemittances from '../pageobjects/agent/AgentRemittances.js'
import AgentRemBlack from '../pageobjects/agent/AgentRemBlack.js'
import componant from '../pageobjects/componant/componant.js'
import AgentCredit from '../pageobjects/agent/AgentCredit.js'
import { Key } from 'webdriverio'

describe('SendRemAgent', async() => {

    var options={
        userName:"ضياء4",
        password:"Admin@2022",
        Note:"TestTestTest",
        Amount:await componant.generateNumber(4),
        CommAmount:"10",
        Country:"Ira",
        Country1:"syr",
        City:"Baghdad",
        Sendername:await componant.generateName(),
        Benficname:await componant.generateName(),
        Nationality:"Ira",
        OtherAddress:"OtherAddressTest",
        PlaceOfBirth:"PlaceOfBirthTest",
        Day:await componant.generateNumber(2),
        Month:"10",
        Yearold:"1988",
        YearNew:"2025",
        IdentificationNumber:await componant.generateNumber(11),
        mother:"TestMother",
        IssuedFrom:"IssuedFromTest",
        MonthlyIncome:await componant.generateNumber(4),
        WorkStatement:"WorkStatementTest",
        HousingCardNo:await componant.generateNumber(4),
        HousingIssuer:"HousingIssuerTest",
        AsylumIdentityNo:await componant.generateNumber(4),
        AsylumIssuer:"AsylumIssuerTest",
        Relation:"bro",
        NoteReason:"NoteReasonTest",
        BankName:"test",
        accountNum:await componant.generateNumber(14),
        ImgPath:"/SSC_TFS_NEW/SSC_DEV/SSCAutomationTest/test/Images/01.JPG"
    }

    it('SendRemAgentSucess', async() => {
        await LoginPage.open()
             await browser.pause(1000)
          const LogIn= await componant.getrequestbyurl('/Login/LogIn',async function(){await LoginPage.loginAgent(options.userName, options.password)})
          const RemOption =LogIn.response.body.AdditionalData.Options.RemOption
          const centralBank=LogIn.response.body.AdditionalData.Options.IsCentralBank
          if ( (centralBank ==1) || (centralBank ==0 && RemOption==0)){
 describe('SendRemAgenttt', async() => {
    it('Check Credits permission', async() => {
        await browser.pause(500)
        const fildRequerd= await componant.getrequestbyurl('/Service/GetCardRequirement',async function(){await agentDashboard.btnRemittances.click();})
        const fildRequerdAdd=fildRequerd.response.body.AdditionalData
        await browser.pause(1000)
        await AgentRemittances.btnSendTransfer.click();
         await componant.select(AgentRemittances.selectRemKind,0)
         await componant.autocompleteNonWoutEnter(options.Country,AgentRemittances.autoCountry0,AgentRemittances.dropdownCountry0,0)
          await componant.autocompleteNonWoutEnter(options.City,AgentRemittances.autoCity,AgentRemittances.dropdownCity,0)
          await $("table tbody tr:nth-child(2)").click()
          await componant.select(AgentRemittances.selectDelvCurr,0)
          await AgentRemittances.curAmountDelivery.click();
          await browser.keys([Key.Ctrl, 'a'])
          await componant.AddNum(options.Amount)
          await componant.select(AgentRemittances.selectRecCurr,0)
          await componant.select(AgentRemittances.selectCommCurr,0)
          await AgentRemittances.inptCommission0.click();
          await browser.keys([Key.Ctrl, 'a'])
          await componant.AddNum(options.CommAmount)
          await AgentRemittances.btnNextfirst.click();
          await componant.autocompleteWithEnter(options.Sendername,AgentRemittances.autoSenderName,AgentRemittances.dropdownSenderName,0)
          await AgentRemittances.autoNationalitySender.click();
         await componant.autocompleteNonWoutEnter(options.Nationality,AgentRemittances.autoNationalitySender,AgentRemittances.dropdownNationalitySender,0)
          await AgentRemittances.SenderPhone.setValue(await componant.generateNumber(9))
            await componant.autocompleteNonWoutEnter(options.Country,AgentRemittances.CountryAddressDetailsSender,AgentRemittances.dropdownCountry1,0)
            await componant.select(AgentRemittances.CityAddressDetailSender,1)
            await browser.pause(500)
            await componant.select(AgentRemittances.AreaAddressDetailsSender,1)
             await AgentRemittances.OtherAddressDetailsSender.setValue(options.OtherAddress)
             if(fildRequerdAdd[1].Show==true){//تاريخ الولادة
                await componant.SetDate(AgentRemittances.dateBirthdayDate,options.Day,options.Month,options.Yearold)
             }
             if(fildRequerdAdd[2].Show==true){//مكان الولادة
                await AgentRemittances.inptPlaceOfBirth.setValue(options.PlaceOfBirth)
             }
             if(fildRequerdAdd[3].Show==true){//نوع التعريف
                await componant.select(AgentRemittances.selectIdentityKind,0)
             }
             if(fildRequerdAdd[4].Show==true){//رقم التعريف
                await AgentRemittances.inptIdentificationNumber.setValue(options.IdentificationNumber)
             }
             if(fildRequerdAdd[5].Show==true){//اسم الام
                await AgentRemittances.inptMotherName.setValue(options.mother)
             }
             if(fildRequerdAdd[6].Show==true){//تاريخ الاصدار
                await componant.SetDate(AgentRemittances.dateDateIssue,options.Day,options.Month,options.Yearold)
             }
             if(fildRequerdAdd[7].Show==true){//مكان الاصدار
                await AgentRemittances.inptIssuedFrom.setValue(options.IssuedFrom)
             }
             if(fildRequerdAdd[8].Show==true){//تاريخ انتهاء الصلاحية 
                await componant.SetDate(AgentRemittances.dateExpirationDate,options.Day,options.Month,options.YearNew)
             }
             if(fildRequerdAdd[9].Show==true){// مصدر الدخل
                await componant.select(AgentRemittances.selectSourceOfIncome,0)
             }
             if(fildRequerdAdd[10].Show==true){// الدخل الشهري
                await AgentRemittances.inptMonthlyIncome.setValue(options.MonthlyIncome)
             }
             if(fildRequerdAdd[11].Show==true){// عملة الدخل الشهري
                await componant.select(AgentRemittances.selectSourceOfIncomeCurr,0)
             }
             if(fildRequerdAdd[12].Show==true){//  العمل 
                await componant.select(AgentRemittances.selectWork,2)
             }
             if(fildRequerdAdd[13].Show==true){//  بيان العمل
                await AgentRemittances.inptWorkStatement.setValue(options.WorkStatement)
             }
             if(fildRequerdAdd[14].Show==true){// رقم بطاقة السكن
                await AgentRemittances.inptHousingCardNo.setValue(options.HousingCardNo)
             }
             if(fildRequerdAdd[15].Show==true){// تاريخ اصدار بطاقة السكن
                await componant.SetDate(AgentRemittances.dateDataIssuedHousing,options.Day,options.Month,options.YearNew)
             }
             if(fildRequerdAdd[16].Show==true){// جهة اصدار بطاقة السكن
                await AgentRemittances.inptHousingIssuer.setValue(options.HousingIssuer)
             }
             if(fildRequerdAdd[17].Show==true){// رقم بطاقة اللجوء
                await AgentRemittances.inptAsylumIdentityNo.setValue(options.AsylumIdentityNo)
             }
             if(fildRequerdAdd[18].Show==true){// تاريخ بطاقة اللجوء
                await componant.SetDate(AgentRemittances.dateDataIssuedAsylum,options.Day,options.Month,options.YearNew)
             }
             if(fildRequerdAdd[19].Show==true){// جهة اصدار بطاقة اللجوء
                await AgentRemittances.inptAsylumIssuer.setValue(options.AsylumIssuer)
             }
             await componant.autocompleteWithEnter(options.Benficname,AgentRemittances.autoBeneficiaryName,AgentRemittances.dropdownBeneficiaryName,0)
             await browser.pause(500)
            await AgentRemittances.autoNationalityBenfic.click();
            await browser.pause(500)
         await componant.autocompleteNonWoutEnter(options.Nationality,AgentRemittances.autoNationalityBenfic,AgentRemittances.dropdownNationalityBenfic,1)
         await componant.autocompleteNonWoutEnter(options.Relation,AgentRemittances.relationRemRec,AgentRemittances.dropdownRelationSenderBenef,0)
         await AgentRemittances.BenficPhone.setValue(await componant.generateNumber(9))
         await componant.select(AgentRemittances.selectReason,0)
         await AgentRemittances.inptNoteReason.setValue(options.NoteReason)
          await AgentRemittances.CountryAddressDetailsBenfic.click();
         await componant.autocompleteNonWoutEnter(options.Country,AgentRemittances.CountryAddressDetailsBenfic,AgentRemittances.dropdownCountry2,0)
             await componant.select(AgentRemittances.CityAddressDetailsBenfic,1)
            await componant.select(AgentRemittances.AreaAddressDetailsBenfic,1)
             await AgentRemittances.OtherAddressDetailsBenfic.setValue(options.OtherAddress)
           await componant.autocompleteNonWoutEnter(options.BankName,AgentRemittances.autoBankName,AgentRemittances.dropdownBankName,0)
           await AgentRemittances.inptAccNumber.setValue(options.accountNum)
           await browser.pause(3000)
           await AgentRemittances.btnNextScound.click();
         //   await componant.AddImage(options.ImgPath,AgentRemittances.imageCardIdentPhoto)
         //  await componant.AddImage(options.ImgPath,AgentRemittances.imgCopyOfTransferRequest)
         // await AgentRemittances.btnSave.click();
         //   await AgentRemittances.btnClose.click();
          await browser.pause(3000)
        await agentDashboard.logout()
    })
})

          }
          else {
            describe('SendRemAgenttt', async() => {
               it('Check Credits permission', async() => {
                   await browser.pause(500)
                   const GetCardByID= await componant.getrequestbyurl('/Service/GetCardByID',async function(){  await browser.pause(1000);await agentDashboard.btnRemittances.click();})
               const GetCardByIDAdd =GetCardByID.response.body.AdditionalData.FirstName
                  await browser.pause(1000)
                  
                  await AgentRemBlack.btnSendTransfer.click()
          
       
                    await componant.select(AgentRemBlack.selectRemKind,0)
                    await componant.autocompleteNonWoutEnter(options.Country,AgentRemBlack.autoCountry,AgentRemBlack.dropdownCountry,0)
                     await componant.autocompleteNonWoutEnter(options.City,AgentRemBlack.autoCity,AgentRemBlack.dropdownCity,0)
                     await componant.select(AgentRemBlack.selectAgent,1)
                     await componant.select(AgentRemBlack.selectCurrDev,0)
                     await AgentRemBlack.curAmountDelivery.click();
                     await browser.keys([Key.Ctrl, 'a'])
                     await componant.AddNum(options.Amount)
                     await componant.select(AgentRemBlack.selectCurrRec,0)
                     await componant.autocompleteWithEnter(options.Benficname,AgentRemBlack.autoBeneficiaryName,AgentRemBlack.dropdownBeneficiaryName,0)
                     await AgentRemBlack.BenficPhone.setValue(await componant.generateNumber(9))
                     await browser.pause(3000)
                     console.log("GetCardByIDAdd",GetCardByIDAdd)
                     await agentDashboard.logout()
                  
                  })
                  
                  })
        

          }


    }),
    xit('Check Credits permission', async() => {
      const numberDictionary = NumberDictionary.generate({ min: 100000000000, max: 999999999999 });
        console.log('lolo',numberDictionary)


    })



})
