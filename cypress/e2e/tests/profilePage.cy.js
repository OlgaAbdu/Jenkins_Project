/// <reference types="cypress" />

import HeaderAndFooter from "../../pageObjects/HeaderAndFooter";
import userCredentialsPageData from "../../fixtures/pom_fixtures/userCredentialsPage.json";
import { sidePanelNameLink } from "../../fixtures/pom_fixtures/userConfigurePage.json"
import UserProfilePage from "../../pageObjects/UserProfilePage";
import userProfilePageData from "../../fixtures/pom_fixtures/userProfilePage.json";
import UserBuildsPage from "../../pageObjects/UserBuildsPage";
import HomePage from "../../pageObjects/HomePage";
import userConfigurePageData from "../../fixtures/pom_fixtures/userConfigurePage.json"
import UserCredentialsPage from "../../pageObjects/UserCredentialsPage";
import UserStorePage from "../../pageObjects/UserStorePage";


describe('profilePage', () => {

    const headerAndFooter = new HeaderAndFooter();
    const userProfilePage = new UserProfilePage();
    const userBuildsPage = new UserBuildsPage();
    const homePage = new HomePage();
    const userCredentialsPage = new UserCredentialsPage()
    const userStorePage = new UserStorePage()

    it('AT_18.03.001 | <Profile Page> Link to Users Builds', () => {
        headerAndFooter
        .clickUserNameLink()

        userProfilePage 
        .clickOnBuildsSubMenuLink()

        userBuildsPage
        .getUserBuildsHeader()
        .should('contain', "Builds for " + Cypress.env("local.admin.username").toLowerCase());
    });

    it('AT_18.02.01 | <Profile Page> Verify that the User is able to edit the description to the Created User profile', () => {
        cy.createUser(
            userProfilePageData.user.name,
            userProfilePageData.user.password,
            userProfilePageData.user.confirmPassword,
            userProfilePageData.user.emailAddress
          );

        cy.createUserDescription(userProfilePageData.description, userProfilePageData.user.name);

        homePage
            .clickPeopleSideMenuLink()
            .clickUserNameLink(userProfilePageData.user.name)
            .clickEditUserDescriptionBtn(userProfilePageData.editDescriptionBtnText)
            .typeUserDescriptionInputField(userProfilePageData.editDescription)
            .clickUserDescriptionSaveBtn()
            .getUserDescriptionText()
            .should('have.text', userProfilePageData.editDescription);
    });

    it('AT_18.01.05| Verify the User is able to see Admin ID on the User page with his name.', () => {
        headerAndFooter
            .clickUserNameLink()
            .verifyUserPagesUrl(Cypress.env('local.admin.username'))
            .verifyStatusBtn()
            .getUserId().should('contain', Cypress.env('local.admin.username'))
    })

    it('AT_18.02.03 | Verify that the User is able to add the description to the Admin profile', () => {
        cy.deleteUserDescription();

        homePage
            .clickPeopleSideMenuLink()
            .clickUserNameLink()
            .checkUserDescriptionTextNotExists()
            .clickUserDescriptionBtn()
            .typeUserDescriptionInputField(userProfilePageData.description)
            .clickUserDescriptionSaveBtn()
            .getUserDescriptionText()
            .should('have.text', userProfilePageData.description);
    });

    it("AT_18.02.04 Verify that the User is able to add the description to the Created User profile", () => {
        cy.createUser(
          userProfilePageData.user.name,
          userProfilePageData.user.password,
          userProfilePageData.user.confirmPassword,
          userProfilePageData.user.emailAddress
        );
    
        homePage
          .clickPeopleSideMenuLink()
          .clickUserNameLink(userProfilePageData.user.name)
          .checkUserDescriptionTextNotExists()
          .clickUserDescriptionBtn()
          .typeUserDescriptionInputField(userProfilePageData.user.description)
          .clickUserDescriptionSaveBtn()
          .getUserDescriptionText()
          .should("have.text", userProfilePageData.user.description);
      });

      it('AT_18.02.05 | Verify that the User is able to edit the description to the Admin profile', () => {
        cy.createUserDescription(userProfilePageData.description);
        homePage
            .clickPeopleSideMenuLink()
            .clickUserNameLink()
            .clickEditUserDescriptionBtn(userProfilePageData.editDescriptionBtnText)
            .typeUserDescriptionInputField(userProfilePageData.editDescription)
            .clickUserDescriptionSaveBtn()
            .getUserDescriptionText()
            .should('have.text', userProfilePageData.editDescription);
    });  

    it('AT_18.02.06 | Verify that the User is able to see [Plain text] Preview option during printing the desciption', () => {
        homePage
            .clickPeopleSideMenuLink()
            .clickUserNameLink()
            .clickUserDescriptionBtn()
            .verifyPreviewBox()
            .getPreviewLink()            
            .should('have.text', 'Preview');
    });

    it('AT_18.01.03 | Profile Page | Verify Profile Name on the page', () => {
        headerAndFooter
        .getUserNameOnThePage().then((userName) => {
            headerAndFooter
            .clickUserNameLink()          
            .trimUserPageHeaderName()
            .should('eq', userName)
        })        
    });
    
    it('AT_18.04.03 | Verify User is be able to add user description', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserConfigureMenu()
            .typeUserConfigDescription(userConfigurePageData.userDescription)
            .clickUserConfigSaveBtn()
            .getUserDescriptionText()
            .should('have.text', userConfigurePageData.userDescription)
    });

    it('AT_18.04.04 | Verify that the User is be able to edit user description', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserConfigureMenu()
            .typeUserConfigDescription(userConfigurePageData.userDescription)
            .clickUserConfigSaveBtn()
            .clickUserDescriptionBtn()
            .typeUserDescriptionInputField(userProfilePageData.editDescription)
            .clickUserDescriptionSaveBtn()
            .getUserDescriptionText()
            .should('have.text', userProfilePageData.editDescription);
    });

    it('AT_18.01.02 | Profile Page | Verify Profile Icon on the page', () => {
        headerAndFooter
            .clickUserNameLink()
            .getUserIcon()
            .should("be.visible")
    })

    it('AT_18.01.06 | Left side bar contains 6 elements( People, Status, Builds, Configure, MyViews, Credentials) in Admin Profile page', () => {
        headerAndFooter
            .clickUserNameLink()
            .getSideMenuItemsNames()
            .should("have.length", userConfigurePageData.SidePanelAdminTasks.amountTasks)
            .and("deep.equal", userConfigurePageData.SidePanelAdminTasks.Names)
    });

    it('AT_18.04.05 Header>Verify user can visit Configure Page and delete user information', () => {
        headerAndFooter
            .clickUserDropDownBtn()
            .selectUserConfigureMenu()
            .typeUserConfigDescription(userConfigurePageData.userDescription)
            .clickUserConfigSaveBtn()
            .clickUserDescriptionBtn()
            .clearUserStatusDescription()
            .clickUserDescriptionSaveBtn()
            .getUserDescriptionBtn()
            .should('contain', userProfilePageData.userAddDescriptionBtn);
    });

    
    it('AT_18.06.03 | Verify credantials table has 6 columns with names (T P Store  ↓ Domain, ID, Name)', () => {
        headerAndFooter
            .clickUserNameLink()
            .clickUserCredentialsLink()
            .verifyCredentialTableColumnNamesText()
            .should("have.length", userCredentialsPageData.credentialTableColumnNames.length)
            .and("deep.eq", userCredentialsPageData.credentialTableColumnNames)
    });

    it('AT_18.01.07 | Verify that the Status Tab in side menu is highlighted after redirection to User page', () => {
        homePage
            .clickPeopleSideMenuLink()
            .clickUserNameLink()
            .getUserStatusLinks().within(($el) => {
                cy.window().then((win) => {
                    const beforeElement = win.getComputedStyle($el[0], "::before");
                    const background = beforeElement.getPropertyValue("background-color");
                    expect(background).to.equal("rgba(175, 175, 207, 0.224)");
                });
            });            
    });

    it('AT_18.01.08 | <Profile Page> Left side bar contains 6 elements(People, Status, Builds, Configure, MyViews, Delete) in User Profile page', () => {
        
        cy.createUser(
            userProfilePageData.user.name,
            userProfilePageData.user.password,
            userProfilePageData.user.confirmPassword,
            userProfilePageData.user.emailAddress
          );
          
        homePage
            .clickPeopleSideMenuLink()
            .clickUserNameLink(userProfilePageData.user.name)
            .getSideMenuItemsNames()
            .should("have.length", userConfigurePageData.SidePanelUserTasks.amountTasks)
            .and("deep.equal", userConfigurePageData.SidePanelUserTasks.Names);
    });

    it("AT_18.04.06 | Verify that the User is able to redirect to base url .../user/<username>/configure endpoint", () => {
        cy.createUser(
          userProfilePageData.user.name,
          userProfilePageData.user.password,
          userProfilePageData.user.confirmPassword,
          userProfilePageData.user.emailAddress
        );
    
        homePage
          .clickPeopleSideMenuLink()
          .clickUserNameLink(userProfilePageData.user.name)
          .clickUserConfigureLink(userProfilePageData.user.name.toLowerCase())
          .getConfigurePageUrl(userProfilePageData.user.name)
          .should("contain", userProfilePageData.user.name.toLowerCase());
    });

    it("AT_18.04.07 | Verify that the user’s name  is displayed in the fullname input field", () => {
        cy.createUser(
          userProfilePageData.user.name,
          userProfilePageData.user.password,
          userProfilePageData.user.confirmPassword,
          userProfilePageData.user.emailAddress
        );

        homePage
          .clickPeopleSideMenuLink()
          .clickUserNameLink(userProfilePageData.user.name)
          .clickUserConfigureLink(userProfilePageData.user.name.toLowerCase())
          .getFullNameInputField()
          .should('have.value', userProfilePageData.user.name); 
    });

    it("AT_18.04.08 | Verify that  the User's configure page contains 11 sections", () => {
        cy.createUser(
            userProfilePageData.user.name,
            userProfilePageData.user.password,
            userProfilePageData.user.confirmPassword,
            userProfilePageData.user.emailAddress
          );

        homePage
          .clickPeopleSideMenuLink()
          .clickUserNameLink(userProfilePageData.user.name)
          .clickUserConfigureLink(userProfilePageData.user.name.toLowerCase())
          .verifyConfigureSectionsList()
          .should("have.length", userConfigurePageData.configureSectionsList.amountTasks)
          .and("deep.equal", userConfigurePageData.configureSectionsList.Names.sort());
    });

    it('AT_18.04.09 | Verify that the User is be able to change user name', () => {        
        homePage
            .clickPeopleSideMenuLink()
            .clickUserNameLink()
            .clickUserConfigureLink()
            .typeFullNameInputField(userConfigurePageData.userFullName)
            .clickUserConfigSaveBtn()
            .trimUserPageHeaderName()
            .should('eq', userConfigurePageData.userFullName);

        cy.returnAdminName();
    });

    it('AT_18.06.04 | Ensure that User is able to see 2 stores (his store and from parents).', () => {
        headerAndFooter.getCurrentUserName().then(fullName=>{
            const userFullName = fullName.text()
            headerAndFooter
            .clickUserNameLink()
            .clickUserCredentialsLink()
            .getStoreHeaders()
                .should("have.length", 2)
                .each(($header, idx) => {
                    cy.wrap($header).should("have.text", userCredentialsPage.verifyStoreHeader(idx, userFullName))
                    userCredentialsPage.getStoreUserNames(idx + 2).each(($name, index) => {
                        cy.wrap($name).should("have.text", userCredentialsPage.verifyStoreTableUserName(idx, index, userFullName))
                    })
            })

        });
    })
  
      it('AT_18.06.05 | <Profile Page> Ensure that the User is able to see Add Domain button after clicking on User Store chevron button', () => {
        headerAndFooter
            .clickUserNameLink()
            .clickUserCredentialsLink()
            .getStoreUserNameLinks().each(($el, idx) => {
                    cy.wrap($el).realHover()
                    userCredentialsPage.getStoreUserNamesChevrons(idx+2).click()
                    userCredentialsPage.getUserNameAddDomain().should('be.visible')
            })
    })  

    it('AT_18.06.06 | <Profile Page> Ensure that the User is able to see Add Credentials button after clicking on User Domains chevron button', () => {
        headerAndFooter
            .clickUserNameLink()
            .clickUserCredentialsLink()
            .getStoreDomainLinks().each(($el, idx) => {
                    cy.wrap($el).realHover()
                    userCredentialsPage.getStoreDomainChevrons(idx+2).click()
                    userCredentialsPage.getUserNameAddDomain().should('be.visible')
            })
    }) 

    userCredentialsPageData.StoresDomain.forEach((name) => {
        it('AT_18.06.07 | Ensure that User redirect to any store to see domain list.)', () => {
            headerAndFooter
                .clickUserNameLink()
                .clickUserCredentialsLink()
                .getStoreDomainLinkByUserName(name.toLowerCase()).click().then(() => {
                    userStorePage
                        .verifyUrlUserStorePage(name)
                        .getUserStorePageHeader().should("have.text", name)
                })
        })
    })

})
