import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  constructor(private todo:ToDoService) { }
  
  item: string;

  ngOnInit() {
  }

  add(){
    this.todo.addItem(this.item,JSON.parse(sessionStorage.getItem('jsessionid')).access_token);
    console.log(this.item);
    this.item='';
  }

}
