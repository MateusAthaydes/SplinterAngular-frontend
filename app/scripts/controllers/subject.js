'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:SubjectCtrl
 * @description
 * # SubjectCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('SubjectCtrl', function ($scope, $window, $uibModal, subjectService, Url) {

    $scope.subject = {
        id: null,
        nome: null
    }

    $scope.subjects = [];

    $scope.init = function(){
    	var subjService = subjectService.getSubjects($scope.subject.id, $scope.subject.nome);
    	subjService.then(function (subjectResponse){
			$scope.subjects = subjectResponse.subjects;
    	});
    }

    $scope.createNewSubject = function(){
      console.log($scope.subject);
      var subjService = subjectService.createNewSubject($scope.subject);
      subjService.then(function (objSuccess){
        $scope.subjectModal.close();
        $window.location.reload();
      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      })
    }

    $scope.editSubject = function(){
      var subjService = subjectService.editSubject($scope.subject);
      subjService.then(function (objSuccess){
        $scope.subjectModal.close();
      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      });
    }

    $scope.deleteSubject = function(subject){
      console.log(subject);
      var subjService = subjectService.deleteSubject(subject);
      $window.location.reload();
    }

    /*
    ----------------------------------------------------------------------------
    Modal configuration
    create and edit modal;
    confirmation modal;
    */

    $scope.createEditSubjectModal = function(subject){
      if (subject){
        $scope.subject = subject;
        $scope.editForm = true;
        $scope.modalTitle = "Editar Área de Conhecimento";
      } else {
        $scope.subject = {};
        $scope.editForm = false;
        $scope.modalTitle = "Nova Área de Conhecimento";
      }

      $scope.subjectModal = $uibModal.open({
        templateUrl: '/views/mf_subject.html',
        scope: $scope,
      })
    }

    $scope.closeModal = function(){
      $scope.subjectModal.dismiss('cancel');
    }

    $scope.openConfirmationModal = function (subject){
      $scope.subject = subject;
      $scope.modalTitle = "Excluir área de conhecimento";
      $scope.modalMessage = "Você tem certeza que deseja excluir essa área de conhecimento?"
      $scope.confirmationModal = $uibModal.open({
        templateUrl: '/views/confirmation_modal.html',
        scope: $scope
      })
    }

    $scope.confirm = function(){
      $scope.confirmationModal.close();
      $scope.deleteSubject($scope.subject);
    }

    $scope.closeConfirmationModal = function(){
      $scope.confirmationModal.dismiss('cancel');
    }

  });
