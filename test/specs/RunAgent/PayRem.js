
import agentDashboard from '../../pageobjects/agent/agentDashboard.js'
import LoginPage from '../../pageobjects/login.page.js'
import AgentRemittances from '../../pageobjects/agent/AgentRemittances.js'
import AgentRemBlack from '../../pageobjects/agent/AgentRemBlack.js'
import componant from '../../pageobjects/componant/componant.js'
import Operation from '../../pageobjects/componant/Operation.js'
import AgentQueries from '../../pageobjects/agent/AgentQueries.js'
import AgentRemitPay from '../../pageobjects/agent/AgentRemitPay.js'
import AgentCredit from '../../pageobjects/agent/AgentCredit.js'
import AgentBalances from '../../pageobjects/agent/AgentBalances.js'
//import {variable} from '../pageobjects/componant/variable.js'
import { expect as expectChai } from 'chai'
import { Key } from 'webdriverio'
import fs from '../../../node_modules/fs-js/index.js'

describe('forth', async () => {
    
   var options = {
    userPayName: "كندا",
    Paypassword: "Admin@2022",
    Note: "TestTestTest",
    Amount: await componant.generateNumber(3),
    CommAmount: "10",
    Country: "cana",
    Country1: "syr",
    City: "ottawa",
    Sendername: await componant.generateName(),
    Benficname: await componant.generateName(),
    Nationality: "Ira",
    OtherAddress: "OtherAddressTest",
    PlaceOfBirth: "PlaceOfBirthTest",
    Day: await componant.generateNumber(2),
    Month: "10",
    Yearold: "1988",
    YearNew: "2025",
    IdentificationNumber: await componant.generateNumber(11),
    mother: "TestMother",
    IssuedFrom: "IssuedFromTest",
    MonthlyIncome: await componant.generateNumber(4),
    WorkStatement: "WorkStatementTest",
    HousingCardNo: await componant.generateNumber(4),
    HousingIssuer: "HousingIssuerTest",
    AsylumIdentityNo: await componant.generateNumber(4),
    AsylumIssuer: "AsylumIssuerTest",
    Relation: "bro",
    NoteReason: "NoteReasonTest",
    BankName: "test",
    accountNum: await componant.generateNumber(14),
    ImgPath: "/SSCTFS/SSC_DEV/SSCAutomationTest/test/Images/01.JPG",
 }
   it('payRemmit in base currancy', async () => {
        await browser.pause(1000)
       await LoginPage.open()
       await browser.pause(2000)
       const LogIn = await componant.getrequestbyurl('/Login/LogIn', async function () { await LoginPage.loginAgent(options.userPayName, options.Paypassword) })
       const RemCode = LogIn.response.body.AdditionalData.Options.RemCode

       await Operation.payRemAgent(0,"NUID",RemCode)

        await browser.pause(1000)

        await Operation.payRemAgent(0,"CUID",RemCode)
        await browser.pause(1000)
       await agentDashboard.logout()
    }),
    it('payRemmit-API in base currancy', async () => {
      await browser.pause(1000)
     await LoginPage.open()
     await browser.pause(2000)
     const LogIn = await componant.getrequestbyurl('/Login/LogIn', async function () { await LoginPage.loginAgent(options.userPayName, options.Paypassword) })
     const RemCode = LogIn.response.body.AdditionalData.Options.RemCode
     await Operation.payRemAgent(1,"ApiUID",RemCode)
     await browser.pause(1000)
     await Operation.payRemAgent(1,"ApiUIDC",RemCode)
     await browser.pause(3000)

     await agentDashboard.logout()
  })
 })