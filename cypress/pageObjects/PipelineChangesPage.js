class PipelineChangesPage {

    getPipelineChangesMainPanelText = () => cy.get('#main-panel h1');


    trimPipelineChangesMainPanelText() {
       return this.getPipelineChangesMainPanelText().then($el => {
              return $el.text().trim();
        })
    }
}
export default PipelineChangesPage;