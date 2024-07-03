using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class InvoiceDetailRepository : IInvoiceDetailRepository
    {
        private readonly APIContext _context;
        public InvoiceDetailRepository(APIContext context)
        {
            _context = context;
        }
        public async Task Add(InvoiceDetail invoiceDetail)
        {
            await _context.InvoiceDetails.AddAsync(invoiceDetail);
        }

        public async Task Delete(int id)
        {
            var invoiceDetais = await _context.InvoiceDetails.FindAsync(id);
            if (invoiceDetais != null)
            {
                _context.InvoiceDetails.Remove(invoiceDetais);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<InvoiceDetail>> GetAll()
        {
          return  await _context.InvoiceDetails.ToListAsync();
        }

        public async Task<InvoiceDetail> GetById(int id)
        {
          return  await _context.InvoiceDetails.FindAsync(id);
        }

        public async Task Update(InvoiceDetail invoiceDetail)
        {
            _context.Update(invoiceDetail);
            await _context.SaveChangesAsync();
        }
    }
}
