using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly ILogger<ActorsController> logger;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly string containerName = "actors";

        public ActorsController(ApplicationDbContext context, IFileStorageService fileStorageService, 
                                ILogger<ActorsController> logger,
                                IMapper mapper )
        {
            this.context = context;
            this.logger = logger;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
        }

        [HttpGet]        
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginationDTO pagination)
        {
            var queryable = context.Actors.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);

            var actors = await queryable.OrderBy(x => x.Name).Paginate(pagination).ToListAsync();
            return mapper.Map<List<ActorDTO>>(actors);

            /* var actors = await context.Actors.OrderBy(x => x.Name).ToListAsync();
             return mapper.Map<List<ActorDTO>>(actors);*/

        }

        [HttpPost("searchByName")]
        public async Task<ActionResult<List<ActorsMovieDTO>>> SearchByName([FromBody] string name)
        {
            if(string.IsNullOrWhiteSpace(name)) { return new List<ActorsMovieDTO>(); }
            return await context.Actors
                .Where(x => x.Name.Contains(name))
                .OrderBy(x => x.Name)
                .Select(x => new ActorsMovieDTO { Id = x.Id, Name = x.Name, Picture = x.Picture })
                .Take(5)
                .ToListAsync();
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<ActorDTO>> Get(int Id)
        {

            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == Id);

            if (actor == null)
            {
                return NotFound();
            }
            return mapper.Map<ActorDTO>(actor);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ActorCreationDTO actorCreation)
        {
            var actor = mapper.Map<Actor>(actorCreation);

            if (actorCreation.Picture !=null)
            {
                actor.Picture = await fileStorageService.SaveFile(containerName, actorCreation.Picture);
            }

            context.Add(actor);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreationDTO actorCreation)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);
            if(actor == null)
            {
                return NotFound();
            }

            actor = mapper.Map(actorCreation, actor);

            if (actorCreation.Picture != null)
            {
                actor.Picture = await fileStorageService.EditFile(containerName, actorCreation.Picture, actor.Picture);
            }

            await context.SaveChangesAsync();
            
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            context.Remove(actor);
            await context.SaveChangesAsync();
            await fileStorageService.DeleteFile(actor.Picture, containerName);
            return NoContent();
        }

    }
}
