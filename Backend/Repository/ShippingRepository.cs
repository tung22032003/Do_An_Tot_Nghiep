using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Backend.Repository
{
    public class ShippingRepository:IShippingRepository
    {
        private readonly APIContext _context;

        public ShippingRepository(APIContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Shipping>> GetShippingsAsync()
        {
            return await _context.Shippings.Include(s => s.Order).ToListAsync();
        }

        public async Task<Shipping> GetShippingByIdAsync(int id)
        {
            return await _context.Shippings.Include(s => s.Order).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task AddShippingAsync(Shipping shipping)
        {
            await _context.Shippings.AddAsync(shipping);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateShippingAsync(Shipping shipping)
        {
            _context.Shippings.Update(shipping);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteShippingAsync(int id)
        {
            var shipping = await _context.Shippings.FindAsync(id);
            if (shipping != null)
            {
                _context.Shippings.Remove(shipping);
                await _context.SaveChangesAsync();
            }
        }
    }
}
