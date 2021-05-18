const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("Can enter office number using constructor argument", () => {
  const testValue = 100;
  const e = new Manager("ManPhone", 1, "test@test.com", testValue);
  expect(e.officeNumber).toBe(testValue);
});

test("getRole() returns \"Manager\"", () => {
  const testValue = "Manager";
  const e = new Manager("GetMan", 1, "test@test.com", 100);
  expect(e.getRole()).toBe(testValue);
});

test("Can get office number using getOffice()", () => {
  const testValue = 100;
  const e = new Manager("PhOff", 1, "test@test.com", testValue);
  expect(e.getOfficeNumber()).toBe(testValue);
});