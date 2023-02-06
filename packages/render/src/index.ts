import { parse, parseFragment, serialize } from 'parse5';

// credit to parse5 and lit-ntml - probably will be refactor in the future

export function processLiteralsSync(strings: TemplateStringsArray, ...exps: unknown[]): string {
    const done = exps.map((n) => {
        return (Array.isArray(n) ? n : [n]).map((o) => ('function' === typeof o ? o() : o));
    });
    const doneLen = done.length;

    return strings.reduce((p, n, i) => {
        const nTask = done[i];
        const joined = Array.isArray(nTask) ? nTask.join('') : nTask;
        return `${p}${i >= doneLen ? n : `${n}${joined}`}`;
    }, '');
}

export function parseLiteralsSync(serializeFn: typeof serialize) {
    return (fn: typeof parse, strings: TemplateStringsArray, ...exps: unknown[]): string => {
        const content = processLiteralsSync(strings, ...exps);
        return serializeFn((fn as typeof parse)(content));
    };
}
const parserSync = parseLiteralsSync(serialize);
export const html = (s: TemplateStringsArray, ...e: unknown[]): string => parserSync((c: string) => parse(`<!doctype html>${c}`), s, ...e);
export const htmlFragment = (s: TemplateStringsArray, ...e: unknown[]): string => parserSync(parseFragment, s, ...e);
export const raw = htmlFragment;
export const renderIf = (condition: boolean, content: string | Function, elseContent: string = ''): string => {
    if (condition) {
        if (typeof content === 'string') {
            return content;
        }

        if (typeof content === 'function') {
            return content(condition);
        }
    }

    return elseContent;
};
export const renderList = (list: string[], renderFn: (value: string, index: number, array: string[]) => unknown, emptyContent: string): string => {
    return renderIf(Array.isArray(list) && list.length > 0, () => list.map(renderFn), emptyContent);
};

export default {
    html,
    htmlFragment,
    raw,
    renderIf,
};
