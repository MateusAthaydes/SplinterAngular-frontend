'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:InstitutionCtrl
 * @description
 * # InstitutionCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('InstitutionCtrl', function ($scope, $window, $uibModal, institutionService, Url) {

    $scope.institution = {
        id: null,
        sigla: null,
        nome: null,
        site: null,
        privado: false
    }

    $scope.institutions = [];

    $scope.init = function(){
    	$scope.showInstitutions = true;
    	var instService = institutionService.getInstitutions($scope.institution.id,
                                            $scope.institution.sigla, $scope.institution.nome,
                                            $scope.institution.site, $scope.institution.privado);
    	instService.then(function (institutionResponse){
			$scope.institutions = institutionResponse.institutions;
    	});
    }


    $scope.showNewInstitutionForm = function(){
      	$scope.showInstitutions = !$scope.showInstitutions;
        $scope.institution.privado = false;

    }

    $scope.createNewInstitution = function(){
      console.log($scope.institution);
      var instService = institutionService.createNewInstitution($scope.institution)
      instService.then(function (objSuccess){
        $scope.institutionModal.close();
        $window.location.reload();
      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      })
    }

    $scope.editInstitutionForm = function(institution){
      $scope.institution = institution;
      $scope.editForm = true;
    }

    $scope.editInstitution = function(){
      var instService = institutionService.editInstitution($scope.institution)
      instService.then(function (objSuccess){
        $scope.institutionModal.close();
      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      });
    }

    $scope.deleteInstitution = function(institution){
      console.log(institution);
      var instService = institutionService.deleteInstitution(institution);
      $window.location.reload();
    }

    /*
    ----------------------------------------------------------------------------
    Modal configuration
    create and edit modal;
    confirmation modal;
    */

    $scope.createEditInstitutionModal = function(institution){
      if (institution){
        $scope.institution = institution;
        $scope.editForm = true;
        $scope.modalTitle = "Editar Instituição";
      } else {
        $scope.institution = {};
        $scope.editForm = false;
        $scope.institution.privado = false;
        $scope.modalTitle = "Nova Instituição";
      }

      $scope.institutionModal = $uibModal.open({
        templateUrl: '/views/mf_institution.html',
        scope: $scope,
      })
    }

    $scope.closeModal = function(){
      $scope.institutionModal.dismiss('cancel');
    }

    $scope.openConfirmationModal = function (institution){
      $scope.institution = institution;
      $scope.modalTitle = "Excluir instituição";
      $scope.modalMessage = "Você tem certeza que deseja excluir essa instituição?"
      $scope.confirmationModal = $uibModal.open({
        templateUrl: '/views/confirmation_modal.html',
        scope: $scope
      })
    }

    $scope.confirm = function(){
      $scope.confirmationModal.close();
      $scope.deleteInstitution($scope.institution);
    }

    $scope.closeConfirmationModal = function(){
      $scope.confirmationModal.dismiss('cancel');
    }

  });
