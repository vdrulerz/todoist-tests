// task.spec.js
let config = require('../config.json');
let expect = require('chai').expect;
let loginPage = require('../pages/LoginPage');
let contentPage = require('../pages/ContentPage');
let toolbarPage = require('../pages/ToolbarPage');
let taskNameAdded = 'Task added';
let taskNameModified = 'Task MODIFIED';
let tasknameToBeDeleted = 'Task to be deleted';
let quickTaskNameAdded = 'Quick task added';

describe('Acceptance Tests for Task feature', function () {
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        contentPage.addTask(taskNameAdded);

    });

    afterEach(function () {
        contentPage.deleteTask(taskNameAdded);
    });

    it('should allow to add a new task', function () {
        // Adding a task with 'Task added' name.
        expect(contentPage.assertTaskOnContent(taskNameAdded));
    });

    it('should allow to modify a new task', function () {
        // Adding a task with 'Task added' name.
        if (taskNameAdded === taskNameModified) {
            return taskNameModified;
        }
        contentPage.modifyTask(taskNameAdded, taskNameAdded);
        expect(contentPage.assertTaskOnContent(taskNameAdded));
    });

    it('should allow to add a quick task', function () {
        // Adding and deleting a task.
        toolbarPage.addQuickTask(taskNameAdded);
        expect(contentPage.assertTaskOnContent(taskNameAdded));
    });
});

describe('Acceptance Tests for Delete a Task feature', function () {
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
    });
    it('should allow to delete a task', function () {
        // Adding and deleting a task.
        contentPage.addTask(tasknameToBeDeleted);
        contentPage.deleteTask(tasknameToBeDeleted);
        expect(!contentPage.assertTaskOnContent(tasknameToBeDeleted));
    });
});
