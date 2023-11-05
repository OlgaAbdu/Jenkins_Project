class BuildHistoryOnBuildInNodePage {
    getPageHeader = () => cy.get('#main-panel h1');
    getProjectBuild = () => cy.get('tbody tr .jenkins-table__badge');
}

export default BuildHistoryOnBuildInNodePage;
