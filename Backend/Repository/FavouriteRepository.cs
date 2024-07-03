using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{

    public class FavouriteRepository : IFavouriteRepository
    {
        private readonly APIContext _context;
        public FavouriteRepository(APIContext context)
        {
            _context = context;
        }
        public async Task AddFavouriteAsync(Favourite favourite)
        {
            await _context.Favourites.AddAsync(favourite);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFavouriteAsync(int id)
        {
            var favourite = await _context.Favourites.FindAsync(id);
            if (favourite != null)
            {
                _context.Favourites.Remove(favourite);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Favourite>> GetAllFavouritesAsync()
        {
           return await _context.Favourites.ToListAsync();
        }

        public async Task<Favourite> GetFavouriteByIdAsync(int id)
        {
            return await _context.Favourites.FindAsync(id);
        }

        public async Task UpdateFavouriteAsync(Favourite favourite)
        {
            _context.Favourites.Update(favourite);
            await _context.SaveChangesAsync();
        }
    }
}
