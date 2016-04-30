'use strict';

/**
 * @ngdoc service
 * @name splinterAngularFrontendApp.instituicao
 * @description
 * # instituicao
 * Service in the splinterAngularFrontendApp.
 */
angular.module('splinterAngularFrontendApp')
  .service('instituicaoService', function ($resource, $q, Url) {
    return{
    	getInstituicoesEnsino: function (){
    		var deferred = $q.defer();
    		var resource = $resource(Url.Instituicoes);
    		resource.get({
    			sigla: sigla, 
    			nome: nome, 
    			site: site, 
    			tipo: tipo
    		}, function (data){
    			return deferred.resolve(data);
    		}, function (response){
    			return deferred.reject(response);
    		});
    		return deferred.promise;
    	}
    }
  });
