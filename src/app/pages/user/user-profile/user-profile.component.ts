import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AddUserInfoComponent } from '../add-user-info/add-user-info.component';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private dialogService: NbDialogService, private userService: UserService, private toastrService: NbToastrService) { }

  public userName;
  public loading = true;
  public userBio;

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    var tempUserName = localStorage.getItem('user-name');
    this.userName = tempUserName.charAt(0).toUpperCase() + tempUserName.slice(1);
    var addressObj = {
      address: sessionStorage.getItem('account-id')
    }
    this.userService.viewUserInfo(addressObj)
      .subscribe((data: any) => {
        // console.log(data);
        this.userBio = data.bio;
        this.loading = false;
      }, (error: any) => {
        
        this.toastrService.danger('Getting info failed!', 'An unexpected error occurred!', { status: "danger", limit: 3 });
        console.log(error);
      })
  }

  openDialog() {
    this.dialogService.open(AddUserInfoComponent);
  }
}
