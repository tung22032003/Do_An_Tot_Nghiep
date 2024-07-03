using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Brand")]
    public class Brand
    {
        [Key]
        public int Id { get; set; }
        [DisplayName("Tên thương hiệu")]
        public string? BrandName { get; set; }
        [DisplayName("Hình Logo")]
        public string? ImageLogo { get; set; }
        [NotMapped]
        public IFormFile? ImageFileLogo { get; set; }
        public ICollection<Product>? Products { get; set; }

    }
}
