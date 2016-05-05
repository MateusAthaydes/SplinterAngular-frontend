'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:InstituicaoCtrl
 * @description
 * # InstituicaoCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('InstituicaoCtrl', function ($scope, instituicaoService, Url) {

    $scope.instituicao = {
        id: null,
        sigla: null, 
        nome: null, 
        site: null, 
        privado: null 
    }

    $scope.instituicoes = [];
    
    $scope.init = function(){
    	$scope.mostraInstituicoes = true;
    	var instService = instituicaoService.getInstituicoesEnsino($scope.instituicao.id,
                                            $scope.instituicao.sigla, $scope.instituicao.nome,
                                            $scope.instituicao.site, $scope.instituicao.privado);
    	instService.then(function (instituicoesResponse){
			$scope.instituicoes = instituicoesResponse.institutions;
    	});
    }

    $scope.formCriaInstituicao = function(){
    	$scope.mostraInstituicoes = !$scope.mostraInstituicoes;
    }

  });
