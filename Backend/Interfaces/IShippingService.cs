using Backend.Models;

namespace Backend.Interfaces
{
    public interface IShippingService
    {
        Task<IEnumerable<Shipping>> GetShippingsAsync();
        Task<Shipping> GetShippingByIdAsync(int id);
        Task AddShippingAsync(Shipping shipping);
        Task UpdateShippingAsync(Shipping shipping);
        Task DeleteShippingAsync(int id);
    }
}
