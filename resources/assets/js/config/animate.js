export default function animateConfig($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
}

animateConfig.$inject = ['$animateProvider'];