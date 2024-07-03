using Backend.Data;
using Backend.Dto;
using Backend.Helpers;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly APIContext _context;
        private readonly ICartService _cartService;

        public CartsController(ICartService cartService, APIContext context)
        {
            _context = context;
            _cartService = cartService;
        }

        [HttpGet("{cartId}")]
        [AllowAnonymous]
        public async Task<ActionResult<Cart>> GetCart(int cartId)
        {
            try
            {
                var cart = await _cartService.GetCartAsync(cartId);
                if (cart == null)
                {
                    return NotFound(new { message = $"No data found for cart with id {cartId}" });
                }
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }

        [HttpPost("items/{cartId}")]
        public async Task<IActionResult> AddToCart(int cartId, [FromBody] CartItem cartItem)
        {
            try
            {
                if (cartItem.ProductId == 0)
                {
                    return BadRequest(new { message = "Invalid ProductId." });
                }

                await _cartService.AddToCartAsync(cartId, cartItem.ProductId, cartItem.Quantity);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }

        [HttpPost("syncCart/{cartId}")]
        public async Task<IActionResult> SyncCart(int cartId, [FromBody] List<CartItem> cartItems)
        {
            try
            {
                await _cartService.SyncCartAsync(cartId, cartItems);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }

        [HttpPost("checkout/{cartId}")]
        public async Task<IActionResult> Checkout(int cartId, [FromBody] CheckoutDto checkoutDto)
        {
            try
            {
                var cart = await _cartService.GetCartAsync(cartId);
                if (cart == null)
                {
                    return NotFound(new { message = $"No cart found with id {cartId}" });
                }

                cart.Items.Clear();
                await _context.SaveChangesAsync();

                return Ok(new { message = "Checkout successful and cart cleared." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }

        [HttpPut("items/{cartId}/{productId}")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateCartItem(int cartId, int productId, [FromBody] UpdateCartItemDto updateCartItemDto)
        {
            try
            {
                if (productId != updateCartItemDto.ProductId)
                {
                    return BadRequest(new { message = "Product ID mismatch" });
                }

                await _cartService.UpdateCartItemAsync(cartId, productId, updateCartItemDto.Quantity, updateCartItemDto.UnitPrice);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }

        [HttpDelete("items/{cartId}/{productId}")]
        public async Task<IActionResult> RemoveCart(int cartId, int productId)
        {
            try
            {
                await _cartService.RemoveFromCartAsync(cartId, productId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, details = ex.InnerException?.Message });
            }
        }
    }
}
