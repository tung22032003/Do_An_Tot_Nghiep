using Backend.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace Backend.Dto
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }=String.Empty;
        public DateTime Date { get; set; }
        public Boolean Status { get; set; }
        //public int? ProductId { get; set; }
        public int? ParentCommentId { get; set; }
        //public string? UserId { get; set; }
    }
}
