let moduleName = 'app.controllers';

import angular from 'angular';
import MainController from './layout/main/controller/main';
import MenuController from './layout/navigation/menu/controller/menu';
import DashboardController from './dashboard/controller/dashboard';
import PostsController from './promotions/posts/controller/posts';
import EventsController from './promotions/events/controller/events';

angular.module(moduleName, [])
    .controller('DashboardController', DashboardController)
    .controller('MainController', MainController)
    .controller('MenuController', MenuController)
    .controller('PostsController', PostsController)
    .controller('EventsController', EventsController)
    ;

export default moduleName;