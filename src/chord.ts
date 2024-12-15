import { get } from "./store";
import type { Mode } from "./types";

type ChordAction = string | { cmd: string; args: unknown[] };

export type Chord = ChordAction | ChordAction[];

export type ChordMap = Record<string, Chord>;

const normal = {
	".": "chords.repeatLastChord",
	q: "chords.toggleRecording",
	"@q": "chords.replay",
	i: "chords.setInsertMode",
	a: ["cursorRight", "chords.setInsertMode"],
	I: ["cursorHome", "chords.setInsertMode"],
	A: ["cursorEnd", "chords.setInsertMode"],
	o: ["editor.action.insertLineAfter", "chords.setInsertMode"],
	O: ["editor.action.insertLineBefore", "chords.setInsertMode"],
	v: "chords.setVisualMode",
	// movement
	h: "cursorLeft",
	j: "cursorDown",
	k: "cursorUp",
	l: "cursorRight",
	J: "chords.paragraphDown",
	K: "chords.paragraphUp",
	gg: "cursorTop",
	G: "cursorBottom",
	"^": "cursorHome",
	$: "cursorEnd",
	w: "cursorWordStartRight",
	e: "cursorWordEndRight",
	b: "cursorWordStartLeft",
	ge: "cursorWordEndLeft",
	"%": "editor.action.jumpToBracket",
	f: "chords.cursorToCharRight",
	F: "chords.cursorToCharLeft",
	">": "editor.action.insertCursorBelow",
	"<": "editor.action.insertCursorAbove",
	"g>": "editor.action.insertCursorAtLastLine",
	m: "editor.action.addSelectionToNextFindMatch",
	M: "editor.action.addSelectionToPreviousFindMatch",
	// modifiers
	"=": "editor.emmet.action.incrementNumberByOne",
	"-": "editor.emmet.action.decrementNumberByOne",
	// registers
	u: "undo",
	U: "redo",
	p: "editor.action.clipboardPasteAction",
	// registers -> copy
	y$: [
		"chords.saveSelections",
		"cursorEndSelect",
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"y^": [
		"chords.saveSelections",
		"cursorHomeSelect",
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	ys: [
		"chords.saveSelections",
		"chords.selectSymbolAtCursor",
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	yy: [
		"chords.saveSelections",
		"cursorHome",
		"cursorEndSelect",
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	yf: [
		"chords.saveSelections",
		"chords.cursorToCharRightSelect",
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	yF: [
		"chords.saveSelections",
		"chords.cursorToCharLeftSelect",
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	yaw: [
		"chords.saveSelections",
		"cursorWordEndLeft",
		"cursorWordEndRightSelect",
		"cursorWordStartRightSelect",
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	yab: [
		"chords.saveSelections",
		"editor.action.selectToBracket",
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	'ya"': [
		"chords.saveSelections",
		{ cmd: "chords.selectAroundRight", args: ['"', '"'] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"ya'": [
		"chords.saveSelections",
		{ cmd: "chords.selectAroundRight", args: ["'", "'"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"ya`": [
		"chords.saveSelections",
		{ cmd: "chords.selectAroundRight", args: ["`", "`"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"ya(": [
		"chords.saveSelections",
		{ cmd: "chords.selectAroundLeft", args: ["(", ")"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"ya{": [
		"chords.saveSelections",
		{ cmd: "chords.selectAroundLeft", args: ["{", "}"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"ya[": [
		"chords.saveSelections",
		{ cmd: "chords.selectAroundLeft", args: ["[", "]"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"ya<": [
		"chords.saveSelections",
		{ cmd: "chords.selectAroundLeft", args: ["<", ">"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"ya)": [
		"chords.saveSelections",
		{ cmd: "chords.selectAroundRight", args: ["(", ")"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"ya}": [
		"chords.saveSelections",
		{ cmd: "chords.selectAroundRight", args: ["{", "}"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"ya]": [
		"chords.saveSelections",
		{ cmd: "chords.selectAroundRight", args: ["[", "]"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"ya>": [
		"chords.saveSelections",
		{ cmd: "chords.selectAroundRight", args: ["<", ">"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	yiw: [
		"chords.saveSelections",
		"cursorWordStartLeft",
		"cursorWordEndRightSelect",
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	'yi"': [
		"chords.saveSelections",
		{ cmd: "chords.selectInsideRight", args: ['"', '"'] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"yi'": [
		"chords.saveSelections",
		{ cmd: "chords.selectInsideRight", args: ["'", "'"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"yi`": [
		"chords.saveSelections",
		{ cmd: "chords.selectInsideRight", args: ["`", "`"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"yi(": [
		"chords.saveSelections",
		{ cmd: "chords.selectInsideLeft", args: ["(", ")"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"yi{": [
		"chords.saveSelections",
		{ cmd: "chords.selectInsideLeft", args: ["{", "}"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"yi[": [
		"chords.saveSelections",
		{ cmd: "chords.selectInsideLeft", args: ["[", "]"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"yi<": [
		"chords.saveSelections",
		{ cmd: "chords.selectInsideLeft", args: ["<", ">"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"yi)": [
		"chords.saveSelections",
		{ cmd: "chords.selectInsideRight", args: ["(", ")"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"yi}": [
		"chords.saveSelections",
		{ cmd: "chords.selectInsideRight", args: ["{", "}"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"yi]": [
		"chords.saveSelections",
		{ cmd: "chords.selectInsideRight", args: ["[", "]"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	"yi>": [
		"chords.saveSelections",
		{ cmd: "chords.selectInsideRight", args: ["<", ">"] },
		"editor.action.clipboardCopyAction",
		"chords.restoreSelections",
	],
	// registers -> cut
	x$: ["cursorEndSelect", "editor.action.clipboardCutAction"],
	"x^": ["cursorHomeSelect", "editor.action.clipboardCutAction"],
	xs: ["chords.selectSymbolAtCursor", "editor.action.clipboardCutAction"],
	xx: [
		"cursorLineStart",
		"cursorLineEndSelect",
		"editor.action.clipboardCutAction",
	],
	xf: ["chords.cursorToCharRightSelect", "editor.action.clipboardCutAction"],
	xF: ["chords.cursorToCharLeftSelect", "editor.action.clipboardCutAction"],
	xaw: [
		"cursorWordEndLeft",
		"cursorWordEndRightSelect",
		"cursorWordStartRightSelect",
		"editor.action.clipboardCutAction",
	],
	xab: ["editor.action.selectToBracket", "editor.action.clipboardCutAction"],
	'xa"': [
		{ cmd: "chords.selectAroundRight", args: ['"', '"'] },
		"editor.action.clipboardCutAction",
	],
	"xa'": [
		{ cmd: "chords.selectAroundRight", args: ["'", "'"] },
		"editor.action.clipboardCutAction",
	],
	"xa`": [
		{ cmd: "chords.selectAroundRight", args: ["`", "`"] },
		"editor.action.clipboardCutAction",
	],
	"xa(": [
		{ cmd: "chords.selectAroundLeft", args: ["(", ")"] },
		"editor.action.clipboardCutAction",
	],
	"xa{": [
		{ cmd: "chords.selectAroundLeft", args: ["{", "}"] },
		"editor.action.clipboardCutAction",
	],
	"xa[": [
		{ cmd: "chords.selectAroundLeft", args: ["[", "]"] },
		"editor.action.clipboardCutAction",
	],
	"xa<": [
		{ cmd: "chords.selectAroundLeft", args: ["<", ">"] },
		"editor.action.clipboardCutAction",
	],
	"xa)": [
		{ cmd: "chords.selectAroundRight", args: ["(", ")"] },
		"editor.action.clipboardCutAction",
	],
	"xa}": [
		{ cmd: "chords.selectAroundRight", args: ["{", "}"] },
		"editor.action.clipboardCutAction",
	],
	"xa]": [
		{ cmd: "chords.selectAroundRight", args: ["[", "]"] },
		"editor.action.clipboardCutAction",
	],
	"xa>": [
		{ cmd: "chords.selectAroundRight", args: ["<", ">"] },
		"editor.action.clipboardCutAction",
	],
	xiw: [
		"cursorWordStartLeft",
		"cursorWordEndRightSelect",
		"editor.action.clipboardCutAction",
	],
	'xi"': [
		{ cmd: "chords.selectInsideRight", args: ['"', '"'] },
		"editor.action.clipboardCutAction",
	],
	"xi'": [
		{ cmd: "chords.selectInsideRight", args: ["'", "'"] },
		"editor.action.clipboardCutAction",
	],
	"xi`": [
		{ cmd: "chords.selectInsideRight", args: ["`", "`"] },
		"editor.action.clipboardCutAction",
	],
	"xi(": [
		{ cmd: "chords.selectInsideLeft", args: ["(", ")"] },
		"editor.action.clipboardCutAction",
	],
	"xi{": [
		{ cmd: "chords.selectInsideLeft", args: ["{", "}"] },
		"editor.action.clipboardCutAction",
	],
	"xi[": [
		{ cmd: "chords.selectInsideLeft", args: ["[", "]"] },
		"editor.action.clipboardCutAction",
	],
	"xi<": [
		{ cmd: "chords.selectInsideLeft", args: ["<", ">"] },
		"editor.action.clipboardCutAction",
	],
	"xi)": [
		{ cmd: "chords.selectInsideRight", args: ["(", ")"] },
		"editor.action.clipboardCutAction",
	],
	"xi}": [
		{ cmd: "chords.selectInsideRight", args: ["{", "}"] },
		"editor.action.clipboardCutAction",
	],
	"xi]": [
		{ cmd: "chords.selectInsideRight", args: ["[", "]"] },
		"editor.action.clipboardCutAction",
	],
	"xi>": [
		{ cmd: "chords.selectInsideRight", args: ["<", ">"] },
		"editor.action.clipboardCutAction",
	],
	// deletions
	d$: ["cursorEndSelect", "deleteLeft"],
	"d^": ["cursorHomeSelect", "deleteLeft"],
	ds: ["chords.selectSymbolAtCursor", "deleteLeft"],
	dd: "editor.action.deleteLines",
	df: ["chords.cursorToCharRightSelect", "deleteLeft"],
	dF: ["chords.cursorToCharLeftSelect", "deleteLeft"],
	dw: "deleteWordRight",
	db: ["cursorWordStartLeftSelect", "deleteLeft"],
	de: ["cursorWordEndRightSelect", "deleteLeft"],
	dge: ["cursorWordEndLeftSelect", "deleteLeft"],
	daw: [
		"cursorWordEndLeft",
		"cursorWordEndRightSelect",
		"cursorWordStartRightSelect",
		"deleteLeft",
	],
	dab: ["editor.action.selectToBracket", "deleteLeft"],
	'da"': [{ cmd: "chords.selectAroundRight", args: ['"', '"'] }, "deleteLeft"],
	"da'": [{ cmd: "chords.selectAroundRight", args: ["'", "'"] }, "deleteLeft"],
	"da`": [{ cmd: "chords.selectAroundRight", args: ["`", "`"] }, "deleteLeft"],
	"da(": [{ cmd: "chords.selectAroundLeft", args: ["(", ")"] }, "deleteLeft"],
	"da{": [{ cmd: "chords.selectAroundLeft", args: ["{", "}"] }, "deleteLeft"],
	"da[": [{ cmd: "chords.selectAroundLeft", args: ["[", "]"] }, "deleteLeft"],
	"da<": [{ cmd: "chords.selectAroundLeft", args: ["<", ">"] }, "deleteLeft"],
	"da)": [{ cmd: "chords.selectAroundRight", args: ["(", ")"] }, "deleteLeft"],
	"da}": [{ cmd: "chords.selectAroundRight", args: ["{", "}"] }, "deleteLeft"],
	"da]": [{ cmd: "chords.selectAroundRight", args: ["[", "]"] }, "deleteLeft"],
	"da>": [{ cmd: "chords.selectAroundRight", args: ["<", ">"] }, "deleteLeft"],
	diw: "deleteInsideWord",
	dib: [
		"editor.action.selectToBracket",
		"chords.shrinkSelection",
		"deleteLeft",
	],
	'di"': [{ cmd: "chords.selectInsideRight", args: ['"', '"'] }, "deleteLeft"],
	"di'": [{ cmd: "chords.selectInsideRight", args: ["'", "'"] }, "deleteLeft"],
	"di`": [{ cmd: "chords.selectInsideRight", args: ["`", "`"] }, "deleteLeft"],
	"di(": [{ cmd: "chords.selectInsideLeft", args: ["(", ")"] }, "deleteLeft"],
	"di{": [{ cmd: "chords.selectInsideLeft", args: ["{", "}"] }, "deleteLeft"],
	"di[": [{ cmd: "chords.selectInsideLeft", args: ["[", "]"] }, "deleteLeft"],
	"di<": [{ cmd: "chords.selectInsideLeft", args: ["<", ">"] }, "deleteLeft"],
	"di)": [{ cmd: "chords.selectInsideRight", args: ["(", ")"] }, "deleteLeft"],
	"di}": [{ cmd: "chords.selectInsideRight", args: ["{", "}"] }, "deleteLeft"],
	"di]": [{ cmd: "chords.selectInsideRight", args: ["[", "]"] }, "deleteLeft"],
	"di>": [{ cmd: "chords.selectInsideRight", args: ["<", ">"] }, "deleteLeft"],
} satisfies ChordMap;

const visual = {
	".": "chords.repeatLastChord",
	n: "chords.setNormalMode",
	// basic movement
	h: "cursorLeftSelect",
	j: "cursorDownSelect",
	k: "cursorUpSelect",
	l: "cursorRightSelect",
	J: "chords.paragraphDownSelect",
	K: "chords.paragraphUpSelect",
	gg: "cursorTopSelect",
	G: "cursorBottomSelect",
	"^": "cursorHomeSelect",
	$: "cursorEndSelect",
	w: "cursorWordStartRightSelect",
	e: "cursorWordEndRightSelect",
	b: "cursorWordStartLeftSelect",
	ge: "cursorWordEndLeftSelect",
	f: "chords.cursorToCharRightSelect",
	F: "chords.cursorToCharLeftSelect",
	">": "editor.action.insertCursorBelow",
	"<": "editor.action.insertCursorAbove",
	"g>": "editor.action.insertCursorAtLastLine",
	m: "editor.action.addSelectionToNextFindMatch",
	M: "editor.action.addSelectionToPreviousFindMatch",
	// registers
	u: "undo",
	U: "redo",
	p: ["editor.action.clipboardPasteAction", "chords.setNormalMode"],
	y: ["editor.action.clipboardCopyAction", "chords.setNormalMode"],
	x: ["editor.action.clipboardCutAction", "chords.setNormalMode"],
	d: "deleteLeft",
	D: "deleteRight",
	// selections
	s: "chords.selectSymbolAtCursor",
	aw: [
		"cursorWordEndLeft",
		"cursorWordEndRightSelect",
		"cursorWordStartRightSelect",
	],
	ab: "editor.action.selectToBracket",
	'a"': { cmd: "chords.selectAroundRight", args: ['"', '"'] },
	"a'": { cmd: "chords.selectAroundRight", args: ["'", "'"] },
	"a`": { cmd: "chords.selectAroundRight", args: ["`", "`"] },
	"a(": { cmd: "chords.selectAroundLeft", args: ["(", ")"] },
	"a{": { cmd: "chords.selectAroundLeft", args: ["{", "}"] },
	"a[": { cmd: "chords.selectAroundLeft", args: ["[", "]"] },
	"a<": { cmd: "chords.selectAroundLeft", args: ["<", ">"] },
	"a)": { cmd: "chords.selectAroundRight", args: ["(", ")"] },
	"a}": { cmd: "chords.selectAroundRight", args: ["{", "}"] },
	"a]": { cmd: "chords.selectAroundRight", args: ["[", "]"] },
	"a>": { cmd: "chords.selectAroundRight", args: ["<", ">"] },
	iw: ["cursorWordStartLeft", "cursorWordEndRightSelect"],
	ib: ["editor.action.selectToBracket", "chords.shrinkSelection"],
	'i"': { cmd: "chords.selectInsideRight", args: ['"', '"'] },
	"i'": { cmd: "chords.selectInsideRight", args: ["'", "'"] },
	"i`": { cmd: "chords.selectInsideRight", args: ["`", "`"] },
	"i(": { cmd: "chords.selectInsideLeft", args: ["(", ")"] },
	"i{": { cmd: "chords.selectInsideLeft", args: ["{", "}"] },
	"i[": { cmd: "chords.selectInsideLeft", args: ["[", "]"] },
	"i<": { cmd: "chords.selectInsideLeft", args: ["<", ">"] },
	"i)": { cmd: "chords.selectInsideRight", args: ["(", ")"] },
	"i}": { cmd: "chords.selectInsideRight", args: ["{", "}"] },
	"i]": { cmd: "chords.selectInsideRight", args: ["[", "]"] },
	"i>": { cmd: "chords.selectInsideRight", args: ["<", ">"] },
} satisfies ChordMap;

const leader = {
	k: "editor.action.showHover",
	h: "workbench.action.focusLeftGroup",
	l: "workbench.action.focusRightGroup",
	L: "workbench.action.moveEditorToNextGroup",
	H: "workbench.action.moveEditorToPreviousGroup",
	n: "workbench.action.nextEditor",
	b: "workbench.action.previousEditor",
	gl: "workbench.action.gotoLine",
	gd: "editor.action.revealDefinition",
	gr: "editor.action.goToReferences",
	gs: "workbench.action.gotoSymbol",
	pd: "editor.action.peekDefinition",
	"<enter>": "togglePeekWidgetFocus",
	tcu: "editor.action.transformToUppercase",
	tcl: "editor.action.transformToLowercase",
	tck: "editor.action.transformToKebabcase",
	tcc: "editor.action.transformToCamelcase",
	tcs: "editor.action.transformToSnakecase",
	tcp: "editor.action.transformToPascalcase",
	tct: "editor.action.transformToTitlecase",
	m: "editor.emmet.action.evaluateMathExpression",
} satisfies ChordMap;

export const defaultChords = {
	normal,
	visual,
	leader,
	insert: {},
} as const satisfies Record<Mode, ChordMap>;

export const constructChord = (chord: string[] = get("chord")) => {
	let count = "";
	let motion = "";

	for (const char of chord)
		if (motion) motion += char;
		else if (char.match(/^\d$/)) count += char;
		else motion += char;

	return [Number.parseInt(count), motion] as const;
};

export const isValid = (rawChord: string[] = get("chord")) => {
	return Object.keys(defaultChords[get("mode")]).some((chord) => {
		const [, motion] = constructChord(rawChord);
		return chord.startsWith(motion);
	});
};

export const getChord = (motion: string) => {
	return get("chords")[get("mode")][motion];
};