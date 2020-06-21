import { Component, OnInit, HostListener } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AddUserInfoComponent } from '../add-user-info/add-user-info.component';
import { UserService } from '../../../shared/user.service';
import { GlobalConstants } from '../../../common/data/global-constants';
import { NedbService } from '../../../shared/nedb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private dialogService: NbDialogService, private userService: UserService, private toastrService: NbToastrService,
    private nedbService: NedbService) { }

  public userName;
  public loading = false;
  public userBio;
  public numOfUsersFollowed;
  public usersFollowed;

  ngOnInit(): void {
    this.getUserDetails();
    // this.nedbService.updateNumOfFollowers();
    this.checkUsersFollowed();
  }

  getUserDetails() {
    // TODO: Update logic for user bio shit
    var tempUserName = localStorage.getItem('user-name');
    this.userName = tempUserName.charAt(0).toUpperCase() + tempUserName.slice(1);
    this.userBio = localStorage.getItem('user-bio');
    this.numOfUsersFollowed = GlobalConstants.numOfUsersFollowed;
    console.log(this.numOfUsersFollowed);
    if (!this.userBio) {
      var addressObj = {
        address: sessionStorage.getItem('account-id')
      }
      this.loading = true;
      this.userService.viewUserInfo(addressObj)
        .subscribe((data: any) => {
          console.log(data);
          if (!data.isUser) {
            this.toastrService.info('Let\'s add a few words to your profile!', 'Hey ' + this.userName + '!', { status: "danger", limit: 3 });
            this.loading = false;
            return;
          }
          this.userBio = data.bio;
          localStorage.setItem('user-bio', this.userBio);
          this.loading = false;
        }, (error: any) => {
          this.loading = false;
          this.toastrService.danger('Getting info failed!', 'An unexpected error occurred!', { status: "danger", limit: 3 });
          console.log(error);
        })
    }
  }

  openDialog() {
    this.dialogService.open(AddUserInfoComponent);
  }

  async checkUsersFollowed() {
    var self = this;
    if (GlobalConstants.numOfUsersFollowed === 0)
      return;
    if (!GlobalConstants.node){
      var loadDataStore = await this.nedbService.createDatastore();
      var updateDemFollowers = await this.nedbService.updateNumOfFollowers();
      this.numOfUsersFollowed = GlobalConstants.numOfUsersFollowed;
    }

    var dbFind = await GlobalConstants.userDb.find({}, function (err, docs) {
      if (err)
        console.log(err);
      else
        self.getUsersFollowed(docs);
    });
  }

  async getUsersFollowed(rows) {
    console.log(rows);
    this.usersFollowed = rows;
  }
}
