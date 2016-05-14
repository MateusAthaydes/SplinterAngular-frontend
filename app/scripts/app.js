'use strict';

/**
 * @ngdoc overview
 * @name splinterAngularFrontendApp
 * @description
 * # splinterAngularFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('splinterAngularFrontendApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/instituicoes', {
        templateUrl: 'views/institution.html',
        controller: 'InstitutionCtrl',
        controllerAs: 'institution'
      })
      .when('/cursos', {
        templateUrl: 'views/course.html',
        controller: 'CourseCtrl',
        controllerAs: 'course'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
