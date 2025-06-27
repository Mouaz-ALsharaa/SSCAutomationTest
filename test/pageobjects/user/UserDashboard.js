class UserDashboard{

    get btnAccounts () {
        return $$('#dropdown-autoclose-outside')[0];
    }
    get btnTools () {
        return $("span=Tools");
    }

    get btnOperationsDaily () {
        
        return  $('//a[normalize-space()="Operations Daily"]')
    }
    get btnAccountingQueries () {
        
        return  $('//a[normalize-space()="Accounting Queries"]')
    }
    get btnReceipts () {
        
        return  $('//button[normalize-space()="Receipts"]')
    }
    get btnPayments () {
        
        return  $('//button[normalize-space()="Payments"]')
    }
   
    get btnLedger () {
        
        return  $('//button[normalize-space()="Ledger"]')
    }
    get btnPayByAccount () {
        
        return  $('//button[normalize-space()="Pay By Account"]')
    }
    get CatchfromAccount () {
        
        return  $('//button[normalize-space()="Catch from Account"]')
    }
    get Orderedtopay () {
        
        return  $('//button[normalize-space()="Ordered to pay"]')
    }
    get Adjustment () {
        
        return  $('//button[normalize-space()="Adjustment"]')
    }
    get btnAccountManagement () {
        
        return  $('//a[normalize-space()="Account management"]')
    }
    get btnAccountsList () {
        
        return  $('//button[normalize-space()="Accounts List"]')
    }
    get btnCustomersList () {
        
        return  $('//button[normalize-space()="Customers List"]')
    }
    get btnAddTeller () {
        
        return  $('//a[normalize-space()="Add Teller"]')
    }
    get btnRemittance () {
        
        return $("span=Remittance");
    }
    get btnQuickRemittance () {
        
        return $("span=Quick Remittance");
    }
    get btnTransactionSearchApi () {
        
        return $("span=Transaction Search Api");
    }
    get btnRemittanceOperations () {
        
        return $("a=Operations");
    }


    

}
export default new UserDashboard();