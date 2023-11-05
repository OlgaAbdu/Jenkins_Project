import HomePage from "../pageObjects/HomePage";
import JenkinsPage from './JenkinsPage'
import LoginPage from "./LoginPage";
import MyViewPage from "./MyViewPage";
import RestAPIPage from "./RestAPIPage"
import ResultSearchBoxPage from "./ResultSearchBoxPage";
import UserBuildsPage from "./UserBuildsPage";
import UserConfigurePage from "../pageObjects/UserConfigurePage";
import UserCredentialsPage from './UserCredentialsPage';
import UserProfilePage from "./UserProfilePage";
import searchBoxDocumentationPage from "./SearchBoxDocumentationPage";
import SystemLogPage from "./SystemLogPage";
import FreestyleProjectPage from "./FreestyleProjectPage";
import BuiltInNodePage from "./BuiltInNodePage";
import ManageJenkinsPage from "./ManageJenkinsPage";

class HeaderAndFooter {
    getUserNameLink = () => cy.get('div.login a[href*="user"]');
    getUserDropDownBtn = () => cy.get('div.login a[href*="user"] button');
    getUserConfigureMenu = () => cy.get('#breadcrumb-menu li a[href*="configure"] span');
    getUserDropdownMenuItemsList = () => cy.get('.bd li');
    getRestAPILink = () => cy.get('[href="api/"]');
    getUserMyViewsMenu = () => cy.get('#breadcrumb-menu li a[href*="my"] span');
    getJenkinsHomeLink = () => cy.get('#jenkins-home-link');
    getSearchBox = () => cy.get('#search-box');
    getLogOutBtn = () => cy.get('[href="/logout"]');
    getSearchBoxInputField = () => cy.get('input#search-box');
    getSearchBoxResultDropDownList = () => cy.get('#search-box-completion li:not([style="display: none;"])');
    getJenkinsLinkVerNumber = () => cy.get('.jenkins_ver a');
    getJenkinsVersionLink = () => cy.get('div[class$="white jenkins_ver"] a')
    getUserBuildsMenu = () => cy.get('#breadcrumb-menu li a[href*="builds"] span');
    getHeadIcon = () => cy.get('#jenkins-head-icon');
    getHeadIconName = () => cy.get('#jenkins-name-icon');
    getUserCredentialsMenu = () => cy.get('#breadcrumb-menu li a[href*="credentials"] span');
    getSearchBoxIconTrailing = () => cy.get('.main-search__icon-trailing');
    getUserDropDownMenuCredentials = () => cy.get('#yui-gen4');
    getCurrentUserName = () => cy.get('.login .model-link span');
    getTitle = () => cy.get('head title');
    getListSearchResult = () => cy.get('.yui-ac-bd li').not('li[style="display: none;"]');
    getNotificationCounter = () => cy.get('#visible-am-button.am-button .am-monitor__count');
    getNotificationIcon = () => cy.get('#visible-am-button svg');
    getNotificationPopUp = () => cy.get('#visible-am-list');
    getNotificationContainer = () => cy.get("#visible-am-container") 
    getSecurityBtn = () => cy.get('#visible-sec-am-button');
    getSecurityNotificationPopUp = () => cy.get('#visible-sec-am-container');
    getSecurityNotificationList = () => cy.get('#visible-sec-am-list');
    getSecurityNotificationListItems = () => cy.get('#visible-sec-am-list li.am-message'); 
    getSecurityNotificationCounter = () => cy.get('#visible-sec-am-insertion .am-monitor__count');
    getManageJenkinsLink = () => cy.get('#visible-sec-am-list a[href="/manage"]');
    
    clickJenkinsVersionLink() {
        this.getJenkinsVersionLink().invoke('removeAttr', 'target').click()
        return new JenkinsPage;
    }

    clickUserDropDownBtn() {
        this.getUserDropDownBtn().realHover().click();
        return this;
    }

    selectUserConfigureMenu() {
        this.getUserConfigureMenu().click();
        return new UserConfigurePage();
    }

    clickRestAPILink() {
        this.getRestAPILink().click()
        return new RestAPIPage();
    }

