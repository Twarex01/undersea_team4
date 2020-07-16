
using Microsoft.AspNetCore.SignalR;
using StrategyGame.Bll.Services.Hubs;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Hubs
{
    public class RoundHub : Hub<IRoundHubClient>
    {
        public async Task RefreshAllInfo()
        {
            await Clients.All.RefreshInfo();
        }
    }
}
