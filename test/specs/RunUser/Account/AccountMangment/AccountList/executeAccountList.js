import LoginPage from '../../../../../pageobjects/login.page.js'
import agentDashboard from '../../../../../pageobjects/agent/agentDashboard.js'
import appServices from '../../../../../Services/appServices.js'
import preparationAccountList from './preparationAccountList.js'
import preparationAddTeller from '../../AddTeller/preparationAddTeller.js'

describe('AccountOperation', async() => {
    var options={
        userAdmin:"admin",
        PasswordAdmin:"Admin@2023",
        TellerNum :await appServices.generateNumber(3)

    }
    //-------------- دليل الحسابات-وكوة ------------------------
   it('AccountList-', async() => {
        await LoginPage.loginUser(options.userAdmin,options.PasswordAdmin)
        
        await preparationAccountList.addAccoutToAccountList("tessst",14,141,2)

        await agentDashboard.logout()
        
    })
    
 } )