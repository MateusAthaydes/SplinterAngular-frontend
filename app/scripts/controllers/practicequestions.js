'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:PracticequestionsCtrl
 * @description
 * # PracticequestionsCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('PracticequestionsCtrl', function ($scope, $rootScope, $location, $window, subjectService, questionService, Url) {

    $scope.subject = {
      id: null,
      nome: null
    }

    $scope.alternative = {
      id: null,
      id_questao: null,
      descricao: null,
      alternativa_correta: null,
    }

    $scope.question = {
      id: null,
      descricao: null,
      id_concurso: null,
      id_area_conhecimento: null,
      numero_acertos: null,
      numero_erros: null
    }

    $scope.alternatives = [];

    $scope.subjects = [];
    $scope.subjectsId = [];

    $scope.checkbox_subjects = {}

    $scope.init = function(){
      var subjService = subjectService.getSubjects($scope.subject.id, $scope.subject.nome);
    	subjService.then(function (subjectResponse){
			     $scope.subjects = subjectResponse.subjects;
           $scope.createCheckbox();
    	});
    }

    $scope.createCheckbox = function(){
      angular.forEach($scope.subjects, function(value, key) {
        $scope.checkbox_subjects[key] = false;
      });
    }



    $scope.checkSubject = function(id){
      if ($scope.checkbox_subjects[id]){
        $scope.checkbox_subjects[id] = false;
        $scope.subjectsId.splice($scope.subjectsId.indexOf(id),1)
      } else {
        $scope.checkbox_subjects[id] = true;
        $scope.subjectsId.push(id)
      }
    }

    $scope.practice_question = function(){
      var questService = questionService.getQuestionToPractice($scope.subjectsId, $scope.alternatives,
                                        $scope.question.descricao, $scope.question.id, $scope.question.id_area_conhecimento,
                                        $scope.question.id_concurso, $scope.question.numero_acertos,
                                        $scope.question.numero_erros);
      questService.then(function(response){
        $scope.alternatives = response.alternativas;
        $scope.question.descricao = response.descricao;
        $scope.question.id = response.id;
        $scope.question.id_area_conhecimento = response.id_area_conhecimento;
        $scope.question.id_concurso = response.id_concurso;
        $scope.question.numero_acertos = response.numero_acertos;
        $scope.question.numero_erros = response.numero_erros;
        $rootScope.question = $scope.question;
        $rootScope.alternatives = $scope.alternatives;
        $rootScope.subjectsId = $scope.subjectsId;
        $location.path('/praticar/questao');
      });
    }

    /*
    ==================================
    QUESTION
    ----------------------------------
    */
    $scope.reinitialize_scope = function(){
      $scope.question = $rootScope.question;
      $scope.alternatives = $rootScope.alternatives;
      $scope.subjectsId = $rootScope.subjectsId;
      $scope.alternative.id = null;
      $rootScope.question = null;
      $rootScope.alternatives = null;
      $rootScope.subjectsId = null;
    }

  });
