using Backend.Data;
using Backend.Dto;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service
{
    public class CartService : ICartService
    {
        private readonly APIContext _context;

        public CartService(APIContext context)
        {
            _context = context;
        }

        public async Task AddToCartAsync(int cartId, int productId, int quantity)
        {
            try
            {
                // Kiểm tra nếu sản phẩm tồn tại
                var product = await _context.Products.FindAsync(productId);
                if (product == null)
                {
                    throw new Exception("Sản phẩm không tồn tại.");
                }

                var cart = await _context.Carts.Include(c => c.Items).ThenInclude(i => i.Product).FirstOrDefaultAsync(c => c.Id == cartId);
                if (cart == null)
                {
                    cart = new Cart { Id = cartId }; // Tạo giỏ hàng mới với cartId
                    _context.Carts.Add(cart);
                    await _context.SaveChangesAsync(); // Lưu cart để lấy Id tự động tăng
                }

                var cartItem = cart.Items.FirstOrDefault(i => i.ProductId == productId);
                if (cartItem == null)
                {
                    cartItem = new CartItem { ProductId = productId, Quantity = quantity, CartId = cart.Id };
                    cart.Items.Add(cartItem);
                }
                else
                {
                    cartItem.Quantity += quantity;
                    cartItem.UnitPrice = product.Price * cartItem.Quantity;
                }

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException?.Message ?? "No inner exception";
                throw new Exception($"An error occurred while saving the entity changes. See the inner exception for details: {innerException}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}", ex);
            }
        }

        public async Task RemoveFromCartAsync(int cartId, int productId)
        {
            try
            {
                var cart = await _context.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.Id == cartId);
                if (cart == null)
                {
                    throw new Exception("Cart does not exist.");
                }

                var cartItem = cart.Items.FirstOrDefault(i => i.ProductId == productId);
                if (cartItem != null)
                {
                    cart.Items.Remove(cartItem);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}", ex);
            }
        }

        public async Task<Cart> GetCartAsync(int cartId)
        {
            return await _context.Carts.Include(c => c.Items).ThenInclude(i => i.Product).FirstOrDefaultAsync(c => c.Id == cartId);
        }

        public async Task UpdateCartItemAsync(int cartId, int productId, int quantity, decimal unitPrice)
        {
            try
            {
                var cart = await _context.Carts.Include(c => c.Items).ThenInclude(i => i.Product).FirstOrDefaultAsync(c => c.Id == cartId);
                if (cart == null)
                {
                    throw new Exception("Giỏ hàng không tồn tại.");
                }

                var cartItem = cart.Items.FirstOrDefault(i => i.ProductId == productId);
                if (cartItem == null)
                {
                    throw new Exception("Sản phẩm không tồn tại trong giỏ hàng.");
                }

                if (quantity <= 0)
                {
                    cart.Items.Remove(cartItem);
                }
                else
                {
                    cartItem.Quantity = quantity;
                    cartItem.UnitPrice = unitPrice;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}", ex);
            }
        }

        public async Task SyncCartAsync(int cartId, List<CartItem> cartItems)
        {
            try
            {
                var cart = await _context.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.Id == cartId);
                if (cart == null)
                {
                    cart = new Cart { Id = cartId };
                    _context.Carts.Add(cart);
                    await _context.SaveChangesAsync();
                }

                foreach (var item in cartItems)
                {
                    await AddToCartAsync(cart.Id, item.ProductId, item.Quantity);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}", ex);
            }
        }

        public async Task ClearCartAsync(int cartId)
        {
            var cart = await _context.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.Id == cartId);
            if (cart != null)
            {
                cart.Items.Clear();
                await _context.SaveChangesAsync();
            }
        }
    }
}
