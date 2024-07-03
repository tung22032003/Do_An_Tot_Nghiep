using Backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailSender;
        public EmailController(IEmailService emailSender)
        {
            _emailSender=emailSender;
        }
        [HttpPost]
        public async Task<IActionResult>SendEmai(string toEmail, string subject, string message)
        {
            await _emailSender.SendEmailAsync(toEmail, subject, message);
            return Ok("Congratulatetion!");
        }
    }
}
