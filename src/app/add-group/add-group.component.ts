import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { IGroup,ITalent } from '../model/ITalent';
import { TalentService } from '../services/talent.service';
import { ToastsManager } from 'ng2-toastr';

declare var $: any;
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

    @Input() name: string;
    @Input() logo: string;
    talents: ITalent[];

    constructor(public _talentSrv: TalentService, public toastr: ToastsManager, vcr: ViewContainerRef) {
       
    }

  ngOnInit() {
      var that =this;
      
      //fill talents
      if (this._talentSrv.isTalentsEmpty) {
          this._talentSrv.getData().map(res => res).subscribe(res =>
          { this.talents = res.talents; });
      }
      else
          this.talents = this._talentSrv.storage.talents;
    
      
      //#Validation
      $('#AddGroupDialog').on('shown.bs.modal', function () { 
          
          $('#formGroup1').validator('update');       

      });   
  }

  addNewGroup() {
      //#Validation
      if (!$('#formGroup1').validator('validate').has('.has-error').length) {
          var selectedTalentIds = this.talents.filter(t => t.selected).map(r => r.id);      
          //validate if selected a talent at least
          if (selectedTalentIds.length < 1) {
            this.toastr.error('Please select at least one talent to be added to the group', 'Oops!');
          }
          else {
              //generate random number between 0 to 999999
              var randomID = Math.floor(Math.random() * 1000000);
              var group = <IGroup>{
                  id: randomID, name: this.name, logo: this.logo, memberCount: selectedTalentIds.length
              };

              this._talentSrv.addNewGroup(group, selectedTalentIds);
              this.toastr.success('A new group has been added', 'Yes!');
              //Clear UI
              this.clearUI();
              
          }

      }
       
  }
  clearUI()
  {
      $("#AddGroupDialog").modal('hide');
      this.name = "";
      $("#logoDiv").val("");
      this.logo = "";
      this.talents.forEach(x => x.selected = false); 
      $('#formGroup1').validator('destroy'); 
  }
  selectClicked(event,talent)
  {
      //$(this).toggleClass('OkBlack').toggleClass('OkGreen');
      talent.selected = !talent.selected;

  }
  fileEvent(fileInput) {
      let file = fileInput.target.files[0];
      this.logo = file.name;
  }

}
