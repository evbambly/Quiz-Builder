import { Component, OnInit } from '@angular/core';
import { Question } from '../../shared/models/question.model';
import { DataService } from '../../shared/services/data.service';
import { Title } from '@angular/platform-browser';
import { QuizConclusion } from 'src/shared/models/quiz-conclusion.model';
import { Quiz } from 'src/shared/models/quiz.model';

@Component({
  selector: 'app-lebanon-quiz',
  templateUrl: './lebanon-quiz.component.html',
  styleUrls: ['./lebanon-quiz.component.css']
})
export class LebanonQuizComponent implements OnInit {

  constructor(private data: DataService, private title: Title) { }
questions: Question[] = [ { img: 'assets/Quiz/Q1.jpg',
question:  'What year did the war begin in?',
   answers: ['1982', '1977', '1980', '1993'],
}, { img: 'assets/Quiz/Q2.jpg',
question: 'What is pictured here?',
answers: ['Beaufort castle', 'Quneitra', 'Tyre city', 'Sultan Yacoub'], },
{ img: 'assets/Quiz/Q3.jpg', question:
'Where did amphibious landings take place?',
answers: ['Sidon', 'Tyre', 'Latakia', 'Beirut'], },
{ img: 'assets/Quiz/Q4.jpg',
question: 'Who was the favored Israeli candidate for Lebanon\'s president?',
  answers: ['Bashir Gemayel', 'Walid Jumblatt', 'Michel Aoun', 'No One']},
  { img: 'assets/Quiz/Q5.gif',
  question: 'Which was the primary enemy organiztion?',
  answers: ['The PLO', 'Amal', 'South Lebanon Army', 'Hezbollah']},
  { img: 'assets/Quiz/Q6.jpg',
  question: 'Who was defence minister at the time of the war?',
  answers: ['Ariel Sharon', 'Moshe Arens', 'Yitzhak Rabin', 'Rafael Eitan']},
  { img: 'assets/Quiz/Q7.jpg',
  question: 'Who were Israel\'s primary allies during the war?',
  answers: ['South Lebanon Army', 'The Druze Legions', 'UNIFIL', 'Amal']},
  { img: 'assets/Quiz/Q8.jpg',
  question: 'What were Israel\'s stated goals at the beginning of the war?',
  answers: ['Securing southern Lebanon', 'Control of the major cities',
  'Installing a sympathetic regime', 'Destroying terrorist facilities']},
  { img: 'assets/Quiz/Q9.jpg',
  question: 'What was one of the main points of criticism of the war?',
  answers: ['A war of choice', 'A war of terror', 'A war of conquest', 'A war of destruction']},
  { img: 'assets/Quiz/Q10.jpg',
  question: 'What was the final public opinion turning point?',
  answers: ['Sabra & Shatila massacre', 'Expulsion of the PLO', 'Bombing of Beirut hospital', 'A gradual attrition']},
];
winText = 'Congratulations, You\'re Waltzing with this subject!';
winImg = 'assets/Quiz/Rpassed.gif';
loseText = 'You can use some light on the subject';
loseImg = 'assets/Quiz/Rfailed.gif';
passRatio = '60';
quiz: Quiz = { questions: this.questions, title: 'The First Lebanon War', description: 'An example quiz to demonstrate my app'};
modalInfo: QuizConclusion = { winText: this.winText, winImg: this.winImg,
  loseText: this.loseText, loseImg: this.loseImg, winRequirement: +this.passRatio};

ngOnInit() {
  this.title.setTitle('QuizMachine - Example Quiz');
  this.data.assignQuiz(this.quiz);
  this.data.assignModal(this.modalInfo);
  }
}
