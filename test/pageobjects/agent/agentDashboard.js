import appServices from "../../Services/appServices.js";

class agentDashboard{

    get btnLogout () {
        return $('.fs-6.iconssc-off.fw-bold');
    }
    get btnlanguage (){

        return $('//span[@class="p-button-icon p-c iconssc-language"]');
        //await $("#MessageArea")
        
    }

    get btnRemittances (){

        return $('#btnRemittances');
    }
    get listlanguage (){

        return $('#pr_id_4_list');
    }
    get btnHome () {
        return $('#btnHome');
    }

    get btnQueries (){

        return $('#btnQueries');
    }
    get btnRemtsOut (){

        return $('#btnRemtsOut');
    }
    get btnReturn (){

        return $$('#btn')[3];
    }
    get btnTransferDelivery (){

        return $('#btnTransferDelivery');
    }
    get btnCurrExchange (){

        return $('#btnCurrExchange');
    }
   
    

    async logout () {
        await this.btnLogout.click();
        await browser.pause(2000)
      
    }

    async ChangeLang(lang){
        await this.btnlanguage.click()
        await browser.pause(1000)
        let keke=await $("#pr_id_4_list").$$("li")[lang]
        await keke.click()
       // appServices.select(await this.listlanguage,lang)
        await browser.pause(1000)


    }


}
export default new agentDashboard();