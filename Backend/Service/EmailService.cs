
using MimeKit;
using MailKit.Net.Smtp;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using MailKit.Security;

namespace Backend.Service
{
    public class EmailService:IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public EmailService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentNullException(nameof(email));
            }

            var fromAddress = _configuration["EmailSettings:From"];
            if (string.IsNullOrEmpty(fromAddress))
            {
                throw new ArgumentNullException("EmailSettings:From is not configured properly.");
            }

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("YourAppName", fromAddress));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart("html") { Text = message };

            using (var client = new SmtpClient())
            {
                try
                {
                    // Sử dụng SecureSocketOptions.StartTls trên cổng 587
                    await client.ConnectAsync(_configuration["EmailSettings:SmtpServer"], int.Parse(_configuration["EmailSettings:Port"]), SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(_configuration["EmailSettings:Username"], _configuration["EmailSettings:Password"]);
                    await client.SendAsync(emailMessage);
                }
                catch (Exception ex)
                {
                    // Log error here
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                }
            }
        }

    }
}
