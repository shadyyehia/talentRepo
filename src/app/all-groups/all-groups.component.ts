import { Component, OnInit, Input, ViewChild, trigger, transition, style, animate, state, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { IGroup } from '../model/ITalent';
import { TalentService } from '../services/talent.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { GroupDetailsComponent} from '../group-details/group-details.component';



declare var $: any;
@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.css'],
  animations: [
      trigger(
          'myAnimation1', [
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
export class AllGroupsComponent implements OnInit, OnChanges { 
    selectedGroup: IGroup;
    public  groups: IGroup[];
    @Input() filterStr: string;
    @ViewChild('groupDetails') groupDetails: GroupDetailsComponent;
    constructor(public _talentSrv: TalentService, public toastr: ToastsManager, vcr: ViewContainerRef) {

        this.toastr.setRootViewContainerRef(vcr);
    }
    public title: string = 'Popover title';
    public message: string = 'Popover description';
    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;
    public isOpen: boolean = false;
    ngOnInit() {
        if (this._talentSrv.isTalentsEmpty) {
            this._talentSrv.getData().map(res => res).subscribe(res =>
            {
            this.groups = res.groups;
            if (this.filterStr) {
                this.groups = this._talentSrv.storage.groups.filter(g => g.name.toLowerCase().includes(this.filterStr.toLowerCase()));
            }
            });
        }
        else
            this.groups = this._talentSrv.storage.groups;

        if (this.filterStr && this._talentSrv.storage.groups )
        {
            this.groups = this._talentSrv.storage.groups.filter(g => g.name.toLowerCase().includes(this.filterStr.toLowerCase()));
        }
       
        

    }
    openDetails(ob: any) {
        this.selectedGroup = ob;
        $('#groupDetails').modal('show');
       
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.filterStr && this._talentSrv.storage.groups) {
            this.groups = this._talentSrv.storage.groups.filter(g => g.name.toLowerCase().includes(this.filterStr.toLowerCase()));
            this.toastr.info("Found matching groups");
        }
        else
            this.groups = this._talentSrv.storage.groups;


    }
    removeGroup(evt, id: string) {
        var r = confirm("You are about to delete the group,would you like to continue?");
        if (r == true) {
            var result = this._talentSrv.removeGroup(id);
            if (result) {
                this.toastr.success('Group has been deleted successfully', 'Success!');
            }
            else {
                this.toastr.error('Group can not be deleted if at least one member in it', 'Oops!');
            }
        } else {
           
        }
       
        //$(this).parent().remove();
    }

   
}
