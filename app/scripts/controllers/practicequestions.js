'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:PracticequestionsCtrl
 * @description
 * # PracticequestionsCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('PracticequestionsCtrl', function ($scope, $rootScope, $route, $location, $window, subjectService, questionService, Url) {

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

    $rootScope.practice_result = [];

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
    }

    $scope.practice_question = function(){
      console.log("hey");
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
        if ($location.path() == "/praticar/questao"){
          $route.reload();
        } else {
          $location.path('/praticar/questao');
        }

      });
    }

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
      $scope.alternative.id = null;
      $rootScope.question = null;
      $rootScope.alternatives = null;
      $rootScope.subjectsId = null;
      $rootScope.subjects = null;

      $scope.question_answered = false;
    }

    $scope.answer_question = function(){
      $scope.chosen_subjects = [];
      console.log("hey");
      console.log($scope.subjects);
      console.log("hou");
      console.log($scope.subjectsId);
      console.log("question");
      console.log($scope.question);

      angular.forEach($scope.subjects, function(key, sub){
        if ($scope.subjectsId == sub.id){
          $scope.chosen_subjects.push(sub);
        }
      });

      var user_answer;
      var correct_attempts;
      var incorrect_attempts;
      angular.forEach($scope.chosen_subjects, function(subject, index){
        user_answer = {};
        user_answer['subject_id'] = subject.id;
        user_answer['subject_name'] = subject.nome;
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
          user_answer['correct_attempts'] = correct_attempts;
          user_answer['incorrect_attempts'] = incorrect_attempts;
        });
        $rootScope.practice_result.push(user_answer);
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
      $location.path('/praticar/questao/resultados');
    }

    /*
    =========================================================
      RESULTADOS
    ---------------------------------------------------------
    */

    $scope.init_results = function(){
      console.log($rootScope.practice_result);
      var labels = [];
      angular.forEach($rootScope.practice_result, function(result, key){
        labels.push(result.subject_name);
      });
      console.log(labels);
      var ctx = document.getElementById("barChart");
      var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: "My First dataset",
                  backgroundColor: "rgba(255,99,132,0.2)",
                  borderColor: "rgba(255,99,132,1)",
                  borderWidth: 1,
                  hoverBackgroundColor: "rgba(255,99,132,0.4)",
                  hoverBorderColor: "rgba(255,99,132,1)",
                  data: [65, 59, 80, 81, 56, 55, 40],
              }
          ]
      };

      var options = {
          scale: {
              reverse: true,
              ticks: {
                  beginAtZero: true
              }
          }
      };

      var myBarChart = new Chart(ctx, {
          type: 'bar',
          data: data,
          options: options
      });
    }
  });
