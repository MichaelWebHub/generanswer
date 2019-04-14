import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  messagePreloader = false;
  message = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.router.navigate(['login']);
  }

  onSignUp(form): void {
    this.messagePreloader = true;
  }
}
