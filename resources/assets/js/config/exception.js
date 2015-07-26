export default function exceptionConfig($provide) {
    /**
     * Fixes for source maps
     * @see https://github.com/angular/angular.js/issues/5217#issuecomment-50993513
     */
    $provide.decorator('$exceptionHandler', function($delegate) {
        return function(exception, cause) {
            // switch context
            setTimeout(function() {
                throw exception;
            });
            
            //$delegate(exception, cause);
        };
    });
}

exceptionConfig.$inject = ['$provide'];