using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VetСlinicApi.Db;
using VetСlinicApi.Models;

namespace VetСlinicApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentController : ControllerBase
{
    private readonly VetClinicDbContext _context;

    public AppointmentController(VetClinicDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
    {
        return await _context.Appointments.Include(a => a.Animal).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Appointment>> GetAppointment(int id)
    {
        var appointment = await _context.Appointments.FindAsync(id);

        if (appointment == null)
        {
            return NotFound();
        }

        return appointment;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAppointment(int id, AppointmentViewModel appointment)
    {
        var appoinId = await _context.Appointments.FindAsync(id);
        if (appoinId ==null)
            return BadRequest();

        appoinId.Date = appointment.Date;
        appoinId.Type = appointment.Type;
        appoinId.Weight = appointment.Weight;
        appoinId.DoctorName = appointment.DoctorName;
        appoinId.ExaminationDescription = appointment.ExaminationDescription;
        appoinId.AnimalId = appointment.AnimalId;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AppointmentExists(id))
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

    [HttpPost]
    public async Task<ActionResult<Appointment>> PostAppointment(AppointmentViewModel appointment)
    {
        var appoin = new Appointment
        {

            Date = appointment.Date,
            Weight = appointment.Weight,
            Type = appointment.Type,
            DoctorName = appointment.DoctorName,
            ExaminationDescription = appointment.ExaminationDescription,
            AnimalId = appointment.AnimalId,
        };
        _context.Appointments.Add(appoin);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetAppointment", new { id = appoin.Id }, appoin);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAppointment(int id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null)
        {
            return NotFound();
        }

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AppointmentExists(int id)
    {
        return _context.Appointments.Any(e => e.Id == id);
    }
}