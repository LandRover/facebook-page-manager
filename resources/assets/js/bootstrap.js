import angular from 'angular';
import { name } from './app.js';

window.name = 'NG_DEFER_BOOTSTRAP!';

angular.element().ready(function() {
    if ('function' === typeof(angular.resumeBootstrap)) {
        angular.resumeBootstrap([name]);
    } else {
        setTimeout(function() {
            angular.resumeBootstrap([name]);
        }, 100);
    }
});