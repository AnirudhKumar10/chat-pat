import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  user = new User();
  pswrd2;

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/dashboard'])
    }
  }

  loginRoute() {
    this.router.navigate(['/login']);
  }

  submit() {
    console.log("REGISTER")
    this.auth.register(this.user).subscribe(<Response>(data) => {
      console.log(data);
      this.router.navigate(['/login']);
    });
  }
}
