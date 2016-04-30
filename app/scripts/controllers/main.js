'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.hello = "hey"
  });
