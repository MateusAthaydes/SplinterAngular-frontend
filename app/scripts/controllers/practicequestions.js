'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:PracticequestionsCtrl
 * @description
 * # PracticequestionsCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('PracticequestionsCtrl', function ($scope, subjectService, questionService, Url) {

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
      console.log($scope.checkbox_subjects);
    }



    $scope.checkSubject = function(id){
      if ($scope.checkbox_subjects[id]){
        $scope.checkbox_subjects[id] = false;
        $scope.subjectsId.splice($scope.subjectsId.indexOf(id),1)
      } else {
        $scope.checkbox_subjects[id] = true;
        $scope.subjectsId.push(id)
      }

      console.log($scope.checkbox_subjects[id])
      console.log($scope.subjectsId);
    }

    $scope.start_practice = function(){
      var questService = questionService.getQuestionToPractice($scope.subjectsId, $scope.alternatives,
                                        $scope.question.descricao, $scope.question.id, $scope.question.id_area_conhecimento,
                                        $scope.question.id_concurso, $scope.question.numero_acertos,
                                        $scope.question.numero_erros);
      questService.then(function(response){
        $scope.alternatives = response.alternatives;
        $scope.question.descricao = response.descricao;
        $scope.question.id = response.id;
        $scope.question.id_area_conhecimento = response.id_area_conhecimento;
        $scope.question.id_concurso = response.id_concurso;
        $scope.question.numero_acertos = response.numero_acertos;
        $scope.question.numero_erros = response.numero_erros;
        console.log($scope.question)
      });
    }
  });
