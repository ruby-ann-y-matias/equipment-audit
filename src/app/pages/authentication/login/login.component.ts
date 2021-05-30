import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public auth: AuthService,
  ) { }

  handleSignUp() {
    const { email, password, rememberLogin } = this.getCredentials();
    this.auth.signUp(email, password, rememberLogin);
  }

  handleSignIn() {
    const { email, password, rememberLogin } = this.getCredentials();
    this.auth.signIn(email, password, rememberLogin);
  }

  private getCredentials() {
    const emailInput = document.querySelector('#username') as HTMLInputElement;
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    const rememberLoginInput = document.querySelector('#rememberLogin') as HTMLInputElement;


    const email = emailInput.value;
    const password = passwordInput.value;
    const rememberLogin = rememberLoginInput.checked;

    return {
      email, password, rememberLogin
    };
  }

  ngOnInit(): void {
  }

}
