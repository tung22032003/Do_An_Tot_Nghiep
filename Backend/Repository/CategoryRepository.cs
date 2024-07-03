using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class CategoryRepository:ICategoryRepository
    {
        private readonly APIContext _context;
        public CategoryRepository(APIContext context)
        {
            _context = context;
        }

        public async Task AddCategoryAsync(Category category)
        {
             _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            
        }

        public async Task DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return  await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task UpdateCategoryAsync(Category category)
        {
            var existingCategory = await _context.Categories.FindAsync(category.Id);
            if (existingCategory != null)
            { 
                existingCategory.Name = category.Name;
               
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException("Category not found");
            }
        }
    }
}
