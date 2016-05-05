angular.module('splinterAngularFrontendApp')
	.factory('Url', function (BaseUrl){
		return {
			Instituicoes: BaseUrl.mockApi + '/institutions'
		}
	});

angular.module('splinterAngularFrontendApp')
	.factory('BaseUrl', function(){
		return {
			mockApi: 'http://private-2d5a72-splinter.apiary-mock.com',
			localApi: 'localhost:5000'
		}
	})