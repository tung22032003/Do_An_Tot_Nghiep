using AutoMapper;
using Backend.Data;
using Backend.Dto;
using Backend.Helpers;
using Backend.Interfaces;
using Backend.Models;
using Backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly APIContext _context;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        
        public ProductsController(IProductRepository productRepository, IMapper mapper, APIContext context)
        {
            _context = context;
            _productRepository=productRepository;
            _mapper = mapper;
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> AddProductAsync([FromForm]Product product)
        {
            try
            {
                var newProduct = await _productRepository.AddProductAsync(product);
                return Ok(newProduct);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message, stackTrace = ex.StackTrace });
            }
        }
        [HttpGet]
        //[Authorize(Roles =ApplicationRole.User)]
        public async Task<IActionResult> getAllProductPagination(int page, int Limit, string filter, int? brandId = null, int? categoryId = null)
        {
            try
            {
                
                var products = await _productRepository.getAllProductPagination(page,Limit,filter, brandId,categoryId);

                var productDtos = products.Select(p =>
                {
                    var productDto = _mapper.Map<ProductDto>(p);
                    if (p.Brand != null)
                    {
                        productDto.BrandName = p.Brand.BrandName;
                    }
                    if (p.Category != null)
                    {
                        productDto.CategoryName = p.Category.Name;
                    }
                    return productDto;
                }).ToList();
                var totalProducts = await _productRepository.getTotalProductsCountAsync(filter,brandId,categoryId);
                var totalPages = (int)Math.Ceiling((double)totalProducts / Limit);
                var paginatedResponse = new
                {
                    TotalCount = totalPages,
                    PageNumber = page,
                    PageSize = Limit,
                    Products = productDtos
                };
                return Ok(paginatedResponse);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("product-all")]
        //[Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult> getAllProductAsync()
        {
            try
            {
                var products=  await _productRepository.getAllProductAsync();
                return Ok(products);
                
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get-by-brand")]
        public IActionResult GetProductsByBrand(int brandId)
        {
            var products = _context.Products.Where(p => p.BrandId == brandId).ToList();
            if (products == null || products.Count == 0)
            {
                return NotFound("No products found for this brand");
            }
            return Ok(products);
        }

        [HttpGet("get-by-category")]
        public IActionResult GetProductsByCategory(int categoryId)
        {
            var products = _context.Products.Where(p => p.CategoryId == categoryId).ToList();
            if (products == null || products.Count == 0)
            {
                return NotFound("No products found for this brand");
            }
            return Ok(products);
        }

        [HttpGet("{id}")]
        //[Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult> getProductByIdAsync(int id)
        {
            var product = await _productRepository.getProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            var productDto = _mapper.Map<ProductDto>(product);
            if (product.Brand != null)
            {
                productDto.BrandName = product.Brand.BrandName;
            }
            if (product.Category != null)
            {
                productDto.CategoryName = product.Category.Name;
            }

            return Ok(productDto);
        }
        [HttpPut]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> updateProductAsync(int id,[FromForm] Product product)
        {
            try
            {
                await _productRepository.updateProductAsync(id,product);
                return Ok("Cập nhật thành công!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        [AllowAnonymous]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> DeleteProductAsync(int id)
        {
            try
            {
                await _productRepository.DeleteProductAsync(id);
                return Ok("Đã xóa thành công !");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
