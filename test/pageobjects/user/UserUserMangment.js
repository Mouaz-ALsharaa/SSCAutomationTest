class UserUserMangment{

    get btnManagementUsers () {
        return $("a=Management Users");
    }
    get btnNewCustomer () {
        return $("#btnNewCustomer");
    }
    get inptUserName () {
        return $("#inptUserName");
    }
    get passNewPass () {
        return $("#passNewPass");
    }
    get passConfirmPass () {
        return $("#passConfirmPass");
    }
    get btnSave () {
        return $("#btnSave");
    }
    get btnClose0 () {
        return $$("#btnClose")[0];
    }
    get btnClose1 () {
        return $$("#btnClose")[1];
    }
    get btnOk () {
        return $("#btnOk");
    }
    get slctGroup () {
        return $$("#slctGroup")[1];
    }
   
   

}
export default new UserUserMangment();