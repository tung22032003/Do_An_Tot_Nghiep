using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Notfication")]
    public class Notification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Content { get; set; }
        [Required,StringLength(50)]
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string URL { get; set; }
        public string UserId { get; set; }
        public User? User { get; set; }
    }
}
