import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { movieCreationDTO, moviePostGetDTO } from './movies.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = environment.apiURL + '/movies';
  constructor(private http : HttpClient) { }

  public postGet() : Observable<moviePostGetDTO>{
    return this.http.get<moviePostGetDTO>(`${this.apiUrl}/postget`);
  }

  create(movieCreation : movieCreationDTO){         
    const formData = this.buildForm(movieCreation);
    return this.http.post(this.apiUrl , formData);
  }


  private buildForm(movie : movieCreationDTO) : FormData {
    const formData = new FormData();

    formData.append('title' , movie.title);
    formData.append('summary' , movie.summary);
    formData.append('trailer' , movie.trailer);
    formData.append('inTheaters' , String(movie.inTheaters));

    if(movie.releaseDate){
      formData.append('releaseDate', formatDateFormData(movie.releaseDate));
    }

    if(movie.poster){
      formData.append('poster', movie.poster);
    }

    formData.append('genresIds' , JSON.stringify(movie.genresIds));
    formData.append('movieTheatersIds' , JSON.stringify(movie.movieTheatersIds));
    formData.append('actors' , JSON.stringify(movie.actors));

    return formData;
  }
}
