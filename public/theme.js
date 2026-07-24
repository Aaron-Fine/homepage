(() => {
  const storageKey = "ourfinefamily-theme";
  const root = document.documentElement;
  const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");

  let explicitTheme = null;

  try {
    const storedTheme = window.localStorage.getItem(storageKey);
    if (storedTheme === "light" || storedTheme === "dark") {
      explicitTheme = storedTheme;
    }
  } catch {
    // A blocked storage API should not prevent the system preference from working.
  }

  const preferredTheme = () =>
    explicitTheme ?? (systemPreference.matches ? "dark" : "light");

  const updateControls = (theme) => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);

      const label = button.querySelector(".theme-toggle-label");
      if (label) {
        label.textContent = nextTheme === "dark" ? "Dark" : "Light";
      }
    });
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = theme === "dark" ? "#101814" : "#f5f1e8";
    }

    updateControls(theme);
  };

  applyTheme(preferredTheme());

  document.addEventListener("DOMContentLoaded", () => {
    updateControls(preferredTheme());

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        explicitTheme = root.dataset.theme === "dark" ? "light" : "dark";

        try {
          window.localStorage.setItem(storageKey, explicitTheme);
        } catch {
          // The toggle still works for the current page if storage is unavailable.
        }

        applyTheme(explicitTheme);
      });
    });
  });

  systemPreference.addEventListener("change", () => {
    if (explicitTheme === null) {
      applyTheme(preferredTheme());
    }
  });
})();
