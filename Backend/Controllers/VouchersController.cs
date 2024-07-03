using AutoMapper;
using Backend.Dto;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VouchersController : ControllerBase
    {
        private readonly IVoucherRepository _voucherRepo;
        private readonly IMapper _mapper;
        public VouchersController(IVoucherRepository voucherRepo,IMapper mapper)
        {
            _mapper = mapper;
            _voucherRepo = voucherRepo;
        }
        [HttpGet]
        public async Task<List<Voucher>> GetVouchers()
        {
            return await _voucherRepo.GetAllVouchersAsync();
        }
        [HttpGet("{id}")]
        public async Task<Voucher> GetVoucherByIdAsync(int id)
        {
            return await _voucherRepo.GetVoucherByIdAsync(id);
        }
        [HttpPost]
        public async Task<IActionResult> AddVoucherAsync(VoucherDto voucherDto)
        {
           
            try
            {
                var voucher = _mapper.Map<Voucher>(voucherDto);
                await _voucherRepo.AddVoucherAsync(voucher);
                return Ok("Voucher đã được thêm thành công !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public async Task UpdateVoucherAsync(Voucher voucher)
        {
            try
            {
                await _voucherRepo.UpdateVoucherAsync(voucher);
            }
            catch(Exception ex)
            {
                BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        public async Task DeleteVoucherAsync(int id)
        {
            try
            {
                await _voucherRepo.DeleteVoucherAsync(id);
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
        }
    }
}
