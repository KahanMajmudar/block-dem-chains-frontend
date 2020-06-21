import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public transactions = [];

  ngOnInit(): void {
    this.loadTransactionsFromLocalStorage();
  }

  loadTransactionsFromLocalStorage() {
    var txString = localStorage.getItem('transactions');
    this.transactions.push(JSON.parse(txString));
    console.log(this.transactions);
  }

}
