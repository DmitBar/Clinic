using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VetСlinicApi.Db;
using VetСlinicApi.Models;

namespace VetСlinicApi.Controllers;


[ApiController]
[Route("api/[controller]")]
public class DiagnosisController : ControllerBase
{
    private readonly VetClinicDbContext _context;

    public DiagnosisController(VetClinicDbContext context)
    {
        _context = context;
    }

    // GET: api/Diagnosis
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Diagnosis>>> GetDiagnosis()
    {
        return await _context.Diagnoses.Include(a => a.Appointment).ToListAsync();
    }

    // GET: api/Diagnosis/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Diagnosis>> GetDiagnosis(int id)
    {
        var diagnosis = await _context.Diagnoses.FindAsync(id);

        if (diagnosis == null)
        {
            return NotFound();
        }

        return diagnosis;
    }

    // PUT: api/Diagnosis/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDiagnosis(int id, DiagnosisViewModel diagnosis)
    {
        var diagId = await _context.Diagnoses.FindAsync(id);
        if (diagId ==null)
            return BadRequest();

        diagId.Description = diagnosis.Description;
        diagId.Medicines = diagnosis.Medicines;
        diagId.Price = diagnosis.Price;
        diagId.AppointmentId = diagnosis.AppointmentId;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DiagnosisExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Diagnosis
    [HttpPost]
    public async Task<ActionResult<Diagnosis>> PostDiagnosis(DiagnosisViewModel diagnosis)
    {
        var diagn = new Diagnosis
        {

            Description = diagnosis.Description,
            Medicines = diagnosis.Medicines,
            Price = diagnosis.Price,
            AppointmentId = diagnosis.AppointmentId,
        };
        _context.Diagnoses.Add(diagn);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetDiagnosis", new { id = diagn.Id }, diagnosis);
    }

    // DELETE: api/Diagnosis/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Diagnosis>> DeleteDiagnosis(int id)
    {
        var diagnosis = await _context.Diagnoses.FindAsync(id);
        if (diagnosis == null)
        {
            return NotFound();
        }

        _context.Diagnoses.Remove(diagnosis);
        await _context.SaveChangesAsync();

        return diagnosis;
    }

    private bool DiagnosisExists(int id)
    {
        return _context.Diagnoses.Any(e => e.Id == id);
    }
}