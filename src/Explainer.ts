import { $resetBtn, ButtonLogic, delay } from ".";
import { sample } from "./Util";
import { variations } from "./explainations/Common";

export const $explaination = $("#explaination");

export type ExplainerSect = JQuery<HTMLElement>;
export type ListPoint = JQuery<HTMLDivElement>;

interface ExplainParseResult {
    result: string;
    variations: string[];
}

export namespace Explainer {
    export let explaining: boolean;

    export function parseExplainationString(str: string, additionalTemplates: Record<string, string> = {}): ExplainParseResult {
        let result: ExplainParseResult = {
            "result": str,
            "variations": []
        };

        for (const variationName in variations) {
            const variation = sample(variations[variationName]);
            result.result = result.result.replace(new RegExp(`\\{${variationName}\\}`), variation);
            result.variations.push(variation);
        }

        for (const additionals in additionalTemplates) {
            result.result = result.result.replace(new RegExp(`{${additionals}}`, "g"), additionalTemplates[additionals]);
        }

        result.result = result.result.replace(/\[B\]/g, "<div class=\"d-inline bold\">")
            .replace(/\[U\]/g, "<div class=\"d-inline underline\">")
            .replace(/\[I\]/g, "<div class=\"d-inline italic\">")
            .replace(/\[\/\]/g, "</div>");
        return result;
    }

    export async function beginExplaination() {
        $explaination.empty();
        ButtonLogic.inputEnable(false);
        explaining = true;
        return delay(2000);
    }

    export function followUpExplainationSect(sec: ExplainerSect) {
        sec.css({ "max-height": window.innerHeight + "px", "padding": "30px" });
        window.scrollTo(0, document.body.scrollHeight);
    }

    export function createExplainationSect(): ExplainerSect {
        const $section = $(`<section class="anim-in-down"></section>`, { "class": "container-fluid rounded" });
        $section.css({
            "max-height": "0px",
            "padding-left": "30px",
            "padding-right": "30px",
            "overflow": "scroll",
            "background": "#f1f1f1",
            "display": "flex",
            "flex-direction": "row",
            "gap": "30px",
            "margin-top": "5px",
            "transition": "padding 1s, max-height 1s"
        });
        $explaination.append($section);
        return $section;
    }

    export function followUpListPoint(point: ListPoint) {
        point.css({
            "opacity": 1,
            "transform": "scale(1)"
        });
        return delay(1000);
    }

    export function createListPoint(sec: ExplainerSect, ind: number): JQuery<HTMLDivElement> {
        const $listPoint = $<HTMLDivElement>("<div></div>");
        $listPoint.text(ind);
        $listPoint.css({
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "padding": "15px",
            "width": "20px",
            "height": "20px",
            "background": "#50B5FF",
            "color": "#ffffff",
            "border-radius": "100%",
            "opacity": 0,
            "transform": "scale(1.5)",
            "font-size": "20px",
            "transition": "opacity 1s, transform 1s"
        });
        sec.append($listPoint);
        return $listPoint;
    }

    export async function endExplaination() {
        $resetBtn.removeAttr("disabled");
        $resetBtn.fadeIn(1000);
        window.scrollTo(0, $resetBtn[0].getBoundingClientRect().bottom);
        explaining = false;
        return delay(1000);
    }
}