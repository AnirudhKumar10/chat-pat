import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  userid;
  password;

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/dashboard'])
    }
  }

  registerRoute() {
    this.router.navigate(['/register']);
  }

  submit() {
    console.log("LOGIN")
    this.auth.login({ userid: this.userid, password: this.password });
  }
}
