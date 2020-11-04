import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ShareButtonModule } from '@ngx-share/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Title } from '@angular/platform-browser';
import {NgPipesModule} from 'ngx-pipes';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { QuizComponent } from '../shared/quiz/quiz.component';
import { MainComponent } from './main/main.component';
import { YourQuizComponent } from './your-quiz/your-quiz.component';
import { CookieService } from 'ngx-cookie-service';
import { ModalComponent } from '../shared/modal/modal.component';
import { DataService } from '../shared/services/data.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { LebanonQuizComponent } from './lebanon-quiz/lebanon-quiz.component';
import { TextClickComponent } from './your-quiz/text-click/text-click.component';
import { ImageSelectComponent } from './your-quiz/image-select/image-select.component';
import { AboutComponent } from './about/about.component';
import { AngularFireModule } from '@angular/fire';
import {environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from '../shared/services/auth.service';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { MyQuizComponent } from './my-quiz/my-quiz.component';
import { QuizLoad } from 'src/shared/services/quiz-load.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: MainComponent},
  { path: 'example', component: LebanonQuizComponent},
  { path: 'build-quiz', component: YourQuizComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'quiz/:id', component: QuizComponent, canActivate: [AuthGuard]},
  { path: 'your-quiz/:id', component: MyQuizComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    MainComponent,
    YourQuizComponent,
    ModalComponent,
    LebanonQuizComponent,
    TextClickComponent,
    ImageSelectComponent,
    AboutComponent,
    MyQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    ShareButtonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    NgPipesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
  ],
  providers: [ CookieService, DataService, Title, NgPipesModule, AuthGuard, AngularFireAuth, AuthService, QuizLoad ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
