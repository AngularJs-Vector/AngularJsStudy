/**
 * Created by Administrator on 2016/3/22.
 */
/**
 * 打招呼的应用（module），不用依赖任务东西，所以给个空数据[]
 */
var helloApp = angular.module('helloApp', []);
/**
 * 创建一个打招呼的控制器，使用$scope 来和DOM 交互
 * app.controller -- controller
 * $scope -- model
 * DOM -- view
 */
helloApp.controller('helloCtrl', function ($scope) {
    $scope.hello = "Hello AngularJs!!";
});

/**
 * 这次不同了，创建的module 已经依赖了路由模块ngRoute，所以必须加载
 * 还有依赖routeCtrl，因为会转发给这个module 的Controller来处理
 * 可以看出，module 也是可以是Ctrl，module 之间可以嵌套使用的
 */
var routeApp = angular.module("routeApp", ["ngRoute", "routeCtrl"]);

/**
 * 配置路由
 * 使用module.config 方法，利用$routeProvider 来配置
 */
routeApp.config(function ($routeProvider) {
    $routeProvider.when('/hello', {
        templateUrl: '../tpls/hello.html',
        controller: 'routeHelloCtrl'
    }).when('/list', {
        templateUrl: '../tpls/list.html',
        controller: 'routeListCtrl'
    }).otherwise({
        redirectTo: '/hello'
    });
});
/**
 * 数据双向绑定
 */
var bindApp = angular.module("bindApp", []);
bindApp.controller("bindCtrl", function ($scope, $log) {
    $scope.userInfo = {
        email: "642378415@qq.com",
        password: "1234567890",
        autoLogin: true
    }
    $scope.getFormData = function () {
        $log.debug($scope.userInfo)
    }
    $scope.setFormData = function () {
        $scope.userInfo = {
            email: "vector.huang@qq.com",
            password: "0987654321",
            autoLogin: false
        }
    }
    $scope.resetFormData = function () {
        $scope.userInfo = {
            email: "642378415@qq.com",
            password: "1234567890",
            autoLogin: true
        }
    }
})

/**
 * 其他指令
 */
var otherApp = angular.module("otherApp", [])
otherApp.controller("hideShow", function ($scope) {
    $scope.isShow = true;
    $scope.hide = function () {
        $scope.isShow = false;
    }
    $scope.show = function () {
        $scope.isShow = true;
    }
})

var netApp = angular.module("netApp", [])

netApp.controller("netCtrl", function ($scope,$log, pocket) {
    /**
     * @param config
     *
     */
    $scope.gossip = {
        categoryId: 1,
        content: "",
        access_token: networkConfig.token,
        images: undefined
    }

    $scope.create = function () {
        var config = {
            url: "/api/gossip/custom/create",
            params: $scope.gossip,
        }
        pocket.formData(config)
            .success(function (data) {
                $scope.data = data
                $log.debug("created success")
            })
            .error(function (data) {
                $scope.data = data
                $log.debug("created error")
            })
    }

    $scope.like = function (form) {
        var config = {
            url: "/api/gossip/custom/like",
            params: form,
            success: function (data) {
                $scope.data = data
            },
            error: function (data) {
                $scope.data = data
            }
        }
        pocket.formData(config)
    }
})

/**
 * 定义模板
 */
var directiveApp = angular.module("directiveApp", [])
directiveApp.run(function ($templateCache) {
    $templateCache.put("hello.html", "<h1>Hi TemplateCache</h1>")
})
directiveApp.directive("hello", function () {
    return {
        restrict: "AECM",
        template: "<h1>Hello AngularJs!!</h1>",
        replace: true
    }
})
directiveApp.directive("helloCache", function ($templateCache) {
    return {
        restrict: "AE",
        template: $templateCache.get("hello.html"),
        replace: true
    }
})

var app = angular.module("app", ["customDirective"])
app.controller("appCtrl", function ($scope) {
    $scope.names = [1, 2, 3, 4, 5, 56]
})
