namespace VetСlinicApi.Models;

public class AppointmentViewModel
{
    public DateTime Date { get; set; }
    public double Weight { get; set; }
    public string Type { get; set; }
    public string DoctorName { get; set; }
    public string ExaminationDescription { get; set; }

    public int AnimalId {get; set; }
}