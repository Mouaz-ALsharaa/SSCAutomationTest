class UserRemittanceOperation{

    
    get btnRemittanceSend () {
        return  $$("button=Remittance Send")[0]
    }
    get btnIncomingRemittance () {
        return  $$("button=Incoming Remittance")[0]
    }
    get PaymentCash () {
        return  $$("button=Payment (Cash)")[0]
    }

    get RemittanceOutward () {
        return  $$("button=Remittance Outward")[0]
    }
    get btnIncomingRemittancetab () {
        return  $$("#home-tab")[0]
    }
    get btnPaymentCashtab () {
        return  $$("#home-tab")[0]
    }
    get btnRemOutwardtab () {
        return  $$("#home-tab")[0]
    }
    get btnMovementstab () {
        return  $$("#home-tab")[1]
    }
    get btnRemittanceSendtab () {
        return  $$("#home-tab")[0]
    }
    get btnSearch () {
        return $('#btnSearch');
    }
    get slctTeller () {
        return $('#slctTeller');
    }
    get slctTransferDelivery () {
        return $('#slctTransferDelivery');
    }
    get inptFullName () {
        return  $("#inptFullName")
    }
    get inptLatinName () {
        return  $("#inptLatinName")
    }
    get inptMotherName () {
        return  $("#inptMotherName")
    }
    get inptSenderPhoneIntenral () {
        return  $$(".form-control.w-100.h-50.rounded-2.bg-body-tertiary")[2]
    }
    get autoNationality () {
        return  $("#autoNationality")
    }
    get dropdownNationality () {
        return  $("#dropdownNationality")
    }
    get inptPlaceOfBirth () {
        return  $("#inptPlaceOfBirth")
    }
    get dateBirthdayDate () {
        return  $("#dateBirthdayDate")
    }
    get slctIdentificationKind () {
        return  $("#slctKindIdentity")
    }
    get inptIdentificationNumber () {
        return  $("#inptNoIdentity")
    }
    get inptIssuedFrom () {
        return  $("#inptIssuedFrom")
    }
    get dateDateIssue () {
        return  $("#dateDateIssue")
    }
    get dateExpirationDate () {
        return  $("#dateExpirationDate")
    }
    get CountryCardAddress () {
        return  $("#CountrySender_Data")
    }
    get autoCountryDestination () {
        return  $("#autoCountryDestination")
    }
    get CountryBeneficCardAddress () {
        return  $("#CountryBenefic_Data")
    }
    get dropdownCountry () {
        return  $("#dropdownCountry")
    }
    get dropdownAreaSender_Data () {
        return  $("#dropdownAreaSender_Data")
    }
    get dropdownAreaBenefic_Data () {
        return  $("#dropdownAreaBenefic_Data")
    }
    get dropdownCountryDestination () {
        return  $("#dropdownCountryDestination")
    }
    get CityCardAddress () {
        return  $("#CitySender_Data")
    }
    get slctCity () {
        return  $("#slctCity")
    }
    get CityCardBeneficAddress () {
        return  $("#CityBenefic_Data")
    }
    get AreaCardAddress () {
        return  $("#AreaSender_Data")
    }
    get AreaCardBeneficAddress () {
        return  $("#AreaBenefic_Data")
    }
    get OtherCardAddress () {
        return  $("#OtherSender_Data")
    }
    get OtherCardBeneficAddress () {
        return  $("#OtherBenefic_Data")
    }
    get slctWork () {
        return  $("#slctWork")
    }
    get slctSourceIncome () {
        return  $("#slctSourceIncome")
    }
    get slctCurrency () {
        return  $("#slctCurrency")
    }
    get slctDestiCity () {
        return  $("#slctDestiCity")
    }
    
    get inptMonthlyIncome () {
        return  $("#inptMonthlyIncome")
    }
    get inptWorkStatement () {
        return  $("#inptWorkStatement")
    }
    get inptHousingCardNo () {
        return  $("#inptHousingCardNo")
    }
    get inptIssuerHousingCard () {
        return  $$("#inptIssuer")[0]
    }
    get dateHousinDataIssued () {
        return  $$("#dateDataIssued")[0]
    }
    get inptAsylumIdentityNo () {
        return  $("#inptAsylumIdentityNo")
    }

    get inptIssuerAsylum  () {
        return  $$("#inptIssuer")[1]
    }
    get dateAsylumDataIssued () {
        return  $$("#dateDataIssued")[1]
    }
    get autoRelationshipSenderBenefıcary () {
        return  $("#autoRelationshipSenderBenefıcary")
    }
    get dropdownRelationshipSenderBenefıcary () {
        return  $("#dropdownRelationshipSenderBenefıcary")
    }
    get autoBankName () {
        return  $("#autoBankName")
    }
    get dropdownBankName () {
        return  $("#dropdownBankName")
    }
    get inptAccNumber () {
        return  $("#inptAccNumber")
    }
    get slctReason1 () {
        return  $("#slctReason1")
    }
    get inptNoteReason () {
        return  $("#inptNoteReason")
    }
    get autoCountryDestination () {
        return  $("#autoCountryDestination")
    }
    get dropdownCountryDestination () {
        return  $("#dropdownCountryDestination")
    }
    get slctDestiCity () {
        return  $("#slctDestiCity")
    }
    get autoAgent () {
        return  $("#autoAgent")
    }
    get dropdownAgent () {
        return  $("#dropdownAgent")
    }

    get slctCurDelivery () {
        return  $("#slctCurDelivery")
    }
    get curAmountDelivery () {
        return  $("#curAmountDelivery")
    }
    get slctKindCommDeliv () {
        return  $$("#slctKindComm")[0]
    }
    get curAdjustCommValueDeliv () {
        return  $$("#curAdjustCommValue")[0]
    }
    get numRatioDeliv () {
        return  $$("#numRatio")[0]
    }

    get slctCurReceipt () {
        return  $("#slctCurReceipt")
    }
    get curAmountReceiv () {
        return  $("#curAmountReceiv")
    }
    get slctKindCommRec() {
        return  $$("#slctKindComm")[1]
    }
    get slctCurComm () {
        return  $("#slctCurComm")
    }
    get slctMethod () {
        return  $("#slctMethod")
    }
    get slctAccReceipt () {
        return  $("#slctAccReceipt")
    }

    get slctBranch () {
        return  $("#slctBranch")
    }
    get autoBranch () {
        return  $("#autoBranch")
    }

    get curAdjustCommValueRece () {
        return  $$("#curAdjustCommValue")[1]
    }
    get numRatioDeliv () {
        return  $$("#numRatio")[1]
    }
    get curTax () {
        return  $("#curTax")
    }
    get curTotal () {
        return  $("#curTotal")
    }
    
    get btnSave () {
        return  $("#btnSave")
    }
    get btnOk () {
        return  $("#btnOk")
    }
    get btnClose () {
        return  $("#btnClose")
    }
    get btnClose0 () {
        return  $$("#btnClose")[0]
    }
    get btnClose1 () {
        return  $$("#btnClose")[1]
    }
    get btnLock () {
        return  $("#btnLock")
    }
    get btnUnLock () {
        return  $("#btnUnLock")
    }
    get btnCancel () {
        return  $("#btnCancel")
    }
    get btnNew () {
        return  $("#btnNew")
    }

    get btnPrint () {
        return  $("#btnPrint")
    }

    get btnApprove () {
        return  $("#btnApprove")
    }
    get btnConfirm () {
        return  $("#btnConfirm")
    }


    get btnKYC () {
        return  $("#btnKYC")
    }

    get spinner (){

        return $('.d-flex.justify-content-center.align-items-center.spinner-border.text-light.fw-bold');
    }

    get slctBranch () {
        return  $("#slctBranch")
    }
    get inptAddress () {
        return  $("#inptAddress")
    }
    get autoSenderName () {
        return  $("#autoSenderName")
    }
    get PhoneNuminternal () {
        return  $$(".form-control.w-100.h-50.rounded-2.bg-body-tertiary")[2]
    }
    get autoBeneficiaryName () {
        return  $("#autoBeneficiaryName")
    }

    get autoAccount () {
        return $('#autoAccount');
    }
    get dropdownAccount () {
        return $('#dropdownAccount');
    }
    get autoCountrySource () {
        return $('#autoCountrySource');
    }
    get dropdownCountrySource () {
        return $('#dropdownCountrySource');
    }
    get slctCity () {
        return $('#slctCity');
    }

    get radioGeneralNumber () {
        return $('#radioGeneralNumber');
    }
    get inptPaySearch () {
        return $('#inptundefined');
    }
   


    get IconOpenCard () {
             return $('//button[@class="btn btn-sm border-0 p-0 px-2 btn-primary"]');
         }
    
         get imgUploadInput () {
            return $('#img-upload-input');
        }
        get slctCurrencySour () {
            return  $$("#slctCurrency")[1]
        }
        get slctCurrencyPay () {
            return  $$("#slctCurrency")[0]
        }
   

  



  
}
export default new UserRemittanceOperation();