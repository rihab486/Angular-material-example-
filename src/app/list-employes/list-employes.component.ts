import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { PeopleService } from '../Service/people.service';
import { AddEmployeComponent } from '../add-employe/add-employe.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-list-employes',
  templateUrl: './list-employes.component.html',
  styleUrls: ['./list-employes.component.css']
})
export class ListEmployesComponent implements OnInit {
  displayedColumns: string[] = ['ids','imageUrls', 'firstnames', 'lastnames', 'emails','contactNumbers','ages','dobs','salarys','addresss','action'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, {static: true}) paginator !: MatPaginator;
//
 
  @ViewChild(MatSort, { static: true }) sort !: MatSort;


  constructor(private serviceemploye:PeopleService,private dialoge:MatDialog){}
  ngOnInit() {
    
    this.getEmployee(); 
   
  }
  getEmployee(){
    this.serviceemploye.getAllPeoples().subscribe((res)=>{
      if (!res){
        return}
      this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //delete employee
deleteEmployee( index:number){
  console.log(index)
  this.dataSource.data.splice(index,1);
  this.dataSource.filter="";

  }
  openDialog() {
    this.dialoge.open(AddEmployeComponent, {
   width:'40%'
  
    });
  }

}
