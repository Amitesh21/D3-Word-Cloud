
var main = angular.module('main',[]);
main.controller('myctrl',function($scope, $http){
	$scope.allergies= function(req,res){
		$http({
			method:"POST",
			url:"/checkRequest",
			data:{
				"request":"allergies"
			}
		})
		.success(function(response){
			if(response.code=="200"){
				window.location.assign('/allergies');
			}
		});
	}
});