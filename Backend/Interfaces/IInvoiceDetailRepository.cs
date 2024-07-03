using Backend.Models;

namespace Backend.Interfaces
{
    public interface IInvoiceDetailRepository
    {
        Task<List<InvoiceDetail>> GetAll();
        Task<InvoiceDetail> GetById(int id);
        Task Add(InvoiceDetail invoiceDetail);
        Task Update(InvoiceDetail invoiceDetail);
        Task Delete(int id);
    }
}
