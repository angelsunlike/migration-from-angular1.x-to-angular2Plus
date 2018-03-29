import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';

import { AngularService } from './app/service/angular-service';
import { ToastsManager } from 'ng2-toastr';

angular.module('myApp')
    .factory('AngularService', downgradeInjectable(AngularService))
    .factory('ToastsManager', downgradeInjectable(ToastsManager));
