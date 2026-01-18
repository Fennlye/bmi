import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  weight = signal<number | null>(null);
  height = signal<number | null>(null);
  bmi = signal<number | null>(null);
  category = signal<string>('');

  calculateBMI() {
    const w = this.weight();
    const h = this.height();

    if (w === null || h === null || w <= 0 || h <= 0) {
      this.bmi.set(null);
      this.category.set('');
      return;
    }

    const heightInMeters = h / 100;
    const calculatedBMI = w / (heightInMeters * heightInMeters);
    this.bmi.set(Math.round(calculatedBMI * 10) / 10);

    if (calculatedBMI < 18.5) {
      this.category.set('Underweight');
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
      this.category.set('Normal weight');
    } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
      this.category.set('Overweight');
    } else {
      this.category.set('Obese');
    }
  }

  reset() {
    this.weight.set(null);
    this.height.set(null);
    this.bmi.set(null);
    this.category.set('');
  }
}
