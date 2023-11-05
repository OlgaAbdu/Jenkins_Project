import CreateNodePage from "./CreateNodePage"

class NewNodePage {
  getPermanentAgentBtn = () => cy.get('label[for="hudson.slaves.DumbSlave"]');
  getNodeNameField = () => cy.get('#name');
  getCreateBtn = () => cy.get('#ok');
  getPermanentAgentRadioBtn = () => cy.get('input[name="mode"][value*=DumbSlave]');

  typeNodeNameInputField(nodeName) {
     this.getNodeNameField().type(nodeName);
     return this;
  }

  selectPermanentAgentRadioBtn() {
    this.getPermanentAgentBtn().click();
    return this;
  }

  clickCreateBtn() {
    this.getCreateBtn().click();
    return new CreateNodePage();
  }
}
export default NewNodePage;
