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
                .NotEmpty()
                .Length(3, 30)
                .Matches("^[a-zA-Z0-9]*$")
                .WithMessage("User name can only contain letters and numbers.");
            RuleFor(user => user.CountryName)
                .NotEmpty()
                .Length(3, 30)
                .Matches("^[a-zA-Z0-9 ]*$")
                .WithMessage("Country name can only contain letters and numbers and space.")
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
