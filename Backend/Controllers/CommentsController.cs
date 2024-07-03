using AutoMapper;
using Backend.Dto;
using Backend.Helpers;
using Backend.Interfaces;
using Backend.Models;
using Backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentsRepository _commentsRepo;
        private readonly IMapper _mapper;
        public CommentsController(IMapper mapper,ICommentsRepository commentRepo)
        {
            _commentsRepo = commentRepo;
            _mapper = mapper;
        }
        [HttpGet]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IEnumerable<Comment>> GetComments( )
        {
            return await _commentsRepo.GetComments();
            

        }
        [HttpGet("{id}")]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<Comment> GetComment(int id)
        {
            return await _commentsRepo.GetComment(id);
        }
        [HttpPost]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult> PostComment(CommentDto commentDto)
        {
            try
            {
                var comment=_mapper.Map<Comment>(commentDto);
                await _commentsRepo.PostComment(comment);
                return Ok("thanh cong");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPut]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task UpdateComment(Comment comment)
        {
            try
            {
                await _commentsRepo.UpdateComment(comment);
            }
            catch(Exception ex)
            {
                BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task DeleteComment(int id)
        {
            try
            {
                await _commentsRepo.DeleteComment(id);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
        }
    }
}
