import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSearchModule,
  NbTreeGridModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './post/post.component';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { DragDropDirective } from './create-post/drag-drop-directive';
import { IpfsService } from '../../shared/ipfs.service';
import { NedbService } from '../../shared/nedb.service';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { UserProfileComponent } from '../user/user-profile/user-profile.component';
import { UserSearchResultsComponent } from '../user/user-search-results/user-search-results.component';
import { AddUserInfoComponent } from '../user/add-user-info/add-user-info.component';
import { UserService } from '../../shared/user.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { TransactionComponent } from '../../shared/transaction/transaction.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NbEvaIconsModule,
    NbSearchModule,
    NbTreeGridModule
  ],
  declarations: [
    DashboardComponent,
    PostComponent,
    CreatePostComponent,
    DragDropDirective,
    UserProfileComponent,
    UserSearchResultsComponent,
    AddUserInfoComponent,
    LoaderComponent,
    TransactionComponent,
  ],
  providers: [
    IpfsService,
    NedbService,
    UserService,
  ],
  entryComponents: [
    LoaderComponent
  ]
})
export class DashboardModule { }
