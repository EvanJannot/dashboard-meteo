import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService, 
  ) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
  }

  async getWeatherByCity(city: string) {
    const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;

    try {
      const response = await this.httpService.get(url).toPromise();
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch weather data: ${error.response?.statusText || error.message}`,
      );
    }
  }
}
