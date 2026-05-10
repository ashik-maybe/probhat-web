$(document).ready(function () {
    if (window.matchMedia("(max-width: 767px)").matches) return;

    $.ime.preferences.registry.language = "bn";
    $.ime.preferences.registry.showSelector = false;
    $.ime.preferences.registry.imes = { bn: "bn-probhat", en: "system" };
    $.ime.preferences.getDefaultLanguage = () => "bn";
    $("textarea").ime({
        languages: ["bn"],
        imePath: "https://cdnjs.cloudflare.com/ajax/libs/jquery.ime/0.3.0/",
    });

    const select = document.getElementById("pangram-select");
    const refDiv = document.getElementById("pangram-reference");
    const layoutEl = document.getElementById("layout-container");
    const textarea = document.getElementById("banglapad");

    function populatePangrams() {
        BENGALI_PANGRAMS.forEach(function (p) {
            const opt = document.createElement("option");
            opt.value = p.id;
            opt.textContent = p.title + " — " + p.author;
            select.appendChild(opt);
        });
    }

    function showPangram(id) {
        const p = BENGALI_PANGRAMS.find(function (p) {
            return p.id === id;
        });
        if (p) {
            refDiv.textContent = p.text;
            textarea.focus();
        }
    }

    populatePangrams();
    showPangram(BENGALI_PANGRAMS[0].id);

    select.addEventListener("change", function () {
        showPangram(Number(this.value));
    });

    layoutEl.classList.remove("hidden");
    layoutEl.classList.add("state-visible");

    textarea.focus();
});

function showCopiedToast() {
    const toast = document.getElementById("copy-toast");
    toast.classList.remove("hidden");
    setTimeout(function () {
        toast.classList.add("hidden");
    }, 1500);
}
