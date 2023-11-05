class BuildChangesPage {
 
    getPageHeader = () => cy.get('.jenkins-icon-adjacent')

    verifyBuildChangesPageUrl(buildChangesPageUrl) {
        cy.url().should('contain', buildChangesPageUrl)
        return this
    }

}

export default BuildChangesPage