import UserProfilePage from "./UserProfilePage";
import NewItemPage from "./NewItemPage";

class PeoplePage {
    getUserNameLink = () => cy.get('#people a[href*="/user/"]');
    getPeoplePageHeader = () => cy.get('.jenkins-app-bar__content h1')
    getNewItemSideMenuLink = () => cy.get('a[href="/view/all/newJob"]');
    getPeoplePageUrl = () => cy.url();
    getSortHeaderMenu = () => cy.get('.sortheader');
    getSortArrow = () => cy.get('.sortarrow');
    getPeopleTab = () => cy.get('a[href="/asynchPeople/"]');
    getPeopleTableBody = () => cy.get('#people tbody');
    getPeopleNameList = () => cy.get('table#people td:nth-child(3)');
    getSortHeaderNameBtn = () => cy.get('a.sortheader').contains('Name');
    getPeopleList = () => cy.get('#people tbody tr td a');

    clickUserNameLink(name = Cypress.env('local.admin.username')) {
        this.getUserNameLink().contains(name).click();
        return new UserProfilePage();
    };

    trimPeoplePageHeader() {
        return this.getPeoplePageHeader().then(($el) => {
            return $el.text().trim();
        });
    };

    clickNewItemSideMenuLink() {
        this.getNewItemSideMenuLink().click();
        return new NewItemPage();
    };
    
    clickSortHeaderMenu() {
        this.getSortHeaderMenu().each(($el) => {
            cy.wrap($el).click()
            this.getSortArrow().should('be.visible')
        })
    }

    verifyPeoplePagesUrl(peopleEndPointURL) {
        cy.url().should('includes', peopleEndPointURL);
        return this;
    };

    verifyPeopleTabIsHighlighted(highlitedClassName, highlitedTabClassBackGroundColor ) {
        return this.getPeopleTab()
            .should("have.class", highlitedClassName)
            .within(($el) => {
                cy.window().then((win) => {
                    const beforeElement = win.getComputedStyle($el[0], "::before");
                    const bg = beforeElement.getPropertyValue("background-color"); 
                expect(bg).to.equal(highlitedTabClassBackGroundColor);
                })
            })
    };


    verifySortPeopleListArray() {
        this.getPeopleNameList().then(($els) => {
            let actualStates = Cypress.$.makeArray($els).map(($el) => $el.innerText.toLowerCase());
            this.getSortHeaderNameBtn().click();
            this.getPeopleNameList().then(($els) => {
                let expectStates = Cypress.$.makeArray($els).map(($el) => $el.innerText.toLowerCase());
                console.log(expectStates);
                console.log(actualStates.sort().slice().reverse());
                expect(expectStates).to.deep.equal(actualStates.sort().slice().reverse());
                });
        });
    }

    getRandomUserFromList() {
        this.getPeopleList().as("usersList")
            .its('length')
            .then((n) => Cypress._.random(0, n - 1))
            .then((k) => {
                cy.get("@usersList").eq(k).as("randomUser")
            })
        return cy.get("@randomUser");
    }
}
export default PeoplePage;

