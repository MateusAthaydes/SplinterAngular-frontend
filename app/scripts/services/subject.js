'use strict';

/**
 * @ngdoc service
 * @name splinterAngularFrontendApp.subject
 * @description
 * # subject
 * Service in the splinterAngularFrontendApp.
 */
angular.module('splinterAngularFrontendApp')
  .service('subjectService', function ($resource, $q, $http, Url) {
    return{
    	getSubjects: function (id, nome){
    		var deferred = $q.defer();
    		var resource = $resource(Url.Subjects);
    		resource.get({
                id: id,
    			nome: nome
    		},function (data){
    			return deferred.resolve(data);
    		}, function (response){
    			return deferred.reject(response);
    		});
    		return deferred.promise;
    	},
      createNewSubject: function (subject){
        var deferred = $q.defer();
        var resource = $resource(Url.Subjects);
        resource.save(subject,
          function (data){
            return deferred.resolve(data);
          }, function (response){
            return deferred.reject(response);
          });
        return deferred.promise;
      },
      editSubject: function (subject) {
        var deferred = $q.defer();
        var resource = Url.Subject + '/' + subject.id;
        $http.put(resource, subject)
          .success(function (data, status, headers){
            return deferred.resolve(data);
          })
          .error(function (data, status, headers){
            return deferred.reject(data);
          });

          return deferred.promise;
      },
      deleteSubject: function (subject) {
        var deferred = $q.defer();
        var resource = $resource(Url.Subject + '/' + subject.id);
        resource.delete(subject,
          function (data){
            return data.$resolved;
          }, function (response){
            return deferred.reject(response);
          });

      }
    }
  });
