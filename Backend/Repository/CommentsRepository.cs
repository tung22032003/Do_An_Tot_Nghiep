using AutoMapper;
using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class CommentsRepository : ICommentsRepository
    {
        private readonly APIContext _context;
        
        public CommentsRepository(APIContext context)
        {
            _context = context;
        }
        public async Task<bool> CommentExist(int id)
        {
            return await _context.Comments.AnyAsync(comment => comment.Id == id);
        }

        public async Task DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Comment> GetComment(int id)
        {
            return await _context.Comments.FindAsync(id);
        }

        public async Task<IEnumerable<Comment>> GetComments( )
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task PostComment(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateComment(Comment comment)
        {
            var existingComents = await _context.Comments.FindAsync(comment.Id);
            if (existingComents != null)
            {
                existingComents.Content = comment.Content;
                existingComents.Status = comment.Status;
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException("Comments not found");
            }
        }
    }
}
