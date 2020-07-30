using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StrategyGame.Bll
{
    public class HttpResponseExceptionFilter : IActionFilter, IOrderedFilter
    {
        public int Order { get; set; } = int.MaxValue - 10;


        private ILogger _logger;

        public HttpResponseExceptionFilter(ILoggerFactory loggerFactory) 
        {
            _logger = loggerFactory.CreateLogger<HttpResponseExceptionFilter>();
        }

        public void OnActionExecuting(ActionExecutingContext context) { }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception is HttpResponseException exception)
            {
                context.Result = new ObjectResult(exception.Value)
                {
                    StatusCode = exception.Status,
                };
                _logger.LogError("{StatusCode} {Value}", exception.Status, exception.Value);
                context.ExceptionHandled = true;
            }
            else if (context.Exception is Exception ex)
            {
                context.Result = new ObjectResult(ex.Message + "\n\n" + ex.StackTrace)
                {
                    StatusCode = 500
                };
                _logger.LogError(ex.Message);
                context.ExceptionHandled = true;
            }
        }
    }
}
