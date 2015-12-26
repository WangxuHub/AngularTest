///<reference path='8.1指令.html'/>

var directiveApp = angular.module('directiveApp', []);

directiveApp.run(function ($rootScope) {
    $rootScope.rootProperty = "root scope";
});

directiveApp.controller('ParentController', function ($scope) {
    $scope.parentProperty = "parent scope";
});

directiveApp.controller('ChildController', function ($scope) {
    $scope.childProperty = 'child scope';

    $scope.fullSentenceFromChild = 'Same $scope:We can access: ' +
         $scope.rootProperty + 'and' +
         $scope.parentProperty + 'and' +
         $scope.childProperty;
});




directiveApp.directive('myDirective', function () {
    return {
        restrict: 'AMCE',
        replace:true, //替换 指令标签
        template: '\
        <div>\
           <label>My Url Field:</label>\
           <input type="text" ng-model="myUrl"/>\
           <a href="{{myUrl}}">{{myLinkText}}</a>\
        </div>',
        scope: {
            myUrl: '=someAttr',//绑定策略
            myLinkText: '@'//绑定策略
        }
    };

});

