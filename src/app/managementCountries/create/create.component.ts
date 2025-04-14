import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../project.service';
import { LogCountries } from '../../listCountries/logCountries';
import { LogCountriesService } from '../../listCountries/logCountries.service';
import Swal from 'sweetalert2'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'

 
@Component({
  selector: 'app-create',
  imports: [CommonModule, RouterModule, FormsModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatCardModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  userName:string = ''
  numberCountriesReturned:number = 0
  logCountries: LogCountries[] = [];
  isSaving:boolean = false;
  displayedColumns: string[] = ["username", "request_timestamp", "num_countries_returned", "countries_details"];
  dataSource = [];
  
  totalItems: number = 0;
  pageSize: number = 10;

  constructor(public projectService: ProjectService, public logCountriesService: LogCountriesService) {}
 
  handleSaveLogCountries(){
    //this.isSaving = false
    this.totalItems = this.numberCountriesReturned;

    console.log("okkkkkkkkkkkkkkkk")
    alert("HEREEEEEEEEEEEEE")

    let logCountries = {
      username: this.userName,
      numberCountriesReturned: this.numberCountriesReturned
    }


    this.projectService.create(logCountries)
    .then(({data}) => {
      this.isSaving = false
      Swal.fire({
        icon: 'success',
        title: 'Log Countries saved successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      this.userName = ""
      this.numberCountriesReturned = 0
      this.dataSource = data;

      console.log(data);
      /*this.logCountriesService.getAll().then(({data}) => {
        this.logCountries = data;
        this.dataSource = data;
      }).catch(error => {return error})
      return data*/
 
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