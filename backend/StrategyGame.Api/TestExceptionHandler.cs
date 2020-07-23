using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Api
{
	public class TestExceptionHandler
	{
		private readonly RequestDelegate next;

		public TestExceptionHandler(RequestDelegate next)
		{
			this.next = next;
		}

		public async Task InvokeAsync(HttpContext context, ILogger<TestExceptionHandler> logger)
		{
			try
			{
				await next(context);
			}
			catch (Exception e)
			{
				context.Response.StatusCode = 500;
				await context.Response.WriteAsync(JsonConvert.SerializeObject(new
				{
					Type = e.GetType().FullName,
					e.Message,
					e.StackTrace
				}));
				logger.LogError(e.Message, e);
			}
		}
	}
}
