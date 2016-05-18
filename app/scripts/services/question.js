'use strict';

/**
 * @ngdoc service
 * @name splinterAngularFrontendApp.question
 * @description
 * # question
 * Service in the splinterAngularFrontendApp.
 */
angular.module('splinterAngularFrontendApp')
  .service('questionService', function ($resource, $q, $http, Url) {
    return{
      getQuestionsByExamination: function (id, descricao, id_concurso, id_area_conhecimento, numero_acertos, numero_erros){
        var deferred = $q.defer();
        var resource = $resource(Url.QuestionsByExamination + '/' + id_concurso)
        resource.get({
          descricao: descricao,
          id: id,
          id_area_conhecimento: id_area_conhecimento,
          id_concurso: id_concurso,
          numero_acertos: numero_acertos,
          numero_erros:numero_erros
        }, function (data){
          return deferred.resolve(data);
        }, function (response){
          return deferred.reject(response);
        });
        return deferred.promise;
      },
      createNewQuestion: function (question){
        var deferred = $q.defer();
        var resource = $resource(Url.Questions);
        resource.save(question,
          function (data){
            return deferred.resolve(data);
          }, function (response){
            return deferred.reject(response);
          });
        return deferred.promise;
      }
    }
  });
