import * as angular from 'angular';
import { downgradeComponent } from '@angular/upgrade/static';
import { HeroDetailComponent } from './app/components/hero-detail/hero-detail.component';
import { AppComponent } from './app/app.component';
import { TestContentComponent } from './app/components/test-content/test-content.component';

angular.module('myApp')
    .directive('heroDetail', downgradeComponent({ component: HeroDetailComponent }) as angular.IDirectiveFactory)
    .directive('rootApp', downgradeComponent({ component: AppComponent }) as angular.IDirectiveFactory)
    .directive('testContent', downgradeComponent({ component: TestContentComponent }) as angular.IDirectiveFactory);