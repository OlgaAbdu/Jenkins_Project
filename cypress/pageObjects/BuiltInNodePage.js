import BuildHistoryOnBuildInNodePage from "./BuildHistoryOnBuildInNodePage";
import NodeConfigurePage from "./NodeConfigurePage";

class BuiltInNodePage {
    getBuiltInNodeHeader = () => cy.get('.jenkins-app-bar__content');
    getBuildHistoryLink = () => cy.get('#side-panel a[href$="/builds"]');
    getBreadcrumbsBuildInNodeDrpDwnBtn = () => cy.get('a[href$="/(built-in)/"] .jenkins-menu-dropdown-chevron');
    getBreadcrumbsBuildHistoryDrpDwnLink = () => cy.get('#breadcrumb-menu-target a[href$="/builds"] > span');
    getConfigureSideMenuLink = () => cy.get('a[href$="configure"]');
    getNodePageUrl = () => cy.url();
    getLabelLink = (labelName) => cy.get(`a[href="/label/${labelName}"]`);

    clickBuildHistoryLink() {
        this.getBuildHistoryLink().click();
        return new BuildHistoryOnBuildInNodePage();
    };

    clickBreadcrumbsBuildInNodeDrpDwnBtn() {
        this.getBreadcrumbsBuildInNodeDrpDwnBtn().realHover().click('right');
        return this;
    };

    selectBreadcrumbsBuildHistoryDrpDwnLink() {
        this.getBreadcrumbsBuildHistoryDrpDwnLink().click();
        return new BuildHistoryOnBuildInNodePage();
    };

    clickConfigureSideMenuLink(){
        this.getConfigureSideMenuLink().click();
        return new NodeConfigurePage();
    }
}
export default BuiltInNodePage;
