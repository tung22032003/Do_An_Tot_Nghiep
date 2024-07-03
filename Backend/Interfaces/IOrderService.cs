using Backend.Dto;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task AddOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(int id);
        Task<Order> CheckoutAsync(CheckoutDto checkoutDto);
        Task ConfirmDeliveryAsync(int orderId);
    }
}
