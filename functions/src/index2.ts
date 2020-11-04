import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import { Quiz } from '../../src/shared/models/quiz.model';
import { QuizConclusion } from '../../src/shared/models/quiz-conclusion.model';
import { QuizMetaData } from '../../src/shared/models/quiz-meta-data.model';
import { Observable } from '../../node_modules/rxjs';
firebase.initializeApp();

 export const createQuiz = functions.https.onCall((data, context) => {  
     const quiz: Quiz = data.quiz;
     const quizConclusion: QuizConclusion = data.quizConclusion;
     const promise = new Promise((resolve, reject) => {
     if (context && context.auth && context.auth.uid && quiz && quizConclusion)
       {
  const uid = context.auth.uid;

      firebase.auth().getUser(context.auth.uid).then(user => { 
      firebase.firestore().collection("quizzes").add({
      title : quiz.title,
      description: quiz.description,
      author: uid,
      highscores: [],
      questions: quiz.questions,
      conclusion: quizConclusion,
      live: false,
      created_date : new Date().getTime(),
    }).catch((err : Error) => { return { "error" : err.message}});
}).catch();
resolve(true);
} else {
    resolve(false)
 }
});

return promise.then((response) => 
{return {response : response}
}).catch()
});


export const getQuizFromHash = functions.https.onCall((data, context) => {
    let quizRef: Observable<Quiz> = new Observable<Quiz>();
    let metaRef: QuizMetaData = {};
    let exists = false;
    const docRef = firebase.firestore().doc('quizzes/' + data.hash);
        docRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            exists = true;
        docRef.onSnapshot((doc) => {
            if (doc.data()!.author && doc.data()!.author === context.auth!.uid) {
               metaRef = loadQuiz.loadYourQuiz(data.hash);
            }
            quizRef = loadQuiz.loadQuizDetails(data.hash);
        });
        }
        }).catch();
        return { meta: metaRef, quiz: quizRef, legal: exists }
});

export const getQuizFromCode = functions.https.onCall((data, context) => {
    let quizRef: Observable<Quiz> = new Observable<Quiz>();
    let metaRef: QuizMetaData = {};
    let exists = false;
    if (context && context.auth && context.auth.uid) {
    const docref = firebase.firestore().collection('live_quizzes').where('code', '==', data.code);
       docref.get().then(snap => { 
          if(snap.size === 1){
              exists = true;
           const docID = snap.docs[0].id;
           firebase.firestore().doc('quizzes/' + docID).get().then(quiz => {
               if (quiz.data()!.author === context.auth!.uid) {
                  metaRef = loadQuiz.loadYourQuiz(docID);
               }
              quizRef = loadQuiz.loadQuizDetails(docID);
           }).catch()
          }}).catch()
        }
          return { meta: metaRef, quiz: quizRef, legal: exists }
})
class loadQuiz {
static loadYourQuiz(docID: string) : QuizMetaData {
     let meta: QuizMetaData = {};
        firebase.firestore().doc('highscores/' + docID).get().then(quizMeta => {
         meta = quizMeta.data() as QuizMetaData;
        }).catch();
        return meta;
}
static loadQuizDetails(docID: string) : Observable<Quiz> {
    let quiz: Observable<Quiz> = new Observable<Quiz>();
       firebase.firestore().doc('quizzes/' + docID).get().then(doc => {
        quiz = doc.data() as Observable<Quiz>;
       }).catch();
       return quiz;
}
}


// tslint:disable-next-line: no-empty
export const runQuiz = functions.https.onCall((data, context) => {

})