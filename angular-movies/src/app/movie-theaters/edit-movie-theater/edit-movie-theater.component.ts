import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieTheatersService } from '../movie-theaters.service';
import { movieTheaterCreationDTO, movieTheaterDTO } from '../movieTheater.model';

@Component({
  selector: 'app-edit-movie-theater',
  templateUrl: './edit-movie-theater.component.html',
  styleUrls: ['./edit-movie-theater.component.css']
})
export class EditMovieTheaterComponent implements OnInit {

  model : movieTheaterDTO

  constructor(private activatedRoute : ActivatedRoute, private movieService : MovieTheatersService, 
    private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.movieService.getById(params.id).subscribe(movietheater => {
        this.model = movietheater;
      })
    })
  }

  saveChanges(movieTheaterCreation : movieTheaterCreationDTO){ 
    this.movieService.edit(this.model.id , movieTheaterCreation).subscribe(() => {
      this.router.navigate(["/movietheaters"]); 
    })
  }

}
