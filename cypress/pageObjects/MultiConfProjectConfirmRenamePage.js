
class MultiConfProjectConfirmRenamePage {
    getErrorMessage = () => cy.get('#main-panel h1');
    getErrorTextMessage = () => cy.get('#main-panel p'); 
}
export default MultiConfProjectConfirmRenamePage;