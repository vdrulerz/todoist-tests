// addProject.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let contentPage = require('../../pages/ContentPage');
let projectToAdd = 'Test Project';

describe('Acceptance Tests to Project feature, add a project', function () {
    //Login application.
    beforeEach(function () {
        loginPage.login(config.acc1_email, config.acc1_password);
    });

    //Delete project, post condition.
    afterEach(function () {
        leftSidebarPage.deleteProject(projectToAdd);
    });

    it('should allow to add new project', function () {
        leftSidebarPage.addProject(projectToAdd);
        // Verify if last Project added name is equal to "projectToAddName".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(projectToAdd);
        // Verify if last project name as shown on editor.
        expect(contentPage.assertProjectOnContent).to.have.contain(projectToAdd)
    });
});