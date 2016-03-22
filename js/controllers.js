/**
 * Created by Administrator on 2016/3/22.
 */

var routeCtrl = angular.module("routeCtrl",[]);

routeCtrl.controller("routeHelloCtrl",function($scope){
    $scope.hello = "Hello Route!!";
});

routeCtrl.controller("routeListCtrl",function($scope){
    $scope.names = ["name1","name2","name3"];
});