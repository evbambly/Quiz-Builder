import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
@Component({
  selector: 'app-text-click',
  templateUrl: './text-click.component.html',
  styleUrls: ['./text-click.component.css']
})
export class TextClickComponent implements OnInit, AfterContentInit {

  constructor(private data: DataService) {
   }
  @Input() private size: string;
  @Input() private placeholder: string;
  @Input() private reset: boolean;
  @Input() private center: boolean;


  formSize: string;
  fontSize: string;
  inputChosen = false;
  input: string;
  color: string;
  ngOnInit() {
    if (this.reset) {
    this.data.inputBinding.subscribe(input => {this.input = input, this.inputChosen = false; });
  }
    this.center = this.center === undefined ? false : this.center;
  }
  ngAfterContentInit() {
    switch (this.size.toString()) {
      case '2':
      this.formSize = 'form-control-lg';
      this.fontSize = '2.5';
      this.color = '#007bff';
      break;
      case '3':
      this.formSize = 'form-control-md';
      this.fontSize = '1.5';
      this.color = '#007bff';
      break;
      case '4':
      this.formSize = 'form-control-sm';
      this.fontSize = '1';
      this.color = 'black';
      break;
    }
  }
  chooseInput() {
    if (this.input !== undefined && this.input.length > 0) {
      this.inputChosen = true;
    }
  }
}
