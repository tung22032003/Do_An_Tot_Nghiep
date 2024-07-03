using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("ActionManage")]
    public class ActionManage
    {
        [Key]
        public int Id { get; set; }
        [DisplayName("Hành động ")]
        public string Acion { get; set; }
        [DisplayName("Ngày thực hiện")]
        public DateTime DateAction { get; set; }
        [DisplayName("Đối tượng")]
        public string Object { get; set; }
        [DisplayName("Thao tác")]
        public string operation { get; set; }
        [DisplayName("Thứ tự sản phẩm")]
        public int Value { get; set; }
        public string UserId { get; set; }
        public User? User { get; set; }
    }
}
