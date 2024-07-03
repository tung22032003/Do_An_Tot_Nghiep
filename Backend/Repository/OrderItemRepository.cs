using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class OrderItemRepository:IOrderItemRepository
    {
        private readonly APIContext _context;

        public OrderItemRepository(APIContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<OrderItem>> GetOrderItemsAsync()
        {
            return await _context.OrderItems.Include(oi => oi.Product).ToListAsync();
        }

        public async Task<OrderItem> GetOrderItemByIdAsync(int id)
        {
            return await _context.OrderItems.Include(oi => oi.Product).FirstOrDefaultAsync(oi => oi.OrderItemId == id);
        }

        public async Task AddOrderItemAsync(OrderItem orderItem)
        {
            await _context.OrderItems.AddAsync(orderItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrderItemAsync(OrderItem orderItem)
        {
            _context.OrderItems.Update(orderItem);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrderItemAsync(int id)
        {
            var orderItem = await _context.OrderItems.FindAsync(id);
            if (orderItem != null)
            {
                _context.OrderItems.Remove(orderItem);
                await _context.SaveChangesAsync();
            }
        }
    }
}
