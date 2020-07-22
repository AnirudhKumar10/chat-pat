import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  url = '/api/messages';

  sendMessage(msg) {
    let headers = new HttpHeaders();
    headers = headers
      .append('content-type', 'application/json')
      .append('authorization', localStorage.getItem('usr_token'));
    return this.http.post(this.url + '/', msg, { headers: headers });
  }

  getMessages(id, sender) {
    let headers = new HttpHeaders();
    headers = headers
      .append('content-type', 'application/json')
      .append('authorization', localStorage.getItem('usr_token'));
    return this.http.post(this.url + '/' + id, sender, { headers: headers });
  }
}
