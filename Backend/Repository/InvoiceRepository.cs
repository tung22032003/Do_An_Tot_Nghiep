using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly APIContext _context;
        public InvoiceRepository(APIContext context)
        {
            _context = context;
        }
        public async Task AddInvoiceAsync(Invoice invoice)
        {
             await _context.Invoices.AddAsync(invoice);
        }

        public async Task DeleteInvoiceAsync(int id)
        {
            var invoices = await _context.Invoices.FindAsync(id);
            if (invoices != null)
            {
                _context.Invoices.Remove(invoices);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Invoice>> GetAllInvoicesAsync()
        {
          return  await _context.Invoices.ToListAsync();         
        }

        public async Task<Invoice> GetInvoiceByIdAsync(int id)
        {
            return await _context.Invoices.FindAsync(id);
        }

        public async Task<bool> InvoiceExist(int id)
        {
            await _context.Invoices.AnyAsync(i => i.Id == id);
            return true;
        }

        public async Task UpdateInvoiceAsync(int id, Invoice invoice)
        {
            _context.Invoices.Update(invoice);
            await _context.SaveChangesAsync();
        }
    }
}
