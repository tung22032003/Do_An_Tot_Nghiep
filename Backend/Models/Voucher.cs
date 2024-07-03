using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Voucher")]
    public class Voucher
    {
        [Key]
        public int Id { get; set; }

        [DisplayName("Mã Voucher")]
        public string VoucherCode { get; set; }
        public int TotalVoucher { get; set; }

        [DisplayName("Giảm Giá")]
        public string Discount { get; set; }

        [DisplayName("Thời Gian Bắt Đầu")]
        public DateTime StartTime { get; set; }

        [DisplayName("Thời Gian Kết Thúc")]
        public DateTime EndDate { get; set; }

        [DisplayName("Ghi Chú")]
        public string Description { get; set; }

        [DisplayName("Trạng Thái")]
        public Boolean Status { get; set; }

    }
}
