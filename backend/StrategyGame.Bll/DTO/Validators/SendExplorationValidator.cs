using FluentValidation;
using StrategyGame.Bll.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Bll.Services.Validators
{
    public class SendExplorationValidator : AbstractValidator<SendExplorationDTO>
    {
        public SendExplorationValidator()
        {
            RuleFor(expl => expl.NumberOfExplorers).GreaterThanOrEqualTo(0);
        }
    }
}
