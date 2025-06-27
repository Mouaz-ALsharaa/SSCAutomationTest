class AgentRemitPay{

    get selectRemitPayKind (){

        return $('#slctKindRemt');
    }
    get inptGeneralNumber (){

        return $('#inptGeneralNumber');
    }
    get BtnRimtPay (){

        return $('table tbody tr:nth-child(1) td:nth-child(8) button');
    }
    get inptRemittCode (){

        return $('#inptRemittCode');
    }
    get btnOk (){

        return $('#btnOk');
    }
    get btnClose (){

        return $('#btnClose');
    }
    get inptSenderFirstName (){

        return $$('#inptFirstName')[0];
    }
    get inptSendertLatinName (){

        return $$('#inptLatinName')[0];
    }
    get inptAmount (){

        return $('#inptAmount');
    }
    get inptTotalPayment (){

        return $('#inptTotalPayment');
    }
    get dateDatePaid (){

        return $('#dateDatePaid');
    }
    get inptBenficFirstName (){

        return $$('#inptFirstName')[1];
    }
    get inptBenficLatinName (){

        return $$('#inptLatinName')[1];
    }

    get BenficPhone () {
        return $('(//input[contains(@type,"tel")])');
    }
    get selectIdentityKind () {
        return $('#slctIdentificationKind');
    }
    get slctAgents () {
        return $('#slctAgents');
    }
    get inptIdentificationNumber (){

        return $('#inptIdentificationNumber');
    }
    get inptIssuedFrom (){

        return $('#inptIssuedFrom');
    }
    get dateDateIssue (){

        return $('#dateDateIssue');
    }
    get dateExpirationDate (){

        return $('#dateExpirationDate');
    }
    get inptMotherName (){

        return $('#inptMotherName');
    }
    get autoNationality (){

        return $('#autoNationality');
    }
    get dropdownNationality (){

        return $('#dropdownNationality');
    }
    get inptPlaceOfBirth (){

        return $('#inptPlaceOfBirth');
    }
    get dateBirthdayDate (){

        return $('#dateBirthdayDate');
    }
    get CountryAddressDetails (){

        return $('#CountryAddressDetails');
    }
    get dropdownCountry (){

        return $('#dropdownCountry');
    }
    get CityAddressDetails (){

        return $('#CityAddressDetails');
    }
    get AreaAddressDetails (){

        return $('#AreaAddressDetails');
    }
    get dropdownAreaAddressDetails (){

        return $('#dropdownAreaAddressDetails');
    }
    
    get OtherAddressDetails (){

        return $('#OtherAddressDetails');
    }
    get selectWork () {
        return $('#slctWork');
    }
    get inptNote (){

        return $('#inptNote');
    }
    get selectSourceOfIncome () {
        return $('#slctSourceIncome');
    }
    get inptMonthlyIncome (){

        return $('#inptMonthlyIncome');
    }
    get selectSourceOfIncomeCurr () {
        return $('#slctCurrency');
    }
    get inptHousingCardNo (){

        return $('#inptHousingCardNo');
    }
    get inptHousingIssuer (){

        return $$('#inptIssuer')[0];
    }
    get dateDataHousingIssued (){

        return $$('#dateDataIssued')[0];
    }
    get inptAsylumIdentityNo (){

        return $('#inptAsylumIdentityNo');
    }
    get inptAsylumIdentityIssuer (){

        return $$('#inptIssuer')[1];
    }
    
    get dateAsylumIdentityIssued (){

        return $$('#dateDataIssued')[1];
    }
    get selectReason () {
        return $('#slctReason1');
    }
    get inptNoteReason (){

        return $('#inptNoteReason');
    }
    get inptRelationShip (){

        return $('#inptRelationShip');
    }
    get inptAmountDeserved (){

        return $('#inptAmountDeserved');
    }
    get inptCommission (){

        return $('#inptCommission');
    }
    get selectCommissionCurr () {
        return $('#slctCurComm');
    }
    get slctCurrency (){

        return $$('#slctCurrency')[0];
    }
    get inptTotal (){

        return $('#inptTotal');
    }
    get inptTotalWriting (){

        return $('#inptTotalWriting');
    }
    get fileUploadImageCardIdentPhoto (){

        return $('#img-upload-inputCardIdentPhoto');
    }
    get imgUploadInputCopyOfTransferRequest (){

        return $('#img-upload-inputCopyOfTransferRequest');
    }
    get autoRelationshipSenderBenefıcary () {
        return $('#autoRelationshipSenderBenefıcary');
    }
    get dropdownRelationshipSenderBenefıcary () {
        return $('#dropdownRelationshipSenderBenefıcary');
    }
    get btnSave (){

        return $('#btnSave');
    }

    get btnClose (){

        return $('#btnClose');
    }


}

export default new AgentRemitPay();