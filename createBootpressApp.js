const colors = require("colors");
const keypress = require("keypress");
const log = console.log;
const bl = colors.bgBlack

function init() {
    console.log(process.env.npm_config_user_agent);
    const welcomeText = "Initializing " + bl.green("boot") + bl.red("press");
    log(welcomeText);
    pickLanguage();
}

function pickLanguage() {
    keypress(process.stdin);
    log("Pick a language then press enter/space");
    let selected = 0;
    let languages = ["Javascript", "Typescript"];
    function printLanguages() {
        for (let i = 0; i < languages.length; i++) {
            log(`[${selected == i ? 'X' : ' '}] ${languages[i]}`);
        }
    }
    function clearPrintedLangs() {
        for (let i = 0; i < languages.length; i++) {
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(-1);
        }
    }
    printLanguages();
    const clearNprint = () => { clearPrintedLangs(); printLanguages(); }
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("keypress", (ch, key) => {
        if (key.ctrl && key.name == 'c') {
            process.exit(1);
        }
        switch (key.name) {
            case "up":
                selected = Math.max(0, selected - 1);
                clearNprint();
                break;
            case "down":
                selected = Math.min(languages.length - 1, selected + 1);
                clearNprint();
                break;
            case "return":
                process.stdin.pause();
                createProjectTemplate(languages[selected]);
                break;
            case "space":
                process.stdin.pause();
                createProjectTemplate(languages[selected]);
                break;
        }
    });
}

function createProjectTemplate(lang) {
    lang = lang.toLowerCase();
    console.log("selected language: " + lang)
}

module.exports = {
    init
}