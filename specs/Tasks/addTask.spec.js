// addTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let toolbarPage = require('../../pages/ToolbarPage');
let taskNameAdded = 'Task added to project';
let projectForTasks = 'Project for tasks';

describe('Acceptance Tests for Task feature', function () {
    //Login application.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
    });

    //Delete task, post condition.
    afterEach(function () {
        contentPage.deleteTask(taskNameAdded);
    });

    it('should allow to add a new task', function () {
        contentPage.addTask(taskNameAdded);
        // Adding a task with 'Task added' name.
        contentPage.addTask(taskNameAdded);
        expect(contentPage.assertTaskOnContent(taskNameAdded));
    });

    it('should allow to add a quick task', function () {
        // Adding and deleting a task.
        toolbarPage.addQuickTask(taskNameAdded);
        expect(contentPage.assertTaskOnContent(taskNameAdded));
    });
});

describe('Acceptance Tests for Task feature, add tasks to projects', function () {
    //Login application.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        leftSidebarPage.addProject(projectForTasks);
    });

    //Delete task, post condition.
    afterEach(function () {
        contentPage.deleteTask(taskNameAdded);
        leftSidebarPage.deleteProject(projectForTasks);
    });

    it('should allow to add a new task to created project', function () {
        // Adding a task with 'Task added' name.
        contentPage.addTask(taskNameAdded);
        expect(contentPage.assertTaskOnContent(taskNameAdded));
    });
});