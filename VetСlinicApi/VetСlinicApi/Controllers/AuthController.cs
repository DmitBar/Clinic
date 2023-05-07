using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using VetСlinicApi.Db;
using VetСlinicApi.Helpers;
using VetСlinicApi.Models;

namespace VetСlinicApi.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly VetClinicDbContext _dbContext;

        public AuthController(IConfiguration config, VetClinicDbContext dbContext)
        {
            _config = config;
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginViewModel loginViewModel)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Username == loginViewModel.Username && x.Password == loginViewModel.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            var jWtToken = _config.GenerateJwtToken(user);

            return Ok(new { jWtToken });
        }

        [HttpPost("register")]
        [Authorize(AuthenticationSchemes = "Bearer",Policy = "RequireRole")]
        public async Task<IActionResult> Register(RegisterViewModel registerViewModel)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Username == registerViewModel.Username);

            if (user != null)
            {
                return BadRequest("User already exists");
            }

            var newUser = new User
            {
                FullName = registerViewModel.FullName,
                Qualification = registerViewModel.Qualification,
                Position = registerViewModel.Position,
                DateOfBirth = registerViewModel.DateOfBirth,
                HireDate =DateTime.UtcNow,
                Username = registerViewModel.Username,
                Password = registerViewModel.Password,
                Role = registerViewModel.Role
            };

            await _dbContext.Users.AddAsync(newUser);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }