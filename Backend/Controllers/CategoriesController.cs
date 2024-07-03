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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;
        public CategoriesController(ICategoryRepository categoryRepo)
        {
            _categoryRepo=categoryRepo;
        }
        [HttpGet]
        [AllowAnonymous]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IEnumerable<Category>> GetAll()
        {
           return await _categoryRepo.GetAllCategoriesAsync();
        }
        [HttpGet("{id}")]
        [AllowAnonymous]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _categoryRepo.GetCategoryByIdAsync(id);
        }
        [HttpPost]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task AddCategory(Category category)
        {
            try
            {
                await _categoryRepo.AddCategoryAsync(category);
            }
            catch(Exception ex)
            {
                 BadRequest(ex.Message);
            }
        }
        [HttpPut]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task UpdateCategoryAsync(Category category)
        {
            try
            {
                await _categoryRepo.UpdateCategoryAsync(category);
            }
            catch(Exception ex)
            {
                BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> DeleteCategoryAsync(int id)
        {
            try
            {
                await _categoryRepo.DeleteCategoryAsync(id);
                return Ok("Xoa thanh cong");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
