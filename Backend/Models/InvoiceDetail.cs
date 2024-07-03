using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Backend.Models
{
    [Table("InvoiceDetail")]
    public class InvoiceDetail
    {
        [Key]
        public int Id { get; set; }
        [DisplayName("Số lượng sản phẩm được mua")]
        public int Quantity { get; set; }
        [DisplayName("Giá mỗi sản phẩm")]
        public decimal Price { get; set; }
        [DisplayName("Tổng giá sản phẩm")]
        public decimal TotalPrice { get; set; }
        public int InvoiceId { get; set; }
        public int ProductId { get; set; }
        public Invoice? Invoice { get; set; }
        public Product? Product { get; set; }
    }
}
