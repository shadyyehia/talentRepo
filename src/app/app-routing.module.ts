import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTalentsComponent } from './all-talents/all-talents.component';
import { AllGroupsComponent } from './all-groups/all-groups.component';
import { AddTalentComponent } from './add-talent/add-talent.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { TalentDetailsComponent } from './talent-details/talent-details.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ErrorComponent } from './error/error.component';



const routes: Routes = [
    { path: 'talents', component: AllTalentsComponent },
    { path: 'groups', component: AllGroupsComponent },
    { path: 'talent/:id', component: TalentDetailsComponent, children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' }] },
    {path: 'group/:id', component: GroupDetailsComponent, children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' }]},
    { path: 'home', component: WelcomeComponent },
    { path: 'searchResult/:text', component: SearchResultComponent },
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
