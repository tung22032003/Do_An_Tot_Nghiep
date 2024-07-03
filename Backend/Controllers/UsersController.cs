using AutoMapper;
using Backend.Interfaces;
using Backend.Models;
using Backend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Principal;
using Backend.Dto;
using System.Reflection.Metadata;
using System.Text.Encodings.Web;
using System.Collections.Generic;
using Backend.Service;
using Org.BouncyCastle.Asn1.Ocsp;
using Backend.Helpers;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;


        public UsersController(IUserRepository userRepo, IMapper mapper, IEmailService emailSender,UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IEmailService emailService)
        {
            _configuration = configuration;
            _roleManager = roleManager;
            _userManager = userManager;
            _signInManager = signInManager;
            _userRepo = userRepo;
            _mapper = mapper;
            _emailService = emailService;
           
        }
        [HttpPost]
        [Route("register")]
        //[AllowAnonymous]
        public async Task<IActionResult> Register([FromForm] string Username, [FromForm] string Password, [FromForm] string Email, [FromForm] string Firstname, [FromForm] string Lastname, [FromForm] string Phonenumber)
        {
            var result= await _userRepo.Register(Username,Password,Email,Firstname,Lastname,Phonenumber); 
            
            return Ok(result);
        }
        [HttpPost]
        [Route("registerAdmin")]
        //[Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> RegisterAdmin([FromForm]string Username, [FromForm] string Password, [FromForm] string Email, [FromForm] string Firstname, [FromForm] string Lastname, [FromForm] string Phonenumber, IFormFile Image)
        {
            var result = await _userRepo.RegisterAdmin(Username, Password, Email, Firstname, Lastname, Phonenumber,Image);
           return Ok(result);
        }
        [HttpPost]
        [Route("login")]
        //[AllowAnonymous]
        //[Authorize(Roles = ApplicationRole.User)]
        //[Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> Login([Bind(new[] { "Username,Password" })] LoginModel loginModel)
        {
            var result= await _userRepo.Login(loginModel);
            return Ok(result);
        }

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        //[Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest("User not found.");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var encodedToken = Uri.EscapeDataString(token); // Mã hóa token

            var clientURL = _configuration["AppSettings:ClientURL"];
            var resetLink = $"{clientURL}/reset-password?token={encodedToken}&email={model.Email}";

            try
            {
                await _emailService.SendEmailAsync(model.Email, "Reset Password", $"Please reset your password by clicking here: <a href='{resetLink}'>link</a>");
                return Ok(new { message = "Reset password email sent." });
            }
            catch (Exception ex)
            {
                // Log error here
                return StatusCode(500, $"Error sending email: {ex.Message}");
            }
        }
        [HttpPost("reset-password")]
        [AllowAnonymous]
        //[Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest("User not found.");

            var decodedToken = Uri.UnescapeDataString(model.Token); // Giải mã token
            var result = await _userManager.ResetPasswordAsync(user, decodedToken, model.Password);
            if (result.Succeeded)
                return Ok(new { message = "Password reset successful." });

            return BadRequest(result.Errors);
        }
        [HttpGet]
        //[Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            return await _userRepo.GetAllUsersAsync();
        }
        [HttpGet("GetUserInfo")]
        //[Authorize]
        public async Task<IActionResult> GetUserInfo()
        {
            // Lấy userId từ token
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _userRepo.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }
            var userDto = _mapper.Map<UserDto>(user);
            // Trả về thông tin người dùng
            return Ok(userDto);
        }
        [HttpPut]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult> UpdateUserAsync([FromForm] UserDto userDto)
        {
            await _userRepo.UpdateUserAsync( userDto);
            return Ok("Success");
        }
        [HttpDelete]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> DeleteUserAsync(string userId)
        {
            await _userRepo.DeleteUserAsync(userId);
            return Ok("Success");
        }
        [HttpPut]
        [Route("ChangePassword")]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task ChangePasswordAsync(string userId, string newPassword)
        {
              await _userRepo.ChangePasswordAsync(userId, newPassword);
        }
        [HttpGet]
        [Route("Pagination")]
        [AllowAnonymous]
        [Authorize(Roles = ApplicationRole.User)]

        public async Task<PaginatedResult<UserDto>> GetPaginationUser(int page, int Limit)
        {
            var totalUsersCount = await _userRepo.CountUsersAsync();

            
            var totalPages = (int)Math.Ceiling((double)totalUsersCount / Limit);

            var users= await  _userRepo.GetPaginationUser(page, Limit);

            foreach (var user in users)
            {
                var roles = await _userRepo.GetUserRolesAsync(user.Id);
                var roleName = roles.FirstOrDefault(); // Giả sử mỗi user chỉ có một role

                // Lấy tên vai trò từ bảng aspnetRole
                var role = await _roleManager.FindByNameAsync(roleName);
                if (role != null)
                {
                    user.RoleName = role.Name;
                }
                else
                {
                    // Nếu không tìm thấy vai trò, gán giá trị mặc định
                    user.RoleName = "Unknown";
                }
            }

            //return (users);
            return new PaginatedResult<UserDto>
            {
                Users = users,
                TotalPages = totalPages
            };
        }
        [HttpPost("logout")]
        [Authorize(Roles = ApplicationRole.Admin)]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult> Logout([FromBody] LogoutModel logoutModel)
        {
            return await _userRepo.Logout(logoutModel);
        }
        [HttpPost("refresh-token")]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequest tokenRequest)
        {
            if (tokenRequest == null || string.IsNullOrEmpty(tokenRequest.AccessToken) || string.IsNullOrEmpty(tokenRequest.RefreshToken))
                return BadRequest("Invalid client request");

            var tokenService = new TokenService(_configuration["JWT:Secret"], 180, 7);
            var principal = tokenService.GetPrincipalFromExpiredToken(tokenRequest.AccessToken);

            var username = principal.Identity.Name;
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return BadRequest("Invalid refresh token");
            }

            var storedRefreshToken = await _userManager.GetAuthenticationTokenAsync(user, "MyApp", "RefreshToken");
            if (storedRefreshToken != tokenRequest.RefreshToken)
            {
                return BadRequest("Invalid refresh token");
            }

            var newAccessToken = tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = tokenService.GenerateRefreshToken();

            // Lưu refresh token mới vào database hoặc một nơi lưu trữ an toàn
            await _userManager.SetAuthenticationTokenAsync(user, "MyApp", "RefreshToken", newRefreshToken);

            return new OkObjectResult(new
            {
                token = newAccessToken,
                refreshToken = newRefreshToken
            });
        }
        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            try
            {
                return await _userRepo.ConfirmEmail(userId, token);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("validate-token")]
        public IActionResult ValidateToken()
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var userIdClaim = identity.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim != null)
                {
                    return Ok(new { userId = userIdClaim.Value });
                }
            }
            return Unauthorized();
        }

    }
}
