import { Component, OnInit, HostListener } from '@angular/core';
import { EthService } from '../../ethereum/shared/eth.service';
import { IpfsService } from '../../shared/ipfs.service';
import { NedbService } from '../../shared/nedb.service';
import { GlobalConstants } from '../../common/data/global-constants';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private ethService: EthService, private ipfsService: IpfsService, private dbService: NedbService,
    private searchService: NbSearchService) { }

  public accountIDs;
  public posts;
  public dataIsReady = false;

  @HostListener('window:focus', ['$event'])
  onFocus(event: FocusEvent): void {
    this.setCurrentAccount();
  }

  ngOnInit(): void {
    this.setCurrentAccount();
    this.createIpfsNode();
    this.dbService.createDatastore()
    var web3 = this.ethService.getWeb3Object();
    console.log(web3);
    this.dataIsReady = true;
  }

  setCurrentAccount()
  {
    this.ethService.currentAccount()
    .subscribe((data: any) => {
      console.log(data);
      if(data.length === 0)
      {
        return;
      }
      this.accountIDs = data;
      sessionStorage.setItem('account-id', this.accountIDs);
      sessionStorage.setItem('metamask-verified', 'true');
    }, (error:any) => {
      console.log(error);
    });
    return;
  }

  async createIpfsNode() {
    var status = await this.ipfsService.createNode();
    console.log(`Node online: ${status}`)
    if(status=== false)
    {
      console.log("Node could not be created...");
      return;
    }
  }

  searchUser()
  {
    this.searchService.activateSearch('Search User');
    this.searchService.onSearchSubmit()
    .subscribe((data: any) => {
      console.log(data);
    })
  }
}
