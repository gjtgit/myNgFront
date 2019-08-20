import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myDemo';
  constructor(private _http:HttpClient) {}

  getToken(){
    this._http.post("http://localhost:8088/oauth/token?grant_type=password&username=gjt&password=123",
      {headers:new HttpHeaders({'Authorization':'Basic' + btoa('client:secret')})},
      {withCredentials:true}
    ).subscribe(res =>{
      console.log(res);
      this.getUsernameOfToken(res);
    } );

  }

  getUsernameOfToken(tokenInfo){
    this._http.post("http://localhost:8088/api/getUsername",
      {withCredentials: true},
      {headers:new HttpHeaders({'Authorization':'Bearer' + tokenInfo['access_token']})}
    ).subscribe(result =>{
      // console.log(result);
    } );

  }

}
