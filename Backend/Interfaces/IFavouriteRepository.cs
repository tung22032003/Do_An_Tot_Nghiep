using Backend.Models;

namespace Backend.Interfaces
{
    public interface IFavouriteRepository
    {
        Task<List<Favourite>> GetAllFavouritesAsync();
        Task<Favourite> GetFavouriteByIdAsync(int id);
        Task AddFavouriteAsync(Favourite favourite);
        Task UpdateFavouriteAsync(Favourite favourite);
        Task DeleteFavouriteAsync(int id);
    }
}
