class UserAccountMangment{

    get AddAccountLocal () {
        return  $("//div[@id='115']//span[@class='fs-6 iconssc-plus-1 ']")
    }
    get inptAccName () {
        return  $("#inptAccName")
    }

    get btnSave () {
        return  $("#btnSave")
    }
    get btnOk () {
        return  $("#btnOk")
    }
    get btnNew () {
        return  $("#btnNew")
    }
    get btnCancel () {
        return  $("#btnCancel")
    }
    get inptAgent () {
        return  $("#inptAgent")
    }
    get inptEmail () {
        return  $("#inptEmail")
    }
    get inptAuthorizedAcc () {
        return  $("#inptAuthorizedAcc")
    }
    get inptPhone () {
        return  $("#inptPhone")
    }
    get AddAccountForeign () {
        return  $("//div[@id='275']//span[@class='fs-6 iconssc-plus-1 ']")
    }
    get AddAgentAccount () {
        return  $("//div[@id='276']//span[@class='fs-6 iconssc-plus-1 ']")
    }
    get btnAdditionalData () {
        return  $("//button[normalize-space()='Additional Data']")
    }
    get btnApiUsers () {
        return  $("//button[normalize-space()='Api Users']")
    }
   

    async AddAccCheck (ChekNum) {
        return  $("(//input[contains(@name,'chk')])"+"["+ChekNum+"]")
    }


    async AccountTree (AccNum) {
        return $('div='+AccNum)
    }


}
export default new UserAccountMangment();