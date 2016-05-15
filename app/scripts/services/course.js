'use strict';

/**
 * @ngdoc service
 * @name splinterAngularFrontendApp.course
 * @description
 * # course
 * Service in the splinterAngularFrontendApp.
 */
angular.module('splinterAngularFrontendApp')
  .service('courseService', function ($resource, $q, $http, Url) {
    return{
    	getCourses: function (id, nome, descricao){
    		var deferred = $q.defer();
    		var resource = $resource(Url.Courses);
    		resource.get({
                id: id,
    			nome: nome,
    			descricao: descricao
    		},function (data){
    			return deferred.resolve(data);
    		}, function (response){
    			return deferred.reject(response);
    		});
    		return deferred.promise;
    	},
      createNewCourse: function (course){
        var deferred = $q.defer();
        var resource = $resource(Url.Courses);
        resource.save(course,
          function (data){
            return deferred.resolve(data);
          }, function (response){
            return deferred.reject(response);
          });
        return deferred.promise;
      },
      editCourse: function (course) {
        var deferred = $q.defer();
        var resource = Url.Course + '/' + course.id;
        $http.put(resource, course)
          .success(function (data, status, headers){
            return deferred.resolve(data);
          })
          .error(function (data, status, headers){
            return deferred.reject(data);
          });

          return deferred.promise;
      },
      deleteCourse: function (course) {
        var deferred = $q.defer();
        var resource = $resource(Url.Course + '/' + course.id);
        resource.delete(course,
          function (data){
            return data.$resolved;
          }, function (response){
            return deferred.reject(response);
          });

      }
    }
  });
