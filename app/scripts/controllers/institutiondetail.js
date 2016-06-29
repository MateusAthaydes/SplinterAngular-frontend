'use strict';

/**
 * @ngdoc function
 * @name splinterAngularFrontendApp.controller:InstitutiondetailCtrl
 * @description
 * # InstitutiondetailCtrl
 * Controller of the splinterAngularFrontendApp
 */
angular.module('splinterAngularFrontendApp')
  .controller('InstitutiondetailCtrl', function ($scope, $window, $uibModal, $routeParams, institutionService, examinationService, courseService) {
    $scope.institution = {
        id: $routeParams.id,
        sigla: null,
        nome: null,
        site: null,
        privado: null,
        concursos: [],
        cursos: []
    }

    $scope.examination = {
      id: null,
      id_instituicao_ensino: $routeParams.id,
      nome: null,
      ano: null,
      semestre: null,
      data_inicio: null,
      duracao: null
    }

    $scope.course = {
        id: null,
        nome: null,
        descricao: null,
        instituicoes: null
    }

      $scope.format = 'dd/MM/yyyy';

      $scope.today = function() {
        $scope.examination.data_inicio = new Date();
      };

      $scope.today();

      $scope.clear = function() {
        $scope.examination.data_inicio = null;
      };

      $scope.popup2 = {
        opened: false
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $scope.courses = [];
      $scope.coursesCollapsed = true;
      $scope.examinationCollapsed = true;
      $scope.subjectScoreCollapsed = true;

      $scope.init = function(){
        var instService = institutionService.getInstitution($scope.institution.id,
                                              $scope.institution.sigla, $scope.institution.nome,
                                              $scope.institution.site, $scope.institution.privado,
                                              $scope.institution.concursos, $scope.institution.cursos);
      	instService.then(function (institutionResponse){
              $scope.institution.sigla = institutionResponse.sigla;
              $scope.institution.nome = institutionResponse.nome;
              $scope.institution.site = institutionResponse.site;
              $scope.institution.privado = institutionResponse.privado;
              $scope.institution.concursos = institutionResponse.concursos;
              $scope.institution.cursos = institutionResponse.cursos;
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

      $scope.deleteExamination = function(examination){
        console.log(examination);
        var instService = institutionService.deleteExamination(examination);
        // $window.location.reload();
      }

      $scope.openExaminationModal = function(examination){
        if (examination){
          $scope.examination = examination;
          $scope.examination.ano = parseInt($scope.examination.ano);

          $scope.editForm = true;
          $scope.modalTitle = "Editar Concurso";
        } else {
          $scope.examination = {id_instituicao_ensino: $routeParams.id};
          $scope.editForm = false;
          $scope.modalTitle = "Nova Concurso";
        }

        $scope.examinationModal = $uibModal.open({
          templateUrl: '/views/mf_examination.html',
          size: 'lg',
          scope: $scope,
        });
      }

      $scope.createNewExamination = function(){
        console.log($scope.examination);
        var examService = examinationService.createNewExamination($scope.examination);
        examService.then(function (objSuccess){
          $scope.examinationModal.close();
          $window.location.reload();
        })
      }

      $scope.editExamination = function(){
        $scope.examination.id_instituicao_ensino = $routeParams.id,
        console.log($scope.examination);
        var examService = examinationService.editExamination($scope.examination);
        examService.then(function (objSuccess){
          $scope.examinationModal.close();
          $window.location.reload();
        })
      }

      $scope.gambetaReferenciaCircularInstitution = function(){
        var institutionIdList = [];
        angular.forEach($scope.institution.cursos, function(course, key){
          angular.forEach(course.instituicoes, function(insitituicao, key){
            delete insitituicao.cursos;
          });
        });
      }

      $scope.gambetaReferenciaCircularCourse = function(){
        angular.forEach($scope.course.instituicoes, function(institution, key){
          angular.forEach(institution.cursos, function(curso, key){
            delete curso.instituicoes;
          });
        });
      }

      $scope.unbindCourseFromInstitution = function(course){
        $scope.course = course;
        var inList = $scope.objInList($scope.institution, $scope.course.instituicoes);
        if(inList){
          $scope.course.instituicoes.splice($scope.institution);
        }

        var couList = $scope.objInList($scope.course, $scope.institution.cursos);
        if(couList){
          $scope.institution.cursos.splice($scope.course);
        }

        $scope.gambetaReferenciaCircularCourse();
        var instService = institutionService.editInstitution($scope.institution);
        instService.then(
          function(objSuccess){
            console.log("Vínculo entre curso e instituição excluído com sucesso");
        }, function(objError){
          console.log("Problemas em excluit o vínculo do curso em instituição");
          console.log(objError);
        });
        $scope.courseModal.close();
      }

      $scope.bindCourseToInstitution = function(course){
        $scope.course = course;
        var inList = $scope.objInList($scope.institution, $scope.course.instituicoes);
        if(!inList){
          $scope.course.instituicoes.push($scope.institution);
        }

        var couList = $scope.objInList($scope.course, $scope.institution.cursos);
        if(!couList){
          $scope.institution.cursos.push($scope.course);
        }

        $scope.gambetaReferenciaCircularCourse();
        var instService = institutionService.editInstitution($scope.institution);
        instService.then(
          function(objSuccess){
            console.log("Curso vinculado com instituição com sucesso");
        }, function(objError){
          console.log("Problemas em vincular curso em instituição");
          console.log(objError);
        });
        $scope.courseModal.close();
      }

      $scope.objInList = function (obj, objList) {
        var i;
        var inList = false;
        angular.forEach(objList, function(object, key){
          if (object.id === obj.id){
            inList = true;
          }
        });
        return inList;
      }

    /*
    ----------------------------------------------------------------------------
    Modal configuration
    create and edit modal;
    confirmation modal;
    */

    $scope.openConfirmationModal = function(type, object){
        $scope.removeType = type;
        $scope.removeObject = object;

        if ($scope.removeType == "course"){
          $scope.modalTitle = "Remover curso";
          $scope.modalMessage = "Você tem certeza que deseja remover o vínculo entre este curso e esta instituição?"
        } else if ($scope.removeType == "examination") {
          $scope.modalTitle = "Remover concurso";
          $scope.modalMessage = "Você tem certeza que deseja remover o concurso desta instituição?"
        } else {
          throw "Tipo não implementado";
        }

        $scope.confirmationModal = $uibModal.open({
            templateUrl: '/views/confirmation_modal.html',
            scope: $scope
        })
    }

    $scope.openCourseModal = function(){
      $scope.modalTitle = "Vincular Curso";
      $scope.course = {};

      var courService = courseService.getCourses($scope.course.id, $scope.course.nome, $scope.course.descricao);
        courService.then(function (courseResponse){
          $scope.courses = courseResponse.courses;
      });

      $scope.courseModal = $uibModal.open({
        templateUrl: '/views/mf_institution_course.html',
        size: 'lg',
        scope: $scope,
      });
    }

    $scope.confirm = function(){
        $scope.confirmationModal.close();

        if ($scope.removeType == "course"){
          // console.log('Implementar exclusão de vínculo de curso');
          var objectIndex = $scope.institution.cursos.indexOf($scope.removeObject);
          $scope.institution.cursos.splice(objectIndex, 1);
          $scope.unbindCourseFromInstitution($scope.removeObject);

        } else if ($scope.removeType == "examination"){
          // console.log('Implementar exclusão de concurso');
          var objectIndex = $scope.institution.concursos.indexOf($scope.removeObject);
          $scope.institution.concursos.splice(objectIndex, 1);
          $scope.deleteExamination($scope.removeObject);

        } else {
          console.log('Implementar exclusão deste tipo');
        }

        $scope.editInstitution($scope.institution);
    }

    $scope.closeConfirmationModal = function(){
        $scope.confirmationModal.dismiss('cancel');
    }

    $scope.closeCourseModal = function(){
        $scope.courseModal.dismiss('cancel');
    }

    $scope.closeExaminationModal = function(){
      $scope.examinationModal.dismiss('cancel');
    }
  });
