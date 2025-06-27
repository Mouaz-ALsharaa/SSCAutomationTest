import { expect as expectChai } from 'chai'
import { Key } from 'webdriverio'
import AgentQueries from '../../../pageobjects/agent/AgentQueries.js'
import AgentRemittances from '../../../pageobjects/agent/AgentRemittances.js'
import AgentBalances from '../../../pageobjects/agent/AgentBalances.js'
import AgentCredit from '../../../pageobjects/agent/AgentCredit.js'
import agentDashboard from '../../../pageobjects/agent/agentDashboard.js'
import AgentRemitPay from '../../../pageobjects/agent/AgentRemitPay.js'
import appServices from '../../../Services/appServices.js'
import cardServices from '../../../Services/cardServices.js'
import fileServices from '../../../Services/fileServices.js'

class preparationAgentPayRem{

    async payRemAgent(RemitPayKind, prpos, RemCode, fileName) {
        if (!fileName)
          fileName = 'data.json'
        var options = {
          ImgPath: "/SSCTFS/SSC_DEV/SSCAutomationTest/test/Images/01.JPG",
          OtherAddress: "OtherAddressTest",
          City: "ottawa",
          Country: "cana",
          Relation: "bro",
        }
        const file = await fileServices.readfile(fileName)
        await AgentBalances.btnBalances.click()
      
        const requestBalanceafter = await appServices.getrequestbyurl('/AccStatements/GetAccountStatement', async function () { await AgentCredit.btnSearch.click() })
        const requestBalanceafteAdditionalData1 = requestBalanceafter.response.body.AdditionalData
       
         await agentDashboard.btnRemittances.click();
         
        // const fildRequerd = await appServices.getrequestbyurl('/Service/GetCardRequirement', async function () { await browser.pause(2000); await agentDashboard.btnRemittances.click(); await browser.pause(2000); })
        // const fildRequerdAdd = fildRequerd.response.body.AdditionalData
   
        await AgentQueries.btnQueries.click()
        let requestGetRemToPayAddit = ""
        if (RemitPayKind == 0) {
          const requestGetRemToPay = await appServices.getrequestbyurl('/Statments/GetRemToPay', async function () { await browser.pause(1000), await AgentQueries.btnFrmRemitt_NoneDelivery.click(); await browser.pause(2000); })
          requestGetRemToPayAddit = requestGetRemToPay.response.body.AdditionalData
        } else {
          const requestGetRemToPay = await appServices.getrequestbyurl('/Statments/GetAgentRemittDeliv', async function () { await browser.pause(1000), await AgentQueries.btnFrmRemitt_Deliv.click(); await browser.pause(2000); })
          requestGetRemToPayAddit = requestGetRemToPay.response.body.AdditionalData
        }
        await AgentRemittances.ReturnBtn.click()
        
        const fildRequerd = await appServices.getrequestbyurl('/Service/GetCardRequirement', async function () { await browser.pause(2000); await agentDashboard.btnTransferDelivery.click(); await browser.pause(2000); })
        const fildRequerdAdd = fildRequerd.response.body.AdditionalData
      
        if (RemitPayKind == 0) {
          await appServices.select(AgentRemitPay.selectRemitPayKind, RemitPayKind)
        }
        else {
          await appServices.select(AgentRemitPay.selectRemitPayKind, RemitPayKind)
       
          await appServices.select(AgentRemitPay.slctAgents, 1)
        }
    
        
    
    
        await AgentRemitPay.inptGeneralNumber.setValue(file.UIDs[prpos]);
       
        await browser.keys([Key.Enter])
        if (RemCode == 1) {
          await AgentRemitPay.BtnRimtPay.click()
          await AgentRemitPay.inptRemittCode.setValue("2123")
          await browser.keys([Key.Escape])
          await AgentRemitPay.btnOk.click()
        }
        console.log("RemCode", RemCode)
    
        
    
        if (RemitPayKind == 0) {
          await cardServices.fillLargeCard(fildRequerdAdd, true, true)
        }
        else {
    
          await cardServices.fillLargeCard(fildRequerdAdd, true, true)
          await AgentRemitPay.BenficPhone.setValue(await appServices.generateNumber(10))
   
          await appServices.autocompleteNonWoutEnter(options.Country, AgentRemitPay.CountryAddressDetails, AgentRemitPay.dropdownCountry, 0)
  
          await appServices.select(AgentRemitPay.CityAddressDetails, 1)
        
       
          await appServices.autocompleteNonWoutEnter(options.City, AgentRemitPay.AreaAddressDetails, AgentRemitPay.dropdownAreaAddressDetails, 0, () => { })
    
          await AgentRemitPay.OtherAddressDetails.setValue(options.OtherAddress)
          
          await appServices.autocompleteNonWoutEnter(options.Relation, AgentRemitPay.autoRelationshipSenderBenefıcary, AgentRemitPay.dropdownRelationshipSenderBenefıcary, 0, () => { })
    
        }
    
        await appServices.AddImage(options.ImgPath, AgentRemitPay.fileUploadImageCardIdentPhoto)
    
        await appServices.AddImage(options.ImgPath, AgentRemitPay.imgUploadInputCopyOfTransferRequest)
    
        if (RemitPayKind == 0) {
          const saverequest = await appServices.getrequestbyurl('/Remittance/SaveRemPay', async function () { await AgentRemitPay.btnSave.click(); })
          const saverequestbody = saverequest.response.body.CarryOnData.length
          if (saverequestbody > 0) {
            await AgentRemitPay.btnOk.click();
          }
        } else {
          const saverequest = await appServices.getrequestbyurl('/BestRateApi/SaveRem', async function () { await AgentRemitPay.btnSave.click(); })
          const saverequestbody = saverequest.response.body.CarryOnData.length
          if (saverequestbody > 0) {
            console.log("saverequestbody", saverequestbody)
            await AgentRemitPay.btnOk.click();
          }
        }
    
        await AgentRemitPay.btnClose.click();
    
        await AgentQueries.btnQueries.click()
     
        let requestGetRemToPayAdditBF = 0
        if (RemitPayKind == 0) {
          const requestGetRemToPayBF = await appServices.getrequestbyurl('/Statments/GetRemToPay', async function () { await browser.pause(1000), await AgentQueries.btnFrmRemitt_NoneDelivery.click() })
          requestGetRemToPayAdditBF = requestGetRemToPayBF.response.body.AdditionalData
          expectChai(requestGetRemToPayAdditBF.length).to.equal(requestGetRemToPayAddit.length - 1)
        }
        else {
       
          const requestGetRemToPayBF = await appServices.getrequestbyurl('/Statments/GetAgentRemittDeliv', async function () { await browser.pause(1000), await AgentQueries.btnFrmRemitt_Deliv.click() })
          requestGetRemToPayAdditBF = requestGetRemToPayBF.response.body.AdditionalData
          expectChai(requestGetRemToPayAdditBF.length).to.equal(requestGetRemToPayAddit.length + 1)
        }
       
        await agentDashboard.btnReturn.click()
     
        await agentDashboard.btnReturn.click()
   
        await AgentBalances.btnBalances.click()
        const request1 = await appServices.getrequestbyurl('/AccStatements/GetAccountStatement', async function () { await AgentCredit.btnSearch.click() })
        const requestAdditionalData1 = request1.response.body.AdditionalData
    
        for (let i = 0; i < requestAdditionalData1.length - 1; ++i) {
    
          if (requestAdditionalData1[i].la_Currency_name === requestGetRemToPayAddit[requestGetRemToPayAddit.length - 1].Delivery_Currency) {
            await $$("#btnNotes")[i].click()
       
            if (RemitPayKind == 0) {
              for (let j = 0; j < requestGetRemToPayAddit.length - 1; ++j) {
                if (requestGetRemToPayAddit[j].Remitt_UID === file.UIDs[prpos]) {
                  expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
                    +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") +
                    +requestGetRemToPayAddit[j].Total_Value.replace(/,/g, "")) -
                    Math.abs(+requestAdditionalData1[i].Credit.replace(/,/g, "") -
                      +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
                }
              }
            }
            else {
              for (let j = 0; j < requestGetRemToPayAdditBF.length - 1; ++j) {
                if (requestGetRemToPayAdditBF[j].Remitt_UID === file.UIDs[prpos]) {
                  expectChai(Math.abs(Math.abs(+requestBalanceafteAdditionalData1[i].Credit.replace(/,/g, "") -
                    +requestBalanceafteAdditionalData1[i].Debt.replace(/,/g, "") +
                    +requestGetRemToPayAdditBF[j].Deliv_Amount.replace(/,/g, "")) -
                    Math.abs(+requestAdditionalData1[i].Credit.replace(/,/g, "") -
                      +requestAdditionalData1[i].Debt.replace(/,/g, "")))).to.be.lessThan(1)
    
                }
              }
    
            }
          }
        } 
    
     
        await AgentBalances.btnHome.click()
    
      }  
}
export default new preparationAgentPayRem();