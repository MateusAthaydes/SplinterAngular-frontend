'use strict';

/**
 * @ngdoc service
 * @name splinterAngularFrontendApp.examination
 * @description
 * # examination
 * Service in the splinterAngularFrontendApp.
 */
angular.module('splinterAngularFrontendApp')
  .service('examinationService', function ($resource, $q, $http, Url) {
    return{
      getExaminations: function (id, instituicao, nome, ano, semestre, data_inicio, duracao){
        var deferred = $q.defer();
        var resource = $resource(Url.Examinations);
        resource.get({
          id: id,
          instituicao: instituicao,
          nome: nome,
          ano: ano,
          semestre: semestre,
          data_inicio: data_inicio,
          duracao: duracao
        },function (data){
          return deferred.resolve(data);
        }, function (response){
          return deferred.reject(response);
        });
        return deferred.promise;
      },
      getExamination: function (id, instituicao, nome, ano, semestre, data_inicio, duracao){
        var deferred = $q.defer();
        var resource = $resource(Url.Examination + '/' + id);
        resource.get({
          id: id,
          instituicao: instituicao,
          nome: nome,
          ano: ano,
          semestre: semestre,
          data_inicio: data_inicio,
          duracao: duracao
        }, function (data){
    			return deferred.resolve(data);
    		}, function (response){
    			return deferred.reject(response);
        });
        return deferred.promise;
      }
    }
  });
