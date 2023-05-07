namespace VetСlinicApi.Models;

public class Animal
{
    public int Id { get; set; }
    public string? Image { get; set; } 
    public string Name { get; set; } // кличка
    public string Species { get; set; } // вид
    public string Gender { get; set; } // пол
    public DateTime BirthDate { get; set; } // дата рождения
    public int Age { get; set; } // возраст
    public string Breed { get; set; } // порода
    public string Color { get; set; } // окрас
    
    public int OwnerId { get; set; }
    public  Owner Owner { get; set; }
}