import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
// import { MarkdownModule } from 'ngx-markdown';
import { LeafletModule } from "@asymmetrik/ngx-leaflet"
import {  HttpClientModule } from "@angular/common/http";

// MDB Angular Free
  import { WavesModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md'
  import { MDBBootstrapModule } from 'angular-bootstrap-md';
  import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
  import "leaflet/dist/images/marker-shadow.png";



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { RatingComponent } from './utilities/rating/rating.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { HomeComponent } from './home/home.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { CreateActorComponent } from './actors/create-actor/create-actor.component';
import { IndexMovieTheatersComponent } from './movie-theaters/index-movie-theaters/index-movie-theaters.component';
import { CreateMovieTheaterComponent } from './movie-theaters/create-movie-theater/create-movie-theater.component';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { EditMovieTheaterComponent } from './movie-theaters/edit-movie-theater/edit-movie-theater.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { FormGenreComponent } from './genres/form-genre/form-genre.component';
import { MovieFilterComponent } from './movies/movie-filter/movie-filter.component';
import { FormActorComponent } from './actors/form-actor/form-actor.component';
import { InputImgComponent } from './utilities/input-img/input-img.component';
import { InputMarkdownComponent } from './utilities/input-markdown/input-markdown.component';
import { FormMovieTheatreComponent } from './movie-theaters/form-movie-theatre/form-movie-theatre.component';
import { MapComponent } from './utilities/map/map.component';
import { FormMovieComponent } from './movies/form-movie/form-movie.component';
import { MultipleSelectorComponent } from './utilities/multiple-selector/multiple-selector.component';
import { ActorsAutocompleteComponent } from './actors/actors-autocomplete/actors-autocomplete.component';
import { DisplayErrorsComponent } from './utilities/display-errors/display-errors.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MenuComponent,
    RatingComponent,
    GenericListComponent,
    HomeComponent,
    IndexGenresComponent,
    CreateGenreComponent,
    IndexActorsComponent,
    CreateActorComponent,
    IndexMovieTheatersComponent,
    CreateMovieTheaterComponent,
    CreateMovieComponent,
    EditActorComponent,
    EditGenreComponent,
    EditMovieComponent,
    EditMovieTheaterComponent,
    FormGenreComponent,
    MovieFilterComponent,
    FormActorComponent,
    InputImgComponent,
    InputMarkdownComponent,
    FormMovieTheatreComponent,
    MapComponent,
    FormMovieComponent,
    MultipleSelectorComponent,
    ActorsAutocompleteComponent,
    DisplayErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    // MarkdownModule.forRoot()
    LeafletModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    SweetAlert2Module.forRoot()
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
