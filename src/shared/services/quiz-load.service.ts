import {Injectable} from '@angular/core';
import { Quiz } from '../models/quiz.model';
import {AngularFireAuth} from '@angular/fire/auth';
import { DataService } from './data.service';
import { QuizMetaData } from '../models/quiz-meta-data.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Injectable({
    providedIn: 'root'
})

export class QuizLoad {

    constructor(private afAuth: AngularFireAuth, private data: DataService, private afs: AngularFirestore) {}
    loadedQuiz: Observable<Quiz>;
    liveStart: Date;
    yourQuiz: QuizMetaData;

    async canLoad(quizID: string) {
        let quizIsLegal = false;
        if (quizID.length === 4 && !isNaN(+quizID)) {
           const fromCode = firebase.functions().httpsCallable('getQuizFromCode');
           fromCode({hash: quizID}).then(result => {
              this.yourQuiz = result.data.meta;
              this.loadedQuiz = result.data.quiz;
              quizIsLegal = result.data.legal;
           }).catch((err: Error) => alert(err.message));
         } else {
            const fromHash = firebase.functions().httpsCallable('getQuizFromHash');
            fromHash({hash: quizID}).then(result => {
               this.yourQuiz = result.data.meta;
               this.loadedQuiz = result.data.quiz;
               quizIsLegal = result.data.legal;
            }).catch((err: Error) => alert(err.message));
         }
        return quizIsLegal;
    }
    private loadQuiz(quizID: string, live: boolean) {
        this.afs.doc('quizzes/' + quizID).get().forEach(quiz => {
            this.data.assignQuiz(quiz.data() as Quiz);
        });
        if (live) {
        this.afs.doc('live_quizzes/' + quizID).get().forEach(quiz => {
            this.liveStart = quiz.data().started;
         }); }
    }
}
