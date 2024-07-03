namespace Backend.Interfaces
{
    public interface IUnitOfWork
    {
        ICartService CartService { get; }
        Task<bool> Complete();
    }
}
