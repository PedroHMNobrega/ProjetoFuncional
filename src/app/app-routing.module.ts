import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PullsComponent } from './pulls/pulls.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SelectRepoComponent } from './select-repo/select-repo.component';

const routes: Routes = [
  {
    path: '',
    component: SelectRepoComponent
  },
  {
    path: ':user/:repository',
    component: PullsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
