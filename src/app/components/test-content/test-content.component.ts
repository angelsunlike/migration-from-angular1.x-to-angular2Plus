import { Component, EventEmitter, Input, Output, ViewContainerRef } from "@angular/core";
import { AngularService } from '../../service/angular-service';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'test-content',
    templateUrl: './test-content.component.html'
})
export class TestContentComponent {
    public clickEvent2: any;
    public clickToastr: any;

    constructor(private angularService: AngularService, toastr: ToastsManager, vcr: ViewContainerRef) {
        toastr.setRootViewContainerRef(vcr);
        this.clickEvent2 = function () {
            angularService.popup();
        };
        this.clickToastr = function () {
            toastr.error('angular toastr service');
        };
    }
}