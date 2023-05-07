using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VetСlinicApi.Db;
using VetСlinicApi.Models;

namespace VetСlinicApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnimalController : ControllerBase
{
    private readonly VetClinicDbContext _context;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public AnimalController(VetClinicDbContext context, IWebHostEnvironment webHostEnvironment)
    {
        _context = context;
        _webHostEnvironment = webHostEnvironment;
    }

    // GET: api/Animal
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Animal>>> GetAnimals()
    {
        return await _context.Animals.Include(a => a.Owner).ToListAsync();
    }

    // GET: api/Animal/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Animal>> GetById(int id)
    {
        var animal = await _context.Animals.FindAsync(id);

        if (animal == null)
        {
            return NotFound();
        }

        return animal;
    }

    // POST: api/Animal
    [HttpPost]
    public async Task<ActionResult<Animal>> PostAnimal([FromForm] AnimalViewModel animalViewModel)
    {
        string filePath = null;
        // проверяем, было ли загружено изображение
        if (animalViewModel.Image != null)
        {
            // генерируем уникальное имя файла, чтобы избежать перезаписи существующих файлов
            string uniqueFileName = Guid.NewGuid().ToString() + "_" + animalViewModel.Image.FileName;

            // определяем путь к папке wwwroot
            string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");

            // создаем папку uploads, если ее не существует
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // определяем путь к файлу, используя папку uploads и уникальное имя файла
            filePath = Path.Combine(uploadsFolder, uniqueFileName);

            // сохраняем файл в папке wwwroot/uploads
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await animalViewModel.Image.CopyToAsync(stream);
            }

            filePath = Path.Combine("uploads", uniqueFileName);
            filePath = "/" + filePath.Replace("\\", "/");
            
            
        }
        
        
        // создаем новую модель животного из представления
        var animal = new Animal
        {
            Name = animalViewModel.Name,
            Species = animalViewModel.Species,
            Gender = animalViewModel.Gender,
            BirthDate = animalViewModel.BirthDate.ToUniversalTime(),
            Age = animalViewModel.Age,
            Breed = animalViewModel.Breed,
            Color = animalViewModel.Color,
            OwnerId = animalViewModel.OwnerId,
            Image = filePath // сохраняем путь к изображению в модели животного
        };

        // добавляем животное в базу данных
        _context.Animals.Add(animal);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = animal.Id }, animal);
    }

    // PUT: api/Animal/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAnimal(int id, [FromForm] AnimalViewModel animalViewModel)
    {
        var animals = await _context.Animals.FindAsync(id);
        if (animals ==null)
            return BadRequest();
        string filePath = null;
        // проверяем, было ли загружено изображение
        if (animalViewModel.Image != null)
        {
            // генерируем уникальное имя файла, чтобы избежать перезаписи существующих файлов
            string uniqueFileName = Guid.NewGuid().ToString() + "_" + animalViewModel.Image.FileName;

            // определяем путь к папке wwwroot
            string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");

            // создаем папку uploads, если ее не существует
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // определяем путь к файлу, используя папку uploads и уникальное имя файла
            filePath = Path.Combine(uploadsFolder, uniqueFileName);

            // сохраняем файл в папке wwwroot/uploads
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await animalViewModel.Image.CopyToAsync(stream);
            }

            filePath = Path.Combine("uploads", uniqueFileName);
            filePath = "/" + filePath.Replace("\\", "/");
            
            
        }
        
        
        // создаем новую модель животного из представления

        animals.Name = animalViewModel.Name;
        animals.Species = animalViewModel.Species;
        animals.Gender = animalViewModel.Gender;
        animals.BirthDate = animalViewModel.BirthDate.ToUniversalTime();
        animals.Age = animalViewModel.Age;
        animals.Breed = animalViewModel.Breed;
        animals.Color = animalViewModel.Color;
        animals.OwnerId = animalViewModel.OwnerId;
        animals.Image = filePath; // сохраняем путь к изображению в модели животного
        
        
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = animals.Id }, animals);
    }

    // DELETE: api/Animal/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAnimal(int id)
    {
        var animal = await _context.Animals.FindAsync(id);
        if (animal == null)
        {
            return NotFound();
        }

        _context.Animals.Remove(animal);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AnimalExists(int id)
    {
        return _context.Animals.Any(e => e.Id == id);
    }
}
