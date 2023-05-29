import { $input, delay } from "..";
import { AudioPlayer } from "../AudioPlayer";
import { Bondable, QUANTITY_SUBSCRIPTS, QuantifiedPeriodicElement, SUBSCRIPT_TO_NUM, getPolyatomic } from "../ChemicalCompounds";
import { HOFBrINClS, METALLOIDS, METALS, Metals, NonMetals, PERIODIC_TABLE, PeriodicElement, combineSuffix, getFromSymbol } from "../Elements";
import { Explainer } from "../Explainer";
import { Nomenclature } from "../Nomenclature";
import { Routine, WaitForMillis, WaitForPromise, WaitForSeconds } from "../Scheduler";
import { capitalize, reduce } from "../Util";
import { commonExplainationScript } from "./Common";

export const compoundExplainationScript = {
    "INTRO": {
        "IDENTIFY": "In this case, the chemical compound is an",
    },
    "LONE": {
        "IS_LONE": "Fortunately, the input provided only contains one element, so we will not have to worry about ionic or covalent compounds.",
        
        "METAL": "The metal [B]{symbol}[/] would be called [B]{name}[/]",
        "NONMETAL": "The non-metal [B]{symbol}[/] would be called [B]{name}[/]",
        
        "PREFIX": "The prefix signifies how many of that atom is present.",
        "MPREFIX": "Since the element name begins with an A or O, the last letter of the prefix is adjusted accordingly.",
        "HOFBRINCL": "Since this symbol [U]is[/] a [I]HOFBrINCl[/] twin (meaning it is required for it to come in pairs),",

        "VALID_HOFBRINCL": "and it has a subscript of [B][I]2[/][/], this formula is [I]valid[/]. On the periodic table, this chemical is called [B]{name}[/].",
        "INVALID_HOFBRINCL": "and it currently only has a subscript of 1, this formula is [I]invalid[/].",

        "POLYATOMIC": "Fortunately, the input provided is a [B]polyatomic[/]. Polyatomics are [I]covalent compounds[/] that act as a single ion. Polyatomics can be [U]both nonmetals and metals[/]. This polyatomic behaves like",
        "POLYATOMIC_METAL": "a [U]positive ion[/], and [I]gives[/] electrons to become more [I]positively[/] charged. This is similar to the chemical properties of a [B]metal[/].",
        "POLYATOMIC_NONMETAL": "a [U]negative ion[/], and [I]takes[/] electrons to become more [I]negatively[/] charged. This is similar to the chemical properties of a [B]non-metal[/].",
        "POLYATOMIC_RESULT": "The polyatomic [B]{formula}[/] is also known as [B]{name}[/]."
    },
    "IONIC": {
        "NEEDS_SWAP": "In this formula, [U]the metal and non-metal are in the wrong places[/]. In ionic compounds, the metal goes first, and is followed by the non-metal. The correct way to write this formula would be [B]{metal_f}{nonmetal_f}[/].",

        "INVALID_METAL_METAL": "[B]ionic[/] compound. This compound invalid, however, as the compound contains two metals. This is not possible.",
        "IS_IONIC": "[B]ionic[/] compound. We know this because the compound contains a [U]metal and non-metal[/]. In an ionic compound, the metal [I]gives it's electron to a non-metal[/] to create a [B]lattice[/] structure. In this formula,",
        
        "IDENTIFY_POLY_METAL": "the metal is a polyatomic. [B]{metal_f}[/] is a polyatomic ion known as [B]{metal}[/],",
        "IDENTIFY_MULTIVALENT_METAL": "the metal is a multivalent metal. [B]{metal_f}[/] is a multivalent metal that has [I]{charges_length} forms of ions[/] &ndash; [B]{list_multivalent}[/],",
        "IDENTIFY_METAL": "the metal is [B]{metal_f}[/],",

        "IDENTIFY_POLY_NONMETAL": "and non-metal [B]{nonmetal_f}[/] is a polyatomic ion known as [B]{nonmetal}[/].",
        "IDENTIFY_NONMETAL": "and the non-metal in the formula is [B]{nonmetal_f}[/].",

        "DESCRIBE_BOND": "In this bond, [B]{metal_quantity} {metal_full}s[/] gives its [I]{metal_gives} electrons[/] to [B]{nonmetal}[/].",
        "CHARGE_BALANCE_ERROR": "This bond is not possible, because [B]{nonmetal_quantity} {nonmetal}s[/] need [I]{nonmetal_takes} electrons[/].",
        "MULTIVALENT_ERROR": "The multivalent element [B]{metal}[/] does not have a [B]{metal}{nonmetal_takes_roman}[/] ion.",
        "DESCRIBE_NO_SUFFIX": "To name this compound, we take the cation, and combine it with the anion. No modification of the non-metal's name is required, as [I]the non-metal is a polyatomic[/]. This compound would be called [U][B]{result}[/][/].",
        "DESCRIBE_SUFFIX": "To name this compound, we take the cation, and combine it with the anion ending with an [I]-ide[/]. {nonmetal} turns into [B]{anion}[/], so this compound would be called [U][B]{result}[/][/]."
    },
    "COVALENT": {
        "IS_COVALENT": "[B]covalent[/] compound. Covalent compounds are when two non-metals bond by sharing an electron to fill it's outer shell.",

        "IDENTIFY_CATION": "",
        "IDENTIFY_POLY_CATION": "The [B]{cation_f}[/] atoms form a [U]positive[/] polyatomic ion called [B]{cation}[/], which acts like a metal and wants to lose [B]{cation_gives} electrons[/].",
        "IDENTIFY_POLY_ANION": "The [B]{anion_f}[/] atoms form a [U]negative[/] polyatomic ion called [B]{anion}[/], which acts like a non-metal and wants to gain [B]{anion_takes} electrons[/].",
        "IDENTIFY_SHARED_ELECTRONS": "In this compound, [B]{cation_quantity} {cation}[/] and [B]{anion_quantity} {anion}[/] share [I]{shared_electrons} electrons[/].",

        "DEFINE_NAMING_CONVENTION": "When naming covalent compounds, elements are prefixed by their quantity in the compound. The prefixes from 1-10 are [I]mono-, di-, tri-, tetra-, penta-, hexa-, hepta-, octa-, nona-, and deca-[/]. The first element is never prefixed with mono, but the second element is always prefixed. The second element will also receive a suffix of [I]-ide[/].",

        "DESCRIBE_CATION_PREFIX": "The [B]{cation_quantity} {cation}s[/] is called [B]{full_cation}[/],",
        "DESCRIBE_CATION_CONCAT_PREFIX": "Since [B]{cation}[/] starts with O or A, the prefix we use has to be adjusted to not clash with the element name.",
        "DESCRIBE_CATION_NOPREFIX": "The [B]{cation_quantity {cation}[/] is not changed, because we do not use mono to the first element as a prefix.",

        "DESCRIBE_ANION_PREFIX": "The [B]{anion_quantity} {anion}s[/] will be prefixed with [I]{anion_prefix}[/], and [I]-ide[/] will be used as a suffix.",
        "DESCRIBE_ANION_CONCAT_PREFIX": "Since [B]{anion}[/] starts with O or A, the prefix we use has to be adjusted to not clash with the element name.",
        "DESCRIBE_NAME": "The resulting compound would be called [B]{full_cation} {full_anion}[/]."
    }
};

