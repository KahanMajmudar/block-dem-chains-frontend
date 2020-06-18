import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalConstants } from '../../common/data/global-constants';
import { EthService } from '../../ethereum/shared/eth.service';

const Ipfs = require('ipfs');
const all = require('it-all');

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  constructor(private ethService: EthService) {}

  public accountIDs;

  @HostListener('window:focus', ['$event'])
  onFocus(event: FocusEvent): void {
    this.ethService.currentAccount()
    .subscribe((data: any) => {
      console.log(data);
      if(data.length === 0)
      {
        return;
      }
      this.accountIDs = data;
      localStorage.setItem('account-id', this.accountIDs[0]);
      localStorage.setItem('metamask-verified', 'true');
    }, (error:any) => {
      console.log(error);
    });
    return;
  }

  ngOnInit(): void {
    GlobalConstants.userName = localStorage.getItem('user-name');
    this.createIpfsNode();
    var web3 = this.ethService.getWeb3Object();
    console.log(web3);
  }

  async createIpfsNode()
  {
    GlobalConstants.node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    GlobalConstants.nodeStatus = await GlobalConstants.node.files.stat('/');
    const status = GlobalConstants.node.isOnline() ? 'online' : 'offline'
    console.log(`Node status: ${status}`)
    console.log(GlobalConstants.nodeStatus)
  }
}
