using FluentValidation;
using StrategyGame.Bll.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Bll.Services.Validators
{
    public class SendExplorationDTOValidator : AbstractValidator<SendExplorationDTO>
    {
        public SendExplorationDTOValidator()
        {
            RuleFor(expl => expl.NumberOfExplorers).GreaterThanOrEqualTo(0);
        }
    }
}
