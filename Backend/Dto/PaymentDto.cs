namespace Backend.Dto
{
    public class PaymentDto
    {
        public int OrderId { get; set; }
        public int PaymentMethodId { get; set; }
        public string PaymentDetails { get; set; }
    }
}
