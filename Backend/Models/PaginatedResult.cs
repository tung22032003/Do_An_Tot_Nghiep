namespace Backend.Models
{
    public class PaginatedResult<T>
    {
        public IEnumerable<T> Users { get; set; }
        public int TotalPages { get; set; }
    }
}
