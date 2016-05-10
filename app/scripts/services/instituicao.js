'use strict';

/**
 * @ngdoc service
 * @name splinterAngularFrontendApp.instituicao
 * @description
 * # instituicao
 * Service in the splinterAngularFrontendApp.
 */
angular.module('splinterAngularFrontendApp')
  .service('instituicaoService', function ($resource, $q, $http, Url) {
    return{
    	getInstitutions: function (id, sigla, nome, site, privado){
    		var deferred = $q.defer();
    		var resource = $resource(Url.Institutions);
    		resource.get({
          id: id,
    			sigla: sigla,
    			nome: nome,
    			site: site,
    			privado: privado
    		},function (data){
    			return deferred.resolve(data);
    		}, function (response){
    			return deferred.reject(response);
    		});
    		return deferred.promise;
    	},
      createNewInstitution: function (institution){
        var deferred = $q.defer();
        var resource = $resource(Url.Institutions);
        resource.save(institution,
          function (data){
            return deferred.resolve(data);
          }, function (response){
            return deferred.reject(response);
          });
        return deferred.promise;
      },
      editInstitution: function (institution) {
        var deferred = $q.defer();
        var resource = Url.EditInstitution + '/' + institution.id;
        $http.put(resource, institution)
          .success(function (data, status, headers){
            return deferred.resolve(data);
          })
          .error(function (data, status, headers){
            return deferred.reject(data);
          });

          return deferred.promise;
      }
    }
  });
