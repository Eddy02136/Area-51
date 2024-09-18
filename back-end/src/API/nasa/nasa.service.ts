import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NasaService {
  constructor(private readonly httpService: HttpService) {}

  async getIssPosition(): Promise<any> {
    const url = 'http://api.open-notify.org/iss-now.json';

    const response = this.httpService.get(url);

    const result = await lastValueFrom(response);

    return result.data;
  }
}
