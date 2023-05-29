import { QUANTITY_SUBSCRIPTS, SUBSCRIPT_TO_NUM } from "./ChemicalCompounds";
import { $explaination, Explainer } from "./Explainer";
import { capitalize } from "./Util";
import { ParseError, compound, parseFormula } from "./explainations/Compound";
import { formula } from "./explainations/Formula";

export const $notice = $("#notice-box");
export const $noticeConfirmBtn = $("#notice-confirm");

export const $main = $("main");
export const $input = $("#input");
export const $findFormulaBtn = $("#find-formula");
export const $findCompoundBtn = $("#find-compound");
export const $resetBtn = $("#reset");
export const $execBtnsContainer = $("#exec-buttons");
export const $mutedSwitch = $("#muted");

export const $formulaSummaryContainer = $("#formula");
export const $formulaDesc = $("#formula-desc");
export const $compoundSummaryContainer = $("#compound");
export const $compoundDesc = $("#compound-desc");

export const delay: (ms: number) => Promise<void> = (ms: number) => new Promise(r => setInterval(r, ms));

$(window).on("load", () => {
    ButtonLogic.inputEnable(true);

    const examples = [
        "Dihydrogen Monoxide",
        "Carbon Dioxide",
        "Sodium Chloride",
        "Lead II Chloride",
        "Ammonium Iodide",
        "H2O",
        "NH4",
        "CO2",
        "NaCl",
        "H2",
        "O2",
        "O3",
        "NH4OH",
        "CuCl3",
        "Fe2O3",
        "Fe2O2",
        "Pb(C2H3O2)2"
    ];

    // $input.val(sample(examples));
    $input.val("Fe2(NO3)2");
    $input.trigger("input");

    (<any> window).mute = true;
}).on("keydown", event => {
    if (event.key == "Enter") {
        if (!$noticeConfirmBtn.attr("disabled")) {
            event.preventDefault();
            $noticeConfirmBtn.trigger("click");
        }
    }
});

$input.on("input", () => {
    const val = $input.val()!.toString();

    $input.val((val => {
        ButtonLogic.inputMode = "NONE";

        $findFormulaBtn.attr("disabled", "disabled");
        $findCompoundBtn.attr("disabled", "disabled");

        if (val.length == 0) {
            $formulaSummaryContainer.hide();
            $compoundSummaryContainer.hide();
            return "";
        }

        ButtonLogic.inputMode = new RegExp("[a-z]{2}").test(val) ? "COMPOUND" : "FORMULA";

        let result = val;
        result = result.replace(new RegExp("!"), "1").replace(new RegExp("@"), "2").replace(new RegExp("#"), "3").replace(new RegExp("\\$"), "4").replace(new RegExp("%"), "5").replace(new RegExp("\\^"), "6").replace(new RegExp("&"), "7").replace(new RegExp("\\*"), "8");
        
        if (ButtonLogic.inputMode == "COMPOUND") {
            result = result.replace(new RegExp("[^ \\w]+", "g"), "");
            result = result.replace(new RegExp("1", "g"), "I").replace(new RegExp("2", "g"), "II").replace(new RegExp("3", "g"), "III").replace(new RegExp("4", "g"), "IV").replace(new RegExp("5", "g"), "V").replace(new RegExp("6", "g"), "VI").replace(new RegExp("7", "g"), "VII").replace(new RegExp("8", "g"), "VIII").replace(new RegExp("9", "g"), "IX").replace(new RegExp("10", "g"), "X").replace(new RegExp("I0", "g"), "X");
            result = result.replace(new RegExp("[₀₁₂₃₄₅₆₇₈₉]+", "g"), "");
            result = result.split(" ").map(word => capitalize(word)).join(" ");
        } else if (ButtonLogic.inputMode == "FORMULA") {
            for (const quantity in QUANTITY_SUBSCRIPTS) result = result.replace(new RegExp(quantity, "g"), QUANTITY_SUBSCRIPTS[quantity]);
            
            result = result.replace(new RegExp("^[₀₁₂₃₄₅₆₇₈₉]+", "g"), "");
            result = result.replace(new RegExp("[^ \\w₁₂₃₄₅₆₇₈₉₀()]+", "g"), "");
            result = result.replace(new RegExp("(\\w)₀"), "$1");
            
            "₀₁₂₃₄₅₆₇₈₉".split("").forEach(sub => {
                result = result.split(sub).map(r => capitalize(r)).join(sub);
            });

            let fResult = "";
            let num = "";
            let segs = result.split("");

            for (let i = 0;i < segs.length;i++) {
                const letter = segs[i];

                let val = SUBSCRIPT_TO_NUM[letter];

                if (val) {
                    num += val;
                    if (i != segs.length - 1) continue;
                }

                let subscript = "";

                if (num && num != "0") {
                    if (new RegExp("^10+$").test(num)) {
                        subscript = QUANTITY_SUBSCRIPTS[10];
                    } else {
                        if (num.endsWith("0"))  {
                            subscript = QUANTITY_SUBSCRIPTS[Number(num.replace(/0+$/, ''))];
                        } else {
                            subscript = QUANTITY_SUBSCRIPTS[Number(num.at(-1))];
                        }
                    }
                }

                fResult += subscript;
                
                if (!val) {
                    fResult += letter;
                }

                num = "";
            }

            result = fResult;
        }

        ButtonLogic.toggleModeButtons();

        result = capitalize(result).trimStart();

        if (ButtonLogic.inputMode == "FORMULA") {
            $formulaSummaryContainer.show();
            $compoundSummaryContainer.hide();

            formulaAnalysis(result);
        } else {
            $formulaSummaryContainer.hide();
            $compoundSummaryContainer.show();
        }

        return result;
    })(val));
});

