using Microsoft.EntityFrameworkCore;
using VetСlinicApi.Models;

namespace VetСlinicApi.Db;

public class VetClinicDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Owner>Owners { get; set; }
    public DbSet<Animal>Animals { get; set; }
    public DbSet<Appointment>Appointments { get; set; }
    public DbSet<Diagnosis>Diagnoses { get; set; }

    public VetClinicDbContext(DbContextOptions<VetClinicDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>().HasData(
            new User()
            {
                Id = 1,
                FullName = "John Doe",
                DateOfBirth = new DateTime(1990, 1, 1).ToUniversalTime(),
                HireDate = DateTime.UtcNow,
                Position = "Registrar",
                Qualification = "Master",
                Username = "registrar",
                Password = "password",
                Role = UserRole.Registrar
                    
            }
        );
    }
}