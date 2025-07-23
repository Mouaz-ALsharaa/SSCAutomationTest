import { expect as expectChai } from 'chai'
import { Key } from 'webdriverio'
import UserDashboard from '../../../../pageobjects/user/UserDashboard.js'
import UserAddTeller from '../../../../pageobjects/user/UserAddTeller.js'
import appServices from '../../../../Services/appServices.js'
import UserAccountMangment from '../../../../pageobjects/user/UserAccountMangment.js'


class preparationAddTeller {


    async addTeller(TellerNum){
    await UserDashboard.btnAddTeller.click()
          await UserAddTeller.inptTellerName.setValue('teller'+TellerNum)
          await UserAddTeller.CurrenciesTab.click()
       for (let i = 0; i < 6; ++i) {
           const request = await appServices.getrequestbyurl('/AccManagement/GetTellerAccounts', async function () { await $$('.col-lg-3 ')[0].click() })
           const requestAdditionalData = request.response.body.AdditionalData
           for (let j = 0; j < requestAdditionalData.length; ++j) {
               if (requestAdditionalData[j].Ar_Account_Name.includes(TellerNum)) {
                    const lolo = $$('#slct')[i]
                    await browser.pause(500)
                   await appServices.select(lolo , j)
                }
               }
       }
       const request1 = await appServices.getrequestbyurl('/AccManagement/SaveTeller', async function () { await UserAddTeller.btnSave.click() })
           const requestAdditionalData1 = request1.response.body.Success
           expectChai(requestAdditionalData1).to.be.true
          await UserAccountMangment.btnOk.click()
}

async operationsTeller(TellerNum){

     const requestTeller = await appServices.getrequestbyurl('/AccManagement/GetBranchTellers', async function () {await UserDashboard.btnAddTeller.click()})
               const requestTellerAdditionalData = requestTeller.response.body.AdditionalData
       
    
              await UserAddTeller.inptTellerName.setValue('teller'+TellerNum)
       
    
              await UserAddTeller.CurrenciesTab.click()
         
             
           for (let i = 0; i < 6; ++i) {
               const request = await appServices.getrequestbyurl('/AccManagement/GetTellerAccounts', async function () { await $$('.col-lg-3 ')[0].click() })
               const requestAdditionalData = request.response.body.AdditionalData
               for (let j = 0; j < requestAdditionalData.length; ++j) {
                   if (requestAdditionalData[j].Ar_Account_Name.includes(TellerNum)) {
                        const lolo = $$('#slct')[i]
                        await browser.pause(500)
                       await appServices.select(lolo , j)
                     }
                 } 
           }
          
           const request1 = await appServices.getrequestbyurl('/AccManagement/SaveTeller', async function () { await UserAddTeller.btnSave.click() })
               const requestAdditionalData1 = request1.response.body.Success
               expectChai(requestAdditionalData1).to.be.true
               await browser.keys([Key.Escape])
    
               //------------------ReadTeller---------------------------------------
    
               await  $('button=teller'+TellerNum).click()
               await UserAddTeller.TellerTab.click()
                const TellerName =await UserAddTeller.inptTellerName
               expectChai( await TellerName.getValue()).to.equal('teller'+TellerNum)
              await UserDashboard.btnAccountManagement.click()
              await UserDashboard.btnAccountsList.click()
            
              const requestTeller1 = await appServices.getrequestbyurl('/AccManagement/GetBranchTellers', async function () {await UserDashboard.btnAddTeller.click()})
               const requestTeller1AdditionalData = requestTeller1.response.body.AdditionalData
               expectChai(requestTeller1AdditionalData.length).to.equal(requestTellerAdditionalData.length+1)
               //------------------UpdateTeller---------------------------------------
               await $("table tbody tr:nth-last-child(1)").click()
                await UserAddTeller.CurrenciesTab.click()
               const request2 = await appServices.getrequestbyurl('/AccManagement/SaveTeller', async function () { await UserAddTeller.btnUpdate.click() })
               const request2AdditionalData1 = request2.response.body.Success
               expectChai(requestAdditionalData1).to.be.true
               await browser.keys([Key.Escape])
    
    
        //------------------DeleteTeller---------------------------------------
        await $("table tbody tr:nth-last-child(1)").click()

                const requestDelete = await appServices.getrequestbyurl('/AccManagement/DeleteTeller', async function () { await UserAddTeller.btnDelete.click();await UserAddTeller.btnOk.click() })
               const requestDeleteAdditionalData1 = requestDelete.response.body.Success
               expectChai(requestDeleteAdditionalData1).to.be.true
               await browser.keys([Key.Escape])
               await UserDashboard.btnAccountManagement.click()
              await UserDashboard.btnAccountsList.click()
              const requestTeller2 = await appServices.getrequestbyurl('/AccManagement/GetBranchTellers', async function () {await UserDashboard.btnAddTeller.click()})
              const requestTeller2AdditionalData = requestTeller2.response.body.AdditionalData
              expectChai(requestTeller2AdditionalData.length).to.equal(requestTeller1AdditionalData.length-1)
                await UserDashboard.btnAccounts.click() 



}

}

export default new preparationAddTeller()