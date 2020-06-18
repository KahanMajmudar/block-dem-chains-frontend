import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalConstants } from '../../../common/data/global-constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
const all = require('it-all');

@Component({
  selector: 'ngx-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor() { }

  // @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
  //   event.returnValue = false;
  // }

  public postForm = new FormGroup(
    {
      postTitle: new FormControl('', Validators.required),
      postTag: new FormControl('', Validators.required),
    });

  public fileToUpload: File = null;
  public readerObject;

  ngOnInit(): void {
  }

  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0);
  //   console.log(this.fileToUpload);
  // }

  async upload() {
    // Convert file object to Blob
    const blobG2 = new Blob([this.fileToUpload]);

    // Create directory and add file to IPFS
    GlobalConstants.node.files.mkdir('/' + GlobalConstants.nodeStatus.cid.string + '/' + GlobalConstants.userName + '/ML', { parents: true });
    var x = await GlobalConstants.node.files.write('/' + GlobalConstants.nodeStatus.cid.string + '/' + GlobalConstants.userName + '/ML', blobG2, { create: true });

    const rootDirectoryContents = await all(GlobalConstants.node.files.ls('/'));
    console.log(rootDirectoryContents);
  }

  public files: any = [];

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      console.log(element);
      this.files.push(element);
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
    console.log(this.files);
  }

  submitPost()
  {}
}
