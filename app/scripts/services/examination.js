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
      createNewExamination: function (examination){
        var deferred = $q.defer();
        var resource = $resource(Url.Examinations);
        resource.save(examination,
          function (data){
            return deferred.resolve(data);
          }, function (response){
            return deferred.reject(response);
          });
        return deferred.promise;
      },
      editExamination: function (examination) {
        var deferred = $q.defer();
        var resource = Url.Examination + '/' + examination.id;
        $http.put(resource, examination)
          .success(function (data, status, headers){
            return deferred.resolve(data);
          })
          .error(function (data, status, headers){
            return deferred.reject(data);
          });

          return deferred.promise;
      },
      deleteExamination: function (examination) {
        var deferred = $q.defer();
        var resource = $resource(Url.Examination + '/' + examination.id);
        resource.delete(examination,
          function (data){
            return data.$resolved;
          }, function (response){
            return deferred.reject(response);
          });
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
