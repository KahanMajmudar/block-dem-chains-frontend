import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { GlobalConstants } from '../common/data/global-constants';
const Ipfs = require('ipfs');
const all = require('it-all');

@Injectable({
  providedIn: 'root'
})
export class IpfsService {

  constructor(private http: HttpClient) { }

  async createNode()
  {
    GlobalConstants.node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    GlobalConstants.nodeStatus = await GlobalConstants.node.files.stat('/');
    const status = GlobalConstants.node.isOnline() ? true : false;
    return status;
  }

  errorHandler(error: HttpErrorResponse)
  {
    return observableThrowError(error.message || "Server Error");
  }
}