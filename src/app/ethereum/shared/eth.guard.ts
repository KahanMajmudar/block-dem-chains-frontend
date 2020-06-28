import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EthService } from '../shared/eth.service';

@Injectable({
  providedIn: 'root'
})
export class EthGuard implements CanActivate {

  constructor(private ethService: EthService, private router: Router) {}

  canActivate(): boolean {
    if(this.ethService.metamaskVerified()) {
      return true;
    }
    else {
      this.router.navigate(['/verify']);
      return false;
    }
  }
  
}
