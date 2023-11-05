import NodeConfigurePage from "./NodeConfigurePage";
import BuildInNodePage from "./BuiltInNodePage";
import BuildHistoryOnBuildInNodePage from "./BuildHistoryOnBuildInNodePage";
import NewNodePage from "./NewNodePage";
import NodeDeletePage from "./NodeDeletePage";
import AgentPage from "./AgentPage"

class NodesPage {
    getBuiltInNodeGearBtn = () => cy.get('a[href*="(built-in)/configure"]');
    getNodeName = (nodeName) => cy.get(`#computers a[href="/manage/computer/${nodeName}/"]`)
    getNodeDrpDwn = (nodeName) => cy.get(`#computers a[href="/manage/computer/${nodeName}/"] > button`)
    getNodeDropdownConfigureLink = (nodeName) => cy.get(`a[href="/manage/computer/${nodeName}/configure"] > span`);
    getBuildHistoryDrpDwnLink = () => cy.get('a[href$="/builds"] > span');
    getNewNodeBtn = () => cy.get('div a[href="new"]');
    getDeleteDrpDwnLink = () => cy.get('a[href$="/delete"] > span');
    getConfigureBtn = (nodeName) => cy.get(`#computers #node_${nodeName} a svg`);
    getNodeNameSidePanLink = (nodeName) => cy.get(`#executors .pane a[href="/manage/computer/${nodeName}/"]`);
    getNodeNameSidePanDrpDwnLink = () => cy.get('#executors div table tr:nth-child(4) a button');
    getBuildExecutorTable = () => cy.get('#executors')

    clickBuiltInNodeGearBtn() {
        this.getBuiltInNodeGearBtn().should('be.visible').click();
        return new NodeConfigurePage();
    }

    hoverAndClickNodeDrpDwn(nodeName) {
        this.getNodeName(nodeName).realHover();
        this.getNodeDrpDwn(nodeName).click();
        return this;
    }

    selectConfigNodeDrpDwnMenuBtn(nodeName){
        this.getNodeDropdownConfigureLink(nodeName).click();
        return new NodeConfigurePage();
    }

    clickBuildInNodeName(buildInNode) {
        this.getNodeName(buildInNode).click();
        return new BuildInNodePage();
    };

    selectBuildHistoryDrpDwnLink(buildInNode) {
        this.getBuildHistoryDrpDwnLink(buildInNode).click();
        return new BuildHistoryOnBuildInNodePage();
    };

    clickNewNodeBtn() {
        this.getNewNodeBtn().click();
        return new NewNodePage();
    }
    
    verifyNewNodeExistsAndVisible(nodeName) {
        this.getNodeName(nodeName).should('exist').and('be.visible')
    }

    selectDeleteDrpDwnLink() {
        this.getDeleteDrpDwnLink().click();
        return new NodeDeletePage();
    };

    clickNodeName(nodeName) {
        this.getNodeName(nodeName).click({force: true});
        return new AgentPage();
    }

    clickConfigureBtn(nodeName) {
        this.getConfigureBtn(nodeName).click();
        return new NodeConfigurePage();
    }

    hoverAndClickNodeNameSidePanDrpDwn(nodeName) {
        this.getNodeNameSidePanLink(nodeName).realHover();
        this.getNodeNameSidePanDrpDwnLink().click();
        return this;
    }

    clickNodeNameSidePanLink(nodeName) {
        this.getNodeNameSidePanLink(nodeName).click();
        return new AgentPage();
      }
}

export default NodesPage;
