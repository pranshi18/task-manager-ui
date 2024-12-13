import { Component } from '@angular/core';
import { TaskManagerService } from '../../services/task-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  constructor(private taskManagerService : TaskManagerService, private matDialog : MatDialog, private router : Router){}
  taskListData : any;
  categories : any;
  allTasks : any;
  pendingTasks : any = [];
  completedTasks : any = [];
  selectedCategory : any;
  dueDate:any;
  

  ngOnInit(){

    this.getTaskList();
   
  }

  getTaskList(){
    this.taskManagerService.getAllTasks().subscribe(res => {
      this.taskListData = res;
      this.categories = this.taskListData.categories;
      this.allTasks = this.taskListData.task_list;
      this.completedTasks =[];
      this.pendingTasks = [];
      this.allTasks.forEach((task:any) => {
          if(task.completed)
            this.completedTasks.push(task);
          else
            this.pendingTasks.push(task);
      });

      console.log('data',this.taskListData);
      console.log('data',this.completedTasks);
      console.log('data',this.pendingTasks);
    },
    (err) => {
      console.log(err);
    })
  }

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigateByUrl("/login");

  }
  addTask(){


    const dialogRef = this.matDialog.open(AddTaskComponent, {
      width : '400px',
      height : '400px'
    })

    dialogRef.afterClosed().subscribe(result => {
        if(result)
          this.getTaskList();
    })
    // this.taskManagerService.addTask('dd').subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.taskListData = response; // Process the response and assign to tasks array
    //   },
    //   error: (error) => {
    //     console.error('Error fetching task list:', error);
    //   },
    //   complete: () => {
    //     console.log('Task list fetch completed');
    //   }
    // });
    
  }

  completeTask(task:any){
    this.allTasks.forEach((tempTask:any) => {
      if(tempTask.id==task.id){
        task.completed = !task.completed;
      }
    })

    this.taskManagerService.updateTask(task).subscribe(res => {
      this.getTaskList();
      console.log(res)
    },
    (err)=> {
      console.log(err);
    })
    console.log(this.allTasks)
  }
  

}

