using Backend.Models;

namespace Backend.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<List<Invoice>> GetAllInvoicesAsync();
        Task<Invoice> GetInvoiceByIdAsync(int id);
        Task AddInvoiceAsync(Invoice invoice);
        Task UpdateInvoiceAsync(int id, Invoice invoice);
        Task DeleteInvoiceAsync(int id);
        Task<bool> InvoiceExist(int id);
    }
}
