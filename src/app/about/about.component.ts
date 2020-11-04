import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TabHeadingDirective } from 'ngx-bootstrap/tabs/public_api';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('QuizMachine - AboutMe');
  }

}
