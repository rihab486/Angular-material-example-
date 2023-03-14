import { Component ,OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadServiceService } from '../Service/file-upload-service.service';
@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent implements OnInit {
  myform!:FormGroup
  dataSource!: MatTableDataSource<any>;
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;
  constructor(private formBuilder:FormBuilder,private uploadService: FileUploadServiceService) {
      let formControls = {


        firstnames : new FormControl(),
        lastnames:new FormControl(),
        emails: new FormControl(),
        contactNumbers : new FormControl(),
        dobs: new FormControl(),
        imageUrl: new FormControl()

      }

     
     this.myform = this.formBuilder.group(formControls);
    }

ngOnInit() {
  this.imageInfos = this.uploadService.getFiles();
 
}
addUser(){
  console.log(this.myform.value);
}
selectFiles(event: any): void {

  this.selectedFileNames = [];
  this.selectedFiles = event.target.files;

  this.previews = [];
  if (this.selectedFiles && this.selectedFiles[0]) {
    const numberOfFiles = this.selectedFiles.length;
    for (let i = 0; i < numberOfFiles; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.previews.push(e.target.result);
      };

      reader.readAsDataURL(this.selectedFiles[i]);

      this.selectedFileNames.push(this.selectedFiles[i].name);
    }
  }
}



}
