import { Component, OnInit } from '@angular/core';
import { MovieTheatersService } from '../movie-theaters.service';
import { movieTheaterDTO } from '../movieTheater.model';

@Component({
  selector: 'app-index-movie-theaters',
  templateUrl: './index-movie-theaters.component.html',
  styleUrls: ['./index-movie-theaters.component.css']
})
export class IndexMovieTheatersComponent implements OnInit {

  constructor(private movieService : MovieTheatersService) { }

  movieTheaters : movieTheaterDTO[];
  columnsToDisplay = ['name', 'actions']

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.movieService.get().subscribe(movietheaters => {
      this.movieTheaters = movietheaters;
    })
  }

 
  delete(id : number){
    this.movieService.delete(id)
    .subscribe( () => { 
     this.loadData(); 
    })    
  
  }

}
