using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Dto
{
    public class UserDto
    {
        public string? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Image { get; set; }
        public string? RoleName { get; set; }
        [NotMapped]
        public IFormFile? ImageFile { get; set; }
    }
}
