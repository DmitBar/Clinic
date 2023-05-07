using Microsoft.AspNetCore.Mvc;
using VetСlinicApi.Db;
using VetСlinicApi.Models;

namespace VetСlinicApi.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class OwnerController : ControllerBase
    {
        private readonly VetClinicDbContext _dbContext;

        public OwnerController(VetClinicDbContext dbContext, ILogger<OwnerController> logger)
        {
            _dbContext = dbContext;
 
        }

        // GET /owner
        [HttpGet]
        public IEnumerable<Owner> Get()
        {
            return _dbContext.Owners.ToList();
        }

        // GET /owner/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var owner = _dbContext.Owners.FirstOrDefault(o => o.Id == id);
            if (owner == null)
            {
                return NotFound();
            }
            return Ok(owner);
        }

        // POST /owner
        [HttpPost]
        public IActionResult Post([FromBody] Owner owner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            _dbContext.Owners.Add(owner);
            _dbContext.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = owner.Id }, owner);
        }

        // PUT /owner/{id}
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Owner owner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var existingOwner = _dbContext.Owners.FirstOrDefault(o => o.Id == id);
            if (existingOwner == null)
            {
                return NotFound();
            }
            existingOwner.FullName = owner.FullName;
            existingOwner.DateOfBirth = owner.DateOfBirth;
            existingOwner.Gender = owner.Gender;
            existingOwner.Typeofdocument = owner.Typeofdocument;
            existingOwner.SerialNumber = owner.SerialNumber;
            existingOwner.Telephone = owner.Telephone;
            existingOwner.Email = owner.Email;
            _dbContext.SaveChanges();
            return Ok(existingOwner);
        }

        // DELETE /owner/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var owner = _dbContext.Owners.FirstOrDefault(o => o.Id == id);
            if (owner == null)
            {
                return NotFound();
            }
            _dbContext.Owners.Remove(owner);
            _dbContext.SaveChanges();
            return Ok();
        }
    }