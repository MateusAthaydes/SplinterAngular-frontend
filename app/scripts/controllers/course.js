'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('CourseCtrl', function ($scope, $window, $uibModal, courseService, Url) {

    $scope.course = {
        id: null,
        nome: null,
        descricao: null
    }

    $scope.courses = [];

    $scope.init = function(){
    	var courService = courseService.getCourses($scope.course.id, $scope.course.nome, $scope.course.descricao);
    	courService.then(function (courseResponse){
			$scope.courses = courseResponse.courses;
    	});
    }

    $scope.createNewcourse = function(){
      console.log($scope.course);
      var courService = courseService.createNewCourse($scope.course);
      courService.then(function (objSuccess){
        $scope.courseModal.close();
        $window.location.reload();
      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      })
    }

    $scope.editCourse = function(){
      var courService = courseService.editCourse($scope.course);
      courService.then(function (objSuccess){
        $scope.courseModal.close();
      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      });
    }

    $scope.deleteCourse = function(course){
      console.log(course);
      var courService = courseService.deleteCourse(course);
      $window.location.reload();
    }

    /*
    ----------------------------------------------------------------------------
    Modal configuration
    create and edit modal;
    confirmation modal;
    */

    $scope.createEditCourseModal = function(course){
      if (course){
        $scope.course = course;
        $scope.editForm = true;
        $scope.modalTitle = "Editar Curso";
      } else {
        $scope.course = {};
        $scope.editForm = false;
        $scope.modalTitle = "Novo Curso";
      }

      $scope.courseModal = $uibModal.open({
        templateUrl: '/views/mf_course.html',
        scope: $scope,
      })
    }

    $scope.closeModal = function(){
      $scope.courseModal.dismiss('cancel');
    }

    $scope.openConfirmationModal = function (course){
      $scope.course = course;
      $scope.modalTitle = "Excluir curso";
      $scope.modalMessage = "Você tem certeza que deseja excluir esse curso?"
      $scope.confirmationModal = $uibModal.open({
        templateUrl: '/views/confirmation_modal.html',
        scope: $scope
      })
    }

    $scope.confirm = function(){
      $scope.confirmationModal.close();
      $scope.deleteCourse($scope.course);
    }

    $scope.closeConfirmationModal = function(){
      $scope.confirmationModal.dismiss('cancel');
    }

  });
