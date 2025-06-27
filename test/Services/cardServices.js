import { Key } from 'webdriverio'
import { uniqueNamesGenerator,names } from 'unique-names-generator';
import { browser } from 'wdio-electron-service';
import UserRemittanceOperation from '../pageobjects/user/UserRemittanceOperation.js';
import AgentRemittances from '../pageobjects/agent/AgentRemittances.js';
import appServices from './appServices.js';

class cardServices {

    async generateName() {
        const config = { dictionaries: [names,names,names] ,  separator:" "}
        return  uniqueNamesGenerator(config);
        
    }
    async generateName2() {
        const config = { dictionaries: [names,names] ,  separator:" "}
        return  uniqueNamesGenerator(config);
        
    }
async fillLargeCard (fildRequerdAdd,benfic,agent){

        var options={
          
           Country: "Iraq",
            City: "وسط",
            Day: "01",
           IdentificationNumber: await appServices.generateNumber(11),
           Relation: "BROTH",
           AsylumIdentityNo: "15515",
           mother: "TestMother",
         IssuedFrom: "IssuedFromTest",
           PlaceOfBirth: "PlaceOfBirthTest",
            Month: "10",
            Yearold: "1988",
           YearNew: "2025",
           DraweeBank:"test",
           WorkStatement: "WorkStatementTest",
         HousingCardNo: "8796",
         HousingIssuer: "HousingIssuerTest",
         AsylumIssuer: "AsylumIssuerTest",
         NoteReason: "NoteReasonTest",
         BankName: "test",
         accountNum: "12547896541235",
        
        
        }
      
            
          await browser.pause(1000)
          
       if (fildRequerdAdd[1].Show == true) {//تاريخ الولادة
            await appServices.SetDate(AgentRemittances.dateBirthdayDate, options.Day, options.Month, options.Yearold)
        } 
         await browser.pause(1000)
          
             if (fildRequerdAdd[2].Show == true) {//مكان الولادة
                await UserRemittanceOperation.inptPlaceOfBirth.setValue(options.PlaceOfBirth)
             } 
             await browser.pause(1000)
          
             if (fildRequerdAdd[3].Show == true) {//نوع التعريف
                await appServices.select(UserRemittanceOperation.slctIdentificationKind, 0)
             } 
             await browser.pause(1000)
          
             if (fildRequerdAdd[4].Show == true) {//رقم التعريف
                await UserRemittanceOperation.inptIdentificationNumber.setValue(options.IdentificationNumber)
             }
             await browser.pause(1000)
          
             if (fildRequerdAdd[5].Show == true) {//اسم الام
                await UserRemittanceOperation.inptMotherName.setValue(options.mother)
             } 
             await browser.pause(1000)
          
             if (fildRequerdAdd[6].Show == true) {//تاريخ الاصدار
                await appServices.SetDate(UserRemittanceOperation.dateDateIssue, options.Day, options.Month, options.Yearold)
             } 
             await browser.pause(1000)
          
             if (fildRequerdAdd[7].Show == true) {//مكان الاصدار
                await UserRemittanceOperation.inptIssuedFrom.setValue(options.IssuedFrom)
             }
             await browser.pause(1000)
           
             if (fildRequerdAdd[8].Show == true) {//تاريخ انتهاء الصلاحية 
                await appServices.SetDate(UserRemittanceOperation.dateExpirationDate, options.Day, options.Month, options.YearNew)
             }
             await browser.pause(1000)
          
             if (fildRequerdAdd[9].Show == true) {// مصدر الدخل
                await appServices.select(UserRemittanceOperation.slctSourceIncome, 0)
             } 
             await browser.pause(1000)
          
             if (fildRequerdAdd[10].Show == true) {// الدخل الشهري
                await UserRemittanceOperation.inptMonthlyIncome.setValue("5421455")
             } 
             await browser.pause(1000)
          
             if (fildRequerdAdd[12].Show == true) {//  العمل 
                await appServices.select(UserRemittanceOperation.slctWork, 2)
             } 
             await browser.pause(1000)
          
             if (fildRequerdAdd[13].Show == true) {//  بيان العمل
                await UserRemittanceOperation.inptWorkStatement.setValue(options.WorkStatement)
             } 
             await browser.pause(1000)
          
             if (fildRequerdAdd[14].Show == true) {// رقم بطاقة السكن
                await UserRemittanceOperation.inptHousingCardNo.setValue(options.HousingCardNo)
             }   
               await browser.pause(1000)
          
             if (fildRequerdAdd[15].Show == true) {// تاريخ اصدار بطاقة السكن
                await appServices.SetDate(UserRemittanceOperation.dateHousinDataIssued, options.Day, options.Month, options.YearNew)
             } 
             await browser.pause(1000)
          
             if (fildRequerdAdd[16].Show == true) {// جهة اصدار بطاقة السكن
                await UserRemittanceOperation.inptIssuerHousingCard.setValue(options.HousingIssuer)
             }
             await browser.pause(1000)
          
    
             if (fildRequerdAdd[17].Show == true) {// رقم بطاقة اللجوء
                await UserRemittanceOperation.inptAsylumIdentityNo.setValue(options.AsylumIdentityNo)
             } 
             await browser.pause(1000)
          
             if (fildRequerdAdd[18].Show == true) {// تاريخ بطاقة اللجوء
                await appServices.SetDate(UserRemittanceOperation.dateAsylumDataIssued, options.Day, options.Month, options.YearNew)
             } 
             await browser.pause(1000)
          
             if (fildRequerdAdd[19].Show == true) {// جهة اصدار بطاقة اللجوء
                await UserRemittanceOperation.inptIssuerAsylum.setValue(options.AsylumIssuer)
             } 
             if(!benfic){
            if (fildRequerdAdd[0].Show == true) {//العنوان
            
                await appServices.autocompleteNonWoutEnter(options.Country, UserRemittanceOperation.CountryCardAddress, UserRemittanceOperation.dropdownCountry, 0,()=>{})
                await browser.pause(1000)
               await appServices.select(UserRemittanceOperation.CityCardAddress, 1)
               await browser.pause(1000)
               await appServices.autocompleteNonWoutEnter(options.City, UserRemittanceOperation.AreaCardAddress, UserRemittanceOperation.dropdownAreaSender_Data, 0,()=>{})
       
               await browser.pause(1000)
               await UserRemittanceOperation.OtherCardAddress.setValue("OtherCard")
             }
            }
             await browser.pause(1000)
          if (!agent){
             await UserRemittanceOperation.btnOk.click()
            }
    
    };
async fillSmailCard(Benficname,isSender){
    
        var options={
            Day: await appServices.generateNumber(2),
            mother: "TestMother",
            PlaceOfBirth: "PlaceOfBirthTest",
           Month: "10",
            Yearold: "1988",
            Country: "Iraq",
            City: "وسط",
        }
        if(isSender){
    
    await UserRemittanceOperation.autoSenderName.click()
        await UserRemittanceOperation.autoSenderName.setValue(Benficname)
        await browser.keys([Key.Enter])
        await browser.pause(1000)
        await UserRemittanceOperation.PhoneNuminternal.setValue(await appServices.generateNumber(10))
        await browser.pause(2000)
        await appServices.autocompleteNonWoutEnter(options.Country, UserRemittanceOperation.CountryCardAddress, UserRemittanceOperation.dropdownCountry, 0,()=>{})
                await browser.pause(1000)
               await appServices.select(UserRemittanceOperation.CityCardAddress, 1)
               await browser.pause(1000)
               await appServices.autocompleteNonWoutEnter(options.City, UserRemittanceOperation.AreaCardAddress, UserRemittanceOperation.dropdownAreaBenefic_Data, 0,()=>{})
            
               await browser.pause(1000)
               await UserRemittanceOperation.OtherCardAddress.setValue("OtherCard")
    
    
        }
        else{
        await UserRemittanceOperation.autoBeneficiaryName.click()
        await UserRemittanceOperation.autoBeneficiaryName.setValue(Benficname)
        await browser.keys([Key.Enter])
        await browser.pause(1000)
        await UserRemittanceOperation.PhoneNuminternal.setValue(await appServices.generateNumber(10))
        await browser.pause(2000)
        await appServices.autocompleteNonWoutEnter(options.Country, UserRemittanceOperation.CountryBeneficCardAddress, UserRemittanceOperation.dropdownCountry, 0,()=>{})
                await browser.pause(1000)
               await appServices.select(UserRemittanceOperation.CityCardBeneficAddress, 1)
               await browser.pause(1000)
               await appServices.autocompleteNonWoutEnter(options.City, UserRemittanceOperation.AreaCardBeneficAddress, UserRemittanceOperation.dropdownAreaBenefic_Data, 0,()=>{})
               //await appServices.select(UserRemittanceOperation.AreaCardBeneficAddress, 1)
               await browser.pause(1000)
               await UserRemittanceOperation.OtherCardBeneficAddress.setValue("OtherCard")
            }
        await UserRemittanceOperation.btnOk.click()
    
    
    }    
async selectCard(id,name){

    await id.setValue(name)
    await browser.pause(2000)
    await browser.keys([Key.Enter])
    await browser.pause(2000)
    await browser.keys([Key.ArrowDown])
    await browser.pause(2000)
    await browser.keys([Key.Enter])
    await browser.pause(2000)
}

}
export default new cardServices();