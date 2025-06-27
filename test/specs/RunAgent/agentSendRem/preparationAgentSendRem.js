
import { expect as expectChai } from 'chai'
import { Key } from 'webdriverio'
import AgentQueries from '../../../pageobjects/agent/AgentQueries.js'
 import appServices from '../../../Services/appServices.js'
 import cardServices from '../../../Services/cardServices.js'
 import fileServices from '../../../Services/fileServices.js'
 import AgentRemBlack from '../../../pageobjects/agent/AgentRemBlack.js'
 import AgentRemittances from '../../../pageobjects/agent/AgentRemittances.js'
 import AgentBalances from '../../../pageobjects/agent/AgentBalances.js'
 import AgentCredit from '../../../pageobjects/agent/AgentCredit.js'
 import agentDashboard from '../../../pageobjects/agent/agentDashboard.js'
 import AgentRemAPI from '../../../pageobjects/agent/AgentRemAPI.js'
import { browser } from 'wdio-electron-service'


class preparationAgentSendRem {

    async RecBlackRemAgent(DefaultSender,remKind,currDeliv,prposfile,isApi){
        var options = {
          Amount: await appServices.generateNumber(3),
          Amount1: await appServices.generateNumber(7),
          Country: "cana",
          City: "otta",
          agent:"كندا",
          Sendername: await cardServices.generateName(),
          Benficname: await cardServices.generateName(),
       }
        await AgentBalances.btnBalances.click()
 
        const requestBalanceafter = await appServices.getrequestbyurl('/AccStatements/GetAccountStatement', async function () { await AgentCredit.btnSearch.click() })
        const requestBalanceafteAdditionalData1 = requestBalanceafter.response.body.AdditionalData
              
                    await agentDashboard.btnRemittances.click()
                  
                    await AgentQueries.btnQueries.click()
              
                    await AgentQueries.btnRemtsOut.click()
                    const requestRemtsOut = await appServices.getrequestbyurl('/Remittance/GetAgentOutRemitts', async function () { await AgentQueries.btnSearch.click() })
                    const requestRemtsOutAddit = requestRemtsOut.response.body.AdditionalData.length
                    await AgentRemittances.ReturnBtn.click()
             
                 await AgentRemBlack.btnSendTransfer.click()
                 await appServices.select(AgentRemBlack.selectRemKind, remKind)
           
                 if(isApi){
                  await appServices.select(AgentRemBlack.selectAgents, 1)
                  await appServices.select(AgentRemAPI.selectCountry, 1)
                  await appServices.select(AgentRemAPI.selectCity, 1)
                  await appServices.select(AgentRemBlack.selectAgent, 1)
                 }
                 else{
                  await appServices.autocompleteNonWoutEnter(options.Country, AgentRemittances.autoCountry0, AgentRemittances.dropdownCountry0, 0,()=>{})
                //  await appServices.autocompleteNonWoutEnter(options.City, AgentRemittances.autoCity, AgentRemittances.dropdownCity, 0,()=>{})
                  await appServices.autocompleteNonWoutEnter(options.agent, AgentRemittances.autoAgent, AgentRemittances.dropdownAgent, 0,()=>{})
            
                }
  
   
                
                 await appServices.select(AgentRemBlack.selectCurrDev, currDeliv)
              
                 await AgentRemBlack.curAmountDelivery.click();
               
                 await browser.keys([Key.Ctrl, 'a'])
            

                 isApi? await appServices.AddNum(options.Amount1):await appServices.AddNum(options.Amount)

                // await appServices.AddNum(options.Amount)
     

                 await appServices.select(AgentRemBlack.selectCurrRec, 1)
  
                 if (DefaultSender == 0) {
                    await appServices.autocompleteWithEnter(options.Sendername, AgentRemBlack.autoSenderName)
                    await AgentRemBlack.SenderPhone.setValue(await appServices.generateNumber(10))
                 }
  
                 await appServices.autocompleteWithEnter(options.Benficname, AgentRemBlack.autoBeneficiaryName)
                
                 await AgentRemBlack.BenficPhone.setValue(await appServices.generateNumber(10))
        
                 const Totall = AgentRemittances.inptTotal
                 const total_m = await Totall.getValue()
                 let RemUID=""
                 if(isApi){
                  const saverequest = await appServices.getrequestbyurl('/BestRateApi/SaveTrans', async function () { await AgentRemittances.btnSave.click(); })
                   RemUID = saverequest.response.body.AdditionalData.Remitt_UID
             
                 }
                 else{
                 const saverequest = await appServices.getrequestbyurl('/Remittance/SaveRemRec', async function () { await AgentRemittances.btnSave.click();})
                    RemUID = saverequest.response.body.AdditionalData
                
                    await AgentRemittances.btnApprove.click();
                
                    await AgentRemittances.btnOk.click();
         
                  }
                    await AgentRemittances.btnClose0.click();
            
                    await AgentQueries.btnQueries.click()
              
                    await AgentQueries.btnRemtsOut.click()
                    const requestRemtsOutAF = await appServices.getrequestbyurl('/Remittance/GetAgentOutRemitts', async function () { await AgentQueries.btnSearch.click() })
                    const requestRemtsOutAdditAF = requestRemtsOutAF.response.body.AdditionalData
                    expectChai(requestRemtsOutAdditAF.length).to.equal(requestRemtsOutAddit + 1)
              
                    await agentDashboard.btnReturn.click()
               
                    await agentDashboard.btnReturn.click()
                
                    await AgentBalances.btnBalances.click()
                    const request1 = await appServices.getrequestbyurl('/AccStatements/GetAccountStatement', async function () { await AgentCredit.btnSearch.click() })
                    const requestAdditionalData1 = request1.response.body.AdditionalData
                    for (let i = 0; i < requestAdditionalData1.length - 1; ++i) {
  
                       if (requestAdditionalData1[i].la_Currency_name === requestRemtsOutAdditAF[requestRemtsOutAdditAF.length - 1].currency_name) {
                          await $$("#btnNotes")[i].click()
                          console.log("total_f",total_m)
                          
                
                          expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
                          +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") -
                           +total_m.replace(/,/g, "")) - Math.abs(
                                +requestAdditionalData1[i].Credit.replace(/,/g, "") - 
                            +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
                       }
                    }
                    await fileServices.writePropInFile('data.json',prposfile,RemUID)
            
                      await $("#btnHome").click()
    
  
      }

