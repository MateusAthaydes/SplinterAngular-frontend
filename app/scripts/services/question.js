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
      getQuestion: function(id, descricao, id_concurso, id_area_conhecimento, numero_acertos, numero_erros){
        var deferred = $q.defer();
        var resource = $resource(Url.Question + '/' + id);
        resource.get({
          id: id,
          descricao: descricao,
          id_concurso: id_concurso,
          id_area_conhecimento: id_area_conhecimento,
          numero_acertos: numero_acertos,
          numero_erros: numero_erros
        }, function (data){
          return deferred.resolve(data);
        }, function (response){
          return deferred.reject(response);
        });
        return deferred.promise;
      },
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
      },
      editQuestion: function (question) {
        var deferred = $q.defer();
        var resource = Url.Question + '/' + question.id;
        $http.put(resource, question)
          .success(function (data, status, headers){
            return deferred.resolve(data);
          })
          .error(function (data, status, headers){
            return deferred.reject(data);
          });
          return deferred.promise;
      },
      getAlternatives: function (id, id_questao, descricao, alternativa_correta){
        var deferred = $q.defer();
        var resource = $resource(Url.Question + '/alternatives/' + id_questao);
        resource.get({
          id: id,
          id_questao: id_questao,
          descricao: descricao,
          alternativa_correta: alternativa_correta
        }, function (data){
          return deferred.resolve(data);
        }, function (response){
          return deferred.reject(response);
        });
        return deferred.promise;
      },
      createNewAlternative: function (alternative){
        var deferred = $q.defer();
        console.log(alternative);
        var resource = $resource(Url.Alternatives);
        resource.save(alternative,
          function (data){
            return deferred.resolve(data)
          }, function (response){
            return deferred.reject(response);
          });
          return deferred.promise;
      },
      editAlternative: function (alternative){
        var deferred = $q.defer();
        var resource = Url.Alternative + '/' + alternative.id;
        $http.put(resource, alternative)
          .success(function (data, status, headers){
            return deferred.resolve(data);
          })
          .error(function (data, status, headers){
            return deferred.reject(data);
        });
          return deferred.promise;
      },
      deleteAlternative: function (alternative){
        var deferred = $q.defer();
        var resource = $resource(Url.Alternative + '/' + alternative.id);
        resource.delete(alternative,
          function (data){
            return data.$resolved;
          }, function (response){
            return deferred.reject(response);
          });
      },
      getQuestionToPractice: function (listSubjects, alternativas, descricao,
                                        id, id_area_conhecimento, id_concurso,
                                        numero_acertos, numero_erros){
        var deferred = $q.defer();
        console.log(listSubjects);
        var resource = $resource(Url.Question + '?subjects=' + listSubjects);
        resource.get({
          alternativas: alternativas,
          descricao: descricao,
          id: id,
          id_area_conhecimento: id_area_conhecimento,
          id_concurso: id_concurso,
          numero_acertos: numero_acertos,
          numero_erros: numero_erros
        }, function (data){
          return deferred.resolve(data);
        }, function (response){
          return deferred.reject(response);
        });
        return deferred.promise;
      },
      sendQuestionAnswer: function(alternative_id){
        var deferred = $q.defer();
        var resource = $resource(Url.QuestionsAnswer);
        resource.save(alternative_id,
          function (data){
            return deferred.resolve(data);
          }, function (response){
            return deferred.reject(response);
          });
        return deferred.promise;
      }
    }
  });
