using Backend.Data;
using Backend.Helpers;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceDetailsController : ControllerBase
    {
        private readonly IInvoiceDetailRepository _invoiceDetailRepo;
        public InvoiceDetailsController(IInvoiceDetailRepository invoiceDetailRepos)
        {
            _invoiceDetailRepo = invoiceDetailRepos;
        }
        [HttpGet]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<List<InvoiceDetail>> GetAll()
        {
            return await _invoiceDetailRepo.GetAll();

        }
        [HttpGet("{id}")]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<InvoiceDetail> GetById(int id)
        {
            return await _invoiceDetailRepo.GetById(id);
        }
        [HttpPost]
        [Authorize(Roles = ApplicationRole.User)]
        public async Task<IActionResult> Add(InvoiceDetail invoiceDetail)
        {
            try
            {
                await _invoiceDetailRepo.Add(invoiceDetail);
                return Ok("Thêm thành công !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update(InvoiceDetail invoiceDetail)
        {
            try
            {
                await _invoiceDetailRepo.Update(invoiceDetail);
                return Ok("Cập nhật thành công!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        [Authorize(Roles = ApplicationRole.Admin )]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _invoiceDetailRepo.Delete(id);
                return Ok("Xóa thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
