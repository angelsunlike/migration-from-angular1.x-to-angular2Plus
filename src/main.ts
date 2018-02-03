import {AppModule} from './app/app.module';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";//JIT编译

// 编译启动模块
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));