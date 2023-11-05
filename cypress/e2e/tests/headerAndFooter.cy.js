/// <reference types="cypress" />

import HeaderAndFooter from "../../pageObjects/HeaderAndFooter";
import restAPIPageData from "../../fixtures/pom_fixtures/restAPIPage.json";
import homePageData from "../../fixtures/pom_fixtures/homePage.json";
import resultSearchBoxData from "../../fixtures/pom_fixtures/resultSearchBox.json";
import loginPageData from "../../fixtures/pom_fixtures/loginPage.json";
import headerAndFooterData from "../../fixtures/pom_fixtures/headerAndFooter.json";
import dashboardBreadcrumbsData from "../../fixtures/pom_fixtures/dashboardBreadcrumbs.json";
import userConfigurePageData from "../../fixtures/pom_fixtures/userConfigurePage.json"
import HomePage from "../../pageObjects/HomePage";
import searchBoxDocumentationPageData from "../../fixtures/pom_fixtures/searchBoxDocumentationPage.json";
import userBuildsPageData from "../../fixtures/pom_fixtures/userBuildsPage.json";
import restApiDocPageData from "..//..//fixtures/pom_fixtures/restApiDocPage.json";
import SystemLogPage from "../../pageObjects/SystemLogPage";
import ResultSearchBoxPage from "../../pageObjects/ResultSearchBoxPage";
import myViewData from "../../fixtures/pom_fixtures/myView.json";
import UserCredentialsPage from "../../pageObjects/UserCredentialsPage";
import MyViewPage from "../../pageObjects/MyViewPage";
import userCredentialsPageData  from '../../fixtures/pom_fixtures/userCredentialsPage.json';
import manageJenkinsPageData from '../../fixtures/pom_fixtures/manageJenkinsPage.json';

