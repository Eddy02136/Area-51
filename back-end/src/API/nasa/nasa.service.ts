import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {lastValueFrom} from 'rxjs';
import {haversine} from "../../utils/haversine";
import axios from "axios";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class NasaService {
  constructor(
      private readonly httpService: HttpService,
      private readonly configService: ConfigService
  ) {}

  private readonly CITY_COORDINATES: { [key: string]: { latitude: number; longitude: number } } = {
    'New-York': { latitude: 40.712784, longitude: -74.005941 },
    'Paris': { latitude: 48.856613, longitude: 2.352222 },
    'London': { latitude: 51.507351, longitude: -0.127758 },
    'Tokyo': { latitude: 35.682839, longitude: 139.759455 },
    'Toulouse': {latitude: 43.6045, longitude: 1.4442}
  };

  async getIssPosition(): Promise<any> {
    const url = 'http://api.open-notify.org/iss-now.json';

    const response = this.httpService.get(url);

    const result = await lastValueFrom(response);

    return result.data;
  }

  async getIssPosAction(ar: any) : Promise<boolean> {
    console.log("Got position Iss");
    const issPos = await this.getIssPosition();
    const {city} = ar.parameters;
    const {latitude, longitude} = this.CITY_COORDINATES[city];
    const distance = haversine(latitude, longitude, issPos.iss_position.latitude,  issPos.iss_position.longitude);
    if (distance <= 2000) {
      return true;
    }
    return false;
  }

  async getImageOfTheDay()
  {
    const nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=" + this.configService.get<string>('API_KEY_NASA');;

    const response = await axios.get(nasaUrl)

    return response.data.url;
  }
}
