  const app = angular.module('myApp', [ 'ui.grid' ]);
  app.controller('applc', function ($scope, $http) {
         $scope.user = {};
         $http.get(`/position`).then(function (response) {
         $scope.positions = response.data;
         console.log($scope.positions);
       });                   
       });


        app.controller('signup', function ($scope, $http) {
        $scope.user = {};
        $scope.submit = function (user) {
            console.log(user);
            $http.post(`/signup`, user).then((res) => {
            console.log(res);
            });
        }
    });

        app.controller("dashboard", function ($scope, $http) {    
        $scope.deleteRow = function(row) {
        var index = $scope.ManagerGrid.data.indexOf(row.entity);
        $scope.ManagerGrid.data.splice(index, 1);
      };
     
      $scope.ManagerGrid = {
        enableSorting: true,
        enableFiltering: false,
        data: [],
        onRegisterApi: function (gridApi) {$scope.ManagerGridApi = gridApi },
        columnDefs: [
            { field: 'firstName', displayName: 'First Name' },
            { field: 'lastName', displayName: 'Last Name'},
            { field: 'emailAddress', displayName: 'Email' },
            { field: 'jobTitle', displayName: 'Position' },
            { field: 'resume', displayName: 'Resume',
cellTemplate: '<a class="btn primary" href="/download/{{row.entity.id}}">Download Resume</a>'},
            { field: 'id', displayName:"Delete", cellTemplate:'<button class="btn primary" ng-click="grid.appScope.deleteRow(row.entity)">Delete</button>'}    
            
        ]
    }
    
       $http.get(`/allApp`).then(function (response) {
        $scope.data = response.apps;
        $scope.ManagerGrid.data = response.data;
        console.log(response);
    });
    
});
$scope.downloadFile = function(row) {
 console.log(row)
 let id = row.entity.id;
 $http.get(`/download/${id}`)
 };
     