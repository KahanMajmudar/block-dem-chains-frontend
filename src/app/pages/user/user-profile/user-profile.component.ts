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
    private dbService: NedbService) { }

  public userName;
  public loading = false;
  public userBio;
  public numOfUsersFollowed = 0;
  public usersFollowed;

  ngOnInit(): void {
    this.getUserDetails();
    // this.nedbService.updateNumOfFollowers();
    this.checkUsersFollowed();
  }

  async getUserDetails() {
    // TODO: Update logic for user bio shit
    if (!GlobalConstants.userDb) {
      const loadDataStore = await this.dbService.createDatastore();
      const updateDemFollowers = await this.dbService.updateNumOfFollowers();
    }
    this.numOfUsersFollowed = GlobalConstants.numOfUsersFollowed == undefined ? 0 : GlobalConstants.numOfUsersFollowed;
    var addressObj = { address: sessionStorage.getItem('account-id') };
    this.userService.viewUserInfo(addressObj)
      .subscribe((data: any) => {
        console.log(data);
        if (!data.isUser) {
          this.toastrService.info('Let\'s add a few words to your profile!', 'Hey!', { status: "danger", limit: 3 });
          this.loading = false;
          return;
        }
        this.userBio = data.bio;
        this.userName = data.name;
      }, (error: any) => {
        this.loading = false;
        this.toastrService.danger('Getting info failed!', 'An unexpected error occurred!', { status: "danger", limit: 3 });
        console.log(error);
      })

    // var tempUserName = localStorage.getItem('user-name');
    // this.userName = tempUserName.charAt(0).toUpperCase() + tempUserName.slice(1);

  }

  openDialog() {
    this.dialogService.open(AddUserInfoComponent)
    .onClose.subscribe((data:any)=>{
      var addressObj = { address: sessionStorage.getItem('account-id') };
      this.userService.viewUserInfo(addressObj)
      .subscribe((data: any) => {
        this.userBio = data.bio;
        this.userName = data.name;
      });
    })
  }

  async checkUsersFollowed() {
    var self = this;
    if (GlobalConstants.numOfUsersFollowed === 0 || GlobalConstants.numOfUsersFollowed == undefined)
      return;
    if (!GlobalConstants.node) {
      var loadDataStore = await this.dbService.createDatastore();
      var updateDemFollowers = await this.dbService.updateNumOfFollowers();
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

  async unfollowUser(userID)
  {
    var self = this;
    if (!GlobalConstants.userDb) {
      const loadDataStore = await this.dbService.createDatastore();
      const updateDemFollowers = await this.dbService.updateNumOfFollowers();
    }
    const unfollowUser = await GlobalConstants.userDb.remove({ userID: userID }, async function (err, count) {
      if(err)
        console.log(err);
      else{
        const updateDemFollowers = await this.dbService.updateNumOfFollowers();
        self.checkUsersFollowed();
      }
    });
  }
}
