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
    	getInstituicoesEnsino: function (id, sigla, nome, site, privado){
    		var deferred = $q.defer();
    		var resource = $resource(Url.Instituicoes);
    		resource.get({
                id: id,
    			sigla: sigla, 
    			nome: nome, 
    			site: site, 
    			privado: privado
    		}, 
            function (data){
    			return deferred.resolve(data);
    		}, function (response){
    			return deferred.reject(response);
    		});
    		return deferred.promise;
    	}
    }
  });
