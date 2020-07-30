import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  to: string;
  From: string;
  Transaction: string;
  Date: string;
}

@Component({
  selector: 'ngx-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  customColumn = 'to';
  defaultColumns = ['From', 'Transaction', 'Date'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  transactions = [];

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    var addressObj = { address: sessionStorage.getItem('account-id').toLowerCase() };
    this.userService.viewTransactions(addressObj)
      .subscribe((data: any) => {
        console.log(data);
        data.forEach(transaction => {
          this.transactions.push(transaction);
        });
      })
  }

  openTransactionURL(hash) {
    window.open("https://ropsten.etherscan.io/tx/" + hash, "_blank");
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<FSEntry>[] = [
    {
      data: { to: 'John Doe', From: 'admin', Transaction: '0xqiwuedfho97830wefg08w7', Date: Date.now().toString() }
    },
    {
      data: { to: 'Yug Darji', From: 'admin', Transaction: '0x2938hdfwierufbsdc', Date: Date.now().toString() }
    },
    {
      data: { to: 'Harshil Darji', From: 'admin', Transaction: '0xqiwuedfho97830wefg08w7', Date: Date.now().toString() }
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

}
