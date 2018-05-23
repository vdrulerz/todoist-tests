
let contentPage = require('../pages/ContentPage');
let componentAction = require('../utils/ComponentAction');

class LeftSidebarPage {
    constructor() {
        this.projectNameTextField = '#projects_list div.richtext_editor.sel_richtext_editor';
        this.projectMenu = '#projects_list_manager a.action.sel_add_project';
        this.projectAddSubmit = '#projects_list a.ist_button.ist_button_red.submit_btn';
        this.projectListOnLeftSidebar = '#projects_list';
        this.projectModifyOption = 'td[data-track="projects|menu_edit"]';
        this.projectSaveButton = 'a[data-track="projects|edit_confirm"]';
        this.projectDeleteOption = '#menu_delete_text';
        this.projectDeleteConfirmation = '#GB_window a.ist_button.ist_button_red';
        this.menuHideButton = '#top_bar_inner > a > img';
    }
    get lastProjectOnList() {
        return componentAction.lastElementOnList(this.projectListOnLeftSidebar, 1);
    }

    // This method is to add new project.
    addProject(projectName) {
        contentPage.closeTimeZoneAlert();
        browser.pause(5000);
        componentAction.waitToLoading();
        if (this.isMobile()) {
            componentAction.clickElement(this.menuHideButton);
        }
        browser.moveToObject('#left_menu');
        componentAction.clickElement(this.projectMenu);
        componentAction.setValueElement(this.projectNameTextField, projectName);
        componentAction.clickElement(this.projectAddSubmit);
        browser.pause(5000);
    }

    // This method is to modify one project.
    modifyProject(projectNameToModify, newProjectName) {
        componentAction.waitToLoading();
        if (this.isMobile()) {
            componentAction.clickElement(menuHideButton);
        }
        // Adding new project to modify.
        if (this.lastProjectOnList.getText() === projectNameToModify) {
            this.lastProjectOnList.rightClick();
            componentAction.clickElement(this.projectModifyOption);
            componentAction.setValueElement(this.projectNameTextField, newProjectName);
            componentAction.clickElement(this.projectSaveButton);
            browser.pause(5000);
        }
    }

    // This method is to delete a project.
    deleteProject(projectNameToDelete) {
        componentAction.waitToLoading();
        if (this.isMobile()) {
            componentAction.clickElement(menuHideButton);
        }
        // Adding new project to delete.
        if (this.lastProjectOnList.getText().includes(projectNameToDelete)) {
            this.lastProjectOnList.rightClick();
            componentAction.clickElement(this.projectDeleteOption);
            componentAction.clickElement(this.projectDeleteConfirmation);
            browser.pause(5000);
        }
    }

    isMobile() {
        var width = browser.getViewportSize('width');
        return width < 640;
    }
}

module.exports = new LeftSidebarPage();
