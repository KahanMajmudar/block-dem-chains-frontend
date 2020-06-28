import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePostComponent } from './dashboard/create-post/create-post.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserSearchResultsComponent } from './user/user-search-results/user-search-results.component';
import { AddUserInfoComponent } from './user/add-user-info/add-user-info.component';
import { TransactionComponent } from '../shared/transaction/transaction.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'post/create',
      component: CreatePostComponent,
    },
    {
      path: 'profile',
      component: UserProfileComponent
    },
    {
      path: 'transactions',
      component: TransactionComponent
    },
    {
      path: 'user-search',
      component: UserSearchResultsComponent
    },
    // {
    //   path: 'layout',
    //   loadChildren: () => import('./layout/layout.module')
    //     .then(m => m.LayoutModule),
    // },
    {
      path: '',
      redirectTo: 'dashboard',
    },
    {
      path: '**',
      redirectTo: 'dashboard'
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
