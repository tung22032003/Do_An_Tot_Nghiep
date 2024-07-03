using Backend.Dto;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Interfaces
{
    public interface IUserRepository
    {
        Task<IActionResult> Login([Bind("Username,Password")] LoginModel loginModel);
        Task<IActionResult> Register(string Username, string Password, string Email, string Firstname, string Lastname, string Phonenumber);
        Task<IActionResult> RegisterAdmin(string Username, string Password, string Email, string Firstname, string Lastname, string Phonenumber,IFormFile Image);
        Task<UserDto> GetUserByIdAsync(string userId);
        Task UpdateUserAsync( UserDto userDto);
        Task DeleteUserAsync(string userId);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task ChangePasswordAsync(string userId, string newPassword);
        Task AddRoleToUserAsync(string userId, string roleName);
        Task RemoveRoleFromUserAsync(string userId, string roleName);
        Task<UserDto> AuthenticateAsync(string username, string password);
        Task<IEnumerable<UserDto>> GetPaginationUser(int page,int Limit);
        Task<int> CountUsersAsync();
        Task<IList<string>> GetUserRolesAsync(string userId);
        Task<IActionResult> Logout([FromBody] LogoutModel logoutModel);
        Task<IActionResult> ConfirmEmail(string userId, string token);
    }
}
