using System.ComponentModel.DataAnnotations.Schema;

namespace VetСlinicApi.Models;

public class AnimalViewModel
{
    public string Name { get; set; }
    public string Species { get; set; }
    public string Gender { get; set; }
    public DateTime BirthDate { get; set; }
    
    public int Age { get; set; }
    public string Breed { get; set; }
    public string Color { get; set; }
    public int OwnerId { get; set; }
    public IFormFile Image { get; set; }
}