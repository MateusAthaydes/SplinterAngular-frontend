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
      .when('/instituicao', {
        templateUrl: 'views/institution.html',
        controller: 'InstitutionCtrl',
        controllerAs: 'institution'
      })
      .when('/instituicao/detalhe/:id', {
        templateUrl: 'views/institution_detail.html',
        controller: 'InstitutiondetailCtrl',
        controllerAs: 'institutiondetail'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
