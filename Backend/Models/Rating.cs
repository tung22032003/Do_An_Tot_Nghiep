using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using System.Numerics;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    [Table("Rating")]
    public class Rating
    {
        [Key]
        public int Id { get; set; }

        [DisplayName("Sao")]
        public double Star { get; set; }

        [DisplayName("Bình Luận")]
        [StringLength(50)]
        public string Comment { get; set; }

        [DisplayName("Ngày")]
        public DateTime Date { get; set; }

        [DisplayName("Hình Ảnh")]
        public string Image { get; set; }

        [DisplayName("Người Dùng")]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }

        [DisplayName("Điện Thoại")]
        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
