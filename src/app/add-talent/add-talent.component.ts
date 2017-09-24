import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { IGroup, ITalent } from '../model/ITalent';
import { TalentService } from '../services/talent.service';
import { ToastsManager } from 'ng2-toastr';
declare var $: any;
@Component({
  selector: 'app-add-talent',
  templateUrl: './add-talent.component.html',
  styleUrls: ['./add-talent.component.css']
})
export class AddTalentComponent implements OnInit {


    @Input() name: string;
    @Input() picture: string;
    @Input() id: string;
    @Input() rating: number;
    groups: IGroup[];

    constructor(public _talentSrv: TalentService, public toastr: ToastsManager, vcr: ViewContainerRef) { }

    ngOnInit() {
        var that = this;

        //fill groups
        if (this._talentSrv.isTalentsEmpty) {
            this._talentSrv.getData().map(res => res).subscribe(res =>
            { this.groups = res.groups; });
        }
        else
            this.groups = this._talentSrv.storage.groups;
       
        //#Validation
        $('#AddUserDialog').on('shown.bs.modal', function () {
            
            $('#formTalent1').validator('update');
           

        });  
    }

    addNewTalent() {
        if (!$('#formTalent1').validator('validate').has('.has-error').length) {
            //generate random number between 0 to 999999
            var randomID = Math.floor(Math.random() * 1000000);
            var selectedGroupIds = this.groups.filter(t => t.selected).map(r => {
                this._talentSrv.storage.groups.forEach(g => {
                    if (g.id == r.id) {
                        g.memberCount++;
                    }
                });
                return r.id
            });
            var talent = <ITalent>{
                id: randomID.toString(), name: this.name, picture: this.picture, rating: this.rating, groups: selectedGroupIds
            };

            this._talentSrv.addNewTalent(talent);
            this.toastr.success('A new talent has been added', 'Yes!');
            //Clear UI
            this.clearUI();
            
        }

    }
    clearUI() {
        $("#AddUserDialog").modal('hide');
        this.name = "";
        $("#tlPic").val("");
        this.rating = null;
        this.id= "";
        this.groups.forEach(x => x.selected = false);
        $('#formTalent1').validator('destroy');
    }
    selectClicked(event, group) {
        //$(this).toggleClass('OkBlack').toggleClass('OkGreen');
        group.selected = !group.selected;

    }
    fileEvent(fileInput) {
        let file = fileInput.target.files[0];
        this.picture = file.name;
    }
}
