import { ITalent } from '../model/ITalent';
import { Component, OnInit, Input, ViewChild, AfterViewInit, trigger, transition, style, animate, state, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import 'rxjs/add/operator/map'
import { TalentService } from '../services/talent.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TalentDetailsComponent } from '../talent-details/talent-details.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var $: any;
@Component({
    selector: 'app-all-talents',
    templateUrl: './all-talents.component.html',
    styleUrls: ['./all-talents.component.css'],
    animations: [
        trigger(
            'myAnimation2', [
                transition(':enter', [
                    style({ transform: 'translateX(25%)', opacity: 0.5 }),
                    animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ transform: 'translateX(0)', opacity: 1 }),
                    animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
                ])
            ]
        )
    ]
})
export class AllTalentsComponent implements OnInit, OnChanges {
    public talents: ITalent[];
    selectedTalent: ITalent;
    @Input() filterStr: string;

    title: string = 'Are you sure?';
    placement: string = 'top';
    message: string = 'Are you really <b>sure</b> you want to delete this talent?';
    confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
    cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';


    @ViewChild('talentDetails') talentDetails: TalentDetailsComponent;
    constructor(public _talentSrv: TalentService, public toastr: ToastsManager, vcr: ViewContainerRef) {

        this.toastr.setRootViewContainerRef(vcr);
    }
    ngOnInit() {
        if (this._talentSrv.isTalentsEmpty) {
            this._talentSrv.getData().map(res => res).subscribe(res => {
                this.talents = res.talents;
                if (this.filterStr) {
                    this.talents = this._talentSrv.storage.talents.filter(g => g.name.toLowerCase().includes(this.filterStr.toLowerCase()));
                    this.toastr.info("Found matching talents");
                }

            });
        }
        else
            this.talents = this._talentSrv.storage.talents;
        if (this.filterStr && this._talentSrv.storage.talents) {
            this.talents = this._talentSrv.storage.talents.filter(g => g.name.toLowerCase().includes(this.filterStr.toLowerCase()));
        }

    }
    openDetails(ob: any) {
        this.selectedTalent = ob;

        //duplicate row to display the dialog after the first time
        $('#userDetails').modal('show');
    }
    ngOnChanges(changes: SimpleChanges) {
        if (this.filterStr && this._talentSrv.storage.talents) {
            this.talents = this._talentSrv.storage.talents.filter(g => g.name.toLowerCase().includes(this.filterStr.toLowerCase()));
            this.toastr.info("Found matching Talents");
        }
        else
            this.talents = this._talentSrv.storage.talents;



    }
    removeTalent(evt, id: string) {

        this.talents = this._talentSrv.removeFromArrayOfObjects(this.talents, "id", id);
        this.toastr.success('Talent has been deleted successfully', 'Success!');

        //$(this).parent().remove();
    }
}
