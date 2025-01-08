import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('city') city: string) {
    if (!city) {
      throw new Error('Le nom de la ville est requis');
    }
    try {
      const forecastData = await this.weatherService.getWeatherByCity(city);
      return {
        city,
        forecast: forecastData,
      };
    } catch (error) {
      throw new Error('Erreur lors de la récupération des données météo');
    }
  }
}