    createUserDropdownMenuItemsList() {
        return this
            .getUserDropdownMenuItemsList()
            .then($els => {
                return Cypress._.map($els, 'innerText')
            });
    }

    selectUserMyViewsMenu() {
        this.getUserMyViewsMenu().click();
        return new MyViewPage();
    }

    clickJenkinsHomeLink() {
        this.getJenkinsHomeLink().click();
        return new HomePage();
    }

    searchTextSearchBox(text) {
        this.getSearchBoxInputField().clear().type(text + '{enter}');
        return new ResultSearchBoxPage();
    }

    clickLogOutBtn() {
        this.getLogOutBtn().click();
        return new LoginPage();
    }

    typeSearchBoxInputField(text) {
        this.getSearchBoxInputField().clear().type(text);
        return this;
    }

    trimSearchBoxResultDropDownList() {
        return this.getSearchBoxResultDropDownList().each(($el) => {
            return cy.wrap($el.text().trim());
        });
    }

    isIncludedLowerAndUpperLetters(text, lowerLetter, upperLetter) {
        return text.includes(lowerLetter) || text.includes(upperLetter);
    }

    selectUserBuildsMenu() {
        this.getUserBuildsMenu().click();
        return new UserBuildsPage();
    }

    selectUserCredentialsMenu() {
        this.getUserCredentialsMenu().click();
        return new UserCredentialsPage();
    }

    clickUserNameLink() {
        this.getUserNameLink().click();
        return new UserProfilePage();
    }

    clickEachDropdownMenuItems(idx) {
        this.getUserDropdownMenuItemsList().eq(idx).click();
        return this;
    }

    verifyPagesUrl(idx) {
        cy.url().should('contain', idx);
        return this;
    }

    clickSearchBoxIconTrailing() {
        this.getSearchBoxIconTrailing().click();
        return new searchBoxDocumentationPage();
    }

    clickUserDropDownMenuCredentials() {
        this.getUserDropDownMenuCredentials().click();
        return new UserCredentialsPage();
    }

    clickHeadIcon() {
        this.getHeadIcon().click();
        return new HomePage();
    }

    typeSearchBoxInputFieldAndGoSystemLog(text) {
        this.getSearchBoxInputField().clear().type(text + '{enter}');
        return new SystemLogPage();
    }

    selectSearchResult(text) {
        this.getListSearchResult().each($el => {
            if ($el.text() === text) {
                cy.wrap($el).click().type('{enter}')
            }
        })
        return new FreestyleProjectPage();
    }

    typeEnterEmptySearch() {
        this.getSearchBoxInputField().type('{enter}');
        return new BuiltInNodePage ();
    }

    hoverRestAPILink() {
        this.getRestAPILink().realHover();
        return this
    }

    verifySearchBoxResultDropDownList(data) {
        this.getSearchBoxResultDropDownList().each(($el) => {
            cy.wrap($el.text().trim()).should('include', data)
        })
    }

    hoverJenkinsVersionLink() {
        this.getJenkinsVersionLink().realHover();
        return this;
    };

    clickSecurityBtn() {
        this.getSecurityBtn().click();
        return this;
    };

    checkSecurityNotificationListNotVisible() {
        this.getSecurityNotificationList()
        .should("not.be.visible")
        .and('have.css', 'opacity', '0')
        .and('have.css', 'z-index', '0');
        return this;
    }
   
    checkSecurityNotificationPopUpClass() {
        this.getSecurityNotificationPopUp()
        .should('have.class', 'visible');
        return this;
    }

    clickNotificationIcon() {
        this.getNotificationIcon().click();
        return this;
    };

    checkNotificationPopUpNotVisible() {
        this.getNotificationPopUp().should("not.be.visible");
        return this;
    };
    
    checkNotificationContainertVisible() {
        this.getNotificationContainer().should('have.class', 'visible');;
        return this;
    };
    
    getUserNameOnThePage() {
        return this.getUserNameLink().invoke("text");
    };
    
    clickSecurityNotificationPopUpBtn() {
        this.getSecurityNotificationPopUp().click();        
        return this;
    };

    clickManageJenkinsLink() {
        this.getManageJenkinsLink().click();
        return new ManageJenkinsPage();
    };
    
}

export default HeaderAndFooter;