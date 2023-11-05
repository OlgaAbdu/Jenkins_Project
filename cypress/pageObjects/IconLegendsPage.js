import iconLegendsData from "../fixtures/pom_fixtures/iconLegends.json";

class IconLegendsPage {
    getPageTopHeader = () => cy.get('#main-panel h1');
    getStatusGroupHeader = () => cy.get('#main-panel>h2:nth-child(3)');
    getStatusIconsGroup = () => cy.get('#main-panel > dl:nth-child(4) dt');
    getProjectHealthGroupHeader = () => cy.get('#main-panel>h2:nth-child(5)');
    getProjectHealthIconsGroup = () => cy.get('#main-panel > dl:nth-child(6) dt');
    getProjectHealthStatuses = () => cy.get('#main-panel > dl:nth-child(6)');
    getProjectHealthIcons = () => cy.get('.app-icon-legend dt>svg');
    getStatusIcons = () => cy.get('.app-icon-legend span>svg');
    getIconLegendPageUrl = () => cy.url();
    getIconLegendPageTitle = () => cy.get('#main-panel h1');
    getAllIconLegendList = () => cy.get("#main-panel > .app-icon-legend dt");
    getIconLegendPageSubtitles = () => cy.get("#main-panel>h2");
    getIconLegendPageStatusDescriptionList = () => cy.get("#main-panel dl:first-of-type dd");
    getIconLegendPageProjectHealthDescriptionList = () => cy.get("#main-panel dl:last-of-type dd");
  
    verifyIconLegendPageTitle() {
      this.getIconLegendPageTitle().should("have.text", iconLegendsData.pageName);
      return this
  }
}

export default IconLegendsPage;