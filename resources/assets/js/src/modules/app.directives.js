let moduleName = 'app.directives';

import angular from 'angular';
import PostsWidgetDirective from './promotions/posts/directive/posts_widget';
import MenuLinkDirective from './layout/navigation/menu/directive/menu_link';
import MenuToggleDirective from './layout/navigation/menu/directive/menu_toggle';
import directiveFactory from '../utils/directive_factory';

angular.module(moduleName, [])
    .directive('postsWidget', directiveFactory(PostsWidgetDirective))
    
    .directive('menuLink', directiveFactory(MenuLinkDirective))
    .directive('menuToggle', directiveFactory(MenuToggleDirective))
    
    ;

export default moduleName;