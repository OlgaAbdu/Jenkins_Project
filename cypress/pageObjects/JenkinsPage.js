class JenkinsPage {
    getPageTitle = () => cy.get('.page-title');
    getJenkinsPageUrl = () => cy.url();

    verifyJenkinsioPageUrl(link) {
        this.getJenkinsPageUrl().should('equal', link);
        return this;
    };
}

export default JenkinsPage;
