/// <reference types="cypress" />

import DashboardBreadcrumbs from "../../pageObjects/DashboardBreadcrumbs";
import dashboardBreadcrumbsData from "../../fixtures/pom_fixtures/dashboardBreadcrumbs.json";
import newItemPageData from "../../fixtures/pom_fixtures/newItemPage.json";
import HomePage from "../../pageObjects/HomePage";
import FolderPage from "../../pageObjects/FolderPage";
import FreestyleProjectPage from "../../pageObjects/FreestyleProjectPage";
import MultiConfigurationProjectPage from "../../pageObjects/MultiConfigurationProjectPage";
import MultibranchPipelinePage from "../../pageObjects/MultibranchPipelinePage";


describe('dashboardBreadcrumbs', () => {

   const dashboardBreadcrumbs = new DashboardBreadcrumbs();
   const folderPage = new FolderPage();
   const homePage = new HomePage();
   const freestyleProjectPage = new FreestyleProjectPage();
   const multiConfigurationProjectPage = new MultiConfigurationProjectPage()
   const multibranchPipelinePage = new MultibranchPipelinePage()
  
   it('AT_04.04.12 Verify Dashboard Dropdown Menu Length', () => {
      dashboardBreadcrumbs
         .clickDashboardDropdownBtn()
         .getDashboardDropdownMenuItemsList()
         .should('be.visible')
         .and('have.length', dashboardBreadcrumbsData.dashboardDropdownMenu.length);
   });

   it('AT_04.04.03 | Verify Dashboard Dropdown menu has subfolders of the Dashboard page', () => {
      dashboardBreadcrumbs
         .clickDashboardDropdownBtn()
         .getDashboardDropdownMenuItemsList().each(($el, idx) => {
            expect($el.text()).contain(dashboardBreadcrumbsData.dashboardDropdownMenu[idx]);
         });
   });

   it('AT_04.04.18 | Verify URL when user clicks Reload Configuration from Disk from Manage Jenkins_user clicks Cancel on the alert window', () => {
      const PORT = Cypress.env("local.port")
      dashboardBreadcrumbs
         .clickDashboardDropdownBtn()
         .moveMouseOverManageJenkins()
         .clickReloadConfigurationFromDiskBtn()
         .clickAlertWindowCancel(dashboardBreadcrumbsData.alertWindowMessages[0])
      cy.url().should('eq', `http://localhost:${PORT}/`)
   });

   dashboardBreadcrumbsData.dashboardDropdownMenu.forEach((pageName, ind) => {
      it(`AT_04.02.014 | Breadcrumbs Verify The "Dashboard" link is first element in the ${pageName} trail`, () => {
         dashboardBreadcrumbs
            .clickDashboardDropdownBtn()
            .clickEachDashboardDropDownMenuList(ind)
            .getFirstDashboardDropdownBtn()
            .should('have.text', dashboardBreadcrumbsData.dashboardBtn);
      });
   });

   it('AT_04.07.04 | Verify Breadcrumbs Multi-configuration project Dropdown menu has list of items', () => {
      cy.createMultiConfigurationProject(newItemPageData.multiConfigurationProjectName)
      homePage
      .clickMultiConfigProjectNameLink(newItemPageData.multiConfigurationProjectName)
      .hoverBreadcrumbsMultiConfigBtn()
      .clickBreadcrumbsMultiConfigDropDownMenu()
      .getBreadcrumbsMultuConfigItemsList().each(($el, idx) => {
         expect($el.text()).contain(dashboardBreadcrumbsData.breadcrumbscMulticonfigurationprojectDropdow[idx])
       });
      });
   dashboardBreadcrumbsData.dashboardDropdownMenu.forEach((page, ind) => {
     it(`AT_04.04.11 |Breadcrumbs| Dropdown menu ${page} are clickable and redirect to the corresponding page`, () => {
       dashboardBreadcrumbs
         .clickDashboardDropdownBtn()
         .clickEachDashboardDropDownMenuList(ind);
       cy.url().should("include", dashboardBreadcrumbsData.endPointUrl[ind]);
     });
   });

   dashboardBreadcrumbsData.manageJenkinsDropdownItems.forEach((page, ind) => {
      it(`AT_04.04.19 |Breadcrumbs Verify Dashboard Manage Jenkins dropdown menu link ${page} redirects to corresponding page`, () => {
         dashboardBreadcrumbs
            .clickDashboardDropdownBtn()
            .moveMouseOverManageJenkins()
            .clickEachManageJenkinsDropDownMenuList(ind);
         cy.url().should(
           "include",
           dashboardBreadcrumbsData.manageJenkinsDropdownEndpoint[ind]
         );
      });
   });

   it("AT_04.04.09 |Breadcrumbs Dashboard page link check Manage Jenkins dropdown subfolder", () => {
     dashboardBreadcrumbs
       .clickDashboardDropdownBtn()
       .moveMouseOverManageJenkins()
       .getDashboardManageJenkinsMenuList()
       .each(($el, idx) => {expect($el.text()).contain(dashboardBreadcrumbsData.manageJenkinsDropdownItems[idx])});
   });
     

   it('AT_04.07.01 | Verify Breadcrumbs Folder Dropdown menu has list of items', () => {
      cy.createFolderProject(newItemPageData.folderName)
      homePage
      .clickFolderNameLink(newItemPageData.folderName)
      .hoverBreadcrumbsFolderBtn()
      .clickBreadcrumbsFolderDropDownMenu()
      .getBreadcrumbsFolderItemsList().each(($el, idx) => {
         expect($el.text()).contain(dashboardBreadcrumbsData.breadcrumbscFolderDropdown[idx])
       });
      });

      it('AT_04.07.03 | Verify Breadcrumbs Freestyle project Dropdown menu has list of items', () => {
      cy.createFreestyleProject(newItemPageData.freestyleProjectName)
      homePage
      .clickFreestyleProjectNameLink(newItemPageData.freestyleProjectName)
      .hoverBreadcrumbsFreestyleProjectBtn()
      .clickBreadcrumbsFreesyleProjectDropDownMenu()
      .getBreadcrumbsFreestyleProjectItemLst().each(($el, idx) => {
         expect($el.text()).contain(dashboardBreadcrumbsData.breadcrumbscFreestyleProjectDropdown[idx])
       });
      });

      it('AT_04.02.15 | <Breadcrumbs> Dashboard page link is redirected to the Jenkins home page', () => {
         dashboardBreadcrumbs
         .getDashboardLink()
         .should('be.visible')
         .and('have.attr', 'href', '/')
      });

         it ('AT_04.02.16 | <Breadcrumbs> Dashboard page link has black colored text “Dashboard”', () => {
         dashboardBreadcrumbs
         .getDashboardLink()
         .should('have.text', dashboardBreadcrumbsData.dashboardBtn)
         .and('have.css', 'color', 'rgb(20, 20, 31)')
      })

      it('AT_04.07.02 | <Breadcrumbs> Verify Breadcrumbs Pipeline Dropdown menu has list of items', () => {
         cy.createPipeline(newItemPageData.pipelineName)
         homePage
         .clickPipelineProjectName(newItemPageData.pipelineName)
         .hoverBreadcrumbsPipelineProjectBtn()
         .clickBreadcrumbsPipelineProjectDropDownMenu()
         .getBreadcrumbsPipelineMenuItemsList().each(($el, idx) => {
            expect($el.text()).contain(dashboardBreadcrumbsData.breadcrumbsPipelineProjectDropdown[idx])
          });
         });
         
      it('AT_04.07.05 | Verify Breadcrumbs Multibranch Pipeline Dropdown menu has list of items', () => {
         cy.createMultiBranchPipeline(newItemPageData.multibranchPipelineName)
         multibranchPipelinePage
         .hoverBreadcrumbsMultibranchPipelineBtn()
         .clickBreadcrumbsMultibranchPipelineDropDownMenu()
         .getBreadcrumbsMultibranchPipelineItemsList().each(($el, idx) => {
          expect($el.text()).contain(dashboardBreadcrumbsData.breadcrumbsMultibranchPipelineDropdown[idx])
          });
         });

   })
   
   
   

