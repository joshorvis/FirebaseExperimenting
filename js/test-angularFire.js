var app = angular.module("sampleApp", ["firebase"])
	.filter('jsonFull', function () {
		return function (object) {
			return JSON.stringify(object, function (key, value) {
				return value;
			}, '  ');
		};
	});

app.controller("SampleCtrl", function($scope, $firebaseObject) {
	var ref = new Firebase("https://jo-example-blog.firebaseio.com/");

	// download the data into a local object
	$scope.data = $firebaseObject(ref);

	$scope.selectedUser = 'benIsaac';
	// putting a console.log here won't work, see below
});