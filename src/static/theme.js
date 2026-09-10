(function (globalScope) {
  const STORAGE_KEY = "preferredTheme";

  function normalizeTheme(theme) {
    return theme === "dark" ? "dark" : "light";
  }

  function getSavedTheme(storage) {
    try {
      return normalizeTheme(storage?.getItem(STORAGE_KEY));
    } catch (error) {
      return "light";
    }
  }

  function saveTheme(storage, theme) {
    const normalizedTheme = normalizeTheme(theme);

    try {
      storage?.setItem(STORAGE_KEY, normalizedTheme);
    } catch (error) {
      return normalizedTheme;
    }

    return normalizedTheme;
  }

  const api = {
    STORAGE_KEY,
    normalizeTheme,
    getSavedTheme,
    saveTheme,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  globalScope.themePreferences = api;
})(typeof window !== "undefined" ? window : globalThis);
