/**
 * author: vector.huang
 * date：2016/3/23 12:08
 */
var networkConfig = {
    host: 'http://localhost:8080',
    platform: 2, //web 登录，三个基本参数中 version、apiVersion 在web 中是不需要的
    token: "d82c205c-d17b-4d80-8738-5529ffd43404"
};

var pocketService = angular.module("pocketService", [])
/**
 * 401 : 未登录的处理
 * 200 ：成功的处理
 *
 */

pocketService.service("pocket", function ($http, $log) {
    var baseParams = {
        platform: networkConfig.platform,
    }

    this.get = function (get) {
        angular.extend(get.params, baseParams)
        var config = {
            url: networkConfig.host + get.url,
            method: 'get',
            params: get.params
        }
        var promise = $http(config)
        promise.success(function (data, status, headers, config) {
            $log.debug("url request  -- " + config.url + config.params)
            $log.debug("url response -- " + status + ":" + angular.toJson(data, true))
            if (get.success) {
                get.success(data, status, headers, config)
            }
        }).error(function (data, status, headers, config) {
            $log.debug("url error request  -- " + config.url)
            $log.debug("url error response -- " + status + ":" + angular.toJson(data, true))
            if (get.error) {
                get.error(data, status, headers, config)
            }
        });
    }

    /*  this.formdata = function () {
     $http({
     method: 'POST',
     url: '/wechatapp/User/setAvatar',
     data: data,
     headers: {
     'Content-Type': 'form-data'
     },
     transformRequest: function (data) {
     var formData = new FormData();
     formData.append('', data.adata);
     formData.append('', data.adata);
     return formData;
     },
     data: {
     data: scope.avatar_data,
     file: scope.avatar_file
     }
     }).success(function (d) {
     //请求成功
     cb(d);
     }).error(function (err, status) {
     console.log(err);
     cb(err);
     });
     }
     */

    this.post = function (post) {
        angular.extend(post.params, baseParams)
        var config = {
            url: networkConfig.host + post.url,
            method: 'post',
            data: post.params,
        }

        //根据transformRequest 来设置Content-Type，现在的是表单
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        //编码参数
        config.transformRequest = function (data) {
            return buildUrl(data);
        }

        //需要access_token 放在url才能授权，我也是醉了
        if (post.params.access_token) {
            config.params = {
                access_token: post.params.access_token
            }
            //需要删除post 里面的，我们不应该上传两个token 到服务器，不然处理很麻烦的
            //需要一个，就不要上传数组
            delete post.params.access_token
        }
        var promise = $http(config)
        promise.success(function (data, status, headers, config) {
            $log.debug("url request  -- " + config.url + " 参数：" + buildUrl(config.params))
            $log.debug("url response -- " + status + ":" + angular.toJson(data, true))
            if (post.success) {
                post.success(data, status, headers, config)
            }
        }).error(function (data, status, headers, config) {
            $log.debug("url error request  -- " + config.url + " 参数：" + buildUrl(config.params))
            $log.debug("url error response -- " + status + ":" + angular.toJson(data, true))
            if (post.error) {
                post.error(data, status, headers, config)
            }
        });
    }

    this.formData = function (post) {
        angular.extend(post.params, baseParams)
        var config = {
            url: networkConfig.host + post.url,
            method: 'post',
            data: post.params,
        }
        //根据transformRequest 来设置Content-Type，现在的是 muiltpart file
        config.headers = {
            'Content-Type': undefined
        }
        //编码参数
        config.transformRequest = function (data) {
            var formData = new FormData();
            for (var name in data) {
                var value = data[name];
                formData.append(name, value);
            }
            return formData;
        }

        //需要access_token 放在url才能授权，我也是醉了
        if (post.params.access_token) {
            config.params = {
                access_token: post.params.access_token
            }
            //需要删除post 里面的，我们不应该上传两个token 到服务器，不然处理很麻烦的
            //需要一个，就不要上传数组
            delete post.params.access_token
        }
        var promise = $http(config)
        promise.success(function (data, status, headers, config) {
            $log.debug("url request  -- " + config.url + " 参数：" + buildUrl(config.params))
            $log.debug("url response -- " + status + ":" + angular.toJson(data, true))
            if (post.success) {
                post.success(data, status, headers, config)
            }
        }).error(function (data, status, headers, config) {
            $log.debug("url error request  -- " + config.url + " 参数：" + buildUrl(config.params))
            $log.debug("url error response -- " + status + ":" + angular.toJson(data, true))
            if (post.error) {
                post.error(data, status, headers, config)
            }
        });
    }

    var buildUrl = function (obj) {
        var description = "";
        for (var i in obj) {
            var property = obj[i];
            if (!angular.isFunction(property)) {
                if (description !== "") {
                    description += "&"
                }
                description += i + "=" + property;
            }
        }
        return description
    }

})





