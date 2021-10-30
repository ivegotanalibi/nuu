import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { movieCreationDTO } from '../movies.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  constructor(private movieService : MoviesService, private router : Router) { }

  nonSelectedGenres : MultipleSelectorModel[];
  nonSelectedMovieTheaters : MultipleSelectorModel[];

  ngOnInit(): void {
    this.movieService.postGet().subscribe(response => {
      this.nonSelectedGenres = response.genres.map(genre => {
        return <MultipleSelectorModel>{key : genre.id , value : genre.name}
      })

      this.nonSelectedMovieTheaters = response.movieTheaters.map(movieTheater => {
        return <MultipleSelectorModel>{key : movieTheater.id , value : movieTheater.name}
      })
    })
  }

  onSaveChanges(movie : movieCreationDTO){
    console.log(movie);
    this.movieService.create(movie).subscribe(response => {
      this.router.navigate(['']);
    })
  }

}
