import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskManagerService } from '../../services/task-manager.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  constructor(
    private matDialogRef : MatDialogRef<AddTaskComponent>,
    private matSnackBar : MatSnackBar,
    private taskManagerService : TaskManagerService
  ){}

  categories = ["CAtA", "CatB"]
  taskListData : any;

  taskForm = new FormGroup({
    title : new FormControl('', Validators.required),
    description : new FormControl(''),
    taskDate : new FormControl(''),
    category : new FormControl(''),
    completed : new FormControl(false)
  })

  onAdd(){

    const taskData = {
      'title' : this.taskForm.get('title')?.value,
      'taskDate' : this.taskForm.get('taskDate')?.value,
      'category' : this.taskForm.get('category')?.value,
      'completed' : false,
      'description' : this.taskForm.get('description')?.value
    } 

     this.taskManagerService.addTask(taskData).subscribe({
      next: (response) => {
        console.log(response);
        this.taskListData = response; 
      
        this.matSnackBar.open("Task Added", "Close", {
          duration: 3000, // Duration in milliseconds (3 seconds)
          panelClass: ['success-snackbar'], // Custom CSS class
          verticalPosition: 'bottom', // 'top' or 'bottom' (default is 'bottom')
          horizontalPosition: 'center' 
        })
        this.matDialogRef.close(true);
        // Process the response and assign to tasks array
      },
      error: (error) => {
        console.error('Error fetching task list:', error);
      },
      complete: () => {
        console.log('Task list fetch completed');
      }
    });
    console.log(this.taskForm);
  }

  closeDialog(){
    this.matDialogRef.close();
  }
}
