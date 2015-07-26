import c3 from 'c3';

export default function routeConfig($routeProvider) {
    window.c3 = c3; // @todo remove ugly patch!!
    
    $routeProvider
        .when('/', {
            templateUrl: 'debug/assets/html/dashboard.html'
        })
        
        .when('/:folder/:tpl', {
            templateUrl: attr => 'debug/assets/html/' + attr.folder + '/' + attr.tpl + '.html'
        })
        
        .when('/:tpl', {
            templateUrl: attr => 'debug/assets/html/' + attr.tpl + '.html'
        })
        
        .otherwise({
            redirectTo: '/'
        });
}
 
routeConfig.$inject = ['$routeProvider'];