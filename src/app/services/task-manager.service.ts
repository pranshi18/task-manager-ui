import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  apiUrl = "http://ec2-13-232-183-111.ap-south-1.compute.amazonaws.com:8080";

  constructor(private http : HttpClient) { }

  getAllTasks() : Observable<any> {

    const token = localStorage.getItem('authToken');

    // Set the Authorization header if the token is available
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    
    const getAllTasksurl = this.apiUrl + "/getTaskList";
    var taskList = this.http.get(getAllTasksurl, {headers})
    return taskList;
  }

  addTask(taskData : any) : Observable<any>{
    var addTaskURL = this.apiUrl + "/addTask"
    return this.http.post(addTaskURL, taskData);
  }

  updateTask(task : any): Observable<any>{
    var updateTaskURL = this.apiUrl + "/updateTask"
    return this.http.put(updateTaskURL, task);
  }
}
