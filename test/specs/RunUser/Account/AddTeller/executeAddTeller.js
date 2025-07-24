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
    //-------------- عمليات اضافة صندوق ------------------------

   it('Add-Teller-Sucess-read-delete-edit', async() => {
      await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
            await preparationAccountList.AccountListTeller(options.TellerNum)

            await preparationAddTeller.operationsTeller(options.TellerNum)
        
    }),
      //--------------اضافة صندوق بنجاح------------------------
    it('Add-Teller-Sucess', async() => {

       await preparationAccountList.AccountListTeller(options.TellerNum1)
      await preparationAddTeller.addTeller(options.TellerNum1)
        await agentDashboard.logout()
        

        })
    
 } )