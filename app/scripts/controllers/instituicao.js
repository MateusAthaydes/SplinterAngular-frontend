'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:InstituicaoCtrl
 * @description
 * # InstituicaoCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('InstituicaoCtrl', function ($scope) {
    $scope.instituicoes = [];
    var instituicao = {
    	sigla: 'hh',
    	nome: 'haha',
    	site: 'hh.com',
    	tipo: 'Graduação'
    };

    var instituicao2 = {
    	sigla: 'hh2',
    	nome: 'haha2',
    	site: 'hh.com2',
    	tipo: 'Graduação2'
    };

    $scope.instituicoes.push(instituicao);
    $scope.instituicoes.push(instituicao2);

  });
