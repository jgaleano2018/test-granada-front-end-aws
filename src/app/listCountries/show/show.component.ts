import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LogCountries } from '../logCountries';
import { LogCountriesService } from '../logCountries.service';

@Component({
  selector: 'app-show',
  imports: [CommonModule, RouterModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent implements OnInit{
  logCountries:LogCountries
 
  constructor(public logCountriesService: LogCountriesService, private route: ActivatedRoute) {
    this.logCountries = {
      id:this.route.snapshot.params['id'],
      username: '',
      request_timestamp: '',
      num_countries_returned: 0,
      countries_details: '',
      creation_date: new Date()
    }
  }
 
  ngOnInit(): void {
    this.logCountriesService.show(this.route.snapshot.params['id']).then(({data}) => {
      this.logCountries = data
    }).catch(error => {return error})
     
  }
}