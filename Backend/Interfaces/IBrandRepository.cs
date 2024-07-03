using Backend.Models;

namespace Backend.Interfaces
{
    public interface IBrandRepository
    {
        Task<IEnumerable<Brand>> GetBrandsWithPage(int page,int Limit);
        Task<IEnumerable<Brand>> GetAllBrands();
        Task<Brand> GetBrandByIdAsync(int brandId);
        Task<Brand> AddBrandAsync(Brand brand);
        Task<Brand> UpdateBrandAsync(Brand brand);
        Task<bool> DeleteBrandAsync(int brandId);
        bool BrandExists(int id);
        Task<int> getTotalBrandsCountAsync();
    }
}
