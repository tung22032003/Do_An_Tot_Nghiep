using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class RegisterModel
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address Format")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string? Image { get; set; }
    }
}
