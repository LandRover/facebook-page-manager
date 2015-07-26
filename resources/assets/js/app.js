import angular from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';
import LocalStorageModule from 'angular-local-storage';
import angularLoadingBar from 'angular-loading-bar';
import ngResource from 'angular-resource';
import ngIpsum from 'ng-ipsum/src/ipsum';
import angularStrap from 'angular-strap';
import graphApp from 'c3-angular';
//import ngTable from 'ng-table';

import controllers from './controllers';
import directives from './directives';
import services from './services';

import routeConfig from './config/route';
import animateConfig from './config/animate';
import appDefinitions from './config/app.definitions';
import exceptionConfig from './config/exception';

import NoSpaceFilter from './filters/nospace';

export const name = 'app';

export default angular
    .module(name, [
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngCookies',
        'LocalStorageModule',
        'angular-loading-bar',
        'ngResource',
        'ipsum',
        'mgcrea.ngStrap',
        'gridshore.c3js.chart',
        //'ngTable',
        appDefinitions,
        services,
        controllers,
        directives
    ])
    
    .config(exceptionConfig)
    .config(animateConfig)
    .config(routeConfig)
    
    .filter('nospace', NoSpaceFilter)
    
    .run(['$rootScope', 'APP', function ($rootScope, appDefinitions) {
        $rootScope.APP = appDefinitions;
    }]);