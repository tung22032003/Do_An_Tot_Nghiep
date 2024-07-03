using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("StatusInvoice")]
    public class StatusInvoice
    {
        [Key]
        public int Id { get; set; }
        public Boolean IsPaid { get; set; }
        public Boolean IsBeingShipped { get; set; }
        public Boolean IsShipped { get; set; }
        public Boolean IsCompleted { get; set; }
        public Boolean IsCancelled { get; set; }
        public int InvoiceId { get; set; }
        public Invoice? Invoice { get; set; }
    }
}
