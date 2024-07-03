using System.ComponentModel;

namespace Backend.Dto
{
    public class VoucherDto
    {
        public string VoucherCode { get; set; }
        public string Discount { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndDate { get; set; }
        public Boolean Status { get; set; }
    }
}
