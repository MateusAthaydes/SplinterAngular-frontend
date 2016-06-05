'use strict';

/**
 * @ngdoc service
 * @name splinterAngularFrontendApp.user
 * @description
 * # user
 * Service in the splinterAngularFrontendApp.
 */
angular.module('splinterAngularFrontendApp')
  .service('userService', function ($resource, $q, $http, Url) {
    return{
    	getUsers: function (id, nome, email, senha, is_admin, data_cadastro){
    		var deferred = $q.defer();
    		var resource = $resource(Url.Users);
    		resource.get({
                id: id,
    			nome: nome,
    			email: email,
    			senha: senha,
    			is_admin: is_admin,
                data_cadastro: data_cadastro
    		},function (data){
    			return deferred.resolve(data);
    		}, function (response){
    			return deferred.reject(response);
    		});
    		return deferred.promise;
    	},
      createNewUser: function (user){
        user.senha = btoa(user.senha);
        var deferred = $q.defer();
        var resource = $resource(Url.Users);
        resource.save(user,
          function (data){
            return deferred.resolve(data);
          }, function (response){
            return deferred.reject(response);
          });
        return deferred.promise;
      },
      editUser: function (user) {
        var deferred = $q.defer();
        var resource = Url.User + '/' + user.id;
        $http.put(resource, user)
          .success(function (data, status, headers){
            return deferred.resolve(data);
          })
          .error(function (data, status, headers){
            return deferred.reject(data);
          });

          return deferred.promise;
      },
      deleteUser: function (user) {
        var deferred = $q.defer();
        var resource = $resource(Url.User + '/' + user.id);
        resource.delete(user,
          function (data){
            return data.$resolved;
          }, function (response){
            return deferred.reject(response);
          });

      }
    }
  });
