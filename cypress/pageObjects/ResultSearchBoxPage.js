class ResultSearchBoxPage {
    getResultNoMatch =() => cy.get('.error ');
    getHeader = () => cy.get('#main-panel h1');


}
export default ResultSearchBoxPage;