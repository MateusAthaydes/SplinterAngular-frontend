angular.module('splinterAngularFrontendApp')
	.factory('Url', function (BaseUrl){
		return {
			Instituicoes: BaseUrl.localApi + '/instituicoes'
		}
	});

angular.module('splinterAngularFrontendApp')
	.factory('BaseUrl', function(){
		return {
			mockApi: 'http://mock.com/mock',
			localApi: 'localhost:5000'
		}
	})