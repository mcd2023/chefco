(() => {
    const languages = ["tr", "en", "fr", "ar"];
    const key = "merci-chef-language";
    const selector = "header [data-lang], #navbar [data-lang], header button[id^='btn-'], #navbar button[id^='btn-']";

    function read(fallback = document.documentElement.lang) {
        try {
            const saved = localStorage.getItem(key);
            if (languages.includes(saved)) return saved;
        } catch {
            // Language switching still works when storage is unavailable.
        }
        return languages.includes(fallback) ? fallback : "tr";
    }

    document.addEventListener("click", event => {
        const control = event.target.closest(selector);
        if (!control || !event.isTrusted) return;
        const lang = control.dataset.lang || control.id.slice(4);
        if (!languages.includes(lang)) return;
        try {
            localStorage.setItem(key, lang);
        } catch {
            // The existing page handler still applies the language.
        }
    }, true);

    document.addEventListener("DOMContentLoaded", () => {
        const language = read();
        if (language === document.documentElement.lang) return;
        document.querySelectorAll(selector).forEach(control => {
            if (control.tagName === "BUTTON" &&
                (control.dataset.lang || control.id.slice(4)) === language) control.click();
        });
    });
    window.merciLanguage = {read};
})();
