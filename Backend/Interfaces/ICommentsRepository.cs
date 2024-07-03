using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Interfaces
{
    public interface ICommentsRepository
    {
        Task PostComment(Comment comment);
        Task<IEnumerable<Comment>> GetComments( );
        Task<Comment> GetComment(int id);
        Task<bool> CommentExist(int id);
        Task UpdateComment(Comment comment);
        Task DeleteComment(int id);
    }
}
