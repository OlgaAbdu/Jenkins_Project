import FreestyleProjectRenamePage from "./FreestyleProjectRenamePage";
import FreestyleProjectConfigurePage from "./FreestyleProjectConfigurePage";
import HomePage from "./HomePage";
import GitHubPage from "./GitHubPage";
import FreestyleProjectPageData from '../fixtures/pom_fixtures/freestyleProjectPage.json'
import BuildPage from "./BuildPage";
import HeaderAndFooter from "./HeaderAndFooter";
import newItemPageData from "../fixtures/pom_fixtures/newItemPage.json";
import FreestyleProjectMovePage from "./FreestyleProjectMovePage";

class FreestyleProjectPage {
    getConfigureSideMenuLink = () => cy.get('a[href$="configure"]')
    getRenameSideMenuLink = () => cy.get('#side-panel a[href$="rename"]');
    getFreestyleProjectHeader = () => cy.get('#main-panel h1');
    getGitHubSideMenuLink = () => cy.get('[href="https://github.com/RedRoverSchool/JenkinsQA_JS_06/"]');
    getFreestyleProjectDescription = () => cy.get('#description');
    getDisableProjectBtn = () => cy.get('form#disable-project').find('button[name="Submit"]');
    getHomePageLink = () => cy.get('#jenkins-home-link');
    getFullProjectName = () => cy.get('#main-panel')
    getDisabledProgectWarning = () => cy.get('.warning');
    getAddAndEditDescriptoinBtn = () => cy.get('#description-link');
    getDescriptionInputField = () => cy.get('.jenkins-input');
    getSaveDescriptionBtn = () => cy.get('.jenkins-button--primary');
    getSidePanelOptions = () => cy.get('#side-panel .task span a[href]');
    getDeleteSideMenuLink = () => cy.get('a[data-url$="/doDelete"]');
    getFreestyleProjectDrpDwnBtn = () => cy.get('table#projectstatus button.jenkins-menu-dropdown-chevron');
    getFrestyleProjectDrpDwmMenuList = () => cy.get('.yuimenuitem span');
    getBuildNowSideMenuLink = (projectName) => cy.get(`#tasks .task a[href="/job/${projectName}/build?delay=0sec"]`);
    getPermalinksHeader = () => cy.get('.permalinks-header');
    getBuildsHistoryTableRows = () => cy.get('table tr');
    getLastBuildLink = () => cy.get('#main-panel a[href="lastBuild/"]');
    getHeadIconName = () => cy.get('#jenkins-name-icon');
    getBreadcrumbsFreestyleProjectDrpDwnBtn = () => cy.get('a[href*="/job/"] .jenkins-menu-dropdown-chevron');
    getBreadcrumbsFreestyleProjectDrpDwnRenameLink = () => cy.get('#breadcrumb-menu li a[href$="rename"]');
    getBuildNowLink = () => cy.get('.task a[onclick*=build]');
    getBreadcrumbsJobName =() => cy.get('.jenkins-breadcrumbs__list-item a[href*="/job/"] ').click()
    getJobStatus =() =>cy.get('#tasks .task-link-wrapper .task-link--active')
    getBreadcrumbsFreestyleProjectItemLst = () => cy.get('ul.first-of-type li a span')
    getBreadcrumbsFreestyleProjectDropDownMenu = () => cy.get("a[href*=job] .jenkins-menu-dropdown-chevron")
    getBreadcrumbsFreestyleProjectBtn = () => cy.get("#breadcrumbBar a[href*=job]")
    getChangesLink = () => cy.get('.task a[href*=changes]')
    getMoveSideMenuLink = () => cy.get('a[href$="move"]');
    getBreadcrumbsFreestyleProjectDrpDwnMoveLink = () => cy.get('#breadcrumb-menu li a[href$="move"]');


    clickConfigureSideMenuLink() {
        this.getConfigureSideMenuLink().click()
        return new FreestyleProjectConfigurePage()
    };

    clickRenameSideMenuLink() {
        this.getRenameSideMenuLink().click();
        return new FreestyleProjectRenamePage();
    }

