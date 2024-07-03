using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Shipping
    {
        [Key]
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public string ShippingAddress { get; set; }
        public string ShippingPhone { get; set; }
        public DateTime DeliveryDate { get; set; }
    }
}
