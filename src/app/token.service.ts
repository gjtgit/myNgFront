import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserData } from './userData';
import { tokenData } from './tokenData';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
    constructor(private _http:HttpClient){}

    getToken(userData:UserData){
        // const getTokenUrl = 'http://localhost:8088/oauth/token';      
        const getTokenUrl = 'http://localhost:8088/oauth/token?grant_type=password&username='+userData.username+'&password='+userData.password;
        const getTokenParams: HttpParams = new HttpParams()
            .append('grant_type','password')
            .append('username',userData.username)
            .append('password',userData.password);

        const getTokenHeaders: HttpHeaders = new HttpHeaders()
            .append('Authorization','Basic'+btoa('client:secret'));
    
        return this._http.post<tokenData>(getTokenUrl, 
            {
                headers:getTokenHeaders,
                // params:getTokenParams,
            },
            {withCredentials:true}
        );

    }


}