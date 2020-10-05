using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserApp.Models;
using UserApp.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LoginApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetUser(string id)
        {

            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);

        }

        [Route("ValidateUser")]
        [HttpGet(Name = "ValidateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ValidateUser(string mobileNumber, string password)
        {

            var user = _userService.ValidateUser(mobileNumber,password);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);

        }

        [Route("CreateUser")]
        [HttpPost(Name = "CreateUser")]
        public ActionResult<User> CreateUser(User user)
        {
            _userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
        }
    }
}
