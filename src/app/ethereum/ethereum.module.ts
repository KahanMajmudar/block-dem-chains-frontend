import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEB3 } from './tokens';
import { EthService } from './shared/eth.service';
import Web3 from 'web3';
import { EthereumComponent } from './ethereum.component';
import { EthereumRoutingModule } from './ethereum-routing.module';
import { NbCardModule, NbLayoutModule, NbButtonModule, NbIconModule, NbAlertModule } from '@nebular/theme';

@NgModule({
  declarations: [
    EthereumComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbAlertModule,

    EthereumRoutingModule
  ],
  providers: [{
    provide: WEB3,
    useFactory: () => new Web3(Web3.givenProvider || "ws://localhost:8546")
  },
    EthService
  ]
})
export class EthereumModule { }
