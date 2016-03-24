/**
 * author: vector.huang
 * date：2016/3/24 9:49
 */

var customDirective = angular.module("customDirective",[])
customDirective.directive("hello", function () {
    return {
        restrict:'AECM',
        template:"<h1>Hello CustomDirective!!</h1>",
        replace:true
    }
})
customDirective.directive("list", function () {
    return {
        restrict:'AE',
        templateUrl:"../tpls/list.html",
        replace:true
    }
})