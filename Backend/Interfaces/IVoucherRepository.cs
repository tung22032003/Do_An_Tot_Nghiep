using Backend.Models;

namespace Backend.Interfaces
{
    public interface IVoucherRepository
    {
        Task<Voucher> GetVoucherByIdAsync(int id);
        Task<List<Voucher>> GetAllVouchersAsync();
        Task AddVoucherAsync(Voucher voucher);
        Task UpdateVoucherAsync(Voucher voucher);
        Task DeleteVoucherAsync(int id);

    }
}
