using AutoMapper;
using Backend.Data;
using Backend.Dto;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Backend.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly APIContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;

        public ProductRepository(APIContext context, IMapper mapper, IWebHostEnvironment env)
        {
            _context = context;
            _mapper = mapper;
            _env = env;
        }
        public async Task<int> AddProductAsync([FromForm]Product product)
        {
            //product.Image = "";
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            if (product.ImageFile != null && product.ImageFile.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await product.ImageFile.CopyToAsync(memoryStream);
                    var imageData = memoryStream.ToArray();
                    string base64String = Convert.ToBase64String(imageData);
                    product.Image = base64String;
                    //_context.Products.Update(product);
                    await _context.SaveChangesAsync();
                }
            }
            return product.Id;
        }

        public async Task DeleteProductAsync(int id)
        {
            var deleteProduct = await _context.Products.FindAsync(id);
            if (deleteProduct != null)
            {
                _context.Products!.Remove(deleteProduct);
                await _context.SaveChangesAsync();
            }
        }


        public async Task<List<Product>> getAllProductPagination(int page, int Limit, string filter, int? brandId, int? categoryId)
        {
            IQueryable<Product> query = _context.Products.Include(p => p.Brand).Include(p => p.Category);
            if (brandId.HasValue)
            {
                query = query.Where(p => p.BrandId == brandId);
            }
            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == categoryId);
            }
            // Áp dụng các bộ lọc
            switch (filter.ToLower())
            {               
                case "new":
                    query = query.OrderByDescending(p => p.CreateDate);
                    break;
                case "name-asc":
                    query = query.OrderBy(p => p.Name);
                    break;
                case "name-desc":
                    query = query.OrderByDescending(p => p.Name);
                    break;
                case "price-asc":
                    query = query.OrderBy(p => p.Price);
                    break;
                case "price-desc":
                    query = query.OrderByDescending(p => p.Price);
                    break;
                default:
                    query = query.OrderBy(p => p.Id);
                    break;
            }

            return await query
                .Skip((page - 1) * Limit)
                .Take(Limit)
                .ToListAsync();

        }
        public async Task<int> getTotalProductsCountAsync(string filter, int? brandId,int? categoryId)
        {
            IQueryable<Product> query = _context.Products;
            if (brandId.HasValue)
            {
                query = query.Where(p => p.BrandId == brandId);
            }
            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == categoryId);
            }
            // Áp dụng các bộ lọc
            switch (filter.ToLower())
            {               
                case "new":
                    query = query.OrderByDescending(p => p.CreateDate);
                    break;        
                case "name-asc":
                    query = query.OrderBy(p => p.Name);
                    break;
                case "name-desc":
                    query = query.OrderByDescending(p => p.Name);
                    break;
                case "price-asc":
                    query = query.OrderBy(p => p.Price);
                    break;
                case "price-desc":
                    query = query.OrderByDescending(p => p.Price);
                    break;
                default:
                    query = query.OrderBy(p => p.Id);
                    break;
            }

            return await query.CountAsync();
        }

        public async Task<Product> getProductByIdAsync(int id)
        {
            return await _context.Products
                             .Include(p => p.Brand)
                             .Include(p => p.Category)
                             .FirstOrDefaultAsync(p => p.Id == id);

        }

        public async Task updateProductAsync(int id,Product product)
        {
            var existingProduct = await _context.Products.FindAsync(product.Id);

            if (existingProduct == null)
            {
                // Xử lý khi sản phẩm không tồn tại
                return;
            }
            
            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.Quantity = product.Quantity;
            existingProduct.Image = product.Image;
            existingProduct.SKU = product.SKU;
            existingProduct.Status = product.Status;
            existingProduct.BrandId = product.BrandId;
            existingProduct.CategoryId = product.CategoryId;
            if (product.ImageFile != null && product.ImageFile.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await product.ImageFile.CopyToAsync(memoryStream);
                    var imageData = memoryStream.ToArray();
                    string base64String = Convert.ToBase64String(imageData);
                    existingProduct.Image = base64String;
                }
            }

            _context.Products.Update(existingProduct);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Product>> getAllProductAsync()
        {
            return await _context.Products.ToListAsync();
        }
    }
}
