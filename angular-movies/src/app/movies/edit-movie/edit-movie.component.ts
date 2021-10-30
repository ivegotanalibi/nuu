import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieCreationDTO, movieDTO } from '../movies.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute) { }

  model : movieDTO = {title : 'SpiderMan' , inTheaters : true , summary : "whatever",
releaseDate : new Date(), trailer : 'ABCDE' , poster : 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Tom_Holland_MTV_2018_%2802%29.jpg/220px-Tom_Holland_MTV_2018_%2802%29.jpg'}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      alert(params.id);
    })
  }

  onSaveChanges(movieCreation : movieCreationDTO){
    console.log(movieCreation);
  }

}
