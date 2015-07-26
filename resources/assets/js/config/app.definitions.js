import angular from 'angular';

var moduleName = 'app.definitions';

angular.module(moduleName, [])
    .constant('APP', {
        version: '1.0.0'
    });

export default moduleName;