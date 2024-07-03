using Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class APIContext : IdentityDbContext<User>
    {
        public APIContext(DbContextOptions<APIContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; } 
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceDetail> InvoiceDetails { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Rating>  Ratings { get; set; }
        public DbSet<Voucher>  Vouchers { get; set; }
        public DbSet<Favourite>  Favourites { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<StatusInvoice> StatusInvoices { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<ActionManage> ActionManages { get; set; }
        public DbSet<Brand>  Brands { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Shipping> Shippings { get; set; }
        public DbSet<Transaction> Transactions { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>()
                .HasMany(p => p.CartItems)
                .WithOne(ci => ci.Product)
                .HasForeignKey(ci => ci.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Cart>()
                .HasMany(c => c.Items)
                .WithOne(ci => ci.Cart)
                .HasForeignKey(ci => ci.CartId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Order>().HasKey(o => o.Id);
            modelBuilder.Entity<OrderItem>().HasKey(oi => oi.OrderItemId);
            modelBuilder.Entity<PaymentMethod>().HasKey(pm => pm.Id);
            modelBuilder.Entity<Transaction>().HasKey(t => t.Id);
            //modelBuilder.Entity<Cart>()
            // .Property(c => c.UserId)
            // .IsRequired();
        }
    }
}
