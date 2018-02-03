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
  
