import BuildPage from "./BuildPage";

class EditBuildInformationPage {
    getDisplayNameInputField = () => cy.get('input[name="displayName"]');
    getEditBuildInformationSaveBtn = () => cy.get('button[name="Submit"]');

    typeDisplayName(name){
        this.getDisplayNameInputField().clear().type(name);
        return this;
    };

    clickEditBuildInformationSaveBtn() {
        this.getEditBuildInformationSaveBtn().click();
        return new BuildPage();
    };
}
export default EditBuildInformationPage;