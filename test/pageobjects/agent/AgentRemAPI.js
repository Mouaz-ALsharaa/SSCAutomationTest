class AgentRemAPI{
    get selectApiAgent () {
        return $('#slctAgents');
    }
    get selectCountry () {
        return $('#slctCountry');
    }
    get selectCity () {
        return $('#slctCity');
    }
    get selectAgent () {
        return $('#slctAgent');
    }
    get selectDelvCurr0 () {
        return $$('#slctCurDelivery')[0];
    }
    get selectDelvCurr1 () {
        return $$('#slctCurDelivery')[1];
    }
    get selectCurr0 () {
        return $$('#slctCurReceipt')[0];
    }
    get selectCurr1 () {
        return $$('#slctCurReceipt')[1];
    }
    get selectCommCurr () {
        return $('#slctCurComm');
    }
    get selectIdentityKind () {
        return $('#slctIdentificationKind');
    }
    get selectWork () {
        return $('#slctWork');
    }

    get selectSourceOfIncome () {
        return $('#slctCurrency');
    }
    get selectSourceOfIncomeCurr () {
        return $('#slctSourceIncome');
    }
    get selectReason () {
        return $('#slctReason1');
    }
    get curAmountDelivery () {
        return $('#curAmountDelivery');
    }
    
    get btnNextfirst () {
        return $('#btnNext');
    }
    get btnClose () {
        return $('#btnClose');
    }
}
export default new AgentRemAPI();