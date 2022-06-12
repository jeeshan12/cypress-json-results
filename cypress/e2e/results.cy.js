describe("Specs for cypress json results", () => {
  it("Test json results with fileName provides in options", () => {
    let options = {
      on: "on",
      filename: "options.json",
    };
    const defaults = {
      filename: "results.json",
    };
    options = { ...defaults, ...options };
    expect(options).to.deep.equal({
      on: "on",
      filename: "options.json",
    });
  });

  it("Test json results with defualt  fileName", () => {
    let options = {
      on: "on",
    };
    const defaults = {
      filename: "results.json",
    };
    options = { ...defaults, ...options };
    expect(options).to.deep.equal({
      on: "on",
      filename: "results.json",
    });
  });
});
