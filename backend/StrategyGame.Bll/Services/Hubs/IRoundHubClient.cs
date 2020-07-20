using System.Threading.Tasks;

namespace StrategyGame.Bll.Services.Hubs
{
    public interface IRoundHubClient
    {
        public Task RefreshInfo();
    }
}