export interface ParseError {
    symbol: string;
    unbalancedBrace?: boolean;
    invalidPoly?: boolean;
}

export function parseFormula(formula: string): Promise<Bondable[]> {
    let result: Bondable[] = [];

    return new Promise((res, rej) => {
        const getElement = (s: string) => {
            const element = getFromSymbol(s);
                            
            if (!element) {
                const err: ParseError = { "symbol": s };
                rej(err);
                return null;
            }
            
            return element;
        }

        const getQuantity = (n: string) => {
            const num = Number(n || "1");
            return Number.isNaN(num) ? 1 : num;
        }
    
        let segs = formula.trim().split("");
        let num = "";
        let symbol = "";
        let poly = false;
        let polyQueue: QuantifiedPeriodicElement[] = [];

        if (segs.length == 0) return res([]);
    
        for (let i = 0;i < segs.length;i++) {
            const letter = segs[i];
    
            let val = SUBSCRIPT_TO_NUM[letter];

            if (val) {
                num += val;
            } else {
                const isParenthesis = letter == "(" || letter == ")";
                const isLowerCase = letter.toLowerCase() == letter;
                
                if (isLowerCase && !isParenthesis) {
                    symbol += letter;
                } else {
                    if (isParenthesis) {
                        if (letter == "(") {
                            if (poly) {
                                const err: ParseError = { "symbol": symbol + QUANTITY_SUBSCRIPTS[Number(num)], "unbalancedBrace": true };
                                return rej(err);
                            }

                            if (symbol == "POLY") {
                                result.at(-1)!.quantity = getQuantity(num);
                            } else if (symbol !== "") {
                                const element = getElement(symbol);
                                
                                if (element) {
                                    result.push(Bondable.fromElement(element, getQuantity(num)));
                                } else {
                                    return;
                                }
                            }
                            
                            poly = true;
                            symbol = "";
                        } else if (letter == ")") {
                            const lastSymbol = segs[segs.findIndex((v, i) => v == ")" && segs[i - 1] == "(") - 2];

                            if (symbol == "") {
                                const err: ParseError = { "symbol": lastSymbol, "invalidPoly": true };
                                return rej(err);
                            }

                            if (!poly) {
                                const err: ParseError = { "symbol": lastSymbol, "unbalancedBrace": true };
                                return rej(err);
                            }

                            const element = getElement(symbol);
                            
                            if (element) {
                                polyQueue.push({ "element": element, "quantity": getQuantity(num) });
                            } else {
                                return;
                            }

                            let polyatomic: Bondable;

                            if (polyQueue.length === 1) {
                                polyatomic = Bondable.fromElement(element);
                            } else {
                                polyatomic = getPolyatomic(polyQueue)!;

                                if (!polyatomic) {
                                    const err: ParseError = { "symbol": polyQueue.map(q => q.element.symbol + (![0, 1].includes(q.quantity) ? QUANTITY_SUBSCRIPTS[q.quantity] : "")).join("") }
    
                                    if (!poly) {
                                        err.unbalancedBrace = true;
                                    } else {
                                        err.invalidPoly = true;
                                    }
    
                                    return rej(err);
                                }
                            }
                            
                            result.push(polyatomic);
                            symbol = "POLY";
                            polyQueue = [];
                            poly = false;
                        }
                    } else {
                        if (symbol == "POLY") {
                            result.at(-1)!.quantity = getQuantity(num);
                            symbol = "";
                        } else if (symbol !== "") {
                            if (poly) {
                                const element = getElement(symbol);
                                
                                if (element) {
                                    polyQueue.push({
                                        "element": element,
                                        "quantity": getQuantity(num)
                                    });
                                } else {
                                    return;
                                }
                            } else {
                                const element = getElement(symbol);
    
                                if (element) {
                                    result.push(Bondable.fromElement(element, getQuantity(num)));
                                } else {
                                    return;
                                }
                            }
                        }

                        if (symbol != "POLY") symbol = letter;
                    }
                    num = "";
                }
            }
        }

        if (poly) {
            const err: ParseError = { "symbol": segs[Math.min(1, segs.findIndex(s => s == "(") - 1)], "unbalancedBrace": true };
            return rej(err);
        }

        if (symbol == "POLY") {
            result.at(-1)!.quantity = getQuantity(num);
        } else {
            const element = getElement(symbol);
    
            if (element) {
                result.push(Bondable.fromElement(element, getQuantity(num)));
            } else {
                return;
            }
        }

        const groupedResult: Bondable[] = [];
        const bondableArrToQuantifiedEl: (s: Bondable) => QuantifiedPeriodicElement = (s: Bondable) => ({ "element": s.singletonElement, "quantity": s.primaryQuantity });

        while (result.length !== 0) {
            let nextPoly = result.findIndex(b => !b.isSingleton());
            let poly: Bondable | null = null;
            nextPoly = nextPoly == -1 ? 3 : nextPoly;

            if (result.length >= 2) {
                let sample: Bondable[] = [];
                let use: number = nextPoly;

                if (result.length >= 3) {
                    use = Math.min(3, nextPoly);
                    sample = result.slice(0, use);
                    poly = getPolyatomic(sample.map(bondableArrToQuantifiedEl));
                }

                if (poly == null) {
                    use = Math.min(2, nextPoly);
                    sample = result.slice(0, use);
                    poly = getPolyatomic(sample.map(bondableArrToQuantifiedEl));
                }
                
                if (poly == null) {
                    use = 1
                    sample = result.slice(0, use);
                    poly = sample[0];
                }

                groupedResult.push(poly);
                result.splice(0, use);
            } else {
                groupedResult.push(result[0]);
                result.splice(0, 1);
            }
        }

        res(groupedResult);
    });
}

