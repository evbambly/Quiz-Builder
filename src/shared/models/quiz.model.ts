import { Question } from './question.model';
import { QuizConclusion } from './quiz-conclusion.model';

export class Quiz {
    constructor(public title: string, public questions: Question[], public conclusion?: QuizConclusion) {}
    description ? = '';
    author ? = '';
}
