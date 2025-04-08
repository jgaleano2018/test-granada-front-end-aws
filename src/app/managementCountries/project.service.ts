import { Injectable } from '@angular/core';
import axios from 'axios';
import { Project } from './project';
 
@Injectable({
  providedIn: 'root'
})
 
export class ProjectService {
 
  getAll (): Promise<any>{
    return axios.get('/api/projects')
  }
 
  delete (id:number): Promise<any>{
    return axios.delete('/api/projects/' + id)
  }
 
  create(data:any): Promise<any>{
    let userData = {
      name: data.userName,
      description: data.numberCountriesReturned
    }
 
    return axios.post('/api/projects', userData)
  }
 
  show (id:number): Promise<any>{
    return axios.get('/api/projects/' + id)
  }
 
  update(data:Project): Promise<any>{
    let userData = {
      name: data.userName,
      description: data.numberCountriesReturned
    }
 
    return axios.patch('/api/projects/' + data.id, userData)
  }
 
}