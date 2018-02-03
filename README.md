# angular1.x 升级 angular2+ 方案
#### 方案1: 主体为angular1.x，逐步将angular1.x当中service、component、filter、controller、route、dependencies升级为angular5

#### 方案2: 主体为angular5，将项目所有js文件先进行一次加工，采用ES6的方式将每个js文件module export出来，再逐步将内容向angular5靠近

我建议选择方案1增量式升级，通过在同一个应用中一起运行这两个框架，并且逐个把AngularJS的组件迁移到Angular中。 可以在不必打断其它业务的前提下，升级应用程序，因为这项工作可以多人协作完成，在一段时间内逐渐铺开，下面就方案1展开说明

#### Hybrid APP主要依赖Angular提供upgrade/static模块。后面你将随处可见它的身影。以下手把手教你将angular1.x迁移到angular2+

* #### 调用 UpgradeModule 来引导 AngularJS
  在AngularJS中，我们会把AngularJS的资源添加到angular.module属性上。 在Angular中，我们会创建一个或多个带有NgModule装饰器的类，这些装饰器用来在元数据中描述Angular资源。在混合式应用中，我们同时运行了两个版本的Angular。 这意味着我们至少需要AngularJS和Angular各提供一个模块。要想引导混合式应用，我们在应用中必须同时引导 Angular 和 AngularJS。要先引导 Angular ，然后再调用 UpgradeModule 来引导 AngularJS。
  
  从HTML中移除ng-app和ng-strict-di指令, 创建一个app.module.ts文件，并添加下列NgModule类：
  
  ```
  import { UpgradeModule } from '@angular/upgrade/static';
  @NgModule({   
    imports: [  
      UpgradeModule
    ]
  })
  export class AppModule {
    constructor(private upgrade: UpgradeModule) { }    
    ngDoBootstrap() {
      this.upgrade.bootstrap(document.body, ['yourAngularJsAppName'], { strictDi: true });
    }
  }
  ```
  用AppModule.ngDoBootstrap方法中启动 AngularJS 应用,现在我们就可以使用 platformBrowserDynamic.bootstrapModule 方法来启动 AppModule 了。
  #### main.ts
  ```
  import {AppModule} from './app/app.module';
  import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
  
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
  ```
  我们就要开始运行AngularJS+5的混合式应用程序了！所有现存的AngularJS代码会像以前一样正常工作，但是我们现在也同样可以运行Angular代码了
    
* #### 将项目中的services逐步升级为angular5
  我们将username-service.js里面的内容升级为username-service.ts：
  ```
  import { Injectable } from '@angular/core';
  @Injectable() 
  export class UsernameService {
    get() {
      return 'nina'
    }
  }
  ```
  要在angular1.x中使用UsernameService，先创建一个downgrade-services.ts文件，这里将会存放所有angular5服务降级后在angular1.x中使用的服务
  #### downgrade-services.ts：
  ```
  import * as angular from 'angular';
  import { downgradeInjectable } from '@angular/upgrade/static';
  import { UsernameService  } from './services/ username-service '; 
  angular.module('yourAngularJsAppName')
    .factory('UsernameService', downgradeInjectable(UsernameService));
  ```
  完成这两步之后UsernameService就可以在angular1.x controller component service等注入使用了，在angular5中的使用方法这里就不举例了，按照angular5的使用方法来就行

* #### 项目中的filter逐步升级为angular5的pipe，同时angular1.x的filter依然保留
  由于filter的性能问题angular2中已经将filter改为pipe，angular团队没有提供filter升级为pipe，或者pipe降级为filter的module，所以angular1.x中使用filter，angular中使用pipe，filter的升级放在component之前，因为component的template可能会用到
  #### username-pipe:ts
  ```
  import { Pipe, PipeTransform } from '@angular/core';
  Pipe({
    name: 'username'
  })
  export class usernamePipe implements PipeTransform { 
    transform(value: string): string {
      return value === 'nina' ? '黄燕' : value;
    }
  }
  ```
* #### 将项目中的component逐步升级为angular5的component
  我们将hero-detail.js里面的内容升级为hero-detail.ts：
  ```
  import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
  import { UsernameService } from '../../service/username-service';
  @Component({
    selector: 'hero-detail',
    templateUrl: './hero-detail.component.html'
  })
  export class HeroDetailComponent {
    Public hero: string;
    
    constructor(private usernameService: UsernameService) {
	    this.hero = usernameService.get()
    }
  }
  ```
  要在angular1.x中使用hero-detail component，先创建一个downgrade-components.ts文件，这里将会存放所有angular5组件降级后在angular1.x中使用的组件
  #### downgrade-components.ts
  ```
  import * as angular from 'angular';
  import { downgradeComponent } from '@angular/upgrade/static';
  import { HeroDetailComponent } from './app/components/hero-detail/hero-detail.component';
  angular.module('yourAngularJsAppName')
    .directive('heroDetail', downgradeComponent({ component: HeroDetailComponent }) as angular.IDirectiveFactory)
  ```
  现在你可以在angular1.x中的template中使用hero-detail组件了，组件之间通讯的问题按照angular5的接口写
  
* #### 将angular1.x controller改成angular5 component
  现在就剩下controller了，angular2已经取消了controller，controller可以把它当成一个大的component，所以我们按照component的方法重构controller，并且对新的component降级，controller重构之后我们需要修改路由，我们现在使用的还是angular1.x的路由，基本上一个路由对应的是一个controller，这个时候路由可以这样修改：
  
  假设有个TestContentCtrl，对应的路由是test
  ```
  .state('test', {
    url: '/test',
    controller: 'TestContentCtrl',
    controllerAs: 'vm',
    templateUrl: './src/controllers/test-content-ctrl.html'
   })
  ```
  在TestContentCtrl改成test-content component后
  ```
  .state('test', {
    url: '/test',
    template: '<test-content></test-content>'
   })
  ```
* #### 第三方插件或者库解决方案
  关于项目中引用基于angular1.x的插件或者库，基本都能找到angular2+的版本，可以将angular2+的版本引入进行降级处理就可以在angular1.x中使用了，但是~~~， angular2+的版本很多API都改了，angular1.x中的对应使用方法可能不存在了，这里有两种解决方案
  * 引入angular2+的版本，删除angular1.x版本，降级后在angular1.x应用中用到该插件的都检查一次，运用angular2+的版本的API使用该插件
	* 引入angular2+的版本，保留angular1.x版本，angular1.x应用使用angular1.x版本插件， angular5应用使用angular2+版本插件，这样会导致一个问题，增加了项目的体积，相同的插件引用了两个版本。
	在不影响首屏加载时间的情况下方案2是不错的选择，因为一次性将所有插件或者库的API全部过一遍，工作量比较大容易出错，也不符合我们增量式升级的初衷
	
现在项目中所有的内容基本都升级为angular5了，我们可以删除downgrade-services.ts和downgrade-components.ts这两个文件了，同时将路由升级为angular5，删除angular1.x相关的库和插件，一个完整的angular5应用就诞生了

分享个问题：
如果import angular保错了，你可以考虑引入@types/angular