describe('headerAndFooter', () => {

    const headerAndFooter = new HeaderAndFooter();
    const homePage = new HomePage();
    const systemLogPage = new SystemLogPage();
    const resultSearchBoxPage = new ResultSearchBoxPage();
    const userCredentialsPage = new UserCredentialsPage();
    const myViewPage = new MyViewPage();
 
    it('AT_03.01.02 | Verify link Rest Api redirected to the page with correct header', () => {
        headerAndFooter
            .clickRestAPILink()
            .getRestApiTitle()
            .should('have.text', restAPIPageData.restAPIPageTitle)
    })

    it('AT_01.02_019 | No results appear after input text in the Search box', function () {
        headerAndFooter
            .searchTextSearchBox(headerAndFooterData.inputText)
            .getResultNoMatch()
            .should('have.text', resultSearchBoxData.resultSearchNoMatchMsg)
    })

    it('AT_01.08_002 | Verify logout button redirects to the login page', function () {
        headerAndFooter
            .clickLogOutBtn()
            .getWelcomeMessage()
            .should('have.text', loginPageData.welcomeMessage)
    });

    it('AT_01.02_003 | Verify the placeholder text “Search (CTRL+K)" in the input field of the Search box', () => {
        headerAndFooter
            .getSearchBoxInputField()
            .should('have.attr', 'placeholder', headerAndFooterData.searchBoxPlaceholder);
    });

    it('AT_01.02_032 | Verify that the search query matches the result in the search dropdown', () => {
        headerAndFooter
            .typeSearchBoxInputField(headerAndFooterData.inputLowerCase)
            .trimSearchBoxResultDropDownList()
            .should('satisfy', ($text) => {
                return headerAndFooter
                    .isIncludedLowerAndUpperLetters($text, headerAndFooterData.inputLowerCase, headerAndFooterData.inputUpperCase);
            })
    });

    it('AT_01.01_003 | Verify Jenkins icon and name-icon are visible', () => {
        headerAndFooter
            .getHeadIcon()
            .should('be.visible');
        headerAndFooter
            .getHeadIconName()
            .should('be.visible');
    });

    it('AT_01.06.09 | Header> Verify Breadcrumb should be including "My Views" in the trail after clicking on Dropdown Profile My Views option', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserMyViewsMenu()
            .getDashboardMyViewsLink().should('have.text', dashboardBreadcrumbsData.dashboardDropdownMenu[4])
    });

    it('AT_03.02.01 Verify the Link Jenkins is visible', () => {
        headerAndFooter
            .getJenkinsLinkVerNumber()
            .should('be.visible')
    });


    it('AT_01.01_019 | Redirection to the homepage by label', () => {
        homePage
            .clickNewItemSideMenuLink()
        headerAndFooter    
            .clickJenkinsHomeLink()             
        homePage    
            .getHomePageLink()
            .should('eq', `http://localhost:${Cypress.env('local.port')}/`);
     });
    
    it('AT_01.03_030 Verify User Dropdown menu has links with specifiс endings.', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .getUserDropdownMenuItemsList().each(($el, idx) => {
                expect($el.html()).contain(headerAndFooterData.userDropdownMenuItems[idx]);             
            })           
    });

    headerAndFooterData.userDropdownMenuItems.forEach((pageName, idx) => {
        it(`AT_01.03_029 | Header | User icon - Verify dropdown menu links redirect to the ${pageName} pages`, function () {
            headerAndFooter
                .clickUserDropDownBtn()
                .clickEachDropdownMenuItems(idx)
                .verifyPagesUrl(headerAndFooterData.userDropdownMenuItemsUrl[idx])
                .getTitle()
                .should('contain', headerAndFooterData.title[idx])
        });
    });

    it.skip('AT_01.02_001 | Verify that user navigate to Search Box documentation page', () => {
        headerAndFooter
            .clickSearchBoxIconTrailing()
            cy.url().should('eq', searchBoxDocumentationPageData.searchBoxDocumentationPageURL)
    });

    it('AT_03.02.005 | Footer Verify user is redirected to the correct page after clicking the Link Jenkins', () => {
        headerAndFooter
            .clickJenkinsVersionLink()
            .verifyJenkinsioPageUrl(headerAndFooterData.version.link)
            .getPageTitle()
            .should('contain', headerAndFooterData.pageTitle);
    });

    it('AT_01.04.009 Header>Verify User Builds link  is clickable and redirects to the “Builds for ‘User’ “ page.', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserBuildsMenu()
            .getPageHeading()
            .should('contain', userBuildsPageData.heading + Cypress.env('local.admin.username'));
    });
   
    it('AT_01.03.04 | The users name should be visible in the header', () => {
        headerAndFooter
            .getCurrentUserName()
            .should('be.visible');
    });

    it.skip('AT 03.01.03 <Footer>Verify user can open Link The documentation in REST API and can see 10 modules per page',()=>{
        headerAndFooter
            .clickRestAPILink()
            .clickLinkTheDocumentation()
            .getRestApiDocPageItemsList().should('have.length',10)
            .each(($el,idx)=>{
                expect($el.text()).to.contain(restApiDocPageData.RestApiDocPageItemsList[idx])
            })
    });

    it('AT_01.05.16 | <Header> Verify that the Configure Tab in Left Side panel is highlighted after clicking on Dropdown Profile Configure option', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserConfigureMenu()
            .getUserBuildsSidePanelConfigureLink()
            .within(($el) => {
                cy.window().then((win) => {
                    const beforeElement = win.getComputedStyle($el[0], "::before");
                    const background = beforeElement.getPropertyValue("background-color");
                    expect(background).to.equal("rgba(175, 175, 207, 0.224)");
                })
            })
    });

    it('AT_01.02.28 | <Header> Verify Search box is case insensitive by default', () => {
            searchBoxDocumentationPageData.dataCapCase.forEach(($el,idx) => {      
            headerAndFooter
                .typeSearchBoxInputFieldAndGoSystemLog(searchBoxDocumentationPageData.dataCapCase[idx])
                .getAllLogsLinks()
                .should('have.text', searchBoxDocumentationPageData.testdata);            
        })
    })

    it('AT_01.02.35 < Header > Search box | Verify that user can select the item from the context menu and be redirected to Serch Result Page', () => {
        searchBoxDocumentationPageData.setNamesForNewProject.forEach((obj) => {
            homePage
                .clickNewItemSideMenuLink()
                .typeNewItemNameInputField(`${obj.name}`)
                .selectFreestyleProjectItem()
                .clickOkBtnAndGoFreestyleProjectConfig()
                .clickSaveBtnAndGoFreestyleProject()
                .clickHeadIconName() 
        })
            headerAndFooter
                .typeSearchBoxInputField(searchBoxDocumentationPageData.searchBoxInput)
                .selectSearchResult(searchBoxDocumentationPageData.setNamesForNewProject[0].name)
                .getFreestyleProjectHeader()
                .should('contain', `Project ${searchBoxDocumentationPageData.setNamesForNewProject[0].name}`)
    })

    it('AT_01.04.10 | <Header> Verify that the Builds Tab in Left Side panel should be highlighted after clicking on Dropdown Profile Builds option', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserBuildsMenu()
            .getBuildsMenuLink()
            .within(($el) => {
                cy.window().then((win) => {
                    const beforeElement = win.getComputedStyle($el[0], "::before");
                    const background = beforeElement.getPropertyValue("background-color");
                    expect(background).to.equal("rgba(175, 175, 207, 0.224)");
                })
            })
    });

    it('AT_01.02_004 | User is able to get Search Box by a keyboard shortcut (Ctrl+K)', function () {
        homePage
            .openSearchByShortCut()
            .typeSearchBoxInputField(searchBoxDocumentationPageData.multibranchPipeline.name + '{enter}')
        
        resultSearchBoxPage
            .getHeader()
            .should('have.text', searchBoxDocumentationPageData.multibranchPipeline.searchPage)
            .and('be.visible');
    });

    it('AT_01.02.36 | Entering an empty field redirects to built-in node', function () {
        homePage
          .openSearchByShortCut()
          .typeEnterEmptySearch()
          .getBuiltInNodeHeader()
          .should('be.visible')
          .and('have.text', searchBoxDocumentationPageData.builtInNodeText)
    });

    it('AT_01.02.029 | Verify configure of case sensitive option in the Search box', () => {
        headerAndFooter
          .clickUserDropDownBtn()
          .selectUserConfigureMenu() 
          .clickSensitiveSearchCheckbox()
          .clickUserConfigSaveBtn()
        searchBoxDocumentationPageData.dataCapCase.forEach(($el,idx) => {      
           headerAndFooter
            .searchTextSearchBox(searchBoxDocumentationPageData.dataCapCase[idx])
            .getResultNoMatch()
          .should('have.text', resultSearchBoxData.resultSearchNoMatchMsg);
        })
    });

    it('AT_03.01.08 | Footer Verify that Link REST API changes color', () => {
        headerAndFooter
            .hoverRestAPILink()
            .getRestAPILink()
            .should('have.css', 'color', headerAndFooterData.colorLink)
    })

    it('AT_01.02.37 | Entering a single character brings up a context menu that contains the entered character', function () {
        homePage
          .openSearchByShortCut()
          .typeSearchBoxInputField(searchBoxDocumentationPageData.singleCharacter)
          .verifySearchBoxResultDropDownList(searchBoxDocumentationPageData.singleCharacter)
    })

    it('AT_01.06.02 | Header > Verify redirection to the “My Views“ Page with endpoint /my-views/view/all/ and title "Dashboard [Jenkins]" after ckicking on Dropdown Profile My Views option', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserMyViewsMenu()
            .getAllMyViewsPageLink()
            .should('contain', myViewData.allMyViewsPageURL)
        myViewPage
            .getMyViewsPageTitle()
            .should('have.text', myViewData.myViewsPageTitle)            
    });

    it('AT_01.06.05 | Header > Verify Left Side panel contains “New Item”, “People” and “Build History” after clicking on Dropdown Profile My Views option', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserMyViewsMenu()
            .createLeftSidePanelItemsListForAllViews()
            .should('deep.equal', myViewData.leftSidePanelItemsForAllViews)
    })

    it('AT_03.02.09 | Verify The Link Jenkins change color when hovering mouse over it', () => {
        headerAndFooter
            .hoverJenkinsVersionLink()
            .getJenkinsVersionLink()
            .should('have.css', 'color', headerAndFooterData.colorLink)
    });

    it('AT_03.02.10 | Verify The Link Jenkins has text "Jenkins 2.387.2"', () => {
        headerAndFooter
            .getJenkinsVersionLink()
            .should('have.text', headerAndFooterData.version.number)
    });

    it('AT_01.03.24 | Verify that after clicking on the User icon/User name User redirect to Profile page', () => {
        headerAndFooter
            .clickUserNameLink()
            .verifyUserPagesUrl(Cypress.env('local.admin.username'))
            .verifyStatusBtn()
            .getUserId()            
            .should('contain', Cypress.env('local.admin.username'));
    });


    it('AT_01.05.09 | Header>Redirect to User Configure Page(check Breadcrumbs', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserConfigureMenu()
            .getBreadcrumbsConfigure()
            .should("have.text", userConfigurePageData.sidePanelNameLink)
    });

    it('AT_01.05.11 | Header>Redirect to User Configure Page (check URL)', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserConfigureMenu() 
        userCredentialsPage
            .getCredentialsPageUrl()
            .should("contain", userConfigurePageData.url)
    })

    it('AT_01.05.06 | User should see all available "tasks" in a side panel', function () {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserConfigureMenu()
            .listUserSidePanelItems()
            .should('deep.equal', userConfigurePageData.SidePanelAdminTasks.Names)
    })

    it('AT_01.10.04 | Header | Verify that Orange Notifications icon is Visible', function () {
        headerAndFooter
            .getNotificationCounter()
            .should('be.visible')
            .and('have.css', 'background-color', headerAndFooterData.orangeNotificationCounter)
    })

    it('AT_01.10.05 | <Header> Verify Notification icon is visible', () => {
        headerAndFooter
            .getNotificationIcon()
            .should('be.visible');
    })

    it('AT_01.09.01 | <Header> Verify that the User able to can open the Security Popup Window after clicking the Security Popup Content Button', () => {
        headerAndFooter
            .checkSecurityNotificationListNotVisible()
            .clickSecurityBtn()
            .checkSecurityNotificationPopUpClass()
            .getSecurityNotificationList()
            .should('be.visible')
            .and('have.css', 'opacity', '1')
            .and('have.css', 'z-index', '1000');        
    });
    
    it('AT_01.10.03| <Header> Check notifications icon open pop-up window', () => {
        headerAndFooter
            .checkNotificationPopUpNotVisible() 
            .clickNotificationIcon()
            .checkNotificationContainertVisible()
            .getNotificationPopUp().should("be.visible")
    });

    it('AT_01.09.02 | <Header> Verify that the User able to see the Security Popup Window after clicking the Security Popup Content Button', () => {
        headerAndFooter
            .getSecurityBtn()
            .should('be.visible');
    });

    it('AT_01.07_009 | Verify Redirection to Credential Page from User Dropdown Menu', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserCredentialsMenu()
            .checkUrlCredentialsPage()
            .getCredentialsHeader()
            .should('have.text', userCredentialsPageData.credentialsPageHeader);                           
    });

    it('AT_01.11.01 | Verify that Security Popup Window has amount of active security notifications equal to notification counter', () => {
        headerAndFooter
            .getSecurityNotificationCounter().then(($btn) => {
                const counter = $btn.text();
                headerAndFooter
                    .clickSecurityNotificationPopUpBtn()
                    .getSecurityNotificationListItems()
                    .should('have.length', counter)
            });            
    });

    it("AT_01.11.02 | Verify that the User can see 'Manage Jenkins' link on Security Popup Window", () => {
        headerAndFooter
            .clickSecurityNotificationPopUpBtn()
            .getManageJenkinsLink()
            .should('be.visible');         
    });

    it("AT_01.11.03 | Verify that the User can  redirect to Manage Jenkins Page (.../manage/) after clicking on 'Manage Jenkins' link.", () => {
        headerAndFooter
            .clickSecurityNotificationPopUpBtn()
            .clickManageJenkinsLink()
            .verifyManageJenkinsPageUrl()
            .getManageJenkinsHeader()
            .should('have.text', manageJenkinsPageData.header);         
    });

});
