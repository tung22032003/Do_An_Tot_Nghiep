using Backend.Dto;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface ICartService
    {
        Task AddToCartAsync(int cartId, int productId, int quantity);
        Task RemoveFromCartAsync(int cartId, int productId);
        Task<Cart> GetCartAsync(int cartId);
        Task UpdateCartItemAsync(int cartId, int productId, int quantity, decimal unitPrice);
        Task SyncCartAsync(int cartId, List<CartItem> cartItems);
        Task ClearCartAsync(int cartId);
    }
}
