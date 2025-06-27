import { expect as expectChai } from 'chai'
import LoginPage from '../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../pageobjects/agent/agentDashboard.js'
import UserDashboard from '../../../../pageobjects/user/UserDashboard.js'
import componant from '../../../../pageobjects/componant/componant.js'
//import { Key } from 'webdriverio'
import UserAccountMangment from '../../../../pageobjects/user/UserAccountMangment.js'
import UserAddTeller from '../../../../pageobjects/user/UserAddTeller.js'

describe('AccountOperation', async() => {
    var options={
        userAdmin:"admin",
        userNameError:"memoooo",
        PasswordAdmin:"Admin@2023",
       Account:"hamz",
       Amount: await componant.generateNumber(4),
        email:"mouaz@salahsoft.com",
        WrongEmail:"eeerr@sssss.com",
        Discount:await componant.generateNumber(2),
        commission:await componant.generateNumber(2),
        Tax:await componant.generateNumber(2),
        checkNum:await componant.generateNumber(5),
        benfic:await componant.generateName(),
        drwer:await componant.generateName(),
        DraweeBank:"test"
    }

    //-------------- دليل الحسابات-وكوة ------------------------

   it('AccountList-', async() => {
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

          await UserAccountMangment.btnOk.click()

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

          await UserAccountMangment.btnOk.click()

//-----------------اضافة الكوة --------------------------
          await UserDashboard.btnAddTeller.click()
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

          await UserAccountMangment.btnOk.click()

        await browser.pause(5000)
    
        await agentDashboard.logout()
        
    })
    
 } )