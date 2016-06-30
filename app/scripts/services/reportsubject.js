'use strict';

/**
 * @ngdoc service
 * @name splinterAngularFrontendApp.reportsubject
 * @description
 * # reportSubject
 * Service in the splinterAngularFrontendApp.
 */
angular.module('splinterAngularFrontendApp')
  .service('reportsubjectService', function ($resource, $q, $http, Url) {
    return{
      getSubjects: function (area_conhecimento, media, numero_acertos, numero_erros){
    		var deferred = $q.defer();
    		var resource = $resource(Url.ReportSubject);
    		resource.get({
              area_conhecimento: area_conhecimento,
          media: media,
          numero_acertos: numero_acertos,
    			numero_erros: numero_erros
    		},function (data){
    			return deferred.resolve(data);
    		}, function (response){
    			return deferred.reject(response);
    		});
    		return deferred.promise;
    	}
    }
  });
