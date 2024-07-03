using Backend.Data;
using Backend.Dto;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Backend.Service
{
    public class PaymentMethodService : IPaymentMethodService
    {
        private readonly APIContext _context;

        public PaymentMethodService(APIContext context)
        {
            _context = context;
        }
        public async Task<PaymentMethod> CreateAsync(PaymentMethod paymentMethod)
        {
            _context.PaymentMethods.Add(paymentMethod);
            await _context.SaveChangesAsync();
            return paymentMethod;
        }


        public async Task DeleteAsync(int id)
        {
            var paymentMethod = await _context.PaymentMethods.FindAsync(id);
            if (paymentMethod != null)
            {
                _context.PaymentMethods.Remove(paymentMethod);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<PaymentMethod>> GetAllAsync()
        {
            return await _context.PaymentMethods.ToListAsync();
        }

        public async Task<PaymentMethod> GetByIdAsync(int id)
        {
            return await _context.PaymentMethods.FindAsync(id);
        }

        public async Task UpdateAsync(PaymentMethod paymentMethod)
        {
            _context.PaymentMethods.Update(paymentMethod);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> ProcessPaymentAsync(PaymentDto paymentDto)
        {
            var order = await _context.Orders.FindAsync(paymentDto.OrderId);
            if (order == null)
            {
                return false; // Order not found
            }

            // Assuming payment verification is done here
            var paymentVerified = VerifyPayment(paymentDto);
            if (!paymentVerified)
            {
                return false; // Payment verification failed
            }

            // Create a new transaction
            var transaction = new Transaction
            {
                OrderId = paymentDto.OrderId,
                PaymentMethodId = paymentDto.PaymentMethodId,
                Amount = order.Total,
                TransactionDate = DateTime.Now,
                Status = "Completed"
            };

            _context.Transactions.Add(transaction);
            order.OrderStatus = "Paid";
            await _context.SaveChangesAsync();
            return true;
        }

        private bool VerifyPayment(PaymentDto paymentDto)
        {
            // Here you would integrate with a payment gateway to verify the payment
            // For simplicity, let's assume the payment is always verified successfully
            return true;
        }
    }
}
