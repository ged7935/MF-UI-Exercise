import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { User } from 'src/app/user/user.module';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  public page: string = "";
  public message: string;
  public user: User;

  constructor(private router: Router, private authService: AuthService) {
    authService.loggedInUser$.subscribe(user => this.user = user);
  }

  public newPost() {
    this.router.navigate(['post']);
  }

  public logIn() {
    this.router.navigate(['login']);
  }

  public logOut() {
    this.authService.logOut();
  }

  public home() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => e as NavigationEnd)
      )
      .subscribe(e => {

        let url = e.urlAfterRedirects.split('?')[0];
        switch(url) {
          case '/':
            this.page = "Home";
            break;
          case '/login':
            this.page = "LogIn";
            break;
          case '/post':
            this.page = "NewPost";
            break;
          default:
            this.page = "EditPost";
        }
      });
  }

}
