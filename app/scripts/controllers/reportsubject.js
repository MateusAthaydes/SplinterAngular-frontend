'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:SubjectCtrl
 * @description
 * # SubjectCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('ReportSubjectCtrl', function ($scope, $window, $uibModal, reportsubjectService, Url) {

    $scope.reportsubject = {
        area_conhecimento: null,
        media: null,
        numero_acertos: null,
        numero_erros: null
    }

    $scope.reportsubjects = [];

    $scope.init = function(){
    	var reportsubjService = reportsubjectService.getSubjects($scope.reportsubject.area_conhecimento, $scope.reportsubject.media, $scope.reportsubject.numero_acertos, $scope.reportsubject.numero_erros);
    	reportsubjService.then(function (reportsubjectResponse){
			     $scope.reportsubjects = reportsubjectResponse.reportsubjects;


           var ctx = document.getElementById("radarChart");

           var labels = [];
           var data_hits = [];
           var data_misses = [];
           angular.forEach($scope.reportsubjects, function(result, key){
             labels.push(result.area_conhecimento);
             var total = result.numero_acertos + result.numero_erros;

             var number = Math.ceil((result.numero_acertos/total)*100);
             data_hits.push(number);
             data_misses.push(100-number);
           });

           var data = {
               labels: labels,
               datasets: [
                   {
                       label: "Acertos [%]",
                       backgroundColor: "rgba(179,181,198,0.2)",
                       borderColor: "rgba(179,181,198,1)",
                       pointBackgroundColor: "rgba(179,181,198,1)",
                       pointBorderColor: "#fff",
                       pointHoverBackgroundColor: "#fff",
                       pointHoverBorderColor: "rgba(179,181,198,1)",
                       data: data_hits
                   },
                   {
                       label: "Erros [%]",
                       backgroundColor: "rgba(255,99,132,0.2)",
                       borderColor: "rgba(255,99,132,1)",
                       pointBackgroundColor: "rgba(255,99,132,1)",
                       pointBorderColor: "#fff",
                       pointHoverBackgroundColor: "#fff",
                       pointHoverBorderColor: "rgba(255,99,132,1)",
                       data: data_misses
                   }
               ]
           };

           var options = {
             legend: {
                 display: true
             },
             scale: {
                 reverse: false,
                 display: true,
                 ticks: {
                     beginAtZero: true
                 }
             }
           };

           var myRadarChart = new Chart(ctx, {
               type: 'radar',
               data: data,
               options: options
           });
    	});
    }
  });
