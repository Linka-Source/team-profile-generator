const Intern = require("../lib/Intern");

test("Can enter school name using constructor", () => {
  const testValue = "Adelaide High";
  const e = new Intern("School", 1, "test@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole() returns \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("GotInt", 1, "test@test.com", "UCLA");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school using getSchool()", () => {
  const testValue = "Adelaide High";
  const e = new Intern("GetSch", 1, "test@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});