import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  todoList = [];
  constructor(private http:HttpClient) { this.load();}

  load(){
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = 'http://localhost:8088/api/getTasks';
      const myHeaders: HttpHeaders = new HttpHeaders()
      .append('Authorization','Bearer'+tokenJson.access_token);
    
      this.http.post(myUrl, 
        {withCredential:true},
        {
          headers:myHeaders,
        }).subscribe((res)=>{
          console.log(res);
          for(let i=0;;i++){
            if(res[i]==null) break;
            this.todoList.unshift(res[i].task);
          }

        });
    }  
  }

  addItem(task:string,token:string){
    this.todoList.unshift(task);

    const myUrl = 'http://localhost:8088/api/insertTask';
    const myParams: HttpParams = new HttpParams()
      .append('task',task);
    const myHeaders: HttpHeaders = new HttpHeaders()
      .append('Authorization','Bearer'+token);
    
    this.http.post(myUrl, 
      {withCredential:true},
      {
        headers:myHeaders,
        params:myParams,
      }).subscribe((res)=>{
        console.log(res);
      });
  }
}
