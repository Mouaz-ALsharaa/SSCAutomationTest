import { expect as expectChai } from 'chai'
import LoginPage from '../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../pageobjects/agent/agentDashboard.js'
import UserDashboard from '../../../../pageobjects/user/UserDashboard.js'
import componant from '../../../../pageobjects/componant/componant.js'
import { Key } from 'webdriverio'

import UserAddTeller from '../../../../pageobjects/user/UserAddTeller.js'
import UserAccountMangment from '../../../../pageobjects/user/UserAccountMangment.js'

describe('AccountOperation', async() => {
    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023",
    }
    //--------------اضافة صندوق ------------------------

   it('Add-Teller-Sucess-read-delete-edit', async() => {
        await browser.pause(2000)
        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        await browser.pause(1000)
        await UserDashboard.btnAccounts.click()
        await browser.pause(500)
        await UserDashboard.btnAccountManagement.click()
        await browser.pause(2000)
        await UserDashboard.btnAccountsList.click()
        await browser.pause(2000)
         var TellerNum =await componant.generateNumber(3)
        const Acc10= await UserAccountMangment.AccountTree(10)
        Acc10.click()
        await browser.pause(500)
          const Acc101= await UserAccountMangment.AccountTree(101)
          Acc101.click()
          await browser.pause(500)
          await UserAccountMangment.AddAccountLocal.click()
          await browser.pause(500)
          await UserAccountMangment.inptAccName.setValue('tellerLocal'+TellerNum)
           await browser.pause(500)
           const maincurr =await UserAccountMangment.AddAccCheck(1)
            maincurr.click()
            await UserAccountMangment.btnSave.click()
          await browser.pause(3000)

          await browser.keys([Key.Escape])

          const Acc11= await UserAccountMangment.AccountTree(11)
          Acc11.click()
        await browser.pause(500)
          const Acc111= await UserAccountMangment.AccountTree(111)
          Acc111.click()
          await browser.pause(500)
          await UserAccountMangment.AddAccountForeign.click()
          await browser.pause(500)
          await UserAccountMangment.inptAccName.setValue('tellerForeign'+TellerNum)
          for (let i=2; i<7; ++i ){
            const Foreigncurr =await UserAccountMangment.AddAccCheck(i)
            await browser.pause(500)
            Foreigncurr.click()
          }
          await UserAccountMangment.btnSave.click()
          await browser.pause(3000)
          await browser.keys([Key.Escape])
          const requestTeller = await componant.getrequestbyurl('/AccManagement/GetBranchTellers', async function () {await UserDashboard.btnAddTeller.click()})
           const requestTellerAdditionalData = requestTeller.response.body.AdditionalData
          await browser.pause(2000)

          await UserAddTeller.inptTellerName.setValue('teller'+TellerNum)
          await browser.pause(2000)

          await UserAddTeller.CurrenciesTab.click()
          await browser.pause(1000)
         
       for (let i = 0; i < 6; ++i) {
           const request = await componant.getrequestbyurl('/AccManagement/GetTellerAccounts', async function () { await $$('.col-lg-3 ')[0].click() })
           const requestAdditionalData = request.response.body.AdditionalData
           for (let j = 0; j < requestAdditionalData.length; ++j) {
               if (requestAdditionalData[j].Ar_Account_Name.includes(TellerNum)) {
                    const lolo = $$('#slctundefined')[i]
                    await browser.pause(500)
                   await componant.select(lolo , j)
                 }
             } 
       }
      
       const request1 = await componant.getrequestbyurl('/AccManagement/SaveTeller', async function () { await UserAddTeller.btnSave.click() })
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
          await browser.pause(1000)
          const requestTeller1 = await componant.getrequestbyurl('/AccManagement/GetBranchTellers', async function () {await UserDashboard.btnAddTeller.click()})
           const requestTeller1AdditionalData = requestTeller1.response.body.AdditionalData
           expectChai(requestTeller1AdditionalData.length).to.equal(requestTellerAdditionalData.length+1)
           //------------------UpdateTeller---------------------------------------
           await $("table tbody tr:nth-last-child(1)").click()

           const request2 = await componant.getrequestbyurl('/AccManagement/SaveTeller', async function () { await UserAddTeller.btnUpdate.click() })
           const request2AdditionalData1 = request2.response.body.Success
           expectChai(requestAdditionalData1).to.be.true
           await browser.keys([Key.Escape])


    //------------------DeleteTeller---------------------------------------
    await $("table tbody tr:nth-last-child(1)").click()
            const requestDelete = await componant.getrequestbyurl('/AccManagement/DeleteTeller', async function () { await UserAddTeller.btnDelete.click();await UserAddTeller.btnOk.click() })
           const requestDeleteAdditionalData1 = requestDelete.response.body.Success
           expectChai(requestDeleteAdditionalData1).to.be.true
           await browser.keys([Key.Escape])
           await UserDashboard.btnAccountManagement.click()
          await UserDashboard.btnAccountsList.click()
          const requestTeller2 = await componant.getrequestbyurl('/AccManagement/GetBranchTellers', async function () {await UserDashboard.btnAddTeller.click()})
          const requestTeller2AdditionalData = requestTeller2.response.body.AdditionalData
          expectChai(requestTeller2AdditionalData.length).to.equal(requestTeller1AdditionalData.length-1)
       
        
    }),
    it('Add-Teller-Sucess', async() => {
      
      await browser.pause(1000)
      await UserDashboard.btnAccountManagement.click()
      await browser.pause(2000)
      await UserDashboard.btnAccountsList.click()
      await browser.pause(2000)
       var TellerNum =await componant.generateNumber(3)
      const Acc10= await UserAccountMangment.AccountTree(10)
      Acc10.click()
      await browser.pause(500)
        const Acc101= await UserAccountMangment.AccountTree(101)
        Acc101.click()
        await browser.pause(500)
        await UserAccountMangment.AddAccountLocal.click()
        await browser.pause(500)
        await UserAccountMangment.inptAccName.setValue('tellerLocal'+TellerNum)
         await browser.pause(500)
         const maincurr =await UserAccountMangment.AddAccCheck(1)
          maincurr.click()
          await UserAccountMangment.btnSave.click()
        await browser.pause(3000)

        await browser.keys([Key.Escape])

        const Acc11= await UserAccountMangment.AccountTree(11)
        Acc11.click()
      await browser.pause(500)
        const Acc111= await UserAccountMangment.AccountTree(111)
        Acc111.click()
        await browser.pause(500)
        await UserAccountMangment.AddAccountForeign.click()
        await browser.pause(500)
        await UserAccountMangment.inptAccName.setValue('tellerForeign'+TellerNum)
        for (let i=2; i<7; ++i ){
          const Foreigncurr =await UserAccountMangment.AddAccCheck(i)
          await browser.pause(500)
          Foreigncurr.click()
        }
        await UserAccountMangment.btnSave.click()
        await browser.pause(3000)
        await browser.keys([Key.Escape])
        const requestTeller = await componant.getrequestbyurl('/AccManagement/GetBranchTellers', async function () {await UserDashboard.btnAddTeller.click()})
         const requestTellerAdditionalData = requestTeller.response.body.AdditionalData
        await browser.pause(2000)

        await UserAddTeller.inptTellerName.setValue('teller'+TellerNum)
        await browser.pause(2000)

        await UserAddTeller.CurrenciesTab.click()
        await browser.pause(1000)
       
     for (let i = 0; i < 6; ++i) {
         const request = await componant.getrequestbyurl('/AccManagement/GetTellerAccounts', async function () { await $$('.col-lg-3 ')[0].click() })
         const requestAdditionalData = request.response.body.AdditionalData
         for (let j = 0; j < requestAdditionalData.length; ++j) {
             if (requestAdditionalData[j].Ar_Account_Name.includes(TellerNum)) {
                  const lolo = $$('#slctundefined')[i]
                  await browser.pause(500)
                 await componant.select(lolo , j)
               }
           } 
     }
    
     const request1 = await componant.getrequestbyurl('/AccManagement/SaveTeller', async function () { await UserAddTeller.btnSave.click() })
         const requestAdditionalData1 = request1.response.body.Success
         expectChai(requestAdditionalData1).to.be.true
         await browser.keys([Key.Escape])
         await browser.pause(2000)
        await agentDashboard.logout()
        

        })
    
 } )