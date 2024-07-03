using Backend.Dto;
using Backend.Helpers;
using Backend.Interfaces;
using Backend.Models;
using Backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandRepository _brandRepo;
        public BrandsController(IBrandRepository brandRepo)
        {
            _brandRepo = brandRepo;
        }
        [HttpGet]
        [AllowAnonymous]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult> GetwithPage(int page, int Limit)
        {
            try
            {

                var brands = await _brandRepo.GetBrandsWithPage(page, Limit);
                var totalBrands = await _brandRepo.getTotalBrandsCountAsync();
                var totalPages = (int)Math.Ceiling((double)totalBrands / Limit);
                var paginatedResponse = new
                {
                    TotalCount = totalPages,
                    PageNumber = page,
                    PageSize = Limit,
                    Brands=brands
                };
                return Ok(paginatedResponse);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("get-all")]
        [AllowAnonymous]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult> GetAll()
        {
           var brands=  await _brandRepo.GetAllBrands();
            return Ok(brands);
        
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult>GetbyId(int id)
        {
            await _brandRepo.GetBrandByIdAsync(id);
            return Ok();
        }
        [HttpPost]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult>PostBrand([FromForm]Brand brand)
        {
            try
            {
               var brands= await _brandRepo.AddBrandAsync(brand);
                return Ok(brands);
            }
            catch(Exception ex)
            {
                return BadRequest($"Lỗi: {ex.Message}, StackTrace: {ex.StackTrace}");
            }
        }
        [HttpPut]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult>UpdateBrand([FromForm]Brand brand)
        {
            var brands= await _brandRepo.UpdateBrandAsync(brand);
            return Ok(brands);
        }
        [HttpDelete]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult>DeleteBrand(int id)
        {
            await _brandRepo.DeleteBrandAsync(id);
            return Ok("Đã xóa thành công!");
        }
    }
}
