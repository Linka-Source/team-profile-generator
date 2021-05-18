const Engineer = require("../lib/Engineer");

test("Can enter GitHUb account using constructor", () => {
  const testValue = "GitHubUser";
  const e = new Engineer("GotGit", 1, "test@test.com", testValue);
  expect(e.github).toBe(testValue);
});

test("getRole() returns \"Engineer\"", () => {
  const testValue = "Engineer";
  const e = new Engineer("GotRole", 1, "test@test.com", "GitHubUser");
  expect(e.getRole()).toBe(testValue);
});

test("Can get GitHub username using getGithub()", () => {
  const testValue = "GitHubUser";
  const e = new Engineer("UseGit", 1, "test@test.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});