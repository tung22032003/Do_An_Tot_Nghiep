using Backend.Dto;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IPaymentMethodService
    {
        Task<IEnumerable<PaymentMethod>> GetAllAsync();
        Task<PaymentMethod> GetByIdAsync(int id);
        Task<PaymentMethod> CreateAsync(PaymentMethod paymentMethod);
        Task UpdateAsync(PaymentMethod paymentMethod);
        Task DeleteAsync(int id);
        Task<bool> ProcessPaymentAsync(PaymentDto paymentDto);
    }
}
