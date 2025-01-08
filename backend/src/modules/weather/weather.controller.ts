import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('forecast')
  async getWeather(@Query('city') city: string) {
    if (!city) {
      throw new Error('City name required');
    }
    try {
      const forecastData = await this.weatherService.getWeatherByCity(city);
      return {
        city,
        forecast: forecastData,
      };
    } catch (error) {
      throw new Error('Error retrieving weather data');
    }
  }

  @Get('humidity')
  async getWeatherHumidity(@Query('city') city: string) {
    if (!city) {
      throw new Error('City name required');
    }
    try {
      const humidity = await this.weatherService.getWeatherHumidityByCity(city);
      return {
        city,
        humidity,
      };
    } catch (error) {
      throw new Error('Error retrieving weather data');
    }
  }

  @Get('current')
  async getCurrentWeather(@Query('city') city: string) {
    if (!city) {
      throw new Error('City name required');
    }
    try {
      const currentWeather = await this.weatherService.getCurrentWeatherByCity(city);
      return {
        city,
        currentWeather,
      };
    } catch (error) {
      throw new Error('Error retrieving weather data');
    }
  }
}