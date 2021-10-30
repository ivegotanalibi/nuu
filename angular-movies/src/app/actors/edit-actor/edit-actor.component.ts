import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreationDto, actorDto } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute , private actorsService : ActorsService, private router : Router) { }

  model : actorDto ;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.actorsService.getById(params.id).subscribe(actor => {
        this.model = actor;
      }) 
    })
  }

  saveChanges(actorCreation : actorCreationDto){ 
    this.actorsService.edit(this.model.id , actorCreation).subscribe(() => {
      this.router.navigate(["/actors"]); 
    })
  
  }

}