export async function compound(): Promise<string> {
    const formula: string = <string> $input.val();

    return new Promise(res => {
        Routine.startTask(function*() {
            const $sect1 = Explainer.createExplainationSect();
            const $listPoint1 = Explainer.createListPoint($sect1, 1);
            
            Explainer.followUpExplainationSect($sect1);
            
            yield new WaitForMillis(500);
            
            Explainer.followUpListPoint($listPoint1);
    
            const $introText = $(`<div class="anim-in-down"></div>`);
            let parseResult = Explainer.parseExplainationString(
                commonExplainationScript.INTRO.IDENTIFICATION
            );
            $introText.html(parseResult.result);
            
            yield new WaitForSeconds(1);
            
            $sect1.append($introText);
    
            if (!mute) {
                yield new WaitForPromise(
                    AudioPlayer.playAudiosInSequence(
                        AudioPlayer.getAudioPath("INTRO.IDENTIFICATION.START", parseResult.variations[0]),
                        AudioPlayer.getAudioPath("INTRO.IDENTIFICATION", "1"),
                        AudioPlayer.getAudioPath("INTRO.IDENTIFICATION.TO_IDENTIFY", parseResult.variations[1]),
                        AudioPlayer.getAudioPath("INTRO.IDENTIFICATION", "2"),
                        AudioPlayer.getAudioPath("INTRO.IDENTIFICATION.TO_CHECK_THE_FOLLOWING", parseResult.variations[2]),
                        AudioPlayer.getAudioPath("INTRO.IDENTIFICATION", "3")
                    )
                );
            }
    
            yield new WaitForMillis(500);

            parseFormula(formula).then(bondables => {
                Routine.startTask(function*() {
                    const isSingleton = bondables.length == 1;
        
                    if (isSingleton) {
                        if (bondables[0].isSingleton()) {
                            const $singleton = $(`<div class="anim-in-down mt-4"></div>`);
                            const explainations: string[] = [ compoundExplainationScript.LONE.IS_LONE ];
                            const audioExplainations: string[] = [ AudioPlayer.getAudioPath("C/LONE.IS_LONE", "1") ];
                            const bondableSingleton = bondables[0];
                            const symbol = bondableSingleton.singletonElement.symbol;
                            const name = bondableSingleton.name;
                            let combinedName;
                            
                            if (HOFBrINClS.includes(bondableSingleton.singletonElement) && bondableSingleton.primaryQuantity <= 2) {
                                combinedName = name;
            
                                explainations.push(compoundExplainationScript.LONE.HOFBRINCL);
                                audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.HOFBRINCL", "1"));
                                
                                if (bondableSingleton.primaryQuantity === 2) {
                                    explainations.push(compoundExplainationScript.LONE.VALID_HOFBRINCL);
                                    audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.VALID_HOFBRINCL", "1"));
                                    audioExplainations.push(AudioPlayer.getAudioPath("ELEMENTS.ELEMENT", name));
                                    audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.VALID_HOFBRINCL", "2"));

                                    if (symbol != "Br" && symbol != "I") {
                                        combinedName += " gas";
                                    } else {
                                        combinedName += " (gas/solid/liquid)";
                                    }
                                } else {
                                    explainations.push(compoundExplainationScript.LONE.INVALID_HOFBRINCL);
                                    audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.INVALID_HOFBRINCL", "1"));
                                    combinedName = "Invalid formula";
                                }
                            } else {
                                const combinationResult = combineSuffix(bondableSingleton.primaryQuantity, bondableSingleton.singletonElement);
                                const hasPrefix = !!combinationResult.prefix;
                                const ionic = METALS.includes(bondables[0].singletonElement);
                                combinedName = combinationResult.result;
            
                                const addSymbolSpeech = () => {
                                    if (symbol.length == 2) {
                                        audioExplainations.push(AudioPlayer.getAudioPath("ELEMENTS.MISC", symbol[0]));
                                        audioExplainations.push(AudioPlayer.getAudioPath("ELEMENTS.MISC", symbol[1].toUpperCase()));
                                    } else {
                                        audioExplainations.push(AudioPlayer.getAudioPath("ELEMENTS.MISC", symbol));
                                    }
                                }
                                
                                if (ionic) {
                                    explainations.push(compoundExplainationScript.LONE.METAL);
                                    audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.METAL", "1"));
                                    addSymbolSpeech();
                                    audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.METAL", "2"));
                                    if (hasPrefix) audioExplainations.push(AudioPlayer.getAudioPath("ELEMENTS.MISC", combinationResult.prefix));
                                    audioExplainations.push(AudioPlayer.getAudioPath("ELEMENTS.ELEMENT", name));
                                } else {
                                    explainations.push(compoundExplainationScript.LONE.NONMETAL);
                                    audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.NONMETAL", "1"));
                                    addSymbolSpeech();
                                    audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.NONMETAL", "2"));
                                    if (hasPrefix) audioExplainations.push(AudioPlayer.getAudioPath("ELEMENTS.MISC", combinationResult.prefix));
                                    audioExplainations.push(AudioPlayer.getAudioPath("ELEMENTS.ELEMENT", name));
                                }
                                
                                if (bondableSingleton.primaryQuantity > 1) {
                                    explainations.push(compoundExplainationScript.LONE.PREFIX);
                                    audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.PREFIX", "1"));
                                    
                                    if (combinationResult.moddedPrefix) {
                                        explainations.push(compoundExplainationScript.LONE.MPREFIX);
                                        audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.MPREFIX", "1"));
                                    }
                                }
                            }
            
                            const singletonMsg = Explainer.parseExplainationString(explainations.join(" "), {
                                "symbol": symbol,
                                "name": capitalize(combinedName.toLowerCase())
                            });
                            $singleton.html(singletonMsg.result);
                            $introText.append($singleton);
            
                            if (!mute) {
                                yield new WaitForPromise(
                                    AudioPlayer.playAudiosInSequence(...audioExplainations)
                                );
                            }
            
                            yield new WaitForMillis(500);
            
                            return res(capitalize(combinedName.toLowerCase()));
                        } else {
                            const polyatomic = bondables[0];
                            const explainations: string[] = [ compoundExplainationScript.LONE.POLYATOMIC ];
                            const audioExplainations: string[] = [ AudioPlayer.getAudioPath("C/LONE.POLYATOMIC", "1") ];
            
                            if (polyatomic) {
                                const formula = polyatomic.chemicalFormula;
                                const name = polyatomic.name;
            
                                if (polyatomic.primaryCharge > 0) {
                                    explainations.push(compoundExplainationScript.LONE.POLYATOMIC_METAL);
                                    audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.POLYATOMIC_METAL", "1"));
                                } else {
                                    explainations.push(compoundExplainationScript.LONE.POLYATOMIC_NONMETAL);
                                    audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.POLYATOMIC_NONMETAL", "1"));
                                }
            
                                explainations.push(compoundExplainationScript.LONE.POLYATOMIC_RESULT);
                                audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.POLYATOMIC_RESULT", "1"));
                                
                                for (const letter of formula) {
                                    const numVal = SUBSCRIPT_TO_NUM[letter];
                                    if (numVal) audioExplainations.push(AudioPlayer.getAudioPath("ELEMENTS.MISC", numVal.toString()));
                                    else audioExplainations.push(AudioPlayer.getAudioPath("ELEMENTS.MISC", letter.toUpperCase()));
                                }
            
                                audioExplainations.push(AudioPlayer.getAudioPath("C/LONE.POLYATOMIC_RESULT", "2"));
                                audioExplainations.push(AudioPlayer.getAudioPath("ELEMENTS.POLYATOMIC", name));
            
                                const polyatomicText = Explainer.parseExplainationString(explainations.join(" "), {
                                    "formula": formula,
                                    "name": capitalize(name.toLowerCase())
                                });
            
                                const $polyatomic = $(`<div class="anim-in-down mt-4"></div>`);
                                $polyatomic.html(polyatomicText.result);
                                $introText.append($polyatomic);
            
                                if (!mute) {
                                    yield new WaitForPromise(
                                        AudioPlayer.playAudiosInSequence(...audioExplainations)
                                    );
                                }
            
                                yield new WaitForMillis(500);
            
                                return res(capitalize(name.toLowerCase()));
                            }
                        }
                    }
        
                    const $sect2 = Explainer.createExplainationSect();
                    yield new WaitForMillis(100);
                    Explainer.followUpExplainationSect($sect2);
                    
                    const $listPoint2 = Explainer.createListPoint($sect2, 2);
                    yield new WaitForMillis(100);
                    Explainer.followUpListPoint($listPoint2);
        
                    const $resultSect = Explainer.createExplainationSect();
                    
                    const followUpResultsSection = async () => {
                        Explainer.followUpExplainationSect($resultSect);
                        const $resultPoint = Explainer.createListPoint($resultSect, 3);
                        await delay(100);
                        Explainer.followUpListPoint($resultPoint);
                    }
                    
                    yield new WaitForMillis(1000);
        
                    const $identification = $(`<div class="anim-in-down"></div>`);
                    const $result = $(`<div class="anim-in-down"></div>`);
        
                    const ionic = bondables.length == 2 && ((bondables[0].actsLikeMetal && !["H"].concat(METALLOIDS.map(ep => ep.symbol)).includes(bondables[0].singletonElement.symbol)) || bondables[1].actsLikeMetal);
                    
                    let identificationText: string[] = [ compoundExplainationScript.INTRO.IDENTIFY ];
                    let resultingText: string[] = [];
                    
                    if (ionic) {
                        const needsSwap = !bondables[0].actsLikeMetal;
                        const [ metal, nonmetal ]: [ Bondable<Metals>, Bondable<NonMetals> ] = needsSwap ? [bondables[1], bondables[0]] : [bondables[0], bondables[1]];
                        
                        if (needsSwap) identificationText.push(compoundExplainationScript.IONIC.NEEDS_SWAP);

                        if (metal.actsLikeMetal && nonmetal.actsLikeMetal) {
                            identificationText.push(compoundExplainationScript.IONIC.INVALID_METAL_METAL);
                            $identification.html(Explainer.parseExplainationString(identificationText.join(" ")).result);
                            $sect2.append($identification);
                            yield new WaitForMillis(500);
                            return res("Invalid formula");
                        }

                        const [ metalReducedQuant, nonmetalReducedQuant ] = reduce(metal.primaryQuantity, nonmetal.primaryQuantity);
                        const [ metalQuant, nonmetalQuant ] = [metal.primaryQuantity, nonmetal.primaryQuantity];
                        const reducedChargesBalance = metal.charges.map(c => c * metalReducedQuant).includes(-nonmetal.primaryCharge * nonmetalReducedQuant);
                        const chargesBalance = metal.charges.map(c => c * metalQuant).includes(-nonmetal.primaryCharge * nonmetalQuant);

                        console.log(chargesBalance, reducedChargesBalance);
        
                        let resultingName = capitalize(metal.name.toLowerCase());
                        let cationName = resultingName.toString();
                        let anionName = capitalize(nonmetal.name.toLowerCase());
                        let invalid = false;
                        
                        identificationText.push(compoundExplainationScript.IONIC.IS_IONIC);
                        resultingText.push(compoundExplainationScript.IONIC.DESCRIBE_BOND);
                        
                        if (metal.isSingleton()) {
                            if (metal.isMultivalent) {
                                identificationText.push(compoundExplainationScript.IONIC.IDENTIFY_MULTIVALENT_METAL);
        
                                if (chargesBalance) {
                                    const denom = nonmetalQuant;
                                    
                                    if (!metal.charges.includes(denom)) {
                                        for (const charge of metal.charges) {
                                            // Get multiples of charges (1, 2) (2, 4) (3, 6) etc
                                            // Make sure non metal agrees with the charge
                                            if ((charge % denom === 0) && nonmetal.charges.includes(-charge)) {
                                                resultingName += `(${Nomenclature.ROMAN_NUMERAL_MAP[charge * denom]})`;
                                                cationName += `(${Nomenclature.ROMAN_NUMERAL_MAP[charge * denom]})`;
                                                break;
                                            }
                                        }
                                    } else {
                                        resultingName += `(${Nomenclature.ROMAN_NUMERAL_MAP[denom]})`;
                                        cationName += `(${Nomenclature.ROMAN_NUMERAL_MAP[denom]})`;
                                    }
                                }
                            } else {
                                identificationText.push(compoundExplainationScript.IONIC.IDENTIFY_METAL);
                            }
                        } else {
                            identificationText.push(compoundExplainationScript.IONIC.IDENTIFY_POLY_METAL);
                        }
                        
                        if (chargesBalance) {
                            if (nonmetal.isSingleton()) {
                                identificationText.push(compoundExplainationScript.IONIC.IDENTIFY_NONMETAL);
                                resultingText.push(compoundExplainationScript.IONIC.DESCRIBE_SUFFIX);
                                anionName = capitalize(Nomenclature.ELEMENT_TO_ANION[<Nomenclature.ValidAnionNonMetal> nonmetal.name].toLowerCase());
                                resultingName += " " + anionName;
                            } else {
                                identificationText.push(compoundExplainationScript.IONIC.IDENTIFY_POLY_NONMETAL);
                                resultingText.push(compoundExplainationScript.IONIC.DESCRIBE_NO_SUFFIX);
                                resultingName += " " + capitalize(nonmetal.name.toLowerCase());
                            }
                        } else {
                            resultingText.push(compoundExplainationScript.IONIC.CHARGE_BALANCE_ERROR);
        
                            if (metal.isMultivalent) {
                                resultingText.push(compoundExplainationScript.IONIC.MULTIVALENT_ERROR);
                            }
        
                            invalid = true;
                        }
        
                        let multivalentList: string[] = [];
                        let multivalentJoined = "";
        
                        if (metal.isMultivalent) {
                            metal.charges.forEach(charge => {
                                multivalentList.push(`${capitalize(metal.name.toLowerCase())}(${Nomenclature.ROMAN_NUMERAL_MAP[charge]})`);
                            });
        
                            const a = multivalentList.splice(0, multivalentList.length - 1);
                            const b = multivalentList;
        
                            multivalentJoined = (a.join(", ") + " and " + b);
                        }
        
                        $identification.html(Explainer.parseExplainationString(identificationText.join(" "), {
                            "metal": capitalize(metal.name.toLowerCase()),
                            "metal_f": metal.chemicalFormula,
                            "nonmetal": capitalize(nonmetal.name.toLowerCase()),
                            "nonmetal_f": nonmetal.chemicalFormula,
                            "charges_length": metal.charges.length.toString(),
                            "list_multivalent": multivalentJoined
                        }).result);
                        $sect2.append($identification);
                        
                        yield new WaitForSeconds(1);
                        
                        followUpResultsSection();
                        
                        yield new WaitForSeconds(1);
                        
                        $result.html(Explainer.parseExplainationString(resultingText.join(" "), {
                            "metal": capitalize(metal.name.toLowerCase()),
                            "metal_full": cationName,
                            "metal_gives": (metal.primaryCharge * metalQuant).toString(),
                            "metal_quantity": metalQuant.toString(),
                            "nonmetal": capitalize(nonmetal.name.toLowerCase()),
                            "nonmetal_takes": (-nonmetal.primaryCharge * nonmetalQuant).toString(),
                            "nonmetal_takes_roman": `(${Nomenclature.ROMAN_NUMERAL_MAP[-nonmetal.primaryCharge]})`,
                            "nonmetal_quantity": nonmetalQuant.toString(),
                            "anion": anionName,
                            "result": resultingName
                        }).result);
        
                        $resultSect.append($result);
        
                        if (invalid) {
                            return res("Invalid formula");
                        } else {
                            return res(resultingName);
                        }
                    } else {
                        identificationText.push(compoundExplainationScript.COVALENT.IS_COVALENT);
                        $sect2.append($identification);

                        // if ()

                        followUpResultsSection();

                        yield new WaitForSeconds(1);

                        res("Work in progress");
                    }
                });
            }).catch((parseError: ParseError) => {
                Routine.startTask(function*() {
                    const err = Explainer.parseExplainationString(commonExplainationScript.VALIDATION.FORMULA + " " + commonExplainationScript.VALIDATION.COMMON, {
                        "symbol": parseError.symbol
                    });
                    const $errBox = $(`<div class="anim-in-down mt-4"></div>`);
                    $errBox.html(err.result);
                    
                    yield new WaitForMillis(500);
                    
                    $introText.append($errBox);
    
                    if (!mute) {
                        const symb = parseError.symbol.toUpperCase();
                        const spellFormula: string[] = [
                            AudioPlayer.getAudioPath("ELEMENTS.MISC", symb[0])
                        ];
                        if (symb.length == 2) spellFormula.push(AudioPlayer.getAudioPath("ELEMENTS.MISC", symb[1]))
    
                        yield new WaitForPromise(
                            AudioPlayer.playAudiosInSequence(
                                AudioPlayer.getAudioPath("VALIDATION.FORMULA", "1"),
                                ...spellFormula,
                                AudioPlayer.getAudioPath("VALIDATION.COMMON", "1")
                            )
                        );
                    }
    
                    return res("Invalid formula");
                });
            });
        });
    });
}


