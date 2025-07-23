import LoginPage from '../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../pageobjects/agent/agentDashboard.js'
import preparationAddTeller from './preparationAddTeller.js'
import preparationAccountList from '../AccountMangment/AccountList/preparationAccountList.js'
import appServices from '../../../../Services/appServices.js'

describe('AccountOperation', async() => {
    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023",
            TellerNum :await appServices.generateNumber(3),
             TellerNum1 :await appServices.generateNumber(3)
    }
    //--------------اضافة صندوق ------------------------

   it('Add-Teller-Sucess-read-delete-edit', async() => {
      await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
            await preparationAccountList.AccountList(options.TellerNum)

            await preparationAddTeller.operationsTeller(options.TellerNum)
        
    }),
    it('Add-Teller-Sucess', async() => {

       await preparationAccountList.AccountList(options.TellerNum1)
      await preparationAddTeller.addTeller(options.TellerNum1)
        await agentDashboard.logout()
        

        })
    
 } )