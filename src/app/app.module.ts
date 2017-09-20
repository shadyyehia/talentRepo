import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTalentsComponent } from './all-talents/all-talents.component';
import { AllGroupsComponent } from './all-groups/all-groups.component';
import { AddTalentComponent } from './add-talent/add-talent.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { TalentDetailsComponent } from './talent-details/talent-details.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TalentService } from './services/talent.service';
import { SearchResultComponent } from './search-result/search-result.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

declare var $: any;




@NgModule({
    declarations: [
        AppComponent,
        AllTalentsComponent,
        AllGroupsComponent,
        AddTalentComponent,
        AddGroupComponent,
        TalentDetailsComponent,
        GroupDetailsComponent,
        QuickSearchComponent,
        SearchResultComponent,
        WelcomeComponent,
        ErrorComponent     
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,          
        FormsModule, ToastModule.forRoot(),       
        AppRoutingModule
    ],
    providers: [TalentService],
    bootstrap: [AppComponent]
})
export class AppModule { }
