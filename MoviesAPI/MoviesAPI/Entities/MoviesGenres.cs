using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Entities
{
    //this class has one to many relationship with both movie and genre entity
    public class MoviesGenres
    {
        //foreign key to the primary key in the genre entity
        public int GenreId { get; set; }
        //foreign key to the primary key in the movie entity
        public int MovieId { get; set; }
        //Navigation property from this entity to the related entity
        public Genre Genre { get; set; }
        //Navigation property from this entity to the related entity
        public Movie Movie { get; set; }
    }
}
