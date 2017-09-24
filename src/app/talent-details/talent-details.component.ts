import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewContainerRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITalent, IGroup } from '../model/ITalent';
import { TalentService } from '../services/talent.service';
import { ToastsManager } from 'ng2-toastr';
declare var $: any;
@Component({
  selector: 'app-talent-details',
  templateUrl: './talent-details.component.html',
  styleUrls: ['./talent-details.component.css']
})
export class TalentDetailsComponent implements OnInit,OnChanges {

    @Input() talent: ITalent;
    currentGroups: IGroup[];
    suggestionGroups: IGroup[];
     
    constructor(private route: ActivatedRoute,public talentSrv: TalentService, public toastr: ToastsManager, vcr: ViewContainerRef) {

    }
    getCurrentGroups() {
        this.currentGroups= this.talentSrv.storage.groups.filter(g => this.talent.groups.some(n => n == g.id));
    }
    getSuggestionGroups() {
        this.suggestionGroups = this.talentSrv.storage.groups.filter(g => !this.talent.groups.some(n => n == g.id));
    }

    unjoinGroup(event, groupID:string)
    {
        this.talent.groups = this.talentSrv.removeFromArray(this.talent.groups, groupID);
        this.talentSrv.storage.groups.forEach(g => {
            if (g.id == groupID)
                g.memberCount = g.memberCount - 1;
        });
        this.updateGroupsUI(); 
        this.toastr.success('Talent unjoined the group', 'Success!');   
    }    
    joinGroup(event, groupID: string)
    {
        this.talentSrv.addToGroup(this.talent, groupID);
        
        this.updateGroupsUI();  
        this.toastr.success('Talent joined the group', 'Success!'); 
    }

    updateGroupsUI()
    {
        this.getCurrentGroups();
        this.getSuggestionGroups();
    }
    ngOnChanges(changes: SimpleChanges) {
        //this.talent = changes.talent;
        this.updateGroupsUI();
    }
   
    ngOnInit() {       
        this.updateGroupsUI();
        $('#userDetails').modal('show'); 
        setTimeout(function () {
            $("[data-toggle=popover]").popover();
        }, 100)
    }

}
