const { element, browser } = require("protractor");

describe("Buildings Page", () => {
  function nextRound() {
    var nextRoundBtn = element(by.id("nextRoundBtn"));
    nextRound.click();
  }

  beforeEach(() => {
    browser.get("http://localhost:4200/buildings");
  });

  it("shouldn't be able to buy two buildings", () => {
    var buildings = element.all(by.css(".building-card-item"));
    var buyButton = element(by.id("buyBtn"));

    buildings.first().click();
    buyButton.click();

    expect(buyButton.isEnabled()).toBe(false);

  });
});
