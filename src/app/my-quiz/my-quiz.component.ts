import { Component, OnInit } from '@angular/core';
import { QuizLoad } from 'src/shared/services/quiz-load.service';
import { QuizMetaData } from 'src/shared/models/quiz-meta-data.model';
import { Quiz } from 'src/shared/models/quiz.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-quiz',
  templateUrl: './my-quiz.component.html',
  styleUrls: ['./my-quiz.component.css']
})

export class MyQuizComponent implements OnInit {

  data: QuizMetaData;
  quiz: Observable<Quiz>;
  constructor(myQuiz: QuizLoad) {
  this.data = myQuiz.yourQuiz;
  this.quiz = myQuiz.loadedQuiz;
  }

  ngOnInit() {
  }

}
