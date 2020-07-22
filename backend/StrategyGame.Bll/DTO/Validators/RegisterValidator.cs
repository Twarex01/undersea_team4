using FluentValidation;
using StrategyGame.Bll.DTO.common;
using StrategyGame.Dal;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StrategyGame.Bll.Services.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterDTO>
    {
        private IEnumerable<Country> _countries;

        public RegisterValidator(IEnumerable<Country> countries)
        {
            _countries = countries;
            RuleFor(user => user.UserName)
                .NotEmpty();
            RuleFor(user => user.CountryName)
                .NotEmpty()
                .Must(IsCountryNameUnique).WithMessage("Country name already exists.");
        }

        public bool IsCountryNameUnique(string newCountryName)
        {
            return !_countries.Any(country =>
              country.Name.ToUpper().Trim()
              .Equals(newCountryName.ToUpper().Trim()));
        }

    }
}
