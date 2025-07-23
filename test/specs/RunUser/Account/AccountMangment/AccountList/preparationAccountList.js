import { expect as expectChai } from 'chai'
import UserDashboard from '../../../../../pageobjects/user/UserDashboard.js'
import UserAccountMangment from '../../../../../pageobjects/user/UserAccountMangment.js'

class preparationAccountList {
    async AccountList (TellerNum){
              await UserDashboard.btnAccounts.click()     
                await UserDashboard.btnAccountManagement.click()      
                await UserDashboard.btnAccountsList.click()
             
                const Acc10= await UserAccountMangment.AccountTree(10)
                Acc10.click()
                 const Acc101= await UserAccountMangment.AccountTree(101)
                 Acc101.click()
                 await UserAccountMangment.AddAccountLocal.click()
                 await UserAccountMangment.inptAccName.setValue('tellerLocal'+TellerNum)
                  const maincurr =await UserAccountMangment.AddAccCheck(1)
                   maincurr.click()
                   await UserAccountMangment.btnSave.click()
                 await UserAccountMangment.btnOk.click()
                 const Acc11= await UserAccountMangment.AccountTree(11)
                 Acc11.click()
                 const Acc111= await UserAccountMangment.AccountTree(111)
                 Acc111.click()
                 await UserAccountMangment.AddAccountForeign.click()
                 await UserAccountMangment.inptAccName.setValue('tellerForeign'+TellerNum)
                 for (let i=2; i<7; ++i ){
                   const Foreigncurr =await UserAccountMangment.AddAccCheck(i)
                   Foreigncurr.click()
                 }
                 await UserAccountMangment.btnSave.click()
                 await UserAccountMangment.btnOk.click()
    }
}
export default new preparationAccountList()