class UserAccountOperation{

    get slctTeller () {
        return $('#slctTeller');
    }
    get slctCurrency () {
        return $$('#slctCurrency')[0];
    }
    get slctCurrency1 () {
        return $$('#slctCurrency')[1];
    }
    get autoAccount () {
        return $('#autoAccount');
    }
    get DebtAcc () {
        return $('#DebtAcc');
    }
    get dropdownAccount () {
        return $$('#dropdownAccount')[0];
    }
    get dropdownAccount1 () {
        return $$('#dropdownAccount')[1];
    }
    get inptAmount () {
        return $$('#inptTotal')[0];
    }
    get inptAmount1 () {
        return $$('#inptTotal')[1];
    }
    get curDiscount () {
        return $('#curDiscount');
    }
    get inptCommission () {
        return $('#inptCommission');
    }
    get inptTax () {
        return $('#inptTax');
    }
    get slctKindComm () {
        return $('#slctKindComm');
    }
    get slctTax () {
        return $('#slctTax');
    }
    get slctMethod () {
        return $('#slctMethod');
    }
    get slccheckORpay () {
        return $('#slctundefined');
    }
    get inptDraweeBank () {
        return $('#inptDraweeBank');
    }

    get btnenter () {
        return $('#btnenter');
    }
    get inptNoCheck () {
        return $('#inptNoCheck');
    }
    get inptBeneficiary () {
        return $('#inptBeneficiary');
    }
    get inptDrawerName () {
        return $('#inptDrawerName');
    }
    
    
    get btnSave () {
        return $('#btnSave');
    }
    get btnOk (){

        return $('#btnOk');
    }
    get btnClose (){

        return $('#btnClose');
    }
    get btnNew (){

        return $('#btnNew');
    }
    get btnMovmentstab (){

        return $$('#home-tab')[1];
    }
    get btnReceiptstab (){

        return $$('#home-tab')[0];
    }
    get btnPaymentstab (){

        return $$('#home-tab')[0];
    }
    get btnPayByAccounttab (){

        return $$('#home-tab')[0];
      
    }

    get btnCatchfromAccounttab (){

        return $$('#home-tab')[0];
      
    }
    get btnOrderedtopaytab (){

        return $$('#home-tab')[0];
      
    }
    get btnAdjustmenttab (){

        return $$('#home-tab')[0];
      
    }
    get btnSearch () {
        return $('#btnSearch');
    }
    get inptTotal () {
        return $('#inptTotal');
    }
    get btnLock () {
        return $('#btnLock');
    }
    get btnEdit () {
        return $('#btnEdit');
    }
    get btnUnLock () {
        return $('#btnUnLock');
    }
    get btnCancel () {
        return $('#btnCancel');
    }
    get btnDelete () {
        return $('#btnDelete');
    }
    get btnPrint () {
        return $('#btnPrint');
    }
    get spinner (){

        return $('.d-flex.justify-content-center.align-items-center.spinner-border.text-light.fw-bold');
    }
    get radioDebt (){

        return $('#radioDebt');
    }
    get radioCredit (){

        return $('#radioCredit');
    }
    get inptNotificatNo (){

        return $('#inptNotificatNo');
    }



}
export default new UserAccountOperation();