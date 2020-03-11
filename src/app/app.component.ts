import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tokenData } from './tokenData';
import { UserData } from './userData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _http:HttpClient) {}
  title = 'myFirstNgFront';
  tokenInfo = 'no token';
  userData:UserData = new UserData();
  getToken(){
    const getTokenUrl = 'http://localhost:8088/oauth/token';
    const getTokenParams: HttpParams = new HttpParams()
            .append('grant_type','password')
            .append('username',this.userData.username)
            .append('password',this.userData.password);
    const getTokenHeaders: HttpHeaders = new HttpHeaders()
            .append('Authorization','Basic'+btoa('client:secret'));
    this._http.post<tokenData>(getTokenUrl,
      {withCredentials:true},
      {
        headers:getTokenHeaders,
        params:getTokenParams
      }
    ).subscribe(res =>{
      console.log(res);
    this.tokenInfo = res['access_token'];
      this.getUsernameOfToken(res);
    } );
   
    // this._http.post("http://localhost:8088/oauth/token?grant_type=password&username=gjt&password=123",
    //   {headers:new HttpHeaders({'Authorization':'Basic' + btoa('client:secret')})},
    //   {withCredentials:true}
    // ).subscribe(res =>{
    //   console.log(res);
    //   this.tokenInfo = res['access_token'];
    //   this.getUsernameOfToken(res);
    // } );

  }

  getUsernameOfToken(tokenInfo){
    this._http.post("http://localhost:8088/api/getUsername",
      {withCredentials: true},
      {headers:new HttpHeaders({'Authorization':'Bearer' + tokenInfo['access_token']})}
    ).subscribe(result =>{
       console.log(result);
    } );

  }

}
