import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/data/global-constants';
import { homedir } from 'os';
let Datastore = require('nedb');
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class NedbService {

  constructor() { }

  async createDatastore()
  {
    const homePath = homedir();
    var errorFlag;
    GlobalConstants.userDb = new Datastore({ filename: path.join(homePath, "user.db"), autoload: true });
    GlobalConstants.userDb.find({}, function (err, docs) {
      if (err) {
        console.log(err);
        errorFlag = true;
      }
      else {
        console.log('Database Created successfully!');
        errorFlag = false;
      }
    });
    // const removed = await GlobalConstants.userDb.remove({}, { multi: true }, function (err, numRemoved) {
    //   console.log('Rows removed from DB : ' + numRemoved);
    // });
    return errorFlag;
  }

}