import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})
export class QuickSearchComponent implements OnInit {
    filterStr: string;

    constructor(private router : Router, public toastr: ToastsManager, vcr: ViewContainerRef) { }
    searchResult()
    {
        this.router.navigate(["/searchResult", this.filterStr]);
        
    }

    ngOnInit() {
  }

}
