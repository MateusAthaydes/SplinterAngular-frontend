'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:ExaminationCtrl
 * @description
 * # ExaminationCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('ExaminationCtrl', function ($scope, examinationService, institutionService) {
    $scope.examination = {
      id: null,
      id_instituicao_ensino: null,
      nome: null,
      ano: null,
      semestre: null,
      data_inicio: null,
      duracao: null
  }

  $scope.institution = {
      id: null,
      sigla: null,
      nome: null,
      site: null,
      privado: null
  }

  $scope.examinations = [];

  $scope.init = function(){
    var examService = examinationService.getExaminations($scope.examination.id, $scope.examination.id_instituicao_ensino,
                                                        $scope.examination.nome, $scope.examination.ano,
                                                        $scope.examination.semestre, $scope.examination.data_inicio,
                                                        $scope.examination.duracao);
    examService.then(function (examinationResponse){
         $scope.examinations = examinationResponse.examinations;
    });
  }
});
