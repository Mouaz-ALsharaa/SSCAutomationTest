class AgentExchange{

    get ExchingTab (){

        return $$('#home-tab')[0];
    }
    get ExchingMoveTab (){

        return $$('#home-tab')[1];
    }
    get btnSearch (){

        return $('#btnSearch');
    }
    get inptUSD (){

        return $('#curUSD');
    }
    get btnBuyOpp (){

        return $('#btnBuyOpp');
    }
    get btnSaleOpp (){

        return $('#btnSaleOpp');
    }
    get btnClose (){

        return $('#btnClose');
    }
    get btnOk (){

        return $('#btnOk');
    }
}
export default new AgentExchange();