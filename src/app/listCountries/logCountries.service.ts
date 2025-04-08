import { Injectable } from '@angular/core';
import axios from 'axios';
import { LogCountries } from './logCountries';
 
@Injectable({
  providedIn: 'root'
})
 
export class LogCountriesService {
 
  getAll (): Promise<any>{
    return axios.get('/api/projects')
  }
 
  delete (id:number): Promise<any>{
    return axios.delete('/api/projects/' + id)
  }
 
  show (id:number): Promise<any>{
    return axios.get('/api/projects/' + id)
  }
 
  update(data:LogCountries): Promise<any>{
    let logCountries = {
      username: data.username,
      request_timestamp: data.request_timestamp,
      num_countries_returned: data.num_countries_returned,
      countries_details: data.countries_details
    }
 
    return axios.patch('/api/projects/' + data.id, logCountries)
  }
 
}