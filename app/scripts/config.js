angular.module('splinterAngularFrontendApp')
	.factory('Url', function (BaseUrl){
		return {
			Instituicoes: BaseUrl.mockApi + '/instituicoes'
		}
	});

angular.module('splinterAngularFrontendApp')
	.factory('BaseUrl', function(){
		return {
			mockApi: 'http://mock.com/mock',
		}
	})