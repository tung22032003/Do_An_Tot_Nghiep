using Backend.Data;
using Backend.Dto;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Backend.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly APIContext _context;

        public OrderRepository(APIContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            return await _context.Orders.Include(o => o.OrderItems).ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task AddOrderAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrderAsync(Order order)
        {
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<Order> CheckoutAsync(CheckoutDto checkoutDto)
        {
            var order = new Order
            {
                UserId = checkoutDto.UserId,
                OrderDate = DateTime.Now,
                OrderStatus = "Pending",
                Subtotal = checkoutDto.Subtotal,
                Tax = checkoutDto.Tax,
                ShippingFee = checkoutDto.ShippingFee,
                Total = checkoutDto.Subtotal + checkoutDto.Tax + checkoutDto.ShippingFee,
                ShippingAddress = checkoutDto.ShippingAddress,
                OrderItems = checkoutDto.OrderItems
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task ConfirmDeliveryAsync(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order != null)
            {
                order.OrderStatus = "Delivered";
                await _context.SaveChangesAsync();
            }
        }
    }
}
