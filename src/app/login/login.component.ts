import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserData } from '../userData';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private tokenService:TokenService) { }
  userData:UserData = new UserData();
  error=false;
  expires_in:number;

  ngOnInit() {
  }

  login(){
    if(this.userData.username.length>0 && this.userData.password.length>0 ){
      this.tokenService.getToken(this.userData).subscribe(result=>{
      result.expires_in = new Date().getTime() + result.expires_in*1000;
      this.expires_in = new Date().getTime() + 3000;
      sessionStorage.setItem("jsessionid", JSON.stringify(result));
      this.router.navigateByUrl('/home');
    }, error => this.error = true);
    }
  }

}
