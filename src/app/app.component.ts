import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var $: any;
@Component({
  selector: 'tlApp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'TlProject';
    
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
        

    }
    popToast() {
        this.toastr.success('You are awesome!', 'Success!');
    }

    ngOnInit()
    {
        $("[data-toggle=popover]").popover();
       
        
    }

    
    
}
