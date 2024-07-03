using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Favourite")]
    public class Favourite
    {
        [Key]
        public int Id { get; set; }

        [DisplayName("Sản phẩm")]
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        [DisplayName("Người Dùng")]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }

    }
}
