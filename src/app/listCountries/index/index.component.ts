import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { LogCountries } from '../logCountries';
import { LogCountriesService } from '../logCountries.service';
 
@Component({
  selector: 'app-index',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  countries: LogCountries[] = [];
  dateCreateInit: Date = new Date();
  dateCreateFinal: Date = new Date();
  isFilter:boolean = false;
 
  constructor(public logCountriesService: LogCountriesService) { }
 
  ngOnInit(): void {
    this.fetchProjectList()
  }
 
  fetchProjectList(){
    this.logCountriesService.getAll().then(({data}) => {
      this.countries = data;
    }).catch(error => {return error})
  }
 
  handleDelete(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result =>{
      if (result.isConfirmed) {
 
        this.logCountriesService.delete(id)
        .then( response => {
          Swal.fire({
            icon: 'success',
            title: 'Log Countries deleted successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.fetchProjectList()
          return response
        }).catch(error => {
          Swal.fire({
            icon: 'error',
           title: 'An Error Occured!',
           showConfirmButton: false,
           timer: 1500
          })
          return error
        })
 
      }
    })  
  }

  handleFilterLogCountries() {
    
  }
 
}
