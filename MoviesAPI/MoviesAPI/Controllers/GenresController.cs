using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Filters;
using MoviesAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    
    //[Route("api/genres")]
    [Route("api/[controller]")]
    [Route("/")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] //applies for the whole controller
    public class GenresController : ControllerBase
    {
        private readonly IRepository repository;
        private readonly ApplicationDbContext context;
        private readonly ILogger<GenresController> logger;
        private readonly IMapper mapper;

        public GenresController(ApplicationDbContext context, ILogger<GenresController> logger,
                                IMapper mapper,IRepository repository)
        {
            this.repository = repository;
            this.context = context;
            this.logger = logger;
            this.mapper = mapper;
        }

        [HttpGet("/allgenres")]  //allgenres  //overrides the top route
        [HttpGet("list")]     //api/genres/list //You can have two or more endpoints for a single method/action
        [HttpGet]         //api/genres
        //[ResponseCache(Duration =60)]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ServiceFilter(typeof(MyActionFilter))]
        public async Task<ActionResult<List<GenreDTO>>> Get()
        {
            logger.LogInformation("Getting all genres");
            var genres = await context.Genres.OrderBy(x => x.Name).ToListAsync();
            return mapper.Map<List<GenreDTO>>(genres);
            //return await repository.GetAllGenres();
        }

        [HttpGet("example")]  //api/genres/example
        [HttpGet("{Id:int}")]       //api/genres/1
        [ServiceFilter(typeof(MyActionFilter))]
        public async Task<ActionResult<GenreDTO>> Get(int Id)
        {

            var genre = await context.Genres.FirstOrDefaultAsync(x => x.Id == Id);

            if (genre == null)
            {
                return NotFound();
            }
            return mapper.Map<GenreDTO>(genre);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreationDTO genreCreation)
        {
            var genre = mapper.Map<Genre>(genreCreation);
            context.Add(genre);
            await context.SaveChangesAsync();
            return NoContent();
            //repository.AddGenre(genre);
        }

        [HttpPut("{id:int}")]
        public  async Task<ActionResult> Put( int id , [FromBody] GenreCreationDTO genreCreation)
        {
            var genre = mapper.Map<Genre>(genreCreation);
            genre.Id = id;
            context.Entry(genre).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public  async Task<ActionResult> Delete(int id)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(x => x.Id == id);
            
            if(genre == null)
            {
                return NotFound();
            }

            context.Remove(genre);
            await context.SaveChangesAsync();
            return NoContent();
        }


    }
}
