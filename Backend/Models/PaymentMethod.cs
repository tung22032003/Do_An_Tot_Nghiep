using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("PaymentMethod")]
    public class PaymentMethod
    {
        [Key]
        public int Id { get; set; }
        [DisplayName("Ngày thanh toán")]
        public DateTime DatePayment { get; set; }
        [DisplayName("Tên phương thức thanh toán")]
        public string Method { get; set; }
        [DisplayName("Trạng thái")]
        public string PaymentStatus { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
