using Backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionManagesController : ControllerBase
    {
        private readonly IActionManageRepository _actionManageRepo;
        public ActionManagesController(IActionManageRepository actionManageRepo)
        {
            _actionManageRepo=actionManageRepo;
        }

    }
}