    clickGitHubSideMenuLink() {
        this.getGitHubSideMenuLink().click();
        return new GitHubPage();
    }

    clickHomePageLink() {
        this.getHomePageLink().click();
        return new HomePage();
    }

    clickDisableProjectBtn() {
        this.getDisableProjectBtn().click();
        return this;
    }

    clickAddAndEditDescriptoinBtn() {
        this.getAddAndEditDescriptoinBtn().click();
        return this
    }

    typeDescriptionToInputField(description) {
        this.getDescriptionInputField().type(description);
        return this
    }

    clickSaveDescriptionBtn() {
        this.getSaveDescriptionBtn().click();
        return this
    }

    clearDescriptionInputField() {
        this.getDescriptionInputField().clear();
        return this
    }

    checkLengthOfOptionsSidePanel() {
        this.getSidePanelOptions().should('have.length', 7)
        return this
    }

    clickDeleteSideMenuLink() {
        this.getDeleteSideMenuLink().click();
        return new HomePage;
    }

    clickFreestyleProjectDrpDwnMenu() {
        this.getFreestyleProjectDrpDwnBtn().realHover().click();
        return this;
    }

    checkFreestyleProjectDrpDwnMenuItemsName() {
        this.getFrestyleProjectDrpDwmMenuList()
            .then(($els) => {
                let actual = Cypress.$.makeArray($els).map($el => $el.innerText)
                expect(actual).to.be.deep.equal(FreestyleProjectPageData.freestyleDropdownItems)
            })
        return this;
    }

    clickBuildNowSideMenuLink(projectName) {
        this.getBuildNowSideMenuLink(projectName).click();
        this.getPermalinksHeader().should("be.visible");
        return this;
    }

    clickLastBuildLink() {
        this.getLastBuildLink().should("be.visible").click();
        return new BuildPage();
    }

    clickHeadIconName() {
        this.getHeadIconName().click();
        return new HeaderAndFooter()
    }

    clickBreadcrumbsFreestyleProjectDrpDwnBtn() {
        this.getBreadcrumbsFreestyleProjectDrpDwnBtn().realHover().click('right');
        return this;
    };

    selectRenameBreadcrumbsFreestyleProjectDrpDwnLink() {
        this.getBreadcrumbsFreestyleProjectDrpDwnRenameLink().click();
        return new FreestyleProjectRenamePage();
    };

    clickGetBuildNowLink(){
        this.getBuildNowLink().click()
        return this;
    };
    clickJobStatus(){
        this.getJobStatus().click()
        return this;
    };

    clickBreadcrumbsFreesyleProjectDropDownMenu() {
    this.getBreadcrumbsFreestyleProjectDropDownMenu().click()
    return this
    }
    hoverBreadcrumbsFreestyleProjectBtn(){
    this.getBreadcrumbsFreestyleProjectBtn().realHover()
    return this
    }

    verifyFreestyleProjectStatusPageURL() {
        cy.url().should('eq', `http://localhost:${Cypress.env('local.port')}/job/${newItemPageData.freestyleProjectName}/`);
        return this;
    }

    checkAddAndEditDescriptoinBtn(){
        return this.getAddAndEditDescriptoinBtn()
        .should('be.visible')
        .invoke('text')
        .then((text) => text.trim())    
    }

    clickChangesLink(){
        this.getChangesLink().click()
        return this
    }

    checkFullProjectName(){
        return this.getFullProjectName()
        .should('be.visible')
        .invoke('text')
        .then((text) => text.replace(/\s+/g, ' '))
        .then((text) => text.replace(/........./, ""))    
    }

    clickMoveSideMenuLink() {
        this.getMoveSideMenuLink().click()
        return new FreestyleProjectMovePage();
    };

    selectMoveBreadcrumbsFreestyleProjectDrpDwnLink() {
        this.getBreadcrumbsFreestyleProjectDrpDwnMoveLink().click();
        return new FreestyleProjectMovePage();
    };

};

export default FreestyleProjectPage;
