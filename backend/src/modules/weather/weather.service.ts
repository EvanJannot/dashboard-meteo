import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
  private readonly geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService, 
  ) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
  }

  async getCityCoordinates(cityName: string) {
    try {
      const response = await axios.get(this.geoUrl, {
        params: {
          q: cityName,
          appid: this.apiKey,
        },
      });

      if (response.data.length === 0) {
        throw new Error('Ville non trouvée');
      }

      const { lat, lon } = response.data[0];  // Prend les premières coordonnées si plusieurs résultats
      return { lat, lon };
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des coordonnées', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getWeatherHumidity(lat: number, lon: number) {
    try {
      const response = await axios.get(this.baseUrl+'/weather', {
        params: {
          lat,
          lon,
          appid: this.apiKey,
        },
      });

      const humidity = response.data.main.humidity;
      return humidity;
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération de l\'humidité', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getWeatherForecast(lat: number, lon: number) {
    try {
      const response = await axios.get(this.baseUrl+'/forecast', {
        params: {
          lat,
          lon,
          appid: this.apiKey,
        },
      });

      const forecastData = response.data.list.map((item: any) => ({
        timestamp: item.dt,
        temp: item.main.temp, 
      }));

      return forecastData;
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des prévisions météorologiques', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCurrentWeather(lat: number, lon: number) {
    try {
      const response = await axios.get(this.baseUrl+'/weather', {
        params: {
          lat,
          lon,
          appid: this.apiKey,
        },
      });

      const currentWeather = {
        temp: response.data.main.temp - 273.15,
        weather: response.data.weather[0].description,
        pressure: response.data.main.pressure,
        wind: response.data.wind.speed,
      };

      return currentWeather;
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des données météo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getWeatherByCity(city: string) {
    const { lat, lon } = await this.getCityCoordinates(city);
    const forecastData = await this.getWeatherForecast(lat, lon);

    const forecastDataInCelsius = forecastData.map((data: any) => ({
      timestamp: data.timestamp,
      temp: data.temp - 273.15,  
    }));

    return forecastDataInCelsius;
    }

  async getWeatherHumidityByCity(city: string) {
    const { lat, lon } = await this.getCityCoordinates(city);
    const humidity = await this.getWeatherHumidity(lat, lon);

    return humidity;
  }

  async getCurrentWeatherByCity(city: string) {
    const { lat, lon } = await this.getCityCoordinates(city);
    const currentWeather = await this.getCurrentWeather(lat, lon);

    return currentWeather;
  }
}
