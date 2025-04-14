
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { Project } from '../project';
import { LogCountries  } from '../logCountries';
import { ProjectService } from '../project.service';
import { LogCountriesService } from '../../listCountries/logCountries.service';
 
@Component({
  selector: 'app-edit',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  logCountries:LogCountries
  isSaving:boolean = false
  logCountriesData: any = [];
 
  constructor(public projectService: ProjectService, public logCountriesService: LogCountriesService, private route: ActivatedRoute) {

    this.logCountries = {
      id: this.route.snapshot.params['id'], 
      username: this.route.snapshot.params['username'],
      request_timestamp: this.route.snapshot.params['request_timestamp'],
      num_countries_returned: this.route.snapshot.params['num_countries_returned'],
      countries_details: this.route.snapshot.params['countries_details'], 
      created_date: new Date()
    }

    console.log(this.logCountries)
  }
 
  ngOnInit(): void { 
  }
 
  handleSave(){

    console.log("Data consulting...")
    console.log(this.logCountries)

    if (this.logCountries.username != null && this.logCountries.username != "" && this.logCountries.username != undefined 
      && this.logCountries.request_timestamp != null && this.logCountries.request_timestamp != "" && this.logCountries.request_timestamp != undefined 
      && this.logCountries.num_countries_returned != null && !isNaN(this.logCountries.num_countries_returned)
      && this.logCountries.countries_details != null && this.logCountries.countries_details != "" && this.logCountries.countries_details != undefined 
    ) {


      this.logCountriesService.update(this.logCountries)
      .then(({data}) => {
        this.isSaving = false
        Swal.fire({
          icon: 'success',
          title: 'Log Countries saved successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        return data
  
      }).catch(error => {
        this.isSaving = false
        Swal.fire({
          icon: 'error',
          title: 'An Error Occured!',
          showConfirmButton: false,
          timer: 1500
        })
        return error
      })

    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'There are fields to be filled out',
        showConfirmButton: false,
        timer: 1500
      })
      return false
    }
    return true
  }
}