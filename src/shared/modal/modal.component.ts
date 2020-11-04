import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { CookieService } from 'ngx-cookie-service';
import { QuizConclusion } from '../models/quiz-conclusion.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private data: DataService, private cookie: CookieService) {

   }
points: number;
max: number;
details: QuizConclusion;
fbIcon = faFacebookSquare;
tweetIcon = faTwitterSquare;
modalCreation = false;

didPass() {
  return (this.points / this.max * 100) >= this.details.winRequirement;
}

  ngOnInit() {
    this.data.endResult.subscribe(result => this.points = result[0]);
    this.data.endResult.subscribe(result => this.max = result[1]);
    this.data.observableModal.subscribe(details => this.details = QuizConclusion.castFromFirebase(details));
    this.data.modalcreation.subscribe(position => {
      this.modalCreation = position;
      if (position) {
        this.details = new QuizConclusion();
      }});
  }
  finishCreation() {
    this.cookie.set('winText', this.details.winText);
    this.cookie.set('winImg', this.details.winImg);
    this.cookie.set('loseText', this.details.loseText);
    this.cookie.set('loseImg', this.details.loseImg);
    this.cookie.set('minScore', this.details.winRequirement.toString());
    this.data.turnModalOn(false);
  }
}
