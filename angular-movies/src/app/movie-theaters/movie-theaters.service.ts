import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { movieTheaterCreationDTO, movieTheaterDTO } from './movieTheater.model';

@Injectable({
  providedIn: 'root'
})
export class MovieTheatersService {

  constructor(private http : HttpClient) { }

  private apiURL = environment.apiURL + "/movietheaters";

  
  get() : Observable<movieTheaterDTO[]>{
    return this.http.get<movieTheaterDTO[]>(this.apiURL);
  }

  getById(id : number) : Observable<movieTheaterDTO>{
    return this.http.get<movieTheaterDTO>(`${this.apiURL}/${id}`);
  }
  
  
  public create(movieTheaterCreation : movieTheaterCreationDTO){
    return this.http.post(this.apiURL, movieTheaterCreation);
  }

  edit(id : number , movietheater : movieTheaterCreationDTO){
    return this.http.put<movieTheaterCreationDTO>( `${this.apiURL}/${id}`, movietheater);
  }

  delete(id : number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

}