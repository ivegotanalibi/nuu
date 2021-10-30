import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieTheatersService } from '../movie-theaters.service';
import { movieTheaterCreationDTO } from '../movieTheater.model';

@Component({
  selector: 'app-create-movie-theater',
  templateUrl: './create-movie-theater.component.html',
  styleUrls: ['./create-movie-theater.component.css']
})
export class CreateMovieTheaterComponent implements OnInit {

  constructor(private router : Router , private movieTheatersService : MovieTheatersService) { }



  ngOnInit(): void {
    
  }

  saveChanges(movieTheaterCreation : movieTheaterCreationDTO){ 
    this.movieTheatersService.create(movieTheaterCreation).subscribe(() => {
      this.router.navigate(['/movietheaters']);
    })
    
  }

  
  

}
