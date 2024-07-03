using AutoMapper;
using Backend.Data;
using Backend.Dto;
using Backend.Helpers;
using Backend.Interfaces;
using Backend.Models;
using Backend.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Text.Encodings.Web;

namespace Backend.Repository
{

    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly APIContext _context;
        private readonly IEmailService _emailService;
       


        public UserRepository(UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            APIContext context,
            IMapper mapper,
            IEmailService emailSender,
            SignInManager<User> signInManager,
            IEmailService emailService
           
            )
        {
;
            _emailService = emailService;
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
            _mapper = mapper;
            _signInManager = signInManager;
            
        }

        public Task AddRoleToUserAsync(string userId, string roleName)
        {
            throw new NotImplementedException();
        }

        public Task<UserDto> AuthenticateAsync(string username, string password)
        {
            throw new NotImplementedException();
        }

        public async Task ChangePasswordAsync(string userId, string newPassword)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {

                throw new Exception($"User with id {userId} not found.");

            }

            // Sử dụng UserManager để thay đổi mật khẩu của người dùng
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, newPassword);


            if (!result.Succeeded)
            {
                throw new Exception($"Failed to change password: {string.Join(",", result.Errors.Select(e => e.Description))}");
            }
        }

        public async Task<int> CountUsersAsync()
        {
            return await _context.Users.CountAsync();
        }

        public async Task DeleteUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new Exception($"User with id {userId} not found.");

            }
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to delete user: {string.Join(",", result.Errors.Select(e => e.Description))}");
            }
        }

  

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _context.Users
                .ToListAsync();
            var usersDto = _mapper.Map<IEnumerable<UserDto>>(users);
            return usersDto;
        }

        public async Task<IEnumerable<UserDto>> GetPaginationUser(int page, int Limit)
        {

            return await _context.Users
            .Skip((page - 1) * Limit)
            .Take(Limit)
            .Select(user => new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Image = user.Image
            })
            .ToListAsync();
        }

        public async Task<UserDto> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return null;
            }

            return new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName= user.LastName,
                PhoneNumber = user.PhoneNumber
            };

        }

        public async Task<IList<string>> GetUserRolesAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            return await _userManager.GetRolesAsync(user);
        }

        public async Task<IActionResult> Login([Bind(new[] { "Username,Password" })] LoginModel loginModel)
        {
            var user = await _userManager.FindByNameAsync(loginModel.Username);
            var passwordCheck = await _userManager.CheckPasswordAsync(user, loginModel.Password);
            if (user == null || !passwordCheck)
            {
                return new UnauthorizedResult();
            }
            var userRoles = await _userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
            {
                // Thêm userId vào claims
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

            };
            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            var tokenService = new TokenService(_configuration["JWT:Secret"], 180, 7); // 180 minutes = 3 hours
            var token = tokenService.GenerateAccessToken(authClaims);
            var refreshToken = tokenService.GenerateRefreshToken();
            await _userManager.SetAuthenticationTokenAsync(user, "MyApp", "RefreshToken", refreshToken);

            var userDto = _mapper.Map<UserDto>(user);
            var role = userRoles.Contains("Admin") ? "Admin" : "User";
            return new OkObjectResult(new
            {
                userDto,
                token,
                refreshToken,
                expiration = DateTime.Now.AddMinutes(180),
                role = role
            });

        }

        public async Task<IActionResult> Register(string Username, string Password, string Email, string Firstname, string Lastname, string Phonenumber)
        {
            var userExist = await _userManager.FindByNameAsync(Username);
            if (userExist != null)
            {
                
                return new OkResult();
            }
            User user = new User()
            {
                UserName = Username,
                SecurityStamp = Guid.NewGuid().ToString(),
                FirstName = Firstname,
                LastName = Lastname,
                Email = Email,
                PhoneNumber = Phonenumber
            };
            var result = await _userManager.CreateAsync(user, Password);
            if (result.Succeeded)
            {
                //await ConfirmEmail(Email, user);
                if (!await _roleManager.RoleExistsAsync(ApplicationRole.User))
                {
                    await _roleManager.CreateAsync(new IdentityRole(ApplicationRole.User));
                }
                await _userManager.AddToRoleAsync(user, ApplicationRole.User);
                var successResponse = new
                {
                    Message = "Registration successful",
                    User = new
                    {
                        user.UserName,
                        user.Email,
                        user.FirstName,
                        user.LastName,
                        user.PhoneNumber
                    }
                };
                return new OkObjectResult(successResponse);
            }
            var errorResponse = new { Message = "User registration failed", Errors = result.Errors };
            return new BadRequestObjectResult(errorResponse);
        }

        public async Task<IActionResult> RegisterAdmin([FromForm] string Username, string Password, string Email, string Firstname, string Lastname, string Phonenumber, IFormFile Image)
        {
            var userExist = await _userManager.FindByNameAsync(Username);
            if (userExist != null)
            {
                var errorResponse = new { Message = "Người dùng đã tồn tại" };
                return new BadRequestObjectResult(errorResponse);
            }

            string? base64Image = null;
            if (Image != null && Image.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await Image.CopyToAsync(memoryStream);
                    var imageData = memoryStream.ToArray();
                    base64Image = Convert.ToBase64String(imageData);
                }
            }

            User user = new User()
            {
                UserName = Username,
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = Email,
                FirstName = Firstname,
                LastName = Lastname,
                PhoneNumber = Phonenumber,
                Image = base64Image
            };
            var result = await _userManager.CreateAsync(user, Password);
            if (!result.Succeeded)
            {
                //var errorResponse = new { Message = "User already exists" };
                //return new BadRequestObjectResult(errorResponse);
                var errorMessages = result.Errors.Select(error => error.Description);
                var errorResponse = new { Message = "User creation failed", Errors = errorMessages };
                return new BadRequestObjectResult(errorResponse);
            }
            if (!await _roleManager.RoleExistsAsync(ApplicationRole.Admin))
            {
                await _roleManager.CreateAsync(new IdentityRole(ApplicationRole.Admin));
            }
            if (!await _roleManager.RoleExistsAsync(ApplicationRole.User))
            {
                await _roleManager.CreateAsync(new IdentityRole(ApplicationRole.User));
            }
            if (await _roleManager.RoleExistsAsync(ApplicationRole.Admin))
            {
                await _userManager.AddToRoleAsync(user, ApplicationRole.Admin);
            }
            return new OkResult();

        }

        public Task RemoveRoleFromUserAsync(string userId, string roleName)
        {
            throw new NotImplementedException();
        }

        



        public async Task UpdateUserAsync(UserDto userDto)
        {
            var user = await _userManager.FindByIdAsync(userDto.Id);
            if (user == null)
            {
                throw new Exception($"User with id {userDto.Id} not found.");
            }

            user.Email = userDto.Email;
            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.PhoneNumber = userDto.PhoneNumber;
            user.Image = userDto.Image;
            if (userDto.ImageFile != null && userDto.ImageFile.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await userDto.ImageFile.CopyToAsync(memoryStream);
                    var imageData = memoryStream.ToArray();
                    string base64String = Convert.ToBase64String(imageData);
                    userDto.Image = base64String;
                }
            }
            _mapper.Map(userDto, user);
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to update user: {string.Join(",", result.Errors.Select(e => e.Description))}");
            }
        }



        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (userId == null || token == null)
            {
                return new  BadRequestObjectResult("User ID and Token are required");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new BadRequestObjectResult("Invalid User ID");
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return new OkObjectResult("Email confirmed successfully");
            }

            return new BadRequestObjectResult("Error confirming your email");
        }
        public async Task<IActionResult> Logout([FromBody] LogoutModel logoutModel)
        {
            var user = await _userManager.FindByNameAsync(logoutModel.Username);
            if (user == null)
            {
                return new BadRequestObjectResult("Đã xảy ra lỗi !");
            }

            // Xóa refresh token khỏi nơi lưu trữ
            await _userManager.RemoveAuthenticationTokenAsync(user, "MyApp", "RefreshToken");

            return new OkObjectResult(new { Message = "Logout successful" });

        }
    }
}
