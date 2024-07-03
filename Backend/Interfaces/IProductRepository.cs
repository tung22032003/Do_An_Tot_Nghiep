using Backend.Models;

namespace Backend.Interfaces
{
    public interface IProductRepository
    {
        
        public Task<List<Product>> getAllProductPagination(int page, int Limit,string filter, int? brandId, int? categoryId);
        public Task<Product> getProductByIdAsync(int id);
        public Task<int>AddProductAsync(Product product);
        public Task updateProductAsync(int id, Product product);
        public Task DeleteProductAsync(int id);
        Task<int> getTotalProductsCountAsync(string filter, int? brandId, int? categoryId);
        public Task<List<Product>> getAllProductAsync();

    }
}
