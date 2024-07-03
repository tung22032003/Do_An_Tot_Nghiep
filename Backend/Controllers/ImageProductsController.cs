using Backend.Data;
using Backend.Helpers;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageProductsController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        private readonly APIContext _context;
        public ImageProductsController(IWebHostEnvironment environment, APIContext context)
        {
            _environment = environment;
            _context = context;
        }
        [HttpGet("all-images")]
        public async Task<IActionResult> GetAllImages()
        {
            var images = await _context.Images
                                       .Select(image => new
                                       {
                                           image.Id,
                                           image.Name,
                                           image.Base64Data
                                       })
                                       .ToListAsync();

            return Ok(images);
        }
        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetProductImages(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            var images = await _context.Images
                .Where(i => i.ProductId == productId)
                .Select(i => new { i.Id, i.Name, i.Base64Data })
                .ToListAsync();

            return Ok(images);
        }
        [HttpGet("{imageId}")]
        public async Task<IActionResult> GetProductImage(int imageId)
        {
            var image = await _context.Images.FindAsync(imageId);
            if (image == null)
            {
                return NotFound("Image not found");
            }

            return Ok(new { image.Id, image.Name, image.Base64Data });
        }
        [HttpPost("upload")]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> UploadProductImages(int productId, List<IFormFile> files)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            if (files == null || files.Count == 0)
            {
                return BadRequest("No files uploaded");
            }

            var imageBase64Strings = new List<string>();

            foreach (var file in files)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    var fileBytes = memoryStream.ToArray();
                    var base64String = Convert.ToBase64String(fileBytes);

                    var productImage = new Image
                    {
                        Name = file.FileName,
                        Base64Data = base64String,
                        ProductId = productId
                    };

                    _context.Images.Add(productImage);
                    await _context.SaveChangesAsync();

                    imageBase64Strings.Add(base64String);
                }
            }

            return Ok(new { ImageBase64Strings = imageBase64Strings });
        }
        [HttpDelete("delete/{imageId}")]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> DeleteProductImage(int imageId)
        {
            var image = await _context.Images.FindAsync(imageId);
            if (image == null)
            {
                return NotFound("Image not found");
            }

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Image deleted successfully" });
        }
    }
}
