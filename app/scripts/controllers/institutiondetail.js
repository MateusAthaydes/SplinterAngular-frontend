'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:InstitutiondetailCtrl
 * @description
 * # InstitutiondetailCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('InstitutiondetailCtrl', function ($scope, $routeParams, institutionService) {
    $scope.institution = {
        id: $routeParams.id,
        sigla: null,
        nome: null,
        site: null,
        privado: null
    }

    $scope.coursesCollapsed = true;
    $scope.examinationCollapsed = true;
    $scope.subjectScoreCollapsed = true;

    $scope.init = function(){
      var instService = institutionService.getInstitution($scope.institution.id,
                                            $scope.institution.sigla, $scope.institution.nome,
                                            $scope.institution.site, $scope.institution.privado);
    	instService.then(function (institutionResponse){
			     $scope.institution = institutionResponse;
    	});
    }
  });
