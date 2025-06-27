class UserAddTeller{

    
    get inptTellerName () {
        return  $("#inptTellerName")
    }

    get CurrenciesTab (){

        return $$('#home-tab')[2];
    }
    get TellerTab (){

        return $$('#home-tab')[1];
    }
    get btnSave () {
        return  $("#btnSave")
    }
    get btnUpdate () {
        return  $("#btnUpdate")
    }
    get btnDelete () {
        return  $("#btnDelete")
    }
    get btnOk () {
        return  $("#btnOk")
    }
  
}
export default new UserAddTeller();