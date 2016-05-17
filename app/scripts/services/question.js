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
