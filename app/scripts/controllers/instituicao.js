'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:InstituicaoCtrl
 * @description
 * # InstituicaoCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('InstituicaoCtrl', function ($scope, $window, instituicaoService, Url) {

    $scope.institution = {
        id: null,
        sigla: null,
        nome: null,
        site: null,
        privado: null
    }

    $scope.institutions = [];

    $scope.init = function(){
    	$scope.showInstitutions = true;
    	var instService = instituicaoService.getInstitutions($scope.institution.id,
                                            $scope.institution.sigla, $scope.institution.nome,
                                            $scope.institution.site, $scope.institution.privado);
    	instService.then(function (institutionResponse){
			$scope.institutions = institutionResponse.institutions;
    	});
    }

    $scope.showNewInstitutionForm = function(){
      	$scope.showInstitutions = !$scope.showInstitutions;
    }

    $scope.createNewInstitution = function(){
      var instService = instituicaoService.createNewInstitution($scope.institution)
      console.log($scope.institution);
      instService.then(function (objSuccess){
        alert("Instituição salva!");
        $window.location.reload();
      }, function(objError){
        alert("Ops, houveram problemas.");
      })
    }

  });
