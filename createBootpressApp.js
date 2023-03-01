const process = require("process");
const colors = require("colors");
const { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, readFileSync, writeFileSync } = require("fs");
const keypress = require("keypress");
const { join } = require("path");
const log = console.log;
const bl = colors.bgBlack;

const script_dir = require.main.path;
// log(`script is running at ${script_dir}`)

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
    const projectDir = join(process.cwd(), projectName);
    if (existsSync(projectDir)) {
        console.error(`Destination ${projectName} is already exists`);
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
        const printLanguages = () => {
            for (let i = 0; i < languages.length; i++) {
                log(`[${selected == i ? 'X' : ' '}] ${languages[i]}`);
            }
        }
        const clearPrintedLangs = () => {
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

// eslint-disable-next-line no-unused-vars
function createProjectTemplate({ projectName, options, lang }) {
    lang = lang.toLowerCase();
    const projectFolder = join(process.cwd(), projectName);
    mkdirSync(projectFolder);
    let template_dir;
    if (lang === "typescript") {
        template_dir = join(script_dir, "template", "ts");
    }
    else if (lang == "javascript") {
        template_dir = join(script_dir, "template", "js");
    } else {
        throw new Error("Unsupported language");
    }

    copyContent(template_dir, projectFolder);
    const packageJson = join(projectFolder, "package.json");
    const currentContent = readFileSync(packageJson);
    writeFileSync(packageJson, currentContent.toString("utf-8").replace("$project_name$", projectName), { encoding: "utf-8" });
    log("\nYour project is created now, but dependencies is not installed. To install them:");
    log(colors.green(`cd ./${projectName}`));
    log(`${colors.red("npm install")} / ${colors.cyan("yarn")} / ${colors.yellow(`pnpm install`)}`);
}

const ignoreDirs = ["node_modules", "package-lock.json", "yarn.lock", "pnpm-lock.yaml"];

function copyContent(from, to) {
    for (const dir of readdirSync(from)) {
        const source = join(from, dir);
        const target = join(to, dir);
        if (ignoreDirs.includes(dir)) {
            continue;
        } else if (statSync(source).isDirectory()) {
            mkdirSync(target);
            copyContent(source, target);
        } else {
            copyFileSync(source, target);
        }
    }
}

module.exports = {
    init
}