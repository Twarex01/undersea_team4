namespace StrategyGame.Api.Services
{
	public interface IJwtService
	{
		public string GenerateSecurityToken(Model.User user);
	}
}