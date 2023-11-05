import OrgFolderPage from "./OrgFolderPage"
import newItemPageData from "../fixtures/pom_fixtures/newItemPage.json"

class OrgFolderRenamePage {
  getInputField = () => cy.get('.setting-main input')
  getNewNameInputField = () => cy.get('.jenkins-input')
  getRenameOrgFolderBtn = () => cy.get('button[name=Submit]')

  clearNewNameInputField() {
    this.getInputField().clear()
    return this
    } 

  typeNewOrgFolderName() {
    this.getNewNameInputField().type(newItemPageData.newOrgFolderName)
    return this
    }

  clickRenameOrgFolderBtn() {
    this.getRenameOrgFolderBtn().click()
    return OrgFolderPage
    }

}

export default OrgFolderRenamePage;