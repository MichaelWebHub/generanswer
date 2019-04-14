import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messagePreloader = false;
  message = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.router.navigate(['signup']);
  }

  onLogin(form): void {
    this.messagePreloader = true;
  }
}
