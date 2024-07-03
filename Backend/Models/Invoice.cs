using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Invoice")]
    public class Invoice
    {
        public int Id { get; set; }
        [DisplayName("Ngày tạo hóa đơn")]
        public DateTime InvoiceDate { get; set; }
        [DisplayName("Tổng tiền thanh toán")]
        public decimal TotalPrice    { get; set; }
        [DisplayName("Trạng thái thanh toán")]
        public Boolean PaymentStatus { get; set; }
        [DisplayName("Phương thức thanh toán")]
        public string Method { get; set; }
        [DisplayName("Địa chỉ ")]
        public string ShippingAddress { get; set; }
        public int PaymentMethodId { get; set; }
        public PaymentMethod? PaymentMethod { get; set; }
        public string UserId { get; set; }
        public User? User { get; set; }
        public int VoucherId { get; set; }
        public Voucher? Voucher { get; set; }

    }
}
