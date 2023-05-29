import { PeriodicElementNames } from "./Elements";
import { swapObj } from "./Util";

export namespace Nomenclature {
    export const ANION_MAP = {
        "HYDRIDE": "HYDROGEN",
        "CARBIDE": "CARBON",
        "NITRIDE": "NITROGEN",
        "OXIDE": "OXYGEN",
        "FLUORIDE": "FLUORINE",
        "PHOSPHIDE": "PHOSPHORUS",
        "SULFIDE": "SULFUR",
        "CHLORIDE": "CHLORINE",
        "SELENIDE": "SELENIUM",
        "BROMIDE": "BROMINE",
        "IODIDE": "IODINE"
    };
    
    export type AnionNames = keyof typeof ANION_MAP;
    export type ValidAnionNonMetal = typeof ANION_MAP[keyof typeof ANION_MAP];
    
    export const ELEMENT_TO_ANION: Record<ValidAnionNonMetal, AnionNames> = swapObj(ANION_MAP);
    
    


    export const PREFIX_MAP = {
        1: "MONO",
        2: "DI",
        3: "TRI",
        4: "TETRA",
        5: "PENTA",
        6: "HEXA",
        7: "HEPTA",
        8: "OCTA",
        9: "NONA",
        10: "DECA"
    };

    export const MODDED_PREFIX_MAP = {
        1: "MON",
        2: "DI",
        3: "TRI",
        4: "TETR",
        5: "PENT",
        6: "HEX",
        7: "HEPT",
        8: "OCT",
        9: "NON",
        10: "DEC"
    }
    
    export type ElementPrefixRange = keyof typeof PREFIX_MAP;
    export type PrefixNames = typeof PREFIX_MAP[ElementPrefixRange];
    export type ModdedPrefixNames = typeof MODDED_PREFIX_MAP[ElementPrefixRange];
    export const MODDED_PREFIX_TO_NUM: Record<ModdedPrefixNames, number> = swapObj(MODDED_PREFIX_MAP);
    export const PREFIX_TO_NUM: Record<PrefixNames, number> = swapObj(PREFIX_MAP);



    export const ROMAN_NUMERAL_MAP: Record<number, string> = {
        1: "I",
        2: "II",
        3: "III",
        4: "IV",
        5: "V",
        6: "VI",
        7: "VII",
        8: "VIII",
        9: "IX",
        10: "X"
    }
    
    export type RomanNumerals = typeof ROMAN_NUMERAL_MAP[keyof typeof ROMAN_NUMERAL_MAP];
    export const ROMAN_NUMERAL_TO_NUM: Record<RomanNumerals, number> = swapObj(ROMAN_NUMERAL_MAP);
}