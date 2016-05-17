'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:ExaminationdetailCtrl
 * @description
 * # ExaminationdetailCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('ExaminationdetailCtrl', function ($scope, $routeParams, $window, $uibModal, examinationService, subjectService, questionService) {
    $scope.examination = {
      id: $routeParams.id,
      instituicao:  null,
      questions: [],
      nome: null,
      ano: null,
      semestre: null,
      data_inicio: null,
      duracao: null
   }

   $scope.subject = {
       id: null,
       nome: null
   }

    $scope.questionsCollapsed = false;
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

      $scope.createNewQuestion = function(){
        $scope.newQuestion = {
          descricao: $scope.question.descricao,
          id_area_conhecimento: $scope.question.area_conhecimento.id,
          id_concurso: $scope.examination.id
        }
        var questService = questionService.createNewQuestion($scope.newQuestion)
        console.log($scope.newQuestion);
        questService.then(function (objSuccess){
          $scope.questionModal.close();
          $window.location.reload();
        }, function(objError){
          console.log(objError);
          alert("Ops, houveram problemas.");
        })
      }

      /*
      ----------------------------------------------------------------------------
      Modal configuration
      create and edit modal;
      confirmation modal;
      */

      $scope.createEditQuestionModal = function(question){
        if (question){
          $scope.question = question;
          $scope.editForm = true;
          $scope.modalTitle = "Editar Questão";
        } else {
          $scope.question = {};
          $scope.editForm = false;
          $scope.modalTitle = "Nova Questão";
        }

        var subjService = subjectService.getSubjects($scope.subject.id, $scope.subject.nome);
      	subjService.then(function (subjectResponse){
  			     $scope.subjects = subjectResponse.subjects;
        });

        $scope.questionModal = $uibModal.open({
          templateUrl: '/views/mf_question.html',
          size: 'lg',
          scope: $scope,
        })
      }

      $scope.closeModal = function(){
        $scope.questionModal.dismiss('cancel');
      }
    }
  });
