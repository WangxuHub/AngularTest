///<reference path="FormRequired.html"/>

var myApp=angular.module('formRequired',['ngMessages']);
myApp.directive('oneToTen', function () {
    return {
        require: '?ngModel',
        link: function (scope, ele, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$parsers.unshift(
                function (viewValue) {
                    var i = parseInt(viewValue);
                    if(i>=0 &&i<10)
                    {
                        ngModel.$setValidity('oneToTen', true);
                        return viewValue;
                    }
                    else {
                        ngModel.$setValidity('oneToTen', false);
                        return undefined;
                    }
                });

            //ngModel.$formatters.unshift(
            //    function (v) {
            //        return $filter('number')(v);
            //    });



        }
    }
});

myApp.directive('ensureUnique', function ($http) {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function (n) {
                if (!n) return;
                if (n == 'csy1')
                    c.$setValidity('unique', false);
                else
                    c.$setValidity('unique',true);
            });
        }
    };
});

myApp.directive('ngFocus', [function () {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function (evt) {
                element.addClass(FOCUS_CLASS);
                scope.$apply(function () {
                    ctrl.$focused = true;
                });
            }).bind('blur', function (evt) {
                element.removeClass(FOCUS_CLASS);
                scope.$apply(function () {
                    ctrl.$focused = false;
                });
            });
        }


    };

}]);

myApp.controller('signupController', function ($scope) {
    $scope.submitted = false;
    $scope.signupForm = function () {
        if ($scope.signup_form.$valid) {
            //正常提交
        }
        else {
            $scope.signup_form.submitted = true;
        }
    }
});