using Backend.Models;

namespace Backend.Interfaces
{
    public interface IRatingRepository
    {
        Task<Rating> GetRatingByIdAsync(int id);
        Task<List<Rating>> GetAllRatingsAsync();
        Task AddRatingAsync(Rating rating);
        Task UpdateRatingAsync(Rating rating);
        Task DeleteRatingAsync(int id);
        Task<bool> RatingExist(int id);
    }
}
