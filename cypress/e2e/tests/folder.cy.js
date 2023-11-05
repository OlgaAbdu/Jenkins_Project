/// <reference types="cypress" />

import HomePage from "../../pageObjects/HomePage";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import folderPageData from "../../fixtures/pom_fixtures/folderPage.json";
import FoldersAndMultibrPipelineDeletePage from "../../pageObjects/FoldersAndMultibrPipelineDeletePage";

describe('folder', () => {

    const homePage = new HomePage();
    const foldersAndMultibrPipelineDeletePage = new FoldersAndMultibrPipelineDeletePage();
    
    it('AT_15.02.01 | Verify possibility to add folder description', () => {
        homePage
            .clickNewItemSideMenuLink()
            .selectFolderItem()
            .typeNewItemNameInputField(newItemPageData.folderName)
            .clickOkBtnAndGoFolderConfig()
            .clickSaveBtnAndGoFolder()
            .clickAddEditDescriptionBtn()
            .typeFolderDescription(folderPageData.folderDescription)
            .saveFolderDescription()
            .getFolderDescription().should('have.text', folderPageData.folderDescription);
    });

    it('AT_15.04.03 | Delete folder from Dashboard breadcrumbs dropdown menu inside Folder', () => {
        cy.createFolderProject(newItemPageData.folderName)
        homePage
            .hoverAndClickProjectDrpDwnBtn(newItemPageData.folderName)
            .clickDeleteFoldersAndMultiBrPipelineFromDrpDwnMenu()
            .clickSubmitBtn()
            .getProjectTable()
            .should('not.exist');
    });

    it('AT_15.05.03| Verify user can create a new job inside a folder', () => {
        cy.createFolderProject(newItemPageData.folderName);
        homePage
            .clickProjectNameLink(newItemPageData.folderName)
            .clickCreateAJobLink()
            .typeNewItemNameInputField(newItemPageData.freestyleProjectName)
            .selectFreestyleProjectItem()
            .clickOkBtnAndGoFreestyleProjectConfig()
            .clickSaveBtnAndGoFreestyleProject()
            .getFullProjectName()
            .should('contain', `${newItemPageData.folderName}/${newItemPageData.freestyleProjectName}`);
      });

    it('AT_15.02.04 | Verify possibility to edit folder description', () => {
        cy.createFolderProject(newItemPageData.folderName);
        cy.addFolderDescription(folderPageData.folderDescription);
        homePage 
            .clickFolderNameLink(newItemPageData.folderName) 
            .clickAddEditDescriptionBtn()
            .typeFolderNewDescription(folderPageData.folderNewDescription) 
            .saveFolderDescription()
            .getFolderDescription().should('have.text', folderPageData.folderNewDescription);
    });

    it('AT_15.04.01 | Delete folder within left side panel inside Folder', () => {
        cy.createFolderProject(newItemPageData.folderName);
        homePage
            .clickFolderNameLink(newItemPageData.folderName)
            .clickDeleteFolderBtn()
            .clickSubmitBtn()
            .getProjectTable()
            .should('not.exist');
    });

    it('AT_15.06_03 | Folder>Rename Folder', () => {
        cy.createFolderProject(folderPageData.folderName)

        homePage
            .clickFolderNameLink(folderPageData.folderName)
            .clickRenameFolderLink()
            .typeFolderNewNameField(folderPageData.folderNewName)
            .clickFolderRenameBtn()
            .trimFolderHeaderName()
            .should('eq', folderPageData.folderNewName)
    })

    it('AT _05.04_003 User is able to Create Folder', () => {
        cy.createFolderProject(folderPageData.folderName) 

        homePage
            .clickProjectNameLink(folderPageData.folderName)            
            .trimFolderHeaderName()
            .should('eq', folderPageData.folderName)             
    });

    it('AT_15.02.05 | Folder > Preview description text matches the new description', () => { 
        cy.createFolderProject(newItemPageData.folderName);
        cy.addFolderDescription(folderPageData.folderDescription);
        homePage 
            .clickFolderNameLink(newItemPageData.folderName) 
            .clickAddEditDescriptionBtn()
            .typeFolderNewDescription(folderPageData.folderNewDescription) 
            .clickDescriptionPreviewLink()
            .getDescriptionPreview()
                .should('have.text', folderPageData.folderNewDescription);
      });

    it('AT_15.01.02 | Folder is visible on the Homepage', () => {
        cy.createFolderProject(newItemPageData.folderName);
        
        homePage
            .getProjectNameLink()
            .should('be.visible')
            .and('have.text', newItemPageData.folderName)
    });

      it('AT_15.01.03| The down arrow appears near the end of the Folder name', () => {
        cy.createFolderProject(newItemPageData.folderName);
        homePage
            .hoverProjectNameLink()
            .getProjectDrpDwnBtn()
            .should('be.visible')
            .and('exist')
      });

    it('AT_15.01.04 | The drop down menu appears with 7 items', () => {
        cy.createFolderProject(newItemPageData.folderName);
        
        homePage
            .hoverAndClickProjectDrpDwn(newItemPageData.folderName)
            .getProjectNameDrpDwnItems()
            .should('have.length', 7)
            .should('be.visible')
            .each((el, index) => {
                expect(el.text()).contain(folderPageData.folderDropdownItems[index])
            })
    })

    it('AT_15.02.02 | “Edit description” button is visible and clickable', () => {
        cy.createFolderProject(newItemPageData.folderName);
        cy.addFolderDescription(folderPageData.folderDescription);
        
        homePage 
            .clickFolderNameLink(newItemPageData.folderName) 
            .clickAddEditDescriptionBtn()
            .getFolderDescriptionInputField()
            .should('be.visible')
            .and('have.text', folderPageData.folderDescription)
    });

    folderPageData.folderDropdownItems.forEach((folderDropdownItems, index) => {
        it(`AT_15.01.05 | Button "${folderDropdownItems}" in the dropdown-menu redirect to the target page`, () => {
            cy.createFolderProject(newItemPageData.folderName);

            homePage
                .hoverAndClickProjectDrpDwn(newItemPageData.folderName)
                .clickFolderDrpDwnMenuItem(index)
                .should('contain', folderPageData.endPointsUrl[index]);
        })
    })

    it(`AT_15.01.01 | Folder is visible on 'My Views” page , endpoint /user/…/my-views/view/all/`, () => {
        cy.createFolderProject(newItemPageData.folderName);
        
        homePage
            .clickMyViewSideMenuLink()
            .getFolderNameLink()
            .should('be.visible')
            .and('have.text', newItemPageData.folderName)
    });

    it(`AT_15.04.02 | Delete folder by clicking on a "Delete Folder" in Folder's name dropdown menu on Dashboard`, () => {
        cy.createFolderProject(newItemPageData.folderName);

        homePage
            .clickFolderNameLink(newItemPageData.folderName)
            .clickBreadcrumbsFolderDropDownMenu()
            .clickDeleteFolderDrpDwnLink()
        foldersAndMultibrPipelineDeletePage
            .clickSubmitBtn() 
            .getProjectTable()
            .should('not.exist');     
        })

        it(`AT_15.05.04 | Create new job by clicking on a "New item"  from breadcrums dropdown menu inside Folder`, () => {
            cy.createFolderProject(newItemPageData.folderName)
            
            homePage
            .clickFolderNameLink(newItemPageData.folderName)
            .clickBreadcrumbsFolderDropDownMenu()
            .clickCreateAJobLink()
            .typeNewItemNameInputField(newItemPageData.freestyleProjectName)
            .selectFreestyleProjectItem() 
            .clickOkBtnAndGoFreestyleProjectConfig()
            .clickSaveBtnAndGoFreestyleProject()
            .getFullProjectName()
            .should('contain', `${newItemPageData.folderName}/${newItemPageData.freestyleProjectName}`);
        })
   }); 
