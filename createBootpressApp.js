const colors = require("colors");
const { existsSync, mkdir, mkdirSync } = require("fs");
const keypress = require("keypress");
const { join } = require("path");
const log = console.log;
const bl = colors.bgBlack;

const langMap = new Map(Object.entries(
    {
        "ts": "typescript",
        "typescript": "typescript",
        "js": "javascript",
        "javascript": "javascript"
    }
));

function init(projectName, options) {
    const welcomeText = "Initializing " + bl.green("boot") + bl.red("press");
    log(welcomeText);
    const projectDir = join(__dirname, projectName);
    if (existsSync(projectDir)) {
        console.error(`${projectName} is already exists`);
        process.exit(1);
    }
    pickLanguage({ projectName, options });
}

function pickLanguage({ projectName, options }) {
    if (options.language && langMap.has(options.language)) {
        createProjectTemplate({ projectName, options, lang: langMap.get(options.language) });
    } else {
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
                    createProjectTemplate({ projectName, options, lang: languages[selected] });
                    break;
                case "space":
                    process.stdin.pause();
                    createProjectTemplate({ projectName, options, lang: languages[selected] });
                    break;
            }
        });
    }
}

function createProjectTemplate({ projectName, options, lang }) {
    lang = lang.toLowerCase();
    console.log("project name: " + projectName);
    console.log("options: " + JSON.stringify(options));
    console.log("selected language: " + lang);
}

module.exports = {
    init
}