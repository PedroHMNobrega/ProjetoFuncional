import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepositoriesFiltersComponent } from './repositories-filters/repositories-filters.component'
import { PullsFiltersComponent } from './pulls-filters/pulls-filters.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PullsComponent } from './pulls/pulls.component';

@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    RepositoriesFiltersComponent,
    NotFoundComponent,
    UserInfoComponent,
    PullsComponent,
    PullsFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
