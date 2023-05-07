namespace VetСlinicApi.Models;

public class Owner
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; }
    public string Typeofdocument { get; set; }
    public string SerialNumber { get; set; }
    public string Telephone { get; set; }
    public string Email { get; set; }
}