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
      nome: null,
      ano: null,
      semestre: null,
      data_inicio: null,
      duracao: null
    }

    $scope.question = {
      id: null,
     descricao: null,
     id_concurso: $scope.examination.id,
     id_area_conhecimento: null,
     numero_acertos: null,
     numero_erros: null
    }

    $scope.subject = {
       id: null,
       nome: null
    }

    $scope.questions = [];
    $scope.subjects = [];
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

      $scope.question.id_concurso = $scope.examination.id;

      var questService = questionService.getQuestionsByExamination($scope.question.id, $scope.question.descricao, $scope.question.id_concurso,
                                            $scope.question.id_area_conhecimento, $scope.question.numero_acertos,
                                            $scope.question.numero_acertos);
      questService.then(function (questionsResponse){
        $scope.questions = questionsResponse.questions;
      });

      var subjService = subjectService.getSubjects($scope.subject.id, $scope.subject.nome);
      subjService.then(function (subjectsResponse){
        $scope.subjects = subjectsResponse.subjects;
      });

      angular.forEach($scope.subjects, function(subject, subject_key) {
        angular.forEach($scope.questions, function(question, question_key){
            if (subject.id != question.id_area_conhecimento){
              $scope.subjects.splice(subject_key);
            }
        });
      });
    }

      $scope.questionsBySubjectGroup = function(subject){
        var questionsBySubjectList = [];
        angular.forEach($scope.questions, function(question, key) {
          if (question.id_area_conhecimento == subject.id){
              questionsBySubjectList.push(question);
          }
        });
        return questionsBySubjectList;
      }

      $scope.createNewQuestion = function(){
        var questService = questionService.createNewQuestion($scope.question)
        console.log($scope.question);
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
          $scope.question = {id_concurso: $scope.examination.id};
          $scope.editForm = false;
          $scope.modalTitle = "Nova Questão";
        }

        $scope.questionModal = $uibModal.open({
          templateUrl: '/views/mf_question.html',
          size: 'lg',
          scope: $scope,
        })
      }

      $scope.closeModal = function(){
        $scope.questionModal.dismiss('cancel');
      }
  });
