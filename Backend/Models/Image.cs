using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Image")]
    public class Image
    {
        [Key]
        public int Id { get; set; }
        [DisplayName("Tên Hình Ảnh")]
        public string Name { get; set; }
        [DisplayName("Đường dẫn hình ảnh")]
        public string Base64Data { get; set; }
        [DisplayName("ID Sản phẩm")]
        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
