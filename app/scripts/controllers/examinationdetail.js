'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:ExaminationdetailCtrl
 * @description
 * # ExaminationdetailCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('ExaminationdetailCtrl', function ($scope, $routeParams, examinationService) {
    $scope.examination = {
      id: $routeParams.id,
      instituicao:  null,
      question: [],
      nome: null,
      ano: null,
      semestre: null,
      data_inicio: null,
      duracao: null
   }

    $scope.questionsCollapsed = true;
    $scope.subjectCollapsed = true;
    $scope.init = function(){
      var examService = examinationService.getExamination($scope.examination.id,
                                            $scope.examination.institution, $scope.examination.nome,
                                            $scope.examination.ano, $scope.examination.semestre,
                                            $scope.examination.data_inicio, $scope.examination.duracao);
      examService.then(function (examinationResponse){
           $scope.examination = examinationResponse;
      });

      $scope.questionsToFilter = function(){
        $scope.questionSubjects = [];
        return $scope.examination.questoes;
      }

      $scope.groupQuestionBySubject = function(question){
        var newSubject = $scope.questionSubjects.indexOf(question.area_conhecimento.nome) == -1;
        if(newSubject) {
          $scope.questionSubjects.push(question.area_conhecimento.nome);
        }
        return newSubject
      }

      $scope.questionsBySubjectGroup = function(questionBySubject){
        var questionsBySubjectList = [];
        angular.forEach($scope.examination.questoes, function(question, key) {
          if (question.area_conhecimento.id == questionBySubject.area_conhecimento.id){
              questionsBySubjectList.push(question);
          }
        });
        return questionsBySubjectList;
      }
    }
  });
