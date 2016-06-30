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
      .when('/instituicao/detalhe/:id', {
        templateUrl: 'views/institution_detail.html',
        controller: 'InstitutiondetailCtrl',
        controllerAs: 'institutiondetail'
      })
      .when('/cursos', {
        templateUrl: 'views/course.html',
        controller: 'CourseCtrl',
        controllerAs: 'course'
      })
      .when('/curso/detalhe/:id', {
        templateUrl: 'views/course_detail.html',
        controller: 'CoursedetailCtrl',
        controllerAs: 'coursedetail'
      })
      .when('/areas', {
        templateUrl: 'views/subject.html',
        controller: 'SubjectCtrl',
        controllerAs: 'subject'
      })
      .when('/concursos', {
        templateUrl: 'views/examination.html',
        controller: 'ExaminationCtrl',
        controllerAs: 'examination'
      })
      .when('/concurso/detalhe/:id', {
        templateUrl: 'views/examination_detail.html',
        controller: 'ExaminationdetailCtrl',
        controllerAs: 'examinationdetail'
      })
      .when('/usuarios', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/questao/detalhe/:id', {
        templateUrl: 'views/question_detail.html',
        controller: 'QuestionCtrl',
        controllerAs: 'question'
      })
      .when('/praticar', {
        templateUrl: 'views/practice_questions.html',
        controller: 'PracticequestionsCtrl',
        controllerAs: 'practicequestions'
      })
      .when('/praticar/questao', {
        templateUrl: 'views/practice_question_detail.html',
        controller: 'PracticequestionsCtrl',
        controllerAs: 'practicequestions'
      })
      .when('/praticar/questao/resultados', {
        templateUrl: 'views/practice_questions_results.html',
        controller: 'PracticequestionsCtrl',
        controllerAs: 'practicequestions'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
