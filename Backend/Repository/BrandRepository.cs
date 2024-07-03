using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{

    public class BrandRepository : IBrandRepository
    {
        private readonly APIContext _context;
        private readonly IWebHostEnvironment _env;
        public BrandRepository(APIContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }
        public async Task<Brand> AddBrandAsync([FromForm] Brand brand)
        {
            
            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();
            if (brand.ImageFileLogo != null && brand.ImageFileLogo.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await brand.ImageFileLogo.CopyToAsync(memoryStream);
                    var imageData = memoryStream.ToArray();
                    string base64String = Convert.ToBase64String(imageData);
                    brand.ImageLogo = base64String;
                    _context.Brands.Update(brand);
                    await _context.SaveChangesAsync();
                }
            }
            return brand;
        }

        public bool BrandExists(int id)
        {
            return _context.Brands.Any(e => e.Id == id);
        }

        public async Task<bool> DeleteBrandAsync(int brandId)
        {
            var brand = await _context.Brands.FindAsync(brandId);
            if (brand == null)
            {               
                return false; 
            }

            try
            {
                _context.Brands.Remove(brand);
                await _context.SaveChangesAsync();
                return true; 
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xóa thương hiệu.", ex);
            }
        }

        public async Task<IEnumerable<Brand>> GetBrandsWithPage(int page,int Limit)
        {
           return await _context.Brands
                .Skip((page - 1) * Limit)
                .Take(Limit)
                .ToListAsync();
        }
        public async Task<int> getTotalBrandsCountAsync()
        {
            return await _context.Brands.CountAsync();
        }

        public async Task<Brand> GetBrandByIdAsync(int id)
        {
            return await _context.Brands.FindAsync(id);
        }

        public async Task<Brand> UpdateBrandAsync(Brand brand)
        {
            var existingBrand = await _context.Brands.FindAsync(brand.Id);
            if (existingBrand == null)
            {
                throw new Exception("Không tìm thấy thương hiệu để cập nhật.");
            }
            existingBrand.BrandName = brand.BrandName;
            existingBrand.ImageLogo = brand.ImageLogo;

            if (brand.ImageFileLogo != null && brand.ImageFileLogo.Length > 0)
            {  
                using (var memoryStream = new MemoryStream())
                {
                    await brand.ImageFileLogo.CopyToAsync(memoryStream);
                    var imageData = memoryStream.ToArray();
                    var base64String = Convert.ToBase64String(imageData);
                    existingBrand.ImageLogo = base64String;
                }
            }
            try
            {
                await _context.SaveChangesAsync();
                return existingBrand;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi cập nhật thương hiệu.", ex);
            }
        }

        public async Task<IEnumerable<Brand>> GetAllBrands()
        {
            return await _context.Brands.ToListAsync(); 
        }
    }
}
