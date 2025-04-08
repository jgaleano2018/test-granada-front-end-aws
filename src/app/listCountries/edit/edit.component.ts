
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { LogCountries } from '../logCountries';
import { LogCountriesService } from '../logCountries.service';
 
@Component({
  selector: 'app-edit',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  logCountries:LogCountries
  isSaving:boolean = false
 
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
 
  handleSave(){
    this.isSaving = true
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
}