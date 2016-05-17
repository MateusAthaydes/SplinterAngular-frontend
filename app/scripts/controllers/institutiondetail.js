'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:InstitutiondetailCtrl
 * @description
 * # InstitutiondetailCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('InstitutiondetailCtrl', function ($scope, $window, $uibModal, $routeParams, institutionService) {
    $scope.institution = {
        id: $routeParams.id,
        sigla: null,
        nome: null,
        site: null,
        privado: null,
        cursos: null
    }

    $scope.coursesCollapsed = true;
    $scope.examinationCollapsed = true;
    $scope.subjectScoreCollapsed = true;

    $scope.init = function(){
      var instService = institutionService.getInstitution($scope.institution.id,
                                            $scope.institution.sigla, $scope.institution.nome,
                                            $scope.institution.site, $scope.institution.privado);
    	instService.then(function (institutionResponse){
			     $scope.institution = institutionResponse;
    	});
    }

    $scope.editInstitution = function(){
      var instService = institutionService.editInstitution($scope.institution);
      instService.then(function (objSuccess){

      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      });
    }

    /*
    ----------------------------------------------------------------------------
    Modal configuration
    create and edit modal;
    confirmation modal;
    */

    // $scope.createEditInstitutionModal = function(institution){
    //   if (institution){
    //     $scope.institution = institution;
    //     $scope.editForm = true;
    //     $scope.modalTitle = "Editar Instituição";
    //   } else {
      //     $scope.institution = {};
    //     $scope.editForm = false;
    //     $scope.institution.privado = false;
    //     $scope.modalTitle = "Nova Instituição";
    //   }
    //
    //   $scope.institutionModal = $uibModal.open({
    //     templateUrl: '/views/mf_institution.html',
    //     scope: $scope,
    //   })
    // }
    //
    // $scope.closeModal = function(){
    //   $scope.institutionModal.dismiss('cancel');
    // }

    $scope.openConfirmationModal = function(type, object){
        $scope.removeType = type;
        $scope.removeObject = object;
        $scope.modalTitle = "Remover curso";
        $scope.modalMessage = "Você tem certeza que deseja remover o vínculo entre este curso e esta instituição?"
        $scope.confirmationModal = $uibModal.open({
            templateUrl: '/views/confirmation_modal.html',
            scope: $scope
        })
    }

    $scope.confirm = function(){
        $scope.confirmationModal.close();

        if ($scope.removeType == "course"){
            var objectIndex = $scope.institution.cursos.indexOf($scope.removeObject);
            $scope.institution.cursos.splice(objectIndex, 1);
        } else {
            console.log('Implementar');
        }

        $scope.editInstitution($scope.institution);
    }

    $scope.closeConfirmationModal = function(){
        $scope.confirmationModal.dismiss('cancel');
    }
  });
