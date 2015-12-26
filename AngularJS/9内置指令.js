///<reference path="9内置指令.html"/>

var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope, $timeout) {
    $rootScope.isDisabled = true;
    $timeout(function () {
        $rootScope.isDisabled = false;
    }, 5000);

    $timeout(function () {
        $rootScope.myHref = "baidu.com";

        $rootScope.imgSrc = "/Resource/image/bf529adfa5fa6da39c8e7b779ec658d8.png";
    }, 5000);


});