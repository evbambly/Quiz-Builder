import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Question } from '../../shared/models/question.model';
import { DataService } from '../../shared/services/data.service';
import { Title } from '@angular/platform-browser';
import { QuizLoad } from '../../shared/services/quiz-load.service';
import { Router } from '@angular/router';
import {Theme} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  providers = ['google'];
  themes = Theme;
  constructor(private cookie: CookieService, private data: DataService,
              private title: Title, private quizLoad: QuizLoad, private router: Router) { }
  quizTitle;
  quiz: Question[];
  modalInfo: string[];
  noQuizSaved = false;
  ngOnInit() {
   this.title.setTitle('QuizMachine - Your Quiz');
   if (this.cookie.check('quizTitle')) {
      // this.generateQuiz();
      this.data.assignQuiz({questions: this.quiz, title: this.quizTitle, description: ''});
    } else {
      this.noQuizSaved = true;
    }
  }
  verifyQuizCode(input) {
    const code = input.value;
    if (isNaN(code)) {
      alert('please input a number');
    } else {
      this.router.navigateByUrl('/quiz/' + code);
  }
}

}
  // generateQuiz() {
  //   this.quizTitle = this.cookie.get('quizTitle');
  //   const titleString = this.cookie.get('questionTitles');
  //   const questionTitles = titleString.split('|');
  //   const imgsString = this.cookie.get('images');
  //   const images = imgsString.split('|');
  //   const answerString = this.cookie.get('answers');
  //   const answers = answerString.split('|');
  //   this.quiz = [{img: images[0], question: questionTitles[0], answers: answers[0].split(',')}];
  //   for (let i = 0; i < questionTitles.length - 1; i++) {
  //     const relevantAnswers = answers[i].slice(0, answers[i].length - 1).split(',');
  //     this.quiz.push({img: images[i], question: questionTitles[i], answers: relevantAnswers});
  //   }
  //   this.quiz.shift();
  //   const modalDetails: QuizConclusion = { winText: this.cookie.get('winText'), winImg: this.cookie.get('winImg'),
  //   loseText: this.cookie.get('loseText'), loseImg: this.cookie.get('loseImg'), winRequirement: +this.cookie.get('minScore')};
  //   this.data.assignModal(modalDetails);
  // }

