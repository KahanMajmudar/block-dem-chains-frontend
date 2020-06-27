import { Component, OnInit, HostListener } from '@angular/core';
import { EthService } from '../../ethereum/shared/eth.service';
import { IpfsService } from '../../shared/ipfs.service';
import { NedbService } from '../../shared/nedb.service';
import { NbSearchService, NbToastrService } from '@nebular/theme';
import { UserService } from '../../shared/user.service';
import { GlobalConstants } from '../../common/data/global-constants';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private ethService: EthService, private ipfsService: IpfsService, private dbService: NedbService,
    private searchService: NbSearchService, private userService: UserService, private toastrService: NbToastrService) { }

  public accountIDs;
  public posts;
  public dataIsReady = false;
  public usersFollowed = false;
  public userIDToSearch;
  public bioAdded = false;
  

  @HostListener('window:focus', ['$event'])
  onFocus(event: FocusEvent): void {
    this.setCurrentAccount();
  }

  // TODO: Add Angular resolver
  ngOnInit() {
    var addressObj = { address: sessionStorage.getItem('account-id') };
    this.userService.viewUserInfo(addressObj)
    .subscribe((data:any) => {
      console.log(data);
      if(data.isUser)
        this.bioAdded = true;
    })
    console.log('initialising...');
    this.initialise().then(() => {
      this.dataIsReady = true;
      this.renderPosts();
      console.log('data is ready')
    });
  }

  async initialise() {
    const waitForSettingCurrentAcc = await this.setCurrentAccount();
    const loadDataStore = await this.dbService.createDatastore();
    const updateDemFollowers = await this.dbService.updateNumOfFollowers();
    const web3 = await this.ethService.getWeb3Object();
    console.log(web3);
  }

  setCurrentAccount() {
    this.ethService.currentAccount()
      .subscribe((data: any) => {
        console.log(data);
        if (data.length === 0) {
          return;
        }
        this.accountIDs = data;
        sessionStorage.setItem('account-id', this.accountIDs);
        sessionStorage.setItem('metamask-verified', 'true');
      }, (error: any) => {
        console.log(error);
      });
    return;
  }

  searchUser() {
    this.searchService.activateSearch('Search User');
  }

  async renderPosts() {
    var self = this;
    var dbFind = await GlobalConstants.userDb.find({}, function (err, docs) {
      if (err)
        console.log(err);
      else
        self.getFollowedUserPosts(docs);
    });
  }

  getFollowedUserPosts(docs) {
    if(docs){
      docs.forEach(user => {
        var addressObj = {
          address: user.userID
        };
        this.userService.getUserPosts(addressObj)
        .subscribe((data:any) => {
          console.log(data);
          this.posts = data;
          this.usersFollowed = true;
        })
      });  
    }
  }

  goToIPFSLink(hash)
  {
    window.open("https://ipfs.io/ipfs/" + hash, "_blank");
  }
}
