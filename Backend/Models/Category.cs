using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Backend.Models
{
    [Table("Category")]
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [DisplayName("Tên loại ")]
        public string Name { get; set; }
        public ICollection<Product>? Products { get; set; } 
    }
}
