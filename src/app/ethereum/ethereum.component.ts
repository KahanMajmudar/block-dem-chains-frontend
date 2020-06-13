import { Component, OnInit, OnDestroy } from '@angular/core';
import { EthService } from './shared/eth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
var ModelViewer = require('metamask-logo')

@Component({
  selector: 'ngx-app',
  templateUrl: './ethereum.component.html',
})
export class EthereumComponent implements OnInit, OnDestroy {

  constructor(private ethService: EthService, protected router: Router, private toastrService: NbToastrService) {
    this.viewer = ModelViewer({
      // Dictates whether width & height are px or multiplied
      pxNotRatio: true,
      width: 500,
      height: 400,
      // pxNotRatio: false,
      // width: 0.9,
      // height: 0.9,

      // To make the face follow the mouse.
      followMouse: false,
      slowDrift: false,
    });
  }

  public viewer;
  public container;
  public accountIDs;

  ngOnInit(): void {
    this.container = document.getElementById('logo-container')
    this.container.appendChild(this.viewer.container);

    this.viewer.lookAt({
      x: 100,
      y: 100,
    })

    // enable mouse follow
    this.viewer.setFollowMouse(true);
  }

  ngOnDestroy(): void {
    this.viewer.stopAnimation();
  }

  downloadMetamask() {
    window.open("https://metamask.io/download.html", "_blank");
  }

  verifyMetamask() {
    this.ethService.getAccounts()
      .subscribe((data: any) => {
        if(data.length === 0)
        {
          this.toastrService.info('Make sure to give access to this site under Settings -> Connections', 'Info', {status: "danger", limit: 1, duration: 8000} );
          this.toastrService.danger('Please configure MetaMask account first!', 'Oops!', {status: "danger", limit: 3, duration: 5000} );
          return;
        }
        localStorage.setItem('metamask-verified', 'true');
        this.toastrService.success('Let\'s Block some chains!', 'Wallet configured!', {status: "success", limit: 1} );
        this.router.navigate(['/pages']);
      }, (error:any) => {
        console.log(error);
      });
  }
}
