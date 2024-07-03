using Backend.Models;

namespace Backend.Interfaces
{
    public interface IShippingRepository
    {
        Task<IEnumerable<Shipping>> GetShippingsAsync();
        Task<Shipping> GetShippingByIdAsync(int id);
        Task AddShippingAsync(Shipping shipping);
        Task UpdateShippingAsync(Shipping shipping);
        Task DeleteShippingAsync(int id);
    }
}
