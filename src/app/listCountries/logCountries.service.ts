import { Injectable } from '@angular/core';
import axios from 'axios';
import { LogCountries } from './logCountries';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
 
@Injectable({
  providedIn: 'root'
})
 
export class LogCountriesService {

  fullUrl = environment.apiGraphQLUrl;

  constructor(private apollo: Apollo) { }

  getAll (): Observable<any>{
    return this.apollo
      .watchQuery({
        query: gql`
          query {
            logCountries {
              id
              username
              request_timestamp
              num_countries_returned
              countries_details
              created_date
            }
          }
        `,
        context: {
          uri: this.fullUrl,
        },
      })
      .valueChanges.pipe(map((result: any) => result.data.logCountries));
  }

  getById (id:number): Promise<any>{
    return axios.get('/logCountries/' + id)
  }

  delete (data:LogCountries): Promise<any>{
    return axios.post('/logCountriesDelete/', data);
  }
 
  update(data:LogCountries): Promise<any>{
    return axios.post('/logCountriesEdit/', data);
  }
 
 
}