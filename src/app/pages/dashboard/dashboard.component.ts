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
  public userIDToSearch;

  @HostListener('window:focus', ['$event'])
  onFocus(event: FocusEvent): void {
    this.setCurrentAccount();
  }

  // TODO: Add Angular resolver
  ngOnInit() {
    console.log('initialising...');
    this.initialise().then(()=>{
      this.dataIsReady = true;
      console.log('data is ready')
    });
  }

  async initialise()
  {
    const waitForSettingCurrentAcc = await this.setCurrentAccount();
    const loadDataStore = await this.dbService.createDatastore();
    const updateDemFollowers = await this.dbService.updateNumOfFollowers();
    const waitForShowPostsFlag = this.renderPosts();
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

  renderPosts()
  {
    if(GlobalConstants.numOfUsersFollowed > 0)
    {
      // TODO: Render dem posts here
    }
  }
}
