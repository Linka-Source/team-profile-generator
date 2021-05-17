const Employee = require("../lib/Employee");

test("Can create Employee", () => {
  const e = new Employee();
  expect(typeof(e)).toBe("object");
});

test("Can set name of employee using constructor arguments", () => {
  const name = "Bob";
  const e = new Employee(name);
  expect(e.name).toBe(name);
});

test("Can set employee id using constructor argument", () => {
  const testValue = 100;
  const e = new Employee("SetID", testValue);
  expect(e.id).toBe(testValue);
});

test("Can add email address using constructor argument", () => {
  const testValue = "test@test.com";
  const e = new Employee("EamilSet", 1, testValue);
  expect(e.email).toBe(testValue);
});

test("Can get name via getName()", () => {
  const testValue = "Bob";
  const e = new Employee(testValue);
  expect(e.getName()).toBe(testValue);
});

test("Can get emplyee id using getId()", () => {
  const testValue = 100;
  const e = new Employee("GotID", testValue);
  expect(e.getId()).toBe(testValue);
});

test("Can get email address using getEmail()", () => {
  const testValue = "test@test.com";
  const e = new Employee("GotEmail", 1, testValue);
  expect(e.getEmail()).toBe(testValue);
});

test("getRole() should return \"Employee\"", () => {
  const testValue = "Employee";
  const e = new Employee("Bob", 1, "test@test.com");
  expect(e.getRole()).toBe(testValue);
});
