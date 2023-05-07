namespace VetСlinicApi.Models;

public class RegisterViewModel
{
    public string FullName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Position { get; set; }
    public string Qualification { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public UserRole Role { get; set; }
}