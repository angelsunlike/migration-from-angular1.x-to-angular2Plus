import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const ROUTES: Routes = [ // Routes类型的数组
    {
        path: '',
        component: AppComponent,
    }/*,
    {
        path: '',
        component: TestContentComponent,
        outlet: 'test'
    }*/
];