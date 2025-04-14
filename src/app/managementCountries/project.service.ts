import { Injectable } from '@angular/core';
import axios from 'axios';
import { LogCountries } from './logCountries';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
 
export class ProjectService {
 
  getAll (): Promise<any>{
    return axios.get('/logCountries');
  }
  
  getById (id:number): Promise<any>{
    return axios.get('/logCountries/' + id);
  }

  create(logCountries: any): Promise<any>{
    return axios.post('/logCountries', logCountries);
  }

  
}