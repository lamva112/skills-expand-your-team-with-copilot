const test = require("node:test");
const assert = require("node:assert/strict");

const {
  STORAGE_KEY,
  getSavedTheme,
  saveTheme,
} = require("./theme.js");

test("getSavedTheme restores a saved dark theme", () => {
  const storage = {
    getItem(key) {
      assert.equal(key, STORAGE_KEY);
      return "dark";
    },
  };

  assert.equal(getSavedTheme(storage), "dark");
});

test("getSavedTheme falls back to light when storage access fails", () => {
  const storage = {
    getItem() {
      throw new Error("storage blocked");
    },
  };

  assert.equal(getSavedTheme(storage), "light");
});

test("saveTheme stores the selected theme when storage is available", () => {
  const calls = [];
  const storage = {
    setItem(key, value) {
      calls.push([key, value]);
    },
  };

  const savedTheme = saveTheme(storage, "dark");

  assert.equal(savedTheme, "dark");
  assert.deepEqual(calls, [[STORAGE_KEY, "dark"]]);
});

test("saveTheme keeps working when storage writes fail", () => {
  const storage = {
    setItem() {
      throw new Error("storage blocked");
    },
  };

  assert.equal(saveTheme(storage, "dark"), "dark");
});
