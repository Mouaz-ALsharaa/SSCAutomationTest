import { expect as expectChai } from 'chai'
import { Key } from 'webdriverio'
import { browser } from 'wdio-electron-service';

class appServices {
    
 async autocompleteNonWoutEnter (Val,clsinput,clslist,idlist,eventFn) {
        const citymenu = await clslist 
        await browser.pause(1000)
        const valu_f = await clsinput.getValue()
        await browser.pause(1000)
        if(valu_f!=''){
            await clsinput.click();
            await browser.pause(500)
        await browser.keys([Key.Ctrl, 'a']) 
        await browser.pause(1000)
         await browser.keys([Key.Backspace])
         await browser.pause(1000)
        }
        await clsinput.setValue(Val)
        await browser.pause(2000)
        if(eventFn &&typeof(eventFn)=='function')
       await eventFn()
        for (let i =0; i<=idlist; i++){
        await browser.keys([Key.ArrowDown])
    }
        await browser.keys([Key.Enter])
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
        await browser.keys([Key.ArrowDown])
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
async SetDate(DateID,Day,Month,Year){
    await (DateID).click()
    await browser.pause(500)
    await this.AddNum(Day)
    await browser.pause(500)
    await this.AddNum(Month)
    await browser.pause(500)
    await this.AddNum(Year)
}
}

export default new appServices();