      async RecWhiteRemAgent(Version_Kind,remKind,currDeliv,prposfile){
        var options = {
          Amount: await appServices.generateNumber(4),
          CommAmount: "10",
          Country: "cana",
          Country1: "syr",
          Country2: "Ira",
          City: "otta",
          Sendername: await cardServices.generateName(),
          Benficname: await cardServices.generateName(),
          Nationality: "Ira",
          OtherAddress: "OtherAddressTest",
          Relation: "bro",
          NoteReason: "NoteReasonTest",
          BankName: "test",
          accountNum: await appServices.generateNumber(14),
          ImgPath: "/SSCTFS/SSC_DEV/SSCAutomationTest/test/Images/01.JPG",
          RemittUID: ""
       }
    
        await AgentBalances.btnBalances.click()
        const requestBalanceafter = await appServices.getrequestbyurl('/AccStatements/GetAccountStatement', async function () { await AgentCredit.btnSearch.click() })
        const requestBalanceafteAdditionalData1 = requestBalanceafter.response.body.AdditionalData
        const fildRequerd = await appServices.getrequestbyurl('/Service/GetCardRequirement', async function () {  await agentDashboard.btnRemittances.click(); })
        const fildRequerdAdd = fildRequerd.response.body.AdditionalData
        await AgentQueries.btnQueries.click()
        await AgentQueries.btnRemtsOut.click()
        const requestRemtsOut = await appServices.getrequestbyurl('/Remittance/GetAgentOutRemitts', async function () { await browser.pause(1000), await AgentQueries.btnSearch.click() })
        const requestRemtsOutAddit = requestRemtsOut.response.body.AdditionalData.length
        await AgentRemittances.ReturnBtn.click()
     
        await AgentRemittances.btnSendTransfer.click();
      
    
    
    
    if(remKind==0){
        await appServices.select(AgentRemittances.selectRemKind, remKind)
     //   await browser.keys([Key.Tab])
        await appServices.autocompleteNonWoutEnter(options.Country, AgentRemittances.autoCountry0, AgentRemittances.dropdownCountry0, 0,()=>{})
        await appServices.autocompleteNonWoutEnter(options.City, AgentRemittances.autoCity, AgentRemittances.dropdownCity, 0,()=>{})
        await $("table tbody tr:nth-child(1)").click()
        await appServices.select(AgentRemittances.selectDelvCurr, currDeliv)
        await AgentRemittances.curAmountDelivery.click();
        await browser.keys([Key.Ctrl, 'a'])
        await appServices.AddNum(options.Amount)
  
        await appServices.selectbyKey(AgentRemittances.selectRecCurr, 0)
    
        await appServices.select(AgentRemittances.selectCommCurr, 0)
     
        await AgentRemittances.curCommission.click();
        await browser.keys([Key.Ctrl, 'a'])
     
        await appServices.AddNum(options.CommAmount)
      }
      else{
        await appServices.select(AgentRemittances.selectRemKind, remKind)

        await appServices.select(AgentRemAPI.selectApiAgent, 1)
        await appServices.select(AgentRemAPI.selectCountry, 1)
        await appServices.select(AgentRemAPI.selectCity,1)
        await appServices.select(AgentRemAPI.selectAgent,1)
        await appServices.select(AgentRemAPI.selectDelvCurr0,currDeliv)
        await AgentRemAPI.curAmountDelivery.click()
        await browser.keys([Key.Ctrl, 'a'])
        await appServices.AddNum(await appServices.generateNumber(6))
        await appServices.select(AgentRemAPI.selectCurr0,0)
      }
    
        await AgentRemittances.btnNextfirst.click();
    
    
        await appServices.autocompleteWithEnter(options.Sendername, AgentRemittances.autoSenderName, AgentRemittances.dropdownSenderName, 0)
        await AgentRemittances.autoNationalitySender.click();
        await appServices.autocompleteNonWoutEnter(options.Nationality, AgentRemittances.autoNationalitySender, AgentRemittances.dropdownNationalitySender, 0,()=>{})
        await AgentRemittances.SenderPhone.setValue(await appServices.generateNumber(10))
       
        if(remKind==0){
        await appServices.autocompleteNonWoutEnter(options.Country, AgentRemittances.CountryAddressDetailsSender, AgentRemittances.dropdownCountry1, 0,()=>{})
        }
        else{
          await appServices.autocompleteNonWoutEnter(options.Country, AgentRemittances.CountryAddressDetailsSender, AgentRemittances.dropdownCountry0, 0,()=>{})
        }
    
        await appServices.select(AgentRemittances.CityAddressDetailSender, 1)
    
        await appServices.autocompleteNonWoutEnter(options.City, AgentRemittances.AreaAddressDetailsSender, AgentRemittances.dropdownAreaSender_Data, 0,()=>{})
 
        await AgentRemittances.OtherAddressDetailsSender.setValue(options.OtherAddress)
        await cardServices.fillLargeCard(fildRequerdAdd,true,true)
     
        await appServices.autocompleteWithEnter(options.Benficname, AgentRemittances.autoBeneficiaryName, AgentRemittances.dropdownBeneficiaryName, 0)
     
        await AgentRemittances.autoNationalityBenfic.click();
    
        await appServices.autocompleteNonWoutEnter(options.Nationality, AgentRemittances.autoNationalityBenfic, AgentRemittances.dropdownNationalityBenfic, 1,()=>{})
        await appServices.autocompleteNonWoutEnter(options.Relation, AgentRemittances.relationRemRec, AgentRemittances.dropdownRelationSenderBenef, 0,()=>{})
        await AgentRemittances.BenficPhone.setValue(await appServices.generateNumber(10))
        await appServices.select(AgentRemittances.selectReason, 0)
        await AgentRemittances.inptNoteReason.setValue(options.NoteReason)
        await AgentRemittances.CountryAddressDetailsBenfic.click();
        if(remKind==0){
        await appServices.autocompleteNonWoutEnter(options.Country, AgentRemittances.CountryAddressDetailsBenfic, AgentRemittances.dropdownCountry2, 0,()=>{})
      }else{
        await appServices.autocompleteNonWoutEnter(options.Country, AgentRemittances.CountryAddressDetailsBenfic, AgentRemittances.dropdownCountry1, 0,()=>{})
      }
    
        await appServices.select(AgentRemittances.CityAddressDetailsBenfic, 1)
    
        await appServices.autocompleteNonWoutEnter(options.City, AgentRemittances.AreaAddressDetailsBenfic, AgentRemittances.dropdownAreaBenefAddress, 0,()=>{})
   
       // await AgentRemittances.btnGoBack.click()
   
        await AgentRemittances.OtherAddressDetailsBenfic.setValue(options.OtherAddress)
     
        if(Version_Kind != '6'){
        await appServices.autocompleteNonWoutEnter(options.BankName, AgentRemittances.autoBankName, AgentRemittances.dropdownBankName, 0,()=>{})
        await AgentRemittances.inptAccNumber.setValue(options.accountNum)
     }
        const Total = AgentRemittances.inptTotal
        const total_f = await Total.getValue()
     
        await AgentRemittances.btnNextScound.click();
    
          await appServices.AddImage(options.ImgPath, AgentRemittances.imageCardIdentPhoto)
     
    if(remKind ==0){
        if(Version_Kind == '6'){
           //await AgentRemittances.btnSave.click();
           const saverequest = await appServices.getrequestbyurl('/Remittance/SaveRemRec', async function () {   await AgentRemittances.btnSave.click(); })
           options.RemittUID = saverequest.response.body.AdditionalData
        }
        else{
     
           const saverequest = await appServices.getrequestbyurl('/Remittance/SaveRemRec', async function () { await AgentRemittances.btnSave.click(); })
           options.RemittUID = saverequest.response.body.AdditionalData
        }
      }
        else{
          if(Version_Kind == '6'){
           // await AgentRemittances.btnSave.click();
            const saverequest = await appServices.getrequestbyurl('/BestRateApi/SaveTrans', async function () { await browser.pause(2000); await AgentRemittances.btnSave.click(); })
            options.RemittUID = saverequest.response.body.AdditionalData.Remitt_UID
         }
         else{
      
            const saverequest = await appServices.getrequestbyurl('/BestRateApi/SaveTrans', async function () { await browser.pause(2000); await AgentRemittances.btnSave.click(); })
            options.RemittUID = saverequest.response.body.AdditionalData.Remitt_UID
         }
      
                
        }
    console.log( "options.RemittUID",options.RemittUID)
     
    if(remKind==0){
        await AgentRemittances.btnApprove.click();
    
        await AgentRemittances.btnOk.click();
    
        await AgentRemittances.btnClose0.click();
      
      }else{
         await AgentRemAPI.btnClose.click();
    
      }
        await AgentQueries.btnQueries.click()
       
        await AgentQueries.btnRemtsOut.click()
        const requestRemtsOutAF = await appServices.getrequestbyurl('/Remittance/GetAgentOutRemitts', async function () { await AgentQueries.btnSearch.click() })
        const requestRemtsOutAdditAF = requestRemtsOutAF.response.body.AdditionalData
        expectChai(requestRemtsOutAdditAF.length).to.equal(requestRemtsOutAddit + 1)
    
        await agentDashboard.btnReturn.click()
    
        await agentDashboard.btnReturn.click()
     
        await AgentBalances.btnBalances.click()
        const request1 = await appServices.getrequestbyurl('/AccStatements/GetAccountStatement', async function () { await AgentCredit.btnSearch.click() })
        const requestAdditionalData1 = request1.response.body.AdditionalData
        for (let i = 0; i < requestAdditionalData1.length - 1; ++i) {
    
           if (requestAdditionalData1[i].la_Currency_name === requestRemtsOutAdditAF[requestRemtsOutAdditAF.length - 1].currency_name) {
              await $$("#btnNotes")[i].click()
          
              expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
              +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") -
               +total_f.replace(/,/g, "")) - Math.abs(
                    +requestAdditionalData1[i].Credit.replace(/,/g, "") - 
                +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
           }
        }
        await fileServices.writePropInFile('data.json',prposfile,options.RemittUID)
       
        await AgentBalances.btnHome.click()
    
      }
}

export default new preparationAgentSendRem();