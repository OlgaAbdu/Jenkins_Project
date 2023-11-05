import HomePage from "./HomePage";
class MyViewDeletePage {
    getMyViewDeleteOkBtn = () => cy.get('#main-panel form[name=delete] button[name=Submit]');

    clickMyViewDeleteOkBtn() {
        this.getMyViewDeleteOkBtn().click();
        return this;
    };

clickMyViewDeleteOkBtGoToHomePage() {
    this.getMyViewDeleteOkBtn().click();
    return new HomePage;
};
}
export default MyViewDeletePage;
