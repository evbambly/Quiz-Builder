import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { DataService } from '../services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { Quiz } from '../models/quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})



export class QuizComponent implements OnInit {
  constructor(private modalService: BsModalService, private data: DataService,
              private cookie: CookieService) {

  }
  modalRef: BsModalRef;
  dataLoaded: Promise<boolean>;
  quiz: Quiz;
  showQuiz = false;
  points = 0;
  answered = 0;
  progress = 0;
  prevScoreExists = false;
  modalDetailed = false;
  guesses: string[];
  background = 'url(\'https://assets.wordpress.envato-static.com/uploads/2017/08/Screen-Shot-2017-08-31-at-3.45.30-PM.png\')';

  ngOnInit() {
    if (this.cookie.check('prevPoints') && this.cookie.check('prevMax')) {
      this.prevScoreExists = true;
    }
    this.data.displayQuiz.subscribe(importedQuiz => { this.quiz = importedQuiz; });
    this.guesses = [];
    this.dataLoaded = Promise.resolve(true);
  }

  openModal() {
      this.data.inputScore(this.points, this.answered);
      this.data.assignModal(this.quiz.conclusion);
      this.data.writeModalOn(false);
      this.modalRef = this.modalService.show(ModalComponent);
    }


checkIfAnswerIsCorrect(answer: string, index: number) {
  this.guesses[index] = answer;
  if (this.quiz.questions[index].answers[0] === answer) {
this.points++;
}
  this.answered++;
  this.progress = Math.floor(this.answered / this.quiz.questions.length * 100);


  if (this.progress === 100)  {
this.openModal(); }
  this.cookie.set('prevPoints', this.points.toString());
  this.cookie.set('prevMax', this.answered.toString());
}

reset() {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
  this.points = 0;
  this.answered = 0;
  this.progress = 0;
  this.prevScoreExists = false;
  this.modalDetailed = false;
  this.guesses = new Array<string>(this.quiz.questions.length);
}
}
