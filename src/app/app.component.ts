import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Quizzy-Wizzy';
  constructor(private cookie: CookieService, private router: Router) { }
  visitStamp = '';
  route: string;
  ngOnInit() {
    const date = new Date();
    const prevDate = this.cookie.get('lastVisit');
    if (prevDate !== '' && !isNaN(Number(prevDate))) {
      const daysPast = Math.floor((date.getTime() - Number(prevDate)) / 1000 / 60 / 60 / 24);
      if (daysPast > 0) {
      this.visitStamp = 'Welcome back! Your first visit was ' + daysPast.toString() + ' days ago.';
      } else {
        this.visitStamp = 'Have fun!';
      }
    } else {
      this.visitStamp = 'Welcome to our website!';
      this.cookie.set('lastVisit', date.getTime().toString());
    }
    this.router.events.subscribe((event) => {if (event instanceof NavigationStart) {
     this.route = event.url;
    }
  });
}
}
