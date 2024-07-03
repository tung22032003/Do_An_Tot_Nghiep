using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using System.Numerics;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    [Table("Comment")]
    public class Comment
    {
        public int Id { get; set; }

        [DisplayName("Nội Dung")]
        [Required]
        [StringLength(100)]
        public string Content { get; set; }=String.Empty;

        [DisplayName("Ngày")]
        public DateTime Date { get; set; }
        [DisplayName("Trạng Thái")]
        public Boolean Status { get; set; }
        [DisplayName("Sản phẩm")]
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        [DisplayName("Bình Luận")]
        [ForeignKey("ParentCommentId")]
        public int? ParentCommentId { get; set; }
        public Comment? ParentComment { get; set; }
        [DisplayName("Người Dùng")]
        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
