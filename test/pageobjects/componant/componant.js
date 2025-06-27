import { expect as expectChai } from 'chai'
import { Key } from 'webdriverio'
import { uniqueNamesGenerator,names } from 'unique-names-generator';
import fs from '../../../node_modules/fs-js/index.js'
import UserRemittanceOperation from '../../pageobjects/user/UserRemittanceOperation.js'
import AgentRemittances from '../../pageobjects/agent/AgentRemittances.js'
import { browser } from 'wdio-electron-service';


class componant{
  async autocompleteNonWoutEnter (Val,clsinput,clslist,idlist,eventFn) {
        const citymenu = await clslist 
        await browser.pause(1000)
        const valu_f = await clsinput.getValue()
        await browser.pause(1000)
        if(valu_f!=''){
        await browser.keys([Key.Ctrl, 'a'])
         await browser.keys([Key.Backspace])
        }
        await clsinput.setValue(Val)
        await browser.pause(2000)
        if(eventFn &&typeof(eventFn)=='function')
       await eventFn()
        for (let i =0; i<=idlist; i++){
        await browser.keys([Key.ArrowDown])
    }
        await browser.keys([Key.Enter])
       //const toto= await  citymenu.$$('li')[idlist].$('a')
    //    const toto= await  citymenu.$$('li')[idlist]
    //    await toto.click()
    //    await browser.pause(1000)
       await browser.keys([Key.Tab]) 

       await browser.pause(2000)
 
  
    }   
 async autocomplete () {
        await browser.keys([Key.Ctrl, 'a'])
         await browser.keys([Key.Backspace])
        await browser.keys([Key.Enter]) 
    }   
 async autocompleteWithEnter (Val,clsinput) {
        await (clsinput).setValue(Val)
        await browser.pause(1000)
        await browser.keys([Key.Enter])
        await browser.pause(1000)
        await browser.keys([Key.Tab])
        await browser.pause(1000)
    }
 async AddNum (text) {
        for(let i=0;i<text.length;i++){
        await browser.keys([Key["Numpad"+text[i]]]) 
    }
 }
 async AddImage (ImagePath,ImgUploadeId) {
 const remoteFilePath = await browser.uploadFile(ImagePath)
 await ImgUploadeId.setValue(remoteFilePath)
}
 async select(selectID,type) {
        
    const selectBox = await selectID;
    await selectBox.click();
    await browser.pause(1000)
    await selectBox.selectByIndex(type);
    expectChai(await selectBox.getText('option:checked')).to.be.not.empty
}
async selectbyText(selectID,type) {
    const selectBox = await selectID;
    await selectBox.click();
    await browser.pause(1000)
    await selectBox.selectByVisibleText(type);
    expectChai(await selectBox.getText('option:checked')).to.be.not.empty
}
async selectbyKey(selectID,type) {
        
    const selectBox = await selectID;;
    await selectBox.click();
        for(let i=0;i<type;i++){
            await browser.pause(1000)
            await browser.keys([Key.ArrowDown]) 
          
        }
await browser.keys([Key.Enter])
await browser.pause(500)
await browser.keys([Key.Tab])
  
   
}

async generatePassword() {
    var length = 8,
        smail = "abcdefghijklmnopqrstuvwxyz",
        capit1="ABCDFGHITUVWXYZ",
        capit="CD21FHI0123456789T",
        caricter="*@#$%*@#$%*@#$%",
        retVal = "";
    for (var i = 0, n = smail.length; i < 3; ++i) {
        retVal += smail.charAt(Math.floor(Math.random() * n));
    }
    for (var i = 0, n = capit1.length; i < 2; ++i) {
        retVal += capit1.charAt(Math.floor(Math.random() * n));
    }
    for (var i = 0, n = capit.length; i < 3; ++i) {
        retVal += capit.charAt(Math.floor(Math.random() * n));
    }
    for (var i = 0, n = caricter.length; i < 2; ++i) {
        retVal += caricter.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
async generateNumber(length) {
    //var length = 11,
    var num="123456789",
        retVal = "";
    for (var i = 0, n = num.length; i < length; ++i) {
        retVal += num.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
async generateName() {
    const config = { dictionaries: [names,names,names] ,  separator:" "}
    return  uniqueNamesGenerator(config);
    
}
async generateName2() {
    const config = { dictionaries: [names,names] ,  separator:" "}
    return  uniqueNamesGenerator(config);
    
}
async SetDate(DateID,Day,Month,Year){
    await (DateID).click()
    await browser.pause(500)
    await this.AddNum(Day)
    await browser.pause(500)
    await this.AddNum(Month)
    await browser.pause(500)
    await this.AddNum(Year)
}

async mail (){

    await browser.url("https://mail.eyuphosting.com/")
    await browser.pause(500)
    await $("#txtUsername").setValue("mouaz@salahsoft.com")
    await browser.pause(500)
    await $("#txtPassword").setValue("Admin@2020")
    await browser.pause(500)
    await $("#btnLogin").click()
    await browser.pause(3500)
    await $("#tv_lbl_Node_2").click()
    await browser.pause(3000)
    await $("#MEMessageList tbody tr:first-child").doubleClick()
    await browser.pause(3000)
    const iframe = await browser.findElement('css selector', 'iframe')
    await browser.switchToFrame(iframe)
    const iframe1 = await browser.findElement('css selector', 'iframe')
    await browser.switchToFrame(iframe1)
    await browser.pause(1000)
   const message=(await $("#MessageArea").$$("a")[1])
   await browser.pause(1000)
   const mass=(await message.getText()).split("\n")[2]
   return mass

}
async getrequestbyurl (url,eventFn){
    await browser.disableInterceptor()
    await browser.setupInterceptor()
 await eventFn()
 await browser.pause(2000)
   let fofo=await browser.getRequests();
   //console.log('fofo',fofo)
    for (let i = 0; i < fofo.length;++i)
        if (fofo[i].url.includes(url)&& fofo[i].response.statusCode==200)
          return fofo[i]
    return null
 
}
async fillLargeCard (fildRequerdAdd,benfic,agent){

    var options={
      
       Country: "Iraq",
        City: "وسط",
        Day: "01",
       IdentificationNumber: await this.generateNumber(11),
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
        await this.SetDate(AgentRemittances.dateBirthdayDate, options.Day, options.Month, options.Yearold)
    } 
     await browser.pause(1000)
      
         if (fildRequerdAdd[2].Show == true) {//مكان الولادة
            await UserRemittanceOperation.inptPlaceOfBirth.setValue(options.PlaceOfBirth)
         } 
         await browser.pause(1000)
      
         if (fildRequerdAdd[3].Show == true) {//نوع التعريف
            await this.select(UserRemittanceOperation.slctIdentificationKind, 0)
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
            await this.SetDate(UserRemittanceOperation.dateDateIssue, options.Day, options.Month, options.Yearold)
         } 
         await browser.pause(1000)
      
         if (fildRequerdAdd[7].Show == true) {//مكان الاصدار
            await UserRemittanceOperation.inptIssuedFrom.setValue(options.IssuedFrom)
         }
         await browser.pause(1000)
       
         if (fildRequerdAdd[8].Show == true) {//تاريخ انتهاء الصلاحية 
            await this.SetDate(UserRemittanceOperation.dateExpirationDate, options.Day, options.Month, options.YearNew)
         }
         await browser.pause(1000)
      
         if (fildRequerdAdd[9].Show == true) {// مصدر الدخل
            await this.select(UserRemittanceOperation.slctSourceIncome, 0)
         } 
         await browser.pause(1000)
      
         if (fildRequerdAdd[10].Show == true) {// الدخل الشهري
            await UserRemittanceOperation.inptMonthlyIncome.setValue("5421455")
         } 
         await browser.pause(1000)
      
         if (fildRequerdAdd[12].Show == true) {//  العمل 
            await this.select(UserRemittanceOperation.slctWork, 2)
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
            await this.SetDate(UserRemittanceOperation.dateHousinDataIssued, options.Day, options.Month, options.YearNew)
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
            await this.SetDate(UserRemittanceOperation.dateAsylumDataIssued, options.Day, options.Month, options.YearNew)
         } 
         await browser.pause(1000)
      
         if (fildRequerdAdd[19].Show == true) {// جهة اصدار بطاقة اللجوء
            await UserRemittanceOperation.inptIssuerAsylum.setValue(options.AsylumIssuer)
         } 
         if(!benfic){
        if (fildRequerdAdd[0].Show == true) {//العنوان
        
            await this.autocompleteNonWoutEnter(options.Country, UserRemittanceOperation.CountryCardAddress, UserRemittanceOperation.dropdownCountry, 0,()=>{})
            await browser.pause(1000)
           await this.select(UserRemittanceOperation.CityCardAddress, 1)
           await browser.pause(1000)
           await this.autocompleteNonWoutEnter(options.City, UserRemittanceOperation.AreaCardAddress, UserRemittanceOperation.dropdownAreaSender_Data, 0,()=>{})
          // await this.select(UserRemittanceOperation.AreaCardAddress, 1)
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
        Day: await this.generateNumber(2),
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
    await UserRemittanceOperation.PhoneNuminternal.setValue(await this.generateNumber(10))
    await browser.pause(2000)
    await this.autocompleteNonWoutEnter(options.Country, UserRemittanceOperation.CountryCardAddress, UserRemittanceOperation.dropdownCountry, 0,()=>{})
            await browser.pause(1000)
           await this.select(UserRemittanceOperation.CityCardAddress, 1)
           await browser.pause(1000)
           await this.autocompleteNonWoutEnter(options.City, UserRemittanceOperation.AreaCardBeneficAddress, UserRemittanceOperation.dropdownAreaBenefic_Data, 0,()=>{})
          // await this.select(UserRemittanceOperation.AreaCardAddress, 1)
           await browser.pause(1000)
           await UserRemittanceOperation.OtherCardAddress.setValue("OtherCard")


    }
    else{
    await UserRemittanceOperation.autoBeneficiaryName.click()
    await UserRemittanceOperation.autoBeneficiaryName.setValue(Benficname)
    await browser.keys([Key.Enter])
    await browser.pause(1000)
    await UserRemittanceOperation.PhoneNuminternal.setValue(await this.generateNumber(10))
    await browser.pause(2000)
    await this.autocompleteNonWoutEnter(options.Country, UserRemittanceOperation.CountryBeneficCardAddress, UserRemittanceOperation.dropdownCountry, 0,()=>{})
            await browser.pause(1000)
           await this.select(UserRemittanceOperation.CityCardBeneficAddress, 1)
           await browser.pause(1000)
           await this.select(UserRemittanceOperation.AreaCardBeneficAddress, 1)
           await browser.pause(1000)
           await UserRemittanceOperation.OtherCardBeneficAddress.setValue("OtherCard")
        }
    await UserRemittanceOperation.btnOk.click()


}
async selectCard(id,name){

    await id.setValue(name)
    await browser.keys([Key.Enter])
    await browser.pause(2000)
    await browser.keys([Key.ArrowDown])
    await browser.pause(2000)
    await browser.keys([Key.Enter])
    await browser.pause(2000)
}

async readfile (file){
    
const update_data = fs.readFileSync(file);
 const data = JSON.parse(update_data);
 return data
}

async writePropInFile(fileName,propName,val){
    const data = await fs.readFileSync(fileName);
    const jsonData = await JSON.parse(data);
    console.log("Before Adding data", JSON.stringify(jsonData, null, 4));
     jsonData.UIDs[propName]= val ;
    const jsonString = JSON.stringify(jsonData);
    await fs.writeFileSync(fileName, jsonString, 'utf-8', (err) => {
       if (err) throw err;
       console.log('Data added to file');
    });
    

}

}
export default new componant();