import NewItemPage from "./NewItemPage";
import OrgFolderMoveChoicePage from "./OrgFolderMoveChoicePage";
import FoldersAndMultibrPipelineDeletePage from "./FoldersAndMultibrPipelineDeletePage";
import FolderConfirmRenamePage from "./FolderConfirmRenamePage";

class FolderPage {
    getAddEditDescriptiotBtn = () => cy.get('#description-link');
    getFolderDescriptionInputField = () => cy.get('textarea[name="description"]');
    getSaveDescriptionBtn = () => cy.get('button[name="Submit"]');
    getFolderDescription = () => cy.get('#description div:first-child');
    getFolderHeader = () => cy.get('#main-panel h1');
    getJobInsideFolderLink = () => cy.get('table td a[href*="job/"]');
    getCreateAJobLink = () => cy.get('a[href="newJob"]')
    getDeleteFolderBtn = () => cy.get('a[href$="/delete"]')
    getRenameFolderLink = () => cy.get('a[href$=confirm-rename]')
    getIconProject = () => cy.get('.icon-pipeline-multibranch-project')
    getDescriptionPreviewLink = () => cy.get(".textarea-show-preview");
    getDescriptionPreview = () => cy.get(".textarea-preview");
    getMoveBtnLeftSidebar = () => cy.get('a[href$=move]');
    getBreadcrumbsFolderBtn = () => cy.get("#breadcrumbBar a[href*=job]")
    getBreadcrumbsFolderDropDownMenu = () => cy.get("a[href*=job] .jenkins-menu-dropdown-chevron")
    getBreadcrumbsFolderItemsList = () => cy.get("ul.first-of-type li a span") 
    getDeleteFolderDrpDwnLink = () => cy.get('#breadcrumb-menu li a[href*="delete"]');  
    getFolderPageTable = () => cy.get('table#projectstatus');
    
    clickAddEditDescriptionBtn() {
        this.getAddEditDescriptiotBtn().click();
        return this;
    };

    typeFolderDescription(name) {
        this.getFolderDescriptionInputField().type(name);
        return this;
    };

    saveFolderDescription() {
        this.getSaveDescriptionBtn().click();
        return this;
    };

    checkJobMoveInsideFolder(name) {
        this.getJobInsideFolderLink()
        .should('have.text', name)
        .and('be.visible');
    };

    clickCreateAJobLink() {
        this.getCreateAJobLink().click();
        return new NewItemPage;
    };

    typeFolderNewDescription(name) {
        this.getFolderDescriptionInputField().clear().type(name);
        return this;
    };

    clickDeleteFolderBtn() {
        this.getDeleteFolderBtn().click();
        return new FoldersAndMultibrPipelineDeletePage;
    };
    
    clickRenameFolderLink() {
        this.getRenameFolderLink().click();
        return new FolderConfirmRenamePage;
    }

    trimFolderHeaderName() {
        
        return this.getFolderHeader().then($el => {
            return $el.text().trim();
        });
    };

    clickDescriptionPreviewLink() {
        this.getDescriptionPreviewLink().click();
        return this;
    }

    clickMoveBtnLeftSidebar() {
        this.getMoveBtnLeftSidebar().click()
        return new OrgFolderMoveChoicePage;
    }

    hoverBreadcrumbsFolderBtn(){
        this.getBreadcrumbsFolderBtn().realHover()
        return this
    }
    clickBreadcrumbsFolderDropDownMenu(){
        this.getBreadcrumbsFolderDropDownMenu().realHover().click({force: true})
        return this
    }

    clickDeleteFolderDrpDwnLink() {
        this.getDeleteFolderDrpDwnLink().click()
        return this;
    }
};

export default FolderPage;
