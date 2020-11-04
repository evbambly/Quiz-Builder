import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Params, UrlSegment, RouteReuseStrategy } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizLoad } from './quiz-load.service';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private router: Router, private quizLoad: QuizLoad, private auth: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let canActivateRoute = false;
      switch (route.url[0].path) {
            case 'build-quiz':
                if (this.auth.isLoggedIn()) {
                    canActivateRoute = true;
                } else {
                    this.router.navigateByUrl('/home');
                    alert('Please log in to create your own quiz');
                }
                break;
            case 'quiz':
            canActivateRoute = this.checkQuiz(route.params, false);
            break;
            case 'your-quiz':
            canActivateRoute = this.checkQuiz(route.params, true);
            break;
        }
      console.log(route.url[0].path + ' , ' + canActivateRoute)
      return canActivateRoute;
    }
    private checkQuiz(routeParams, yourQuiz) {
        if (routeParams.hasOwnProperty('id')) {
            const quizMeta = this.quizLoad.yourQuiz;
            if (this.quizLoad.canLoad(routeParams.id)) {
               if (this.isMyQuiz(quizMeta, this.quizLoad.yourQuiz)) {
                   if (yourQuiz) {
                    return true;
                   } else {
                this.router.navigateByUrl('/your-quiz/' + routeParams.id);
               }} else {
                   if (!yourQuiz) {
                   return true;
                   }
               }
           }
        }
        return false;
    }
    private isMyQuiz(prevMeta, currentMeta) {
       return prevMeta !== currentMeta;
    }
}
