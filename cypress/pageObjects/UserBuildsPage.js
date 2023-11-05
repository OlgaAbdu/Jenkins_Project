class UserBuildsPage {
    getUserBuildsTitle = () => cy.title();
    getUserBuildsTableSizeBtns = () => cy.get("div[class='jenkins-icon-size__items jenkins-buttons-row'] ol");
    getStatusIcon = () => cy.get('.jenkins-table__cell--tight.jenkins-table__icon');
    getPageHeading = () => cy.get('h1');
    getUserBuildsHeader = () => cy.get('#main-panel  h1');
    getUserBuildsSidePanel = () => cy.get('#side-panel');
    getUserBuildsSidePanelTaskLinks = () => cy.get('#tasks span.task-link-wrapper a')
    getBuildsMenuLink = () => cy.get('a[href$="/builds"]');
    getStatusBuilds = () => cy.get('#projectStatus th:nth-child(4) a');
    getStatusBuildsUpp = () => cy.get('th:nth-child(4) .sortarrow');
    getOddRowBuilds = () => cy.get('#projectStatus tbody>tr:nth-child(odd)');
    getEvenRowBuilds = () => cy.get('#projectStatus tbody>tr:nth-child(even)');

    clickUserBuildsTableSizeBtns(size) {
        this.getUserBuildsTableSizeBtns().contains(size).click();
        return this;
    };
    clickStatusBuilds(){
        this.getStatusBuilds().click();
        return this;
    };
     
}
export default UserBuildsPage;