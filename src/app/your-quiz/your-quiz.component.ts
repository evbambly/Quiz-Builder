import { Component, OnInit } from '@angular/core';
import { Question} from '../../shared/models/question.model';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../shared/modal/modal.component';
import { DataService } from '../../shared/services/data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-your-quiz',
  templateUrl: './your-quiz.component.html',
  styleUrls: ['./your-quiz.component.css']
})
export class YourQuizComponent implements OnInit {

  constructor(private cookie: CookieService, private modalService: BsModalService,
              private data: DataService, private title: Title) { }
  newForm = new FormGroup({
answerInput: new FormControl(null),
  });
titleChosen = false;
quizTitle = '';
amendingQuestion = -1;
imageChosen: boolean;
quiz: Question[];
question: string;
imageUrl: string;
answers: string[];
modalRef: BsModalRef;
targetAnswer: number;
bgOptions = ['green', 'blue', 'yellow'];
bgOptionChosen = 0;

  ngOnInit() {
    this.title.setTitle('QuizMachine - Make a quiz');
    this.resetVariables();
    this.data.modalDisplay.subscribe(modalOn => {
      if (!modalOn) {
       this.modalRef.hide();
       this.data.turnModalOn(true);
       alert('Quiz added successfully!');
      }
    });
  }
  resetVariables() {
    this.imageChosen = false;
    this.question = '';
    this.data.inputText(this.question);
    this.data.clearImgUrl('');
    this.imageUrl = '';
    this.answers = ['', '', '', ''];
    this.targetAnswer = 0;
  }
  chooseTitle() {
    if (this.quizTitle !== '') {
      this.titleChosen = true;
    }
  }
amendTargetAnswer(newIndex: number) {
this.targetAnswer = newIndex;
}
chooseAnswer() {
  if (!this.newForm.controls.answerInput.invalid) {
    this.answers[this.targetAnswer] = this.newForm.controls.answerInput.value;
    this.newForm.controls.answerInput.setValue('');
    this.answers.forEach(answer => {
      if (answer === '') {
        this.targetAnswer = this.answers.indexOf(answer);
      }
    });
  } else {
      this.newForm.controls.answerInput.setValue('');
    }
}
addQuestion() {
  const nextQuestion = this.verifyQuestion();
  if (nextQuestion !== undefined) {
  this.resetVariables();
  if (this.quiz === undefined) {
    this.quiz = [nextQuestion];
  } else {
    this.quiz.push(nextQuestion);
  }}
 }
verifyQuestion() {
  const validAnswers = [];
  let outQuestion: Question;
  if (this.question !== undefined && this.question.length > 0) {
    if (this.imageUrl === '') {
      this.imageUrl = undefined;
    }
    this.answers.forEach(answer => {
    if (answer.length > 0) {
      validAnswers.push(answer);
    }
  });
    if (validAnswers.length > 1) {
      if (this.answers[0].length > 0) {
   outQuestion = {img: this.imageUrl, question: this.question, answers: validAnswers};
  } else {
    alert('Please insert the correct answer to the question');
  }
} else {
    alert('Not enough valid answers!');
  }
} else {
  alert('Please insert all relevant information');
}
  return outQuestion;
}
removeQuestion(question: Question) {
  this.quiz.splice(this.quiz.indexOf(question), 1);
}
amendQuesiton(question: Question) {
  this.question = question.question;
  this.imageUrl = question.img;
  this.imageChosen = this.imageUrl !== undefined;
  for (let i = 0; i < 4; i++) {
    if (i < question.answers.length) {
      this.answers[i] = question.answers[i];
    } else if (i >= this.answers.length) {
    this.answers.push('');
  }
  }
  this.targetAnswer = 0;
  this.amendingQuestion = this.quiz.indexOf(question);
  this.data.inputText(this.question);
}
confirmAmend() {
const amendedQuestion = this.verifyQuestion();
if (amendedQuestion !== undefined) {
  this.quiz.splice(this.amendingQuestion, 1, amendedQuestion);
  this.amendingQuestion = -1;
  this.resetVariables();
}
}
saveQuiz() {
  if (this.quizTitle !== '') {
    if (this.quiz !== undefined && this.quiz.length > 0) {
      if (this.cookie.check('quizTitle') && !confirm('Are you sure you want to overwrite previous quiz?')) {
        alert('Save aborted');
      } else {
        let questionTitles = '';
        let images = '';
        let answers = '';
        this.quiz.forEach(question => {
         questionTitles += question.question + '|';
         images += question.img + '|';
         question.answers.forEach(answer => {
           answers += answer + ',';
         });
         answers += '|';
        });
        this.cookie.set('quizTitle' , this.quizTitle);
        this.cookie.set('questionTitles', questionTitles);
        this.cookie.set('images', images);
        this.cookie.set('answers', answers);
        this.data.writeModalOn(true);
        this.modalRef = this.modalService.show(ModalComponent);
      }
    } else {
      alert('Please add more questions to your quiz!');
    }
  } else {
    alert('Please name your quiz!');
  }
}
}
