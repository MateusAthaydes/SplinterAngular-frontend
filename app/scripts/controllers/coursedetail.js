'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:CoursedetailCtrl
 * @description
 * # CoursedetailCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('CoursedetailCtrl', function ($scope, $routeParams, courseService) {
    $scope.course = {
        id: $routeParams.id,
        nome: null,
        descricao: null,
        instituicoes: null
    }

    $scope.institutionsCollapsed = true;

    $scope.init = function(){
      var courService = courseService.getCourse($scope.course.id, $scope.course.nome,
                                            $scope.course.descricao);
    	courService.then(function (courseResponse){
			     $scope.course = courseResponse;
           console.log($scope.course);
    	});

    }
  });
