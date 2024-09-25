import { Component } from '@angular/core';
import axios from 'axios';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  weather: any = null;
  loading: boolean = false;

  constructor() {}

  async fetchWeather() {
    this.loading = true;
    try {
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: 48.8566,
          longitude: 2.3522,
          current_weather: true,
        },
      });
      this.weather = response.data.current_weather;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      this.loading = false;
    }
  }
}