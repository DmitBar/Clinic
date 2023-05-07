using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using VetСlinicApi.Models;

namespace VetСlinicApi.Helpers;

public static class UserHelper
{
    public static string GenerateJwtToken(this IConfiguration configuration, User user)
    {
        var secretKey = "VetClinicApi12345";
        var key = Encoding.UTF8.GetBytes(secretKey);
            
        
        var claims = new List<Claim>() {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim (ClaimTypes.Role, user.Role.ToString())
        };
        var tokens = new JwtSecurityToken(
            issuer: "test",
            audience: "test",
            claims: claims,
            expires: DateTime.UtcNow.AddDays(3),
            signingCredentials:  new SigningCredentials(
                new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256)
        );

        var token = new JwtSecurityTokenHandler().WriteToken(tokens);
        return token;
        
    }
    public static void ConfigureJwt(this IServiceCollection services)
    {
        services.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            const string secretKey = "VetClinicApi12345";
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidIssuer = "test",
                ValidateAudience = true,
                ValidAudience = "test",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };
            options.Events = new JwtBearerEvents
            {
                OnChallenge = context =>
                {
                    context.HandleResponse();
                    context.Response.StatusCode = 200;
                    context.Response.ContentType = "application/json";
                    var response = JsonConvert.SerializeObject(new Response
                    {
                        StatusCode = (int)HttpStatusCode.Unauthorized,
                        Message = "Пользователь не авторизован!"
                    });
                    return context.Response.WriteAsync(response);
                },
                OnForbidden = context =>
                {
                    context.Response.StatusCode = 200;
                    context.Response.ContentType = "application/json";
                    var response = JsonConvert.SerializeObject(new Response
                    {
                        StatusCode = (int)HttpStatusCode.Forbidden,
                        Message = "Нет доступа!"
                    });
                    return context.Response.WriteAsync(response);
                }
            };
        });
    }
}
public class Response
{
    public int  StatusCode { get; set; }
    public string Message { get; set; }
}
