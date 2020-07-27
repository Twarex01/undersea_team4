const { element, browser } = require("protractor");

describe("Buildings Page", () => {
  it("should have buildings", () => {
    browser.get("http://localhost:4200/buildings");
    var buildings = element.all(by.css(".building-card-item"));
    expect(buildings.count()).toBeGreaterThan(0);
  });
});
