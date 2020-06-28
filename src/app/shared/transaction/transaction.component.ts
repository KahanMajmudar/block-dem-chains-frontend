import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'ngx-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  public transactions = [];

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    var addressObj = { address: sessionStorage.getItem('account-id').toLowerCase() };
    this.userService.viewTransactions(addressObj)
    .subscribe((data:any) => {
      console.log(data);
      data.forEach(transaction => {
        this.transactions.push(transaction);
      });
    })
  }

  openTransactionURL(hash)
  {
    window.open("https://ropsten.etherscan.io/tx/" + hash, "_blank");
  }

}
