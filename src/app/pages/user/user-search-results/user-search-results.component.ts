import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { GlobalConstants } from '../../../common/data/global-constants';
import { NedbService } from '../../../shared/nedb.service';

@Component({
  selector: 'ngx-user-search-results',
  templateUrl: './user-search-results.component.html',
  styleUrls: ['./user-search-results.component.scss']
})
export class UserSearchResultsComponent implements OnInit {

  constructor(private dialogref: NbDialogRef<UserSearchResultsComponent>, private toastrService: NbToastrService, private nedbService: NedbService) { }

  public userDetails: any;
  public ID: any;

  ngOnInit(): void {
  }

  async followUser() {
    this.dialogref.close();
    var currentID = sessionStorage.getItem('account-id');
    if (currentID === this.ID) {
      this.toastrService.danger('Really!', 'Why do want to follow yourself?', { status: "danger", limit: 3, duration: 3500 });
      return;
    }
    try {
      const insertUserRow = await GlobalConstants.userDb.insert({
        "userID": this.ID,
        "userName": this.userDetails.name,
        "userBio": this.userDetails.bio
      });
      this.toastrService.show('Info', 'Reload/Go to profile page to see followed users.', { status: "danger", limit: 3, duration: 8000 });
      this.toastrService.success('Success!', 'Followed '+ this.userDetails.name + ' successfully!', { status: "danger", limit: 3, duration: 8000 });
      this.nedbService.updateNumOfFollowers();
    }
    catch(err) {
      console.log(err);
      this.toastrService.danger('Failed!', 'Could not follow user!', { status: "danger", limit: 3, duration: 3500 });
    }
  }
}
