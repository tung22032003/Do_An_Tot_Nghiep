using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly IRatingRepository _ratingRepo;
        public RatingsController(IRatingRepository ratingRepo)
        {
            _ratingRepo = ratingRepo;
        }
        [HttpGet]
        public async Task<List<Rating>> GetAllRatingsAsync()
        {
            return await _ratingRepo.GetAllRatingsAsync();
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRatingByIdAsync(int id)
        {
            try
            {
                var rating = await _ratingRepo.GetRatingByIdAsync(id);
                return Ok(rating);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddRatingAsync(Rating rating)
        {
            var existRating= await _ratingRepo.RatingExist(rating.Id);
            if (existRating == true)
            {
                return BadRequest();
            }
            await _ratingRepo.AddRatingAsync(rating);
            return Ok();
        }
        [HttpPut]
        public async Task UpdateRatingAsync(Rating rating)
        {
            try
            {
                await _ratingRepo.UpdateRatingAsync(rating);
            }
            catch(Exception ex)
            {
                BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        public async Task<IActionResult> DeteRatingAsync(int id)
        {
            try
            {
                await _ratingRepo.DeleteRatingAsync(id);
                return Ok("Đã xoá thành công ");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
