angular.module('splinterAngularFrontendApp')
	.factory('Url', function (BaseUrl){
		return {
			Institutions: BaseUrl.localApi + '/institutions'
		}
	});

angular.module('splinterAngularFrontendApp')
	.factory('BaseUrl', function(){
		return {
			mockApi: 'http://private-2d5a72-splinter.apiary-mock.com',
			localApi: 'http://localhost:5000'
		}
	})
