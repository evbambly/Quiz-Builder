import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.css']
})
export class ImageSelectComponent implements OnInit {

  constructor(private data: DataService) { }
  imgValidator = Validators.pattern('(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)');
  newForm = new FormGroup({
    imgInput: new FormControl(null, [this.imgValidator, Validators.minLength(5), Validators.required]),
  });
  imageUrl: string;
  imageChosen = false;

  chooseImage() {
    if (!this.newForm.controls.imgInput.invalid) {
      this.imageUrl = this.newForm.controls.imgInput.value;
      this.imageChosen = true;
    } else {
      this.imageChosen = false;
      this.tryCutURL();
    }
  }
  tryCutURL() {
    const urlString: string =  this.newForm.controls.imgInput.value;
    let foundEnding = false;
    const fileEndings = ['jpg', 'png', 'gif'];
    let cutOffPoint = urlString.lastIndexOf('.jpeg');
    if (cutOffPoint !== -1) {
     this.newForm.controls.imgInput.setValue(urlString.slice(0, cutOffPoint + 5));
     this.chooseImage();
    } else {
    fileEndings.forEach(end => {
       if (cutOffPoint === -1 && !foundEnding) {
         cutOffPoint = urlString.lastIndexOf('.' + end);
       } else {
       foundEnding = true;
       }
     });
    if (cutOffPoint !== -1) {
         this.newForm.controls.imgInput.setValue(urlString.slice(0, cutOffPoint + 4));
         this.chooseImage();
       }
     }
    this.newForm.controls.imgInput.updateValueAndValidity();
   }
  ngOnInit() {
this.data.newImgUrl.subscribe(newUrl => {this.newForm.controls.imgInput.setValue(newUrl); this.imageChosen = false; });
  }
}
