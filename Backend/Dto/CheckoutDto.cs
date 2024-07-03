using Backend.Models;

namespace Backend.Dto
{
    public class CheckoutDto
    {
        public int UserId { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Tax { get; set; }
        public decimal ShippingFee { get; set; }
        public string ShippingAddress { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
