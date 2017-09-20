
import { ActivatedRoute } from '@angular/router';
import { ITalent } from '../model/ITalent';
import { Component, OnInit, Input, ViewChild, AfterViewInit, AfterViewChecked, ViewContainerRef, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map'
import { TalentService } from '../services/talent.service';
import { TalentDetailsComponent } from '../talent-details/talent-details.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AllTalentsComponent } from '../all-talents/all-talents.component';
import { AllGroupsComponent } from '../all-groups/all-groups.component';
declare var $: any;
@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit, OnDestroy{
    filterText: string;
    private sub: any;
    @ViewChild('allTl') allTl: AllTalentsComponent;
    @ViewChild('allGr') allGr: AllGroupsComponent;
    constructor(private route: ActivatedRoute, public toastr: ToastsManager, vcr: ViewContainerRef) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
          
            this.filterText = params['text']; // (+) converts string 'id' to a number
            //setTimeout(function () {
            //    $("#containerDivv2").append($("#containerDivv1").first().children());
            $("app-all-talents").css("float", "left");
            //}, 100)
            
            // In a real app: dispatch action to load the details here.
        });
        this.filterText = this.route.snapshot.params['text'];

    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
   
}
