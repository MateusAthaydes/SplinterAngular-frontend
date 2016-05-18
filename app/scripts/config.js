angular.module('splinterAngularFrontendApp')
	.factory('Url', function (BaseUrl){
		return {
			Institutions: BaseUrl.localApi + '/institutions',
			Institution: BaseUrl.localApi + '/institution',
			Courses: BaseUrl.localApi + '/courses',
			Course: BaseUrl.localApi + '/course',
			Subjects: BaseUrl.localApi + '/subjects',
			Subject: BaseUrl.localApi + '/subject',
			Examinations: BaseUrl.localApi + '/examinations',
			Examination: BaseUrl.localApi + '/examination',
			Users: BaseUrl.localApi + '/users',
			User: BaseUrl.localApi + '/user',
			Questions: BaseUrl.localApi + '/questions',
			QuestionsByExamination: BaseUrl.localApi + '/questions/examination'
		}
	});

angular.module('splinterAngularFrontendApp')
	.factory('BaseUrl', function(){
		return {
			mockApi: 'http://private-2d5a72-splinter.apiary-mock.com',
			localApi: 'http://localhost:5000'
		}
	});
