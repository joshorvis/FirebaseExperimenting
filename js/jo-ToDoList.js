var app = angular.module("todoLists", ["firebase"])
	.filter('jsonFull', function () {
		return function (object) {
			return JSON.stringify(object, function (key, value) {
				return value;
			}, '  ');
		};
	});

app.controller("TodoCtrl", function($scope, $firebaseObject,$firebaseArray) {
	var userRef = new Firebase("https://jo-todolist.firebaseio.com/users");
	//var listRef = new Firebase("https://jo-todolist.firebaseio.com/lists");

	// download the data into a local object
	$scope.users = $firebaseObject(userRef);
	//$scope.lists = $firebaseObject(listRef);

	$scope.addUser = function() {
		if (!$scope.newUser.username) {
			alert('You must enter a username');
		} else {
			$scope.users[$scope.newUser.username] = $scope.newUser;
			$scope.users.$save();
		}
	};

	$scope.getListForUser = function(username) {
		var fbName = "https://jo-todolist.firebaseio.com/lists/" + username;
		console.log(fbName);
		var userListRef = new Firebase(fbName);
		$scope.userList = $firebaseArray(userListRef);

		//if (!$scope.userList) $scope.userList = [];
	};

	$scope.addListItem = function() {
		if (!$scope.newListItem.desc) {
			alert('You must enter some text before adding a new list item');
		} else {
			$scope.userList.$add($scope.newListItem).then(function(ref) {
				var id = ref.key(); // get the ID of the inserted item
				var pos = $scope.userList.$indexFor(id); // returns location in the array

				delete $scope.newListItem;
			})
		}
	}
});