export namespace ButtonLogic {
    export let inputMode: "COMPOUND" | "FORMULA" | "NONE" = "NONE";

    export function toggleModeButtons() {
        $findCompoundBtn.attr("disabled", "disabled");
        $findFormulaBtn.attr("disabled", "disabled");

        switch (inputMode) {
            case "FORMULA":
                $findCompoundBtn.removeAttr("disabled");
                break;
            case "COMPOUND":
                $findFormulaBtn.removeAttr("disabled");
                break;
        }
    }

    export function inputEnable(enable: boolean) {
        $main.css("padding-top", enable ? "200px" : "20px");
        
        $input.removeAttr("disabled");
        $mutedSwitch.removeAttr("disabled");
        
        if (!enable) {
            $findCompoundBtn.attr("disabled", "disabled");
            $findFormulaBtn.attr("disabled", "disabled");
            $input.attr("disabled", "disabled");
            $mutedSwitch.attr("disabled", "disabled");
            $execBtnsContainer.css({ "height": "0px", "opacity": 0  });
        }
    }

    export async function createResultSec(title: string, body: string): Promise<void> {
        const $explainationSect = $(`<section id="result" class="rounded anim-in-up"></section>`);
        $explainationSect.html(`<h1>${title}</h1><span>${body}</span>`);
        $explaination.append($explainationSect);
        return delay(2000);
    }

    export async function onFormulaBtn() {
        console.log("Explaining formula...");
        await Explainer.beginExplaination();
        await formula();
        await createResultSec("Formula Name", "Work in progress");
        return Explainer.endExplaination();
    }
    
    export async function onCompoundBtn() {
        console.log("Explaining compound name...");
        await Explainer.beginExplaination();
        const result = await compound();
        await createResultSec("Compound Name", result);
        return Explainer.endExplaination();
    }

    export function reset() {
        $resetBtn.attr("disabled", "disabled");
        $resetBtn.fadeOut(2000);
        $input.trigger("focus");
        $input.trigger("input");
    }
}

function formulaAnalysis(formula: string): void {
    parseFormula(formula).then(bondables => {
        const resultGroupText: string[] = [];

        for (const bondable of bondables) {
            resultGroupText.push(bondable.primaryQuantity + " " + capitalize(bondable.name.toLowerCase()) + (bondable.primaryQuantity == 1 ? "" : "s"));
        }

        $formulaDesc.text(resultGroupText.join(" + "));
    }).catch((err: ParseError) => {
        if (err.invalidPoly) {
            if (err.symbol) {
                $formulaDesc.text(`Invalid Polyatomic (${err.symbol})`);
            } else {
                $formulaDesc.text(`Invalid Polyatomic`);
            }
        } else if (err.unbalancedBrace) {
            if (err.symbol) {
                $formulaDesc.text(`Unbalanced Brace (before ${err.symbol})`);
            } else {
                $formulaDesc.text(`Unbalanced Brace`);
            }
        } else {
            $formulaDesc.text(`Unrecognized Symbol "${err.symbol}"`);
        }
    });
}

$noticeConfirmBtn.on("click", () => {
    $noticeConfirmBtn.attr("disabled", "disabled");
    $notice.css({ "pointer-events": "none", "background": "transparent" });
    $notice.children().addClass("anim-out-down");

    $input.trigger("focus");
    
    setTimeout(() => {
        $main.addClass("anim-in-down");
    }, 500);

    setTimeout(() => {
        $notice.removeClass("d-flex");
        $notice.addClass("d-none");
    }, 1000);
});

$input.on("keydown", event => {
    if (event.key == "Enter") {
        $input.trigger("blur");

        switch (ButtonLogic.inputMode) {
            case "FORMULA": {
                ButtonLogic.onCompoundBtn();
                break;
            }
            case "COMPOUND": {
                ButtonLogic.onFormulaBtn();
                break;
            }
        }
    }
});

$mutedSwitch.on("click", () => {
    mute = !$mutedSwitch.is(":checked");
});

$findFormulaBtn.on("click", ButtonLogic.onFormulaBtn);
$findCompoundBtn.on("click", ButtonLogic.onCompoundBtn);

$resetBtn.on("click", () => {
    $execBtnsContainer.css({ "height": "150px", "opacity": 1 });
    $input[0].scrollTo({ "behavior": "smooth" });
    ButtonLogic.inputEnable(true);
    ButtonLogic.reset();
    $explaination.css({ "opacity": 0 });

    delay(2000).then(async () => {
        $explaination.empty();
        $explaination.css({ "opacity": 1, "height": "0" });

        await delay(1000);

        $explaination.css({ "opacity": 1, "height": "unset" });
    });
});