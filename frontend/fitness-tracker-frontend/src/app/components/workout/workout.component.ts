import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class WorkoutComponent implements OnInit {
  workouts: Workout[] = [];
  editMode = false;
  editingWorkout: Workout | null = null;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    this.workoutService.getWorkouts().subscribe({
      next: (data) => this.workouts = data,
      error: (err) => console.error(err)
    });
  }

  deleteWorkout(id: number): void {
    this.workoutService.deleteWorkout(id).subscribe({
      next: () => this.loadWorkouts(),
      error: (err) => console.error(err)
    });
  }

  newWorkout: Workout = {
    id: 0,
    date: '',
    type: '',
    duration: 0,
    caloriesBurned: 0
  };

  addWorkout(): void {
    this.workoutService.addWorkout(this.newWorkout).subscribe({
      next: () => {
        this.loadWorkouts();
        this.newWorkout = { id: 0, date: '', type: '', duration: 0, caloriesBurned: 0 };
      },
      error: (err) => console.error(err)
    });
  }

  editWorkout(workout: Workout): void {
    this.editMode = true;
    this.editingWorkout = { ...workout };
  }
  
  updateWorkout(): void {
    if (this.editingWorkout) {
      this.workoutService.updateWorkout(this.editingWorkout.id, this.editingWorkout).subscribe({
        next: () => {
          this.loadWorkouts();
          this.editMode = false;
          this.editingWorkout = null;
        },
        error: (err) => console.error(err)
      });
    }
  }
  
  cancelEdit(): void {
    this.editMode = false;
    this.editingWorkout = null;
  }
  
}
