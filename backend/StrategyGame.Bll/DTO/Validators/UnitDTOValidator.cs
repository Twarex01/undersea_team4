using FluentValidation;

namespace StrategyGame.Bll.DTO.Validators
{
    public class UnitDTOValidator : AbstractValidator<UnitDTO>
    {
        public UnitDTOValidator()
        {
            RuleFor(unit => unit.Count).GreaterThanOrEqualTo(0);
        }
    }
}
