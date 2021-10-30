import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { actorDto } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css']
})
export class IndexActorsComponent implements OnInit {

  constructor(private actorsService : ActorsService) { }

  actors : actorDto[];
  columnsToDisplay = ['name' , 'actions'];
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;
  
  ngOnInit(): void {
    this.loadActors();
  }


  loadActors(){
    this.actorsService.get(this.currentPage, this.pageSize).subscribe((response : HttpResponse<actorDto[]>) => {
      this.actors = response.body;
      this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    })
  }

  updatePagination(event : PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadActors();
  }

  delete(id : number){
    this.actorsService.delete(id)
    .subscribe( () => { 
     this.loadActors(); 
    })    
  
  }

}
