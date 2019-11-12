
angular.module('myApp', []).controller('myCtrl', function ($scope, $http) {
    $scope.user = {};
    $scope.submit = function (user) {
        console.log(user);
        
    };

});
