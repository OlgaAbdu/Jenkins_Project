import pipelineGlobalScriptScopePageData from "../fixtures/pom_fixtures/pipelineGlobalScriptScopePage.json"

class PipelineGlobalScriptScopePage {

    getGlobalScriptScopePageText = () => cy.get('pre[style="word-wrap: break-word; white-space: pre-wrap;"]');
    getGlobalScriptScopePageUrl = () => cy.url();

    verifyGlobalScriptScopePageText() {
        this.getGlobalScriptScopePageText().should('contain', pipelineGlobalScriptScopePageData.globalScriptScopePageText)
        return this
    }

}

export default PipelineGlobalScriptScopePage