import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalConstants } from '../../../common/data/global-constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { IpfsService } from '../../../shared/ipfs.service';
const all = require('it-all');

@Component({
  selector: 'ngx-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private toastrService: NbToastrService, private ipfsService: IpfsService) { }

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
  public tagFolderCIDs;
  public rootCID;
  public fileType;
  public uploadingFlag = false;

  ngOnInit(): void {
  }

  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0);
  //   console.log(this.fileToUpload);
  // }

  async createIpfsNode() {
    var status = await this.ipfsService.createNode();
    console.log(`Node online: ${status}`)
    if (status === false) {
      console.log("Node could not be created...");
      return;
    }
  }

  async upload() {

    this.uploadingFlag = true;
    
    this.fileType = this.files[0].name.split('.').pop();

    if(!GlobalConstants.node){
      var createIPFSNode = await this.createIpfsNode();
    }
    
    // Convert file object to Blob
    const blobG2 = new Blob([this.files[0]]);

    // Create directory and add file to IPFS
    GlobalConstants.node.files.mkdir('/' + GlobalConstants.nodeStatus.cid.string + '/' + GlobalConstants.userName + '/' + this.postForm.value.postTag, { parents: true });
    const writeFile = await GlobalConstants.node.files.write('/' + GlobalConstants.nodeStatus.cid.string + '/' + GlobalConstants.userName + '/' + this.postForm.value.postTag + '/' + this.postForm.value.postTitle, blobG2, { create: true });

    this.tagFolderCIDs = await all(GlobalConstants.node.files.ls('/' + GlobalConstants.nodeStatus.cid.string + '/' + GlobalConstants.userName + '/' + this.postForm.value.postTag));
    console.log(this.postForm.value.postTag + ' folder CIDs : ');
    console.log(this.tagFolderCIDs);

    this.rootCID = await all(GlobalConstants.node.files.ls('/'));
    console.log('Root fodler CID : ');
    console.log(this.rootCID);

    var length = this.tagFolderCIDs.length;
    var addPostObj = {
      address: sessionStorage.getItem('account-id'),
      CID: this.tagFolderCIDs[length-1].cid.string,
      title: this.postForm.value.postTitle,
      tag: this.postForm.value.postTag,
      type: this.fileType
    };

    this.ipfsService.addPost(addPostObj)
    .subscribe((data:any) => {
      console.log(data);
    })

    this.uploadingFlag = false;
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

  submitPost() {
    if (!this.postForm.valid) {
      this.toastrService.danger('Submit failed!', 'Please fill all details!', { status: "danger", limit: 3 });
      return;
    }
    if (this.files.length === 0 || this.files.length > 1) {
      this.files.length === 0 ?
        this.toastrService.danger('Upload failed!', 'Please upload at least one file!', { status: "danger", limit: 3 }) :
        this.toastrService.danger('Upload failed!', 'Please upload only one file!', { status: "danger", limit: 3 })
      return;
    }

    this.upload();
  }
}
