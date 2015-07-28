let moduleName = 'app.services';

import angular from 'angular';
import SkinService from '../utils/skin';
import PostsService from './promotions/posts/service/posts';

angular.module(moduleName, [])
    .service('SkinService', SkinService)
    .service('PostsService', PostsService);

export default moduleName;