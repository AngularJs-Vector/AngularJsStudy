/**
 * author: vector.huang
 * date：2016/3/25 9:51
 */
require.config({
    baseUrl:"../js/appAdmin", //导航到当前文件名路径
    paths : {
        "angular" : "../../framework/angular/angular",
        "network" :"../common/network"
    }
})

require(["angular","admin_app","admin_services","network"],function(){
    $(function(){
        alert("load finished");
    })
})
