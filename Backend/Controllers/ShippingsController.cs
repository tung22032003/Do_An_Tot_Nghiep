using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingsController : ControllerBase
    {
        private readonly IShippingService _shippingService;

        public ShippingsController(IShippingService shippingService)
        {
            _shippingService = shippingService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shipping>>> GetShippings()
        {
            var shippings = await _shippingService.GetShippingsAsync();
            return Ok(shippings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shipping>> GetShipping(int id)
        {
            var shipping = await _shippingService.GetShippingByIdAsync(id);
            if (shipping == null)
            {
                return NotFound();
            }
            return Ok(shipping);
        }

        [HttpPost]
        public async Task<ActionResult<Shipping>> AddShipping(Shipping shipping)
        {
            await _shippingService.AddShippingAsync(shipping);
            return CreatedAtAction(nameof(GetShipping), new { id = shipping.Id }, shipping);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShipping(int id, Shipping shipping)
        {
            if (id != shipping.Id)
            {
                return BadRequest();
            }
            await _shippingService.UpdateShippingAsync(shipping);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShipping(int id)
        {
            await _shippingService.DeleteShippingAsync(id);
            return NoContent();
        }
    }
}
