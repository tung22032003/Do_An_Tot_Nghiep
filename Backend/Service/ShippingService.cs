using Backend.Interfaces;
using Backend.Models;

namespace Backend.Service
{
    public class ShippingService : IShippingService
    {
        private readonly IShippingRepository _shippingRepository;

        public ShippingService(IShippingRepository shippingRepository)
        {
            _shippingRepository = shippingRepository;
        }
        public async Task<IEnumerable<Shipping>> GetShippingsAsync()
        {
            return await _shippingRepository.GetShippingsAsync();
        }

        public async Task<Shipping> GetShippingByIdAsync(int id)
        {
            return await _shippingRepository.GetShippingByIdAsync(id);
        }

        public async Task AddShippingAsync(Shipping shipping)
        {
            await _shippingRepository.AddShippingAsync(shipping);
        }

        public async Task UpdateShippingAsync(Shipping shipping)
        {
            await _shippingRepository.UpdateShippingAsync(shipping);
        }

        public async Task DeleteShippingAsync(int id)
        {
            await _shippingRepository.DeleteShippingAsync(id);
        }
    }
}
