import { Component } from '@angular/core';
import { WorkoutComponent } from './components/workout/workout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkoutComponent],
  template: `<app-workout></app-workout>`,
})
export class AppComponent {}
