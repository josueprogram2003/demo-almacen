// geolocalizacion.service.ts
import { Injectable } from '@angular/core';
import { GeolocationModel } from '../models/geolocation.model';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  data:GeolocationModel={};
  constructor() { }

  getGeolocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        try {
          navigator.geolocation.getCurrentPosition(resolve, reject,{timeout:1000});
        }catch(error){
          reject(error);
        }
      } else {
        reject('La geolocalización no es compatible con este navegador.');
      }
    });
  }
  getIpPublic(): Promise<any> {
    return fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => data)
      .catch(error => error);
  }
  getDataIp(ip: string): Promise<any> {
    return fetch(`https://ipapi.co/${ip}/json/`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => error);
  }
  public getLocation(): Promise<GeolocationModel> {
    return new Promise<GeolocationModel>(async (resolve, reject) => {
      try {
        // Intentamos obtener la geolocalización del navegador
        const position = await this.getGeolocation();
        // Si se obtiene la posición, se recuperan los datos de geolocalización basados en las coordenadas
        const data = await this.fetchGeolocationData(position.coords.latitude, position.coords.longitude);
        this.data = data;
        resolve(this.data);
      } catch (error) {
        console.error('Error obtaining geolocation:', error);
        // Si hay un error obteniendo la geolocalización, recuperamos datos basados en la IP
        const data = await this.fetchGeolocationData();
        this.data = data;
        resolve(this.data);
      }
    });
  }

  private async fetchGeolocationData(lat?: number, lon?: number): Promise<any> {
    const res = await this.getIpPublic();
    const ip = res.ip;
    const data = await this.getDataIp(ip);
    return {
      latitude: lat ?? data.latitude,
      longitude: lon ?? data.longitude,
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      timeZone: data.timezone,
      utc_offset: data.utc_offset,
      org: data.org
    };
  }
}
