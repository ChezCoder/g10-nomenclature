import { Routine } from "../Scheduler";

export const compoundExplainationScript = {
    "INTRO": {},
    "LONE": {
        "IS_LONE_CHEMICAL": "Looking at the periodic table, the chemical symbol for [B]{name}[/] would be [B]{symbol}[/]."
    }
};

export async function formula(): Promise<void> {
    return new Promise(res => {
        Routine.startTask(function*() {
            res();
        });
    });
}