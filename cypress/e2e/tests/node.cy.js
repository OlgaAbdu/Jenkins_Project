/// <reference types="cypress" />

import HomePage from "../../pageObjects/HomePage";
import newNodePageData from "../../fixtures/pom_fixtures/newNodePageData.json"
import HeaderAndFooter from "../../pageObjects/HeaderAndFooter";
import NodesPage from "../../pageObjects/NodesPage";

describe('node', () => {

    const homePage = new HomePage();
    const headerAndFooter = new HeaderAndFooter();
    const nodesPage = new NodesPage();
  
    it('AT_11.02.01 | <Build Executor Status> Delete Agent from the homepage on the side panel', () => {
        homePage
        .clickBuildExecutorStatusLink()
        .clickNewNodeBtn()
        .typeNodeNameInputField(newNodePageData.nodeName)
        .selectPermanentAgentRadioBtn()
        .clickCreateBtn()
        .clickSaveBtn()

        homePage
         .hoverAndClickNodeNameDrpDwn(newNodePageData.nodeName)
         .selectDeleteAgentDrpDwnLink()
         .clickDeleteBtn()

        headerAndFooter
         .clickJenkinsHomeLink()
         .getBuildExecutorTable()
         .should('not.include.text', newNodePageData.nodeName)
    })

    it('AT_11.01.02 | Verify that user is able to write Node name on the new node page', () => {

        homePage
         .clickBuildExecutorStatusLink()
         .clickNewNodeBtn()
         .typeNodeNameInputField(newNodePageData.nodeName)
         .getNodeNameField()
         .should('have.value', newNodePageData.nodeName)
    })

    it('AT_11.01.03 | <Build Executor Status> Verify that user is able to select type on the new node page', () => {

        homePage
         .clickBuildExecutorStatusLink()
         .clickNewNodeBtn()
         .typeNodeNameInputField(newNodePageData.nodeName)
         .selectPermanentAgentRadioBtn()
         .getPermanentAgentRadioBtn()
         .should('be.checked')
    })

     
    it('AT_11.01.04 | <Build Executor Status> Verify that user is able to add description when creating a new node', () => {

        homePage 
        .clickBuildExecutorStatusLink() 
        .clickNewNodeBtn()
        .typeNodeNameInputField(newNodePageData.nodeName)
        .selectPermanentAgentRadioBtn()
        .clickCreateBtn()
        .addDescription(newNodePageData.nodeDescription)
        .clickSaveBtn()
        .clickNodeName(newNodePageData.nodeName)
        .getDescriptionField()
        .should('contain', newNodePageData.nodeDescription)

        homePage
        .clickBuildExecutorStatusLink()
        .hoverAndClickNodeDrpDwn(newNodePageData.nodeName)
        .selectDeleteDrpDwnLink()
        .clickDeleteBtn()
    })    

    it('AT_11.02.02 | <Build Executor Status> Verify that user is able to delete an agent from Nodes page be clicking the configure located in the table on the main panel', () => {
         homePage
         .clickBuildExecutorStatusLink()
         .clickNewNodeBtn()
         .typeNodeNameInputField(newNodePageData.nodeName)
         .selectPermanentAgentRadioBtn()
         .clickCreateBtn()
         .clickSaveBtn()
       
         nodesPage
         .clickConfigureBtn(newNodePageData.nodeName)
         .clickDeleteAgentLink()
         .clickDeleteBtn()
         .getNodeName(newNodePageData.nodeName)
         .should('not.exist')
    })

    it('AT_11.02.03 | <Build Executor Status> Verify that user is able to delete an agent from Nodes page on the side panel', () => {
        homePage
        .clickBuildExecutorStatusLink()
        .clickNewNodeBtn()
        .typeNodeNameInputField(newNodePageData.nodeName)
        .selectPermanentAgentRadioBtn()
        .clickCreateBtn()
        .clickSaveBtn()

        nodesPage
         .hoverAndClickNodeNameSidePanDrpDwn(newNodePageData.nodeName)
         .selectDeleteDrpDwnLink()
         .clickDeleteBtn()
         .getBuildExecutorTable()
         .should('not.include.text', newNodePageData.nodeName)
    })

    it('AT_11.02.04 | <Build Executor Status> Verify that user is able to delete the agent from Nodes page through Drp Dwn menu located on the main panel', () => {
         homePage
          .clickBuildExecutorStatusLink()
          .clickNewNodeBtn()
          .typeNodeNameInputField(newNodePageData.nodeName)
          .selectPermanentAgentRadioBtn()
          .clickCreateBtn()
          .clickSaveBtn()

        nodesPage
          .hoverAndClickNodeDrpDwn(newNodePageData.nodeName)
          .selectDeleteDrpDwnLink()
          .clickDeleteBtn()
          .getNodeName(newNodePageData.nodeName)
          .should('not.exist')
})

     it('AT_11.02.05 | <Build Executor Status> Verify that user is able to delete the agent from Nodes page by clicking on the agent name on the main panel', () => {
        homePage
          .clickBuildExecutorStatusLink()
          .clickNewNodeBtn()
          .typeNodeNameInputField(newNodePageData.nodeName)
          .selectPermanentAgentRadioBtn()
          .clickCreateBtn()
          .clickSaveBtn()

        nodesPage
          .clickNodeName(newNodePageData.nodeName)
          .clickDeleteAgentLink()
          .clickDeleteBtn()
          .getNodeName(newNodePageData.nodeName)
          .should('not.exist')
})

     it('AT_11.02.06 | <Build Executor Status> Verify that user is able to delete the agent from Nodes page by clicking on the agents name on the side panel', () => {
        homePage
          .clickBuildExecutorStatusLink()
          .clickNewNodeBtn()
          .typeNodeNameInputField(newNodePageData.nodeName)
          .selectPermanentAgentRadioBtn()
          .clickCreateBtn()
          .clickSaveBtn()

        nodesPage
          .clickNodeNameSidePanLink(newNodePageData.nodeName)
          .clickDeleteAgentLink()
          .clickDeleteBtn()
          .getNodeName(newNodePageData.nodeName)
          .should('not.exist')
})

    it('AT_11.01.01 | <Build Executor Status> Create a new Node', () => {

        homePage
        .clickBuildExecutorStatusLink() 
        .clickNewNodeBtn()
        .typeNodeNameInputField(newNodePageData.nodeName)
        .selectPermanentAgentRadioBtn()
        .clickCreateBtn()
        .clickSaveBtn()
        .verifyNewNodeExistsAndVisible(newNodePageData.nodeName)
    })

    after('delete node', () => {
        homePage
            .clickBuildExecutorStatusLink()
            .hoverAndClickNodeDrpDwn(newNodePageData.nodeName)
            .selectDeleteDrpDwnLink()
            .clickDeleteBtn()
    });       
})