import { Injectable } from '@angular/core';
import { genreCreationDTO, genreDTO } from './genres.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  // genres = [
  //   {id : 1 ,name : 'Drama'},
  //   {id : 2 ,name : 'Comedy'},
  //   {id : 3 ,name : 'Action'},
  //   {id : 4 ,name : 'Adventure'}
  // ]

  constructor(private http : HttpClient) { }

  private apiUrl = environment.apiURL + '/genres'

  getAll() : Observable<genreDTO[]>{
    return this.http.get<genreDTO[]>(this.apiUrl);
    //return this.genres;
  }

  getById(id : number) : Observable<genreDTO>{
    return this.http.get<genreDTO>(`${this.apiUrl}/${id}`);

  }

  create(genre : genreCreationDTO){
    return this.http.post<genreCreationDTO>(this.apiUrl , genre);
    //genre.id = genre.id + 1;
    //this.genres.push(genre);  
  }

  edit(id : number , genre : genreCreationDTO){
    return this.http.put<genreCreationDTO>( `${this.apiUrl}/${id}`, genre);
  }

  delete(id : number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
