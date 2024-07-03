using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Backend.Models
{
    [Table("Cart")]
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        //public string? UserId { get; set; }
        //public User User { get; set; }
        public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
        
    }
}
