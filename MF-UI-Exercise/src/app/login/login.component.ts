import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from  '@angular/forms';
import { AuthService } from '../core/core.module';

//if already logged in, kick them back home? or allow them to sign in as somebody else?
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isInvalidUsername: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { 
    this.createLoginForm();
  }

  ngOnInit(): void {    
    this.loginForm.valueChanges.subscribe(() => this.isInvalidUsername = false);
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
    })
  }

  public logIn() {
    this.authService.logIn(this.loginForm.get("username").value)
      .subscribe(isSuccess => isSuccess ? this.router.navigate(['']) : this.isInvalidUsername = true);
  }
}
