using FluentValidation;
using StrategyGame.Dal;
using StrategyGame.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StrategyGame.Bll.Services.Validators
{
    public class UserValidator : AbstractValidator<User>
    {
        private IEnumerable<Country> _countries;

        public UserValidator(IEnumerable<Country> countries)
        {
            _countries = countries;
            RuleFor(user => user.UserName).NotEmpty().Length(3, 30).Matches("[A-Za-z0-9]");
            RuleFor(user => user.Country.Name).NotEmpty().Length(3, 30).Matches("[A-Za-z0-9]").Must(IsCountryNameUnique).WithMessage("Country name already exists.");
        }

        public bool IsCountryNameUnique(string newCountryName)
        {
            return !_countries.Any(country =>
              country.Name.ToUpper().Trim()
              .Equals(newCountryName.ToUpper().Trim()));
        }

    }
}
