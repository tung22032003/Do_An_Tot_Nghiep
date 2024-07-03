using Backend.Dto;
using Backend.Interfaces;
using Backend.Models;

namespace Backend.Service
{
    public class OrderService:IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            return await _orderRepository.GetOrdersAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _orderRepository.GetOrderByIdAsync(id);
        }

        public async Task AddOrderAsync(Order order)
        {
            await _orderRepository.AddOrderAsync(order);
        }

        public async Task UpdateOrderAsync(Order order)
        {
            await _orderRepository.UpdateOrderAsync(order);
        }

        public async Task DeleteOrderAsync(int id)
        {
            await _orderRepository.DeleteOrderAsync(id);
        }
        public async Task<Order> CheckoutAsync(CheckoutDto checkoutDto)
        {
            return await _orderRepository.CheckoutAsync(checkoutDto);
        }

        public async Task ConfirmDeliveryAsync(int orderId)
        {
            await _orderRepository.ConfirmDeliveryAsync(orderId);
        }
    }
}

