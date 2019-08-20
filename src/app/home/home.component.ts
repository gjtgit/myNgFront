import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { 
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if( token!=null){
      console.log('token is not null');
      console.log(tokenJson.expires_in +'   '+new Date().getTime());
    }
    if(token === null || tokenJson.expires_in < new Date().getTime()){
      router.navigateByUrl("/login");
    }

  }

  ngOnInit() {
  }

}
