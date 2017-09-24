import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITalent, IGroup } from '../model/ITalent';
import { TalentService } from '../services/talent.service';
import { ToastsManager } from 'ng2-toastr';
declare var $: any;
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit, OnChanges {
    @Input() group: IGroup;
    currentTalents: ITalent[];
    suggestionTalents: ITalent[];
    constructor(private route: ActivatedRoute, public talentsrv: TalentService, public toastr: ToastsManager, vcr: ViewContainerRef) {

    }

    getCurrentTalents() {
        this.currentTalents = this.talentsrv.storage.talents.filter(t => t.groups.some(n => n == this.group.id));
    }
    getSuggestionTalents() {
        this.suggestionTalents = this.talentsrv.storage.talents.filter(t => !t.groups.some(n => n == this.group.id));
    }

    removeTalentFromGroup(event, talent) {
      
        talent.groups = this.talentsrv.removeFromArray(talent.groups, this.group.id);
        this.talentsrv.storage.groups.forEach(g => {
            if (g.id == this.group.id)
                g.memberCount = g.memberCount - 1;
        });
        this.updateTalentsUI();
        this.toastr.success('A Talent removed from the group', 'Success!');
    }
    addToGroup(event, talent) {
        this.talentsrv.addToGroup(talent, this.group.id);
        this.updateTalentsUI();
        this.toastr.success('A Talent Added to the group', 'Success!');
    }

    updateTalentsUI() {
        this.getCurrentTalents();
        this.getSuggestionTalents();
    }
    ngOnChanges(changes: SimpleChanges) {
        //this.talent = changes.talent;
        this.updateTalentsUI();
    }

    ngOnInit() {
        this.updateTalentsUI();
        $('#groupDetails').modal('show');
        setTimeout(function () {
             $("[data-toggle=popover]").popover();
        }, 100)
        
    }
}
