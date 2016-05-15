'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('UserCtrl', function ($scope, $window, $uibModal, userService, Url) {

    $scope.user = {
        id: null,
        nome: null,
        email: null,
        senha: null,
        is_admin: false,
        data_cadastro: null
    }

    $scope.users = [];

    $scope.init = function(){
    	var subjService = userService.getUsers($scope.user.id, $scope.user.nome,
                                    $scope.user.email, $scope.user.senha,
                                    $scope.user.is_admin, $scope.user.data_cadastro);
    	subjService.then(function (userResponse){
			$scope.users = userResponse.users;
    	});
    }

    $scope.createNewUser = function(){
      console.log($scope.user);
      var subjService = userService.createNewUser($scope.user);
      subjService.then(function (objSuccess){
        $scope.userModal.close();
        $window.location.reload();
      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      })
    }

    $scope.editUser = function(){
      var subjService = userService.editUser($scope.user);
      subjService.then(function (objSuccess){
        $scope.userModal.close();
      }, function(objError){
        console.log(objError);
        alert("Ops, houveram problemas.");
      });
    }

    $scope.deleteUser = function(user){
      console.log(user);
      var subjService = userService.deleteUser(user);
      $window.location.reload();
    }

    /*
    ----------------------------------------------------------------------------
    Modal configuration
    create and edit modal;
    confirmation modal;
    */

    $scope.createEditUserModal = function(user){
      if (user){
        $scope.user = user;
        $scope.editForm = true;
        $scope.modalTitle = "Editar Usuário";
      } else {
        $scope.user = {};
        $scope.editForm = false;
        $scope.user.is_admin = false;
        $scope.modalTitle = "Novo Usuário";
      }

      $scope.userModal = $uibModal.open({
        templateUrl: '/views/mf_user.html',
        scope: $scope,
      })
    }

    $scope.closeModal = function(){
      $scope.userModal.dismiss('cancel');
    }

    $scope.openConfirmationModal = function (user){
      $scope.user = user;
      $scope.modalTitle = "Excluir usuário";
      $scope.modalMessage = "Você tem certeza que deseja excluir esse usuário?"
      $scope.confirmationModal = $uibModal.open({
        templateUrl: '/views/confirmation_modal.html',
        scope: $scope
      })
    }

    $scope.confirm = function(){
      $scope.confirmationModal.close();
      $scope.deleteUser($scope.user);
    }

    $scope.closeConfirmationModal = function(){
      $scope.confirmationModal.dismiss('cancel');
    }

  });
