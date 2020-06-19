import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NbToastrService, NbDialogService, NbDialogRef } from '@nebular/theme';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'ngx-add-user-info',
  templateUrl: './add-user-info.component.html',
  styleUrls: ['./add-user-info.component.scss']
})
export class AddUserInfoComponent implements OnInit {

  constructor(private toastrService: NbToastrService, private userService: UserService, protected dialogRef: NbDialogRef<AddUserInfoComponent>) { }

  public userForm = new FormGroup(
    {
      userBio: new FormControl('', Validators.required),
    });
  public loading = false;

  ngOnInit(): void {
  }

  submitBio() {
    this.loading = true;
    if (this.userForm.valid && this.userForm.value.userBio.length < 30) {
      var accountID = sessionStorage.getItem('account-id');
      console.log(accountID);
      var userObj = {
        name: localStorage.getItem('user-name'),
        bio: this.userForm.value.userBio,
        address: accountID
      };
      this.userService.addUserInfo(userObj)
        .subscribe((data: any) => {
          console.log(data);
        }, (error: any) => {
          console.log(error);
          this.toastrService.danger('Submit failed!', 'An unexpected error occurred!', { status: "danger", limit: 3 });
        })

      this.dialogRef.close();
      this.loading = false;
      return;
    }
    !this.userForm.valid ?
      this.toastrService.danger('Submit failed!', 'Your awesome bio cannot be empty!', { status: "danger", limit: 3 }) :
      this.toastrService.danger('Submit failed!', 'Please enter a shorter bio (30 chars max)!', { status: "danger", limit: 3 });

    this.loading = false;
  }

}
