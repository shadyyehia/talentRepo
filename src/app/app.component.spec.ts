import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
          imports: [BrowserModule,
              BrowserAnimationsModule,
              HttpModule,
              FormsModule, ToastModule.forRoot(),
              AppRoutingModule],
          providers: [TalentService, { provide: APP_BASE_HREF, useValue: '/' }],
          declarations: [AppComponent,
              AllTalentsComponent,
              AllGroupsComponent,
              AddTalentComponent,
              AddGroupComponent,
              TalentDetailsComponent,
              GroupDetailsComponent,
              QuickSearchComponent,
              SearchResultComponent,
              WelcomeComponent,
              ErrorComponent]
      }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'tlApp'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('tlApp');
  }));
  
  //it('should render title in a h1 tag', async(() => {
  //  const fixture = TestBed.createComponent(AppComponent);
  //  fixture.detectChanges();
  //  const compiled = fixture.debugElement.nativeElement;
  //  expect(compiled.querySelector('h1').textContent).toContain('Welcome to tlApp!');
  //}));
});
