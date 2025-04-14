import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { LogCountries } from '../logCountries';
import { LogCountriesClass } from '../logCountriesClass';
import { LogCountriesService } from '../logCountries.service';
import { Apollo, gql } from 'apollo-angular';
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment.development';
 
@Component({
  selector: 'app-index',
  imports: [CommonModule, RouterModule, FormsModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  countries: LogCountries[] = [];
  dateCreateInit: Date = new Date();
  dateCreateFinal: Date = new Date();
  isFilter:boolean = false;
  displayedColumns: string[] = ["actions", "id", "username", "request_timestamp", "num_countries_returned", "countries_details"];
  dataSource: LogCountries[] = [];  
  totalItems: number = 0;
  pageSize: number = 10;
  

  constructor(private apollo: Apollo, public logCountriesService: LogCountriesService, private router: Router) { }
 
  ngOnInit(): void {
    this.fetchProjectList()
  }
 
  fetchProjectList(){
    this.logCountriesService.getAll().subscribe((data) => {
      console.log(data);
      this.dataSource = data;
      
    });
  }
 
  handleDelete(data:any){
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
 
        this.logCountriesService.delete(data)
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

    if (this.dateCreateInit != null && this.dateCreateInit != undefined 
      && this.dateCreateFinal != null && this.dateCreateFinal != undefined 
    ) {

    let dataSourceNew = this.dataSource.filter((element)=>{
      return new Date(element.created_date)>= new Date(this.dateCreateInit) && new Date(element.created_date)<= new Date(this.dateCreateFinal)
    });    
      this.totalItems = dataSourceNew.length;
      this.dataSource = dataSourceNew;
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'You must fill in the start date or the end date!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  handleEdit(data:any) {
    this.router.navigate(['/managementCountries/edit', { id: data.id, username: data.username, request_timestamp: data.request_timestamp, num_countries_returned: data.num_countries_returned, countries_details: data.countries_details }]);
  }
 
}
