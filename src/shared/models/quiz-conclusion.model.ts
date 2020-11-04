export class QuizConclusion {
    public constructor(init?: Partial<QuizConclusion>) {
        Object.assign(this, init);
    }
    winText = '';
    winImg = '';
    loseText = '';
    loseImg = '';
    winRequirement = 66;

   public static castFromFirebase?(fbObj: any) {
        fbObj = this.validation(fbObj);
        return new QuizConclusion({
           winText: fbObj.win_text,
           winImg: fbObj.win_img,
           loseText: fbObj.lose_text,
           loseImg: fbObj.lose_img,
           winRequirement: fbObj.min_score, });
        }
       private static validation(input: any) {
           // tslint:disable-next-line: prefer-const
           input.win_text = input.win_text === undefined || input.win_text === '' ? 'Congratulations! You have passed' : input.win_text;
           input.lose_text = input.lose_text === undefined || input.lose_text === '' ? 'Better luck next time...' : input.lose_text;
           input.min_score = isNaN(Number(input.min_score)) ? 50 : Number(input.min_score);
           return input;
    }
}
