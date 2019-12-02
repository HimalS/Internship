const app = angular.module('myApp', []);
app.controller('applc', function ($scope, $http) {
    $scope.user = {};
    $http.get(`/position`).then(function(response) {
        $scope.positions = response.data;
        console.log($scope.positions);
    });

    $scope.submit = function (user) {
        console.log(user);
        $http.post(`/submit`, user).then((res) => {
            console.log(res);
        });
    }
});

app.controller('login', function ($scope, $http) { 
    $scope.user = {};
    $scope.submit = function (user) {
        console.log(user);
        $http.post(`/login`,user).then((res)=> {
            console.log(res);
            app.controller("uigridCtrl", function ($scope) {
            
                $scope.gridOptions = {
     
                enableSorting: true,
                enableFiltering: true,
     
                columnDefs: [                                                                               
             {field:'firstName'},
             {field:'lastName'},
            {field:'emailAddress'},
           {field:'jobTitle'},
          {field:'resume'},
          {field:'id',enableSorting:false}
         ],
          }
         });
         onRegisterApi: function (gridApi) {
         $scope.grid1Api = gridApi;
         $scope.users = 'user.applicant'
         
        $scope.gridOptions.data = $scope.users;
        };
    })
}
}); 
app.controller('signup', function ($scope, $http) { 
    $scope.user = {};
    $scope.submit = function (user) {
        console.log(user);
        $http.post(`/signup`, user).then((res)=>{
            console.log(res);
        });
    }
});