import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { QuizConclusion } from '../models/quiz-conclusion.model';
import { Quiz } from '../models/quiz.model';

@Injectable()

export class DataService {
placeholderQuiz: Quiz = new Quiz('', []);
placeholderConclusion: QuizConclusion = new QuizConclusion(undefined);

private result = new BehaviorSubject<number[]>([]);
endResult = this.result.asObservable();
private quiz = new BehaviorSubject<Quiz>(this.placeholderQuiz);
displayQuiz = this.quiz.asObservable();
private modalDetails = new BehaviorSubject<QuizConclusion>(this.placeholderConclusion);
observableModal = this.modalDetails.asObservable();
private createModal = new BehaviorSubject<boolean>(false);
modalcreation = this.createModal.asObservable();
private textInput = new BehaviorSubject<string>('');
inputBinding = this.textInput.asObservable();
private displayModal = new BehaviorSubject<boolean>(true);
modalDisplay = this.displayModal.asObservable();
private imgUrl = new BehaviorSubject<string>('');
newImgUrl = this.imgUrl.asObservable();

clearImgUrl(newUrl: string) {
this.imgUrl.next(newUrl);
}
turnModalOn(key: boolean) {
    this.displayModal.next(key);
}
 inputScore(newPoints: number, newMax: number) {
     this.result.next([newPoints, newMax]);
 }
 assignQuiz(newQuiz: Quiz) {
this.quiz.next(newQuiz);
 }
 assignModal(newModal: QuizConclusion) {
     this.modalDetails.next(newModal);
 }
 writeModalOn(valid: boolean) {
this.createModal.next(valid);
 }
 inputText(value: string) {
    this.textInput.next(value);
 }
}
