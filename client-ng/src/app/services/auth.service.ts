import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  url = '/api/users';

  login(user) {
    this.http.post(this.url + '/login', user).subscribe(
      <Response>(data) => {
        localStorage.setItem('usr_token', data.token);
        localStorage.setItem('usr_id', data._Id);
        localStorage.setItem('name', data.name);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        //this.alert.show()
      }
    );
  }

  register(user) {
    return this.http.post(this.url + '/register', user);
  }

  getallusers(id) {
    let headers = new HttpHeaders();
    headers = headers
      .append('content-type', 'application/json')
      .append('authorization', localStorage.getItem('usr_token'));
    return this.http.post(this.url + '/', id, { headers: headers });
  }

  getuserbyid(id) {
    let headers = new HttpHeaders();
    headers = headers
      .append('content-type', 'application/json')
      .append('authorization', localStorage.getItem('usr_token'));
    return this.http.post(this.url + '/id', id, { headers: headers });
  }

  isLoggedIn() {
    if (localStorage.getItem('usr_token')) return true;
    else return false;
  }

  logout() {
    localStorage.removeItem('usr_id');
    localStorage.removeItem('usr_token');
    this.router.navigate(['/']);
  }
}
