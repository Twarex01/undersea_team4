
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace StrategyGame.Bll.Hubs
{
    public class RoundHub : Hub
    {
        public async Task RefreshData()
        {
            await Clients.All.SendAsync("RefreshData");
        }
    }
}
