
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StrategyGame.Api.Services
{
	public class JwtService : IJwtService
	{

		private IConfiguration _config;

		public JwtService(IConfiguration config)
		{
			_config = config;
		}

		public string GenerateSecurityToken(Model.User user)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.UTF8.GetBytes(_config.GetValue<string>("JwtConfig:secret"));
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Audience = _config.GetValue<string>("JwtConfig:audience"),
				Issuer = _config.GetValue<string>("JwtConfig:issuer"),
				Subject = new ClaimsIdentity(new[]
				{
					new Claim(ClaimTypes.Name, user.Id),

				}),
				Expires = DateTime.UtcNow.AddHours(1),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);

			return tokenHandler.WriteToken(token);
		}
	}
}
