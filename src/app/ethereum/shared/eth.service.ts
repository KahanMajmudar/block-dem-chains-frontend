import { Injectable, Inject } from '@angular/core';

// Web3
import { WEB3 } from '../tokens';
import Web3 from 'web3';

// RXJS
import { Observable } from 'rxjs/Observable';
import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';
import { of } from 'rxjs/observable/of';
import { map, tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EthService {

  constructor(@Inject(WEB3) private web3: Web3) { }

  /** Returns all accounts available */
  getAccounts(): Observable<string[]> {
    return bindNodeCallback(this.web3.eth.getAccounts)();
  }

  /** Get the current account */
  currentAccount(): Observable<string | Error> {
    if (this.web3.eth.defaultAccount) {
      return of(this.web3.eth.defaultAccount);
    } else {
      return this.getAccounts().pipe(
        tap((accounts: string[]) => {
          if (accounts.length === 0) { throw new Error('No accounts available'); }
        }),
        map((accounts: string[]) => accounts[0]),
        tap((account: string) => this.web3.defaultAccount = account),
        catchError((err: Error) => of(err))
      );
    }
  }

  getWeb3Object()
  {
    return this.web3;
  }

  metamaskVerified()
  {
    return !!sessionStorage.getItem('metamask-verified');
  }
}
