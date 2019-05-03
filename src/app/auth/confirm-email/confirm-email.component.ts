import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _http: HttpClient) { }

  ngOnInit() {

    this._http.get(`/confirm-email/${this._route.snapshot.params.token}`).subscribe(() => {
      this._router.navigate(['dashboard']);
    });

  }

}
