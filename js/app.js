/**
 * Created by Administrator on 2016/3/22.
 */
/**
 * 打招呼的应用（module），不用依赖任务东西，所以给个空数据[]
 */
var helloApp = angular.module('helloApp',[]);
/**
 * 创建一个打招呼的控制器，使用$scope 来和DOM 交互
 * app.controller -- controller
 * $scope -- model
 * DOM -- view
 */
helloApp.controller('helloCtrl',function($scope){
    $scope.hello = "Hello AngularJs!!";
});

/**
 * 这次不同了，创建的module 已经依赖了路由模块ngRoute，所以必须加载
 * 还有依赖routeCtrl，因为会转发给这个module 的Controller来处理
 * 可以看出，module 也是可以是Ctrl，module 之间可以嵌套使用的
 */
var routeApp = angular.module("routeApp",["ngRoute","routeCtrl"]);

/**
 * 配置路由
 * 使用module.config 方法，利用$routeProvider 来配置
 */
routeApp.config(function($routeProvider){
    $routeProvider.when('/hello',{
        templateUrl:'../tpls/hello.html',
        controller:'routeHelloCtrl'
    }).when('/list',{
        templateUrl:'../tpls/list.html',
        controller:'routeListCtrl'
    }).otherwise({
        redirectTo:'/hello'
    });
});

var bindApp = angular.module("bindApp",[]);
bindApp.controller("bindCtrl",function($scope,$log){
    $scope.userInfo={
        email:"642378415@qq.com",
        password:"1234567890",
        autoLogin:true
    }
    $scope.getFormData = function () {
        $log.debug($scope.userInfo)
    }
    $scope.setFormData = function () {
        $scope.userInfo={
            email:"vector.huang@qq.com",
            password:"0987654321",
            autoLogin:false
        }
    }
    $scope.resetFormData = function () {
        $scope.userInfo={
            email:"642378415@qq.com",
            password:"1234567890",
            autoLogin:true
        }
    }
})