import FreestyleProjectPage from "./FreestyleProjectPage";

class FreestyleProjectMovePage {
    getDrpDwnMenuMoveDestination = () => cy.get('select[name="destination"]');
    getMoveBtn = () => cy.get('button[name="Submit"]');

    selectDestinationFolderName(name) {
        this.getDrpDwnMenuMoveDestination(`/${name}`)
        .select(`Jenkins » ${name}`)
        .should('have.value', `/${name}`)
        return this;
    };

    clickMoveBtn() {
        this.getMoveBtn().click()
        return new FreestyleProjectPage();
    };

};

export default FreestyleProjectMovePage;
