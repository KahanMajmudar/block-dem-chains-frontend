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

  async createDatastore() {
    var self = this;
    const homePath = homedir();
    var errorFlag;
    GlobalConstants.userDb = await new Datastore({ filename: path.join(homePath, "user.db"), autoload: true });
    // const removeAllRows = await GlobalConstants.userDb.remove({}, { multi: true });
    // GlobalConstants.userDb.removeIndex('userID', function (err) {
    //   console.log(err);
    // });
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

    GlobalConstants.userDb.ensureIndex({ fieldName: 'userID', unique: true }, function (err) {
      if(err)
        console.log('Error while ensuring DB indexing...');
    });

    return errorFlag;
  }

  async updateNumOfFollowers()
  {
    var self = this;
    const countNumberOFFollowers = await GlobalConstants.userDb.count({}, function (err, count) {
      if(err)
        console.log(err);
      else{
        console.log('Following count increased by 1');
        self.setRowCountToNumOfFollowers(count);
      }
    });
  }

  setRowCountToNumOfFollowers(count)
  {
    GlobalConstants.numOfUsersFollowed = count;
  }
}