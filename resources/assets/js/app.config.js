app

/**
 * Routes
 */
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'assets/html/dashboard.html'
    })
    
    .when('/:folder/:tpl', {
        templateUrl: function(attr) {
            return 'assets/html/' + attr.folder + '/' + attr.tpl + '.html';
        }
    })
    
    .when('/:tpl', {
        templateUrl: function(attr) {
            return 'assets/html/' + attr.tpl + '.html';
        }
    })
    
    .otherwise({
      redirectTo: '/'
    });
}])


/**
 * Disable ng-animate with adding class
 */
.config(['$animateProvider', function($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
}])


/**
 * Define consts
 */
.run(['$rootScope', 'APP', function ($rootScope, APP) {
    $rootScope.APP = APP;
}]);