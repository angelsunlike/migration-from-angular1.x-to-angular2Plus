// Angular
//包含所有提供商依赖 将没有被任何文件import过的文件放在这里
import 'angular'
import 'angular-ui-router'

import './legacy/_app'
import './legacy/routes';
import './legacy/controller/main-ctrl';

import './downgrade-component'
import './downgrade-service'

import './legacy/components/hello-angular/hello-angular';
import './legacy/services/angularjs-service';
import './legacy/filters/angularjs-filter';