using Backend.Data;
using Backend.Interfaces;
using System;

namespace Backend.Service
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly APIContext _context;
        public ICartService CartService { get; }

        public UnitOfWork(APIContext context, ICartService cartService)
        {
            _context = context;
            CartService = new CartService(context);
        }

        public async Task<bool> Complete()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
