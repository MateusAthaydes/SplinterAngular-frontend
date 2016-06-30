angular.module('splinterAngularFrontendApp')
	.factory('Url', function (BaseUrl){
		return {
			Institutions: BaseUrl.herokuApi + '/institutions',
			Institution: BaseUrl.herokuApi + '/institution',
			Courses: BaseUrl.herokuApi + '/courses',
			Course: BaseUrl.herokuApi + '/course',
			Subjects: BaseUrl.herokuApi + '/subjects',
			Subject: BaseUrl.herokuApi + '/subject',
			Examinations: BaseUrl.herokuApi + '/examinations',
			Examination: BaseUrl.herokuApi + '/examination',
			Users: BaseUrl.herokuApi + '/users',
			User: BaseUrl.herokuApi + '/user',
			Questions: BaseUrl.herokuApi + '/questions',
			Question: BaseUrl.herokuApi + '/question',
			QuestionsByExamination: BaseUrl.herokuApi + '/questions/examination',
			Alternatives: BaseUrl.herokuApi + '/alternatives',
			Alternative: BaseUrl.herokuApi + '/alternative',
			QuestionsAnswer: BaseUrl.herokuApi + '/questions/answer',
			ReportSubject: BaseUrl.herokuApi + '/user/report'
		}
	});

angular.module('splinterAngularFrontendApp')
	.factory('BaseUrl', function(){
		return {
			mockApi: 'http://private-2d5a72-splinter.apiary-mock.com',
			localApi: 'http://localhost:5000',
			herokuApi: 'https://mestre-splinter.herokuapp.com'
		}
	});
