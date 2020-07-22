import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth
      .getallusers({ userid: localStorage.getItem('usr_id') })
      .subscribe(<Response>(data) => {
        this.users = data.users;
      });
  }

  users: User[];

  chatBox(id) {
    this.router.navigate(['/chat/' + id]);
  }

  logout() {
    this.auth.logout();
  }
}
