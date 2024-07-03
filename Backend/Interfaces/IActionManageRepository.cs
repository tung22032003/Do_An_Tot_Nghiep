using Backend.Models;

namespace Backend.Interfaces
{
    public interface IActionManageRepository
    {
        Task<IEnumerable<ActionManage>> GetAllUserActionsAsync();
        Task<IEnumerable<ActionManage>> GetUserActionsByUserIdAsync(string userId);
        Task<IEnumerable<ActionManage>> GetAdminActionsByUserIdAsync(string userId);
        Task<IEnumerable<ActionManage>> GetAllAdminActionsAsync();

    }
}
