using AutoMapper;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<GenreDTO, Genre>().ReverseMap();

            CreateMap<GenreCreationDTO, Genre>().ReverseMap();

            CreateMap<ActorDTO, Actor>().ReverseMap();

            CreateMap<ActorCreationDTO, Actor>()
                .ForMember(x => x.Picture, options => options.Ignore());

            CreateMap<MovieTheater, MovieTheaterDTO>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(prop => prop.Location.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(prop => prop.Location.X));

            CreateMap<MovieTheaterCreationDTO, MovieTheater>()
                .ForMember(x => x.Location, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));

            CreateMap<MovieCreationDTO, Movie>()
            .ForMember(x => x.Poster, options => options.Ignore())
            .ForMember(x => x.MoviesGenres, options => options.MapFrom(MapMoviesGenres))
            .ForMember(x => x.MovieTheaterMovies, options => options.MapFrom(MapMovieTheaterMovies))
            .ForMember(x => x.MoviesActors, options => options.MapFrom(MapMoviesActors));

            CreateMap<Movie, MovieDTO>()
                .ForMember(x => x.Genres, options => options.MapFrom(MapMoviesGenres))
                .ForMember(x => x.MovieTheaters, options => options.MapFrom(MapMovieTheatersMovies))
                .ForMember(x => x.Actors, options => options.MapFrom(MapMoviesActors));

        }

        private List<ActorsMovieDTO> MapMoviesActors(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<ActorsMovieDTO>();

            if (movie.MoviesActors != null)
            {
                foreach (var moviesActors in movie.MoviesActors)
                {
                    result.Add(new ActorsMovieDTO()
                    {
                        Id = moviesActors.ActorId,
                        Name = moviesActors.Actor.Name,
                        Character = moviesActors.Character,
                        Picture = moviesActors.Actor.Picture,
                        Order = moviesActors.Order                      
                    });
                }
            }

            return result;
        }


        private List<MovieTheaterDTO> MapMovieTheatersMovies(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<MovieTheaterDTO>();

            if (movie.MovieTheaterMovies != null)
            {
                foreach (var movieTheater in movie.MovieTheaterMovies)
                {
                    result.Add(new MovieTheaterDTO() 
                    { Id = movieTheater.MovieTheaterId, 
                      Name = movieTheater.MovieTheater.Name,
                      Latitude = movieTheater.MovieTheater.Location.Y,
                      Longitude = movieTheater.MovieTheater.Location.X
                    });
                }
            }

            return result;
        }


        private List<GenreDTO> MapMoviesGenres(Movie movie , MovieDTO movieDTO)
        {
            var result = new List<GenreDTO>();
            
            if (movie.MoviesGenres != null)
            {
                foreach (var genre in movie.MoviesGenres)
                {
                    result.Add(new GenreDTO() { Id = genre.GenreId, Name = genre.Genre.Name });
                }
            }

            return result;
        }

        private List<MoviesGenres> MapMoviesGenres(MovieCreationDTO movieCreation, Movie movie)
        {
            var result = new List<MoviesGenres>();

            if(movieCreation.GenresIds == null)
            {
                return result;
            }

            foreach(var id in movieCreation.GenresIds)
            {
                result.Add(new MoviesGenres() { GenreId = id });
            }

            return result;
        }

        private List<MovieTheatersMovies> MapMovieTheaterMovies(MovieCreationDTO movieCreation, Movie movie)
        {
            var result = new List<MovieTheatersMovies>();

            if (movieCreation.MovieTheatersIds == null)
            {
                return result;
            }

            foreach (var id in movieCreation.MovieTheatersIds)
            {
                result.Add(new MovieTheatersMovies() { MovieTheaterId = id });
            }

            return result;
        }

        private List<MoviesActors> MapMoviesActors(MovieCreationDTO movieCreation, Movie movie)
        {
            var result = new List<MoviesActors>();

            if (movieCreation.Actors == null)
            {
                return result;
            }

            foreach (var actor in movieCreation.Actors)
            {
                result.Add(new MoviesActors() { ActorId = actor.Id , Character = actor.Character });
            }

            return result;
        }
    }
}
