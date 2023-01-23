import type { Route } from "./helpers";
interface RouterOptions {
    glob?: string | undefined;
    path: string;
    querySep?: string;
    dirNameRoute?: boolean;
}
interface Routes {
    [key: string]: {
        [key: string]: Route;
    };
}
export declare class Router {
    options: RouterOptions;
    constructor(options: RouterOptions);
    scan(): Promise<Routes>;
    glob(): Promise<string[]>;
    build(outputPath: string): Promise<void>;
}
export default Router;
//# sourceMappingURL=router.d.ts.map