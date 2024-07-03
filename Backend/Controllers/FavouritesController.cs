using Backend.Helpers;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        private readonly IFavouriteRepository _favouriteRepository;
        public FavouritesController(IFavouriteRepository faouriteRepo)
        {
            _favouriteRepository = faouriteRepo;
        }
        [HttpGet]
        public async Task<List<Favourite>> GetAllFavouritesAsync()
        {
           return await _favouriteRepository.GetAllFavouritesAsync();
            
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFavouriteByIdAsync(int id)
        {
            await _favouriteRepository.GetFavouriteByIdAsync(id);
            return Ok();
        }
        [HttpPost]
        [AllowAnonymous]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult>AddFavoritesAsync(Favourite favourite)
        {
            try
            {
                await _favouriteRepository.AddFavouriteAsync(favourite);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        [AllowAnonymous]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult>UpdateFavouritesAsync(Favourite favourite)
        {
            try
            {
                await _favouriteRepository.UpdateFavouriteAsync(favourite);
                return Ok("Cập nhật thành công !");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        [AllowAnonymous]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult>DeleFavouritesAsync(int id)
        {
            try
            {
                await _favouriteRepository.DeleteFavouriteAsync(id);
                return Ok("Xóa thành công !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
