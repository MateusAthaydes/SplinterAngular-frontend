'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:PracticequestionsCtrl
 * @description
 * # PracticequestionsCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('PracticequestionsCtrl', function ($scope, $rootScope, $route, $location, $window, $sce, subjectService, questionService, Url) {

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

    $scope.practice_result = [];
    $scope.answers = [];
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
      $rootScope.hits = [];
      $rootScope.misses = [];
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
      $scope.initialize_chosen_subjects();
    }

    $scope.initialize_chosen_subjects = function () {
      $rootScope.chosen_subjects = [];

      angular.forEach($scope.subjects, function(sub, key){
        if ($scope.subjectsId.indexOf(sub.id) >= 0){
          $rootScope.chosen_subjects.push(sub);
        }
      });
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
        $rootScope.subjects = $scope.subjects;

        $rootScope.practice_questions = $scope.practice_questions;
        $rootScope.answers = $scope.answers;

        if ($location.path() == "/praticar/questao"){
          $route.reload();
        } else {
          $location.path('/praticar/questao');
        }

      });
    }

    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };

    /*
    =========================================================
      QUESTION
    ---------------------------------------------------------
    */
    $scope.reinitialize_scope = function(){
      $scope.question = $rootScope.question;
      $scope.alternatives = $rootScope.alternatives;
      $scope.subjectsId = $rootScope.subjectsId;
      $scope.subjects = $rootScope.subjects;
      $scope.practice_questions = $rootScope.practice_questions;
      $scope.answers = $rootScope.answers;

      $scope.alternative.id = null;
      $rootScope.question = null;
      $rootScope.alternatives = null;
      $rootScope.subjectsId = null;
      $rootScope.subjects = null;

      $rootScope.answers = null;
      $rootScope.practice_questions = null;

      $scope.question_answered = false;
    }

    $scope.answer_question = function(){
      // console.log($scope.answers);
      var correct_attempts;
      var incorrect_attempts;
      angular.forEach($rootScope.chosen_subjects, function(subject, index){
        if ($scope.question.id_area_conhecimento == subject.id){
          $scope.answer = {};
          $scope.answer.question_subject_id = $scope.question.id_area_conhecimento;

          angular.forEach($scope.alternatives, function(value, key){
            if ($scope.alternative.id == value.id){
              correct_attempts = [];
              incorrect_attempts = [];
              if(value.alternativa_correta){
                correct_attempts.push(value.id);
              } else {
                incorrect_attempts.push(value.id);
              }
            }
            $scope.answer.correct_attempts = correct_attempts;
            $scope.answer.incorrect_attempts = incorrect_attempts;
          });
          // console.log("ANSWER: " + $scope.answer);
          $scope.answers.push($scope.answer);
        }
      });
      $scope.question_answered = true;
    }

    $scope.next_question = function(){
      var questService = questionService.sendQuestionAnswer($scope.alternative.id);
      questService.then(function(objResponse){
        $scope.practice_question();
      });
    }

    $scope.finish_practice = function(){
      var user_answer;
      var user_hits;
      var user_misses;
      // console.log($scope.answers);
      angular.forEach($rootScope.chosen_subjects, function(subject, index){
        user_answer = {};
        user_hits = [];
        user_misses = [];


        user_answer['subject_id'] = subject.id;
        user_answer['subject_name'] = subject.nome;
        angular.forEach($scope.answers, function(answer, key){
          // console.log(answer.question_subject_id);
          // console.log(subject.id);

          if (answer.question_subject_id == subject.id){
            if (answer.correct_attempts.length > 0){
              user_hits.push(answer.correct_attempts[0]);
            } else{
              user_misses.push(answer.incorrect_attempts[0]);
            }
          }
          user_answer['hits'] = user_hits;
          user_answer['misses'] = user_misses;
        });
        $scope.practice_result.push(user_answer);
      });

      $rootScope.practice_questions = $scope.practice_questions;
      $rootScope.practice_result = $scope.practice_result;
      $location.path('/praticar/questao/resultados');
    }

    /*
    =========================================================
      RESULTADOS
    ---------------------------------------------------------
    */

    $scope.init_results = function(){
      // $scope.practice_questions = $rootScope.practice_questions;
      // console.log("practice_questions: " + $scope.practice_questions);
      $scope.practice_result = $rootScope.practice_result;
      // console.log("practice_result: " + $scope.practice_result);

      var labels = [];
      var data_hits = [];
      // var data_misses = [];
      var data_total_misses_hits = [];
      angular.forEach($scope.practice_result, function(result, key){
        labels.push(result.subject_name);
        data_hits.push(result.hits.length);
        data_total_misses_hits.push(result.misses.length + result.hits.length);
      });

      // console.log($scope.practice_result);
      // console.log(labels);
      // console.log(data_hits);
      // console.log(data_total_misses_hits);

      var ctx = document.getElementById("barChart");
      var data = {
          labels: labels, //Areas de conhecimento
          datasets: [
              {
                  label: "Acertos",
                  backgroundColor: "#5cb85c",
                  borderColor: "#4cae4c",
                  borderWidth: 1,
                  // hoverBackgroundColor: "rgba(107, 255, 99, 0.58)",
                  // hoverBorderColor: "rgba(107, 255, 99, 0.9)",
                  data: data_hits, //valor por área
              },
              {
                label: "Total",
                backgroundColor: "#337ab7",
                borderColor: "#2e6da4",
                borderWidth: 1,
                // hoverBackgroundColor: "rgba(255,99,132,0.4)",
                // hoverBorderColor: "rgba(255,99,132,1)",
                data: data_total_misses_hits
              }
          ]
      };

      var options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }

      var myBarChart = new Chart(ctx, {
          type: 'bar',
          data: data,
          options: options
      });
    }
  });
