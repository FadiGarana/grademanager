/**
 * @ngdoc function
 * @name grademanagerApp.controller:PromptdialogCtrl
 * @description
 * # PromptdialogCtrl
 * Controller of the grademanagerApp
 */
angular.module('grademanagerApp')
    .controller('PromptDialogCtrl', function ($mdDialog, options) {
        'use strict';
        var ctrl = this;
        ctrl.options = options;

        ctrl.closeDialog = function () {
            $mdDialog.cancel();
        };

        ctrl.saveDialog = function () {
            $mdDialog.hide(ctrl.options.value);
        };
    });
