using Backend.Dto;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodsController : ControllerBase
    {
        private readonly IPaymentMethodService _paymentMethodService;

        public PaymentMethodsController(IPaymentMethodService paymentMethodService)
        {
            _paymentMethodService = paymentMethodService;

        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var paymentMethods = await _paymentMethodService.GetAllAsync();
            return Ok(paymentMethods);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var paymentMethod = await _paymentMethodService.GetByIdAsync(id);
            if (paymentMethod == null)
            {
                return NotFound();
            }
            return Ok(paymentMethod);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PaymentMethod paymentMethod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdPaymentMethod = await _paymentMethodService.CreateAsync(paymentMethod);
            return CreatedAtAction(nameof(Get), new { id = createdPaymentMethod.Id }, createdPaymentMethod);
        }
        [HttpPost("process")]
        public async Task<IActionResult> ProcessPayment(PaymentDto paymentDto)
        {
            var result = await _paymentMethodService.ProcessPaymentAsync(paymentDto);
            if (result)
            {
                return Ok();
            }
            return BadRequest("Payment processing failed");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] PaymentMethod paymentMethod)
        {
            if (id != paymentMethod.Id)
            {
                return BadRequest();
            }

            await _paymentMethodService.UpdateAsync(paymentMethod);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _paymentMethodService.DeleteAsync(id);
            return NoContent();
        }
    }
}
