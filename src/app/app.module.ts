import { AppComponent } from './app.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { TestContentComponent } from './components/test-content/test-content.component';

import { AngularService } from './service/angular-service';
import { ToastModule } from 'ng2-toastr';

import { angularFilterPipe } from './filter/angular-pipe';

import { BrowserModule } from "@angular/platform-browser"; //AoT编译
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
//import { RouterModule } from "@angular/router";
//import { ROUTES } from './app.routes';
import { NgModule } from "@angular/core";
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({ // @NgModule 用来定义模块用的装饰器
    declarations: [AppComponent, HeroDetailComponent, angularFilterPipe, TestContentComponent], // 导入模块所依赖的组件、指令、管道等,用于指定这个模块的视图类
    imports: [ // 导入需要的模块
        BrowserModule, //包含了commonModule和applicationModule模块,封装在浏览器平台运行时的一些工具库
        FormsModule,  // 表单相关的组件指令等，包含了[(ngModel)]
        UpgradeModule,
        ToastModule.forRoot(),
        BrowserAnimationsModule,
       // RouterModule.forRoot(ROUTES, {useHash: false}), // RouterModule.forRoot()方法来创建根路由模块
    ], // 导入当前模块所需要的其他模块
    entryComponents: [// 需提前编译好的模块
        AppComponent, HeroDetailComponent, TestContentComponent
    ],
    // 依赖注入服务
    providers: [AngularService]
    //bootstrap: [AppComponent], // 设置根组件
    //把这个AppComponent标记为引导 (bootstrap) 组件。当Angular引导应用时，它会在DOM中渲
    //染AppComponent，并把结果放进index.html的元素内部。
})
export class AppModule {
    constructor(private upgrade: UpgradeModule) { }
    ngDoBootstrap() {
        this.upgrade.bootstrap(document.body, ['ccfeFrontend'], { strictDi: true });
    }
}