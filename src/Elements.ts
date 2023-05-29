import { QuantifiedPeriodicElement } from "./ChemicalCompounds";
import { Nomenclature } from "./Nomenclature";

export type PeriodicElementNames = "HYDROGEN" | "HELIUM" | "LITHIUM" | "BERYLLIUM" | "BORON" | "CARBON" | "NITROGEN" | "OXYGEN" | "FLUORINE" | "NEON" | "SODIUM" | "MAGNESIUM" | "ALUMINIUM" | "SILICON" | "PHOSPHORUS" | "SULFUR" | "CHLORINE" | "ARGON" | "POTASSIUM" | "CALCIUM" | "SCANDIUM" | "TITANIUM" | "VANADIUM" | "CHROMIUM" | "MANGANESE" | "IRON" | "COBALT" | "NICKEL" | "COPPER" | "ZINC" | "GALLIUM" | "GERMANIUM" | "ARSENIC" | "SELENIUM" | "BROMINE" | "KRYPTON" | "RUBIDIUM" | "STRONTIUM" | "YTTRIUM" | "ZIRCONIUM" | "NIOBIUM" | "MOLYBDENUM" | "TECHNETIUM" | "RUTHENIUM" | "RHODIUM" | "PALLADIUM" | "SILVER" | "CADMIUM" | "INDIUM" | "TIN" | "ANTIMONY" | "TELLURIUM" | "IODINE" | "XENON" | "CESIUM" | "BARIUM" | "HAFNIUM" | "TANTALUM" | "TUNGSTEN" | "RHENIUM" | "OSMIUM" | "IRIDIUM" | "PLATINUM" | "GOLD" | "MERCURY" | "THALLIUM" | "LEAD";
export type PeriodicTable = Record<PeriodicElementNames, PeriodicElement>;

export interface PeriodicElement {
    name: PeriodicElementNames;
    number: number;
    pos: [ number, number ];
    symbol: string;
    charges: number[];
    metal: boolean;
}

export const PERIODIC_TABLE: PeriodicTable = {
	HYDROGEN:      { name: "HYDROGEN",      number: 1, pos: [ 1, 1 ], charges: [ -1, 1 ], metal: false, symbol: "H" },
	HELIUM:        { name: "HELIUM",        number: 2, pos: [ 18, 1 ], charges: [], metal: false, symbol: "He" },
	LITHIUM:       { name: "LITHIUM",       number: 3, pos: [ 1, 2 ], charges: [ 1 ], metal: true, symbol: "Li" },
	BERYLLIUM:     { name: "BERYLLIUM",     number: 4, pos: [ 2, 2 ], charges: [ 2 ], metal: true, symbol: "Be" },
	BORON:         { name: "BORON",         number: 5, pos: [ 13, 2 ], charges: [ 3 ], metal: true, symbol: "B" },
	CARBON:        { name: "CARBON",        number: 6, pos: [ 14, 2 ], charges: [ -4, 4 ], metal: false, symbol: "C" },
	NITROGEN:      { name: "NITROGEN",      number: 7, pos: [ 15, 2 ], charges: [ -3 ], metal: false, symbol: "N" },
	OXYGEN:        { name: "OXYGEN",        number: 8, pos: [ 16, 2 ], charges: [ -2 ], metal: false, symbol: "O" },
	FLUORINE:      { name: "FLUORINE",      number: 9, pos: [ 17, 2 ], charges: [ -1 ], metal: false, symbol: "F" },
	NEON:          { name: "NEON",          number: 10, pos: [ 18, 2 ], charges: [], metal: false, symbol: "Ne" },
	SODIUM:        { name: "SODIUM",        number: 11, pos: [ 1, 3 ], charges: [ 1 ], metal: true, symbol: "Na" },
	MAGNESIUM:     { name: "MAGNESIUM",     number: 12, pos: [ 2, 3 ], charges: [ 2 ], metal: true, symbol: "Mg" },
	ALUMINIUM:     { name: "ALUMINIUM",     number: 13, pos: [ 13, 3 ], charges: [ 3 ], metal: true, symbol: "Al" },
	SILICON:       { name: "SILICON",       number: 14, pos: [ 14, 3 ], charges: [ -4, 4 ], metal: true, symbol: "Si" },
	PHOSPHORUS:    { name: "PHOSPHORUS",    number: 15, pos: [ 15, 3 ], charges: [ -3 ], metal: false, symbol: "P" },
	SULFUR:        { name: "SULFUR",        number: 16, pos: [ 16, 3 ], charges: [ -2 ], metal: false, symbol: "S" },
	CHLORINE:      { name: "CHLORINE",      number: 17, pos: [ 17, 3 ], charges: [ -1 ], metal: false, symbol: "Cl" },
	ARGON:         { name: "ARGON",         number: 18, pos: [ 18, 3 ], charges: [], metal: false, symbol: "Ar" },
	POTASSIUM:     { name: "POTASSIUM",     number: 19, pos: [ 1, 4 ], charges: [ 1 ], metal: true, symbol: "K" },
	CALCIUM:       { name: "CALCIUM",       number: 20, pos: [ 2, 4 ], charges: [ 2 ], metal: true, symbol: "Ca" },
	SCANDIUM:      { name: "SCANDIUM",      number: 21, pos: [ 3, 4 ], charges: [ 3 ], metal: true, symbol: "Sc" },
	TITANIUM:      { name: "TITANIUM",      number: 22, pos: [ 4, 4 ], charges: [ 3, 4 ], metal: true, symbol: "Ti" },
	VANADIUM:      { name: "VANADIUM",      number: 23, pos: [ 5, 4 ], charges: [ 2, 5 ], metal: true, symbol: "V" },
	CHROMIUM:      { name: "CHROMIUM",      number: 24, pos: [ 6, 4 ], charges: [ 3, 6 ], metal: true, symbol: "Cr" },
	MANGANESE:     { name: "MANGANESE",     number: 25, pos: [ 7, 4 ], charges: [ 2, 4, 7 ], metal: true, symbol: "Mn" },
	IRON:          { name: "IRON",          number: 26, pos: [ 8, 4 ], charges: [ 2, 3 ], metal: true, symbol: "Fe" },
	COBALT:        { name: "COBALT",        number: 27, pos: [ 9, 4 ], charges: [ 2, 3 ], metal: true, symbol: "Co" },
	NICKEL:        { name: "NICKEL",        number: 28, pos: [ 10, 4 ], charges: [ 2, 3 ], metal: true, symbol: "Ni" },
	COPPER:        { name: "COPPER",        number: 29, pos: [ 11, 4 ], charges: [ 1, 2 ], metal: true, symbol: "Cu" },
	ZINC:          { name: "ZINC",          number: 30, pos: [ 12, 4 ], charges: [ 2 ], metal: true, symbol: "Zn" },
	GALLIUM:       { name: "GALLIUM",       number: 31, pos: [ 13, 4 ], charges: [ 3 ], metal: true, symbol: "Ga" },
	GERMANIUM:     { name: "GERMANIUM",     number: 32, pos: [ 14, 4 ], charges: [ -4, 2, 4 ], metal: true, symbol: "Ge" },
	ARSENIC:       { name: "ARSENIC",       number: 33, pos: [ 15, 4 ], charges: [ -3 ], metal: true, symbol: "As" },
	SELENIUM:      { name: "SELENIUM",      number: 34, pos: [ 16, 4 ], charges: [ -2 ], metal: false, symbol: "Se" },
	BROMINE:       { name: "BROMINE",       number: 35, pos: [ 17, 4 ], charges: [ -1 ], metal: false, symbol: "Br" },
	KRYPTON:       { name: "KRYPTON",       number: 36, pos: [ 18, 4 ], charges: [], metal: false, symbol: "Kr" },
	RUBIDIUM:      { name: "RUBIDIUM",      number: 37, pos: [ 1, 5 ], charges: [ 1 ], metal: true, symbol: "Rb" },
	STRONTIUM:     { name: "STRONTIUM",     number: 38, pos: [ 2, 5 ], charges: [ 2 ], metal: true, symbol: "Sr" },
	YTTRIUM:       { name: "YTTRIUM",       number: 39, pos: [ 3, 5 ], charges: [ 3 ], metal: true, symbol: "Y" },
	ZIRCONIUM:     { name: "ZIRCONIUM",     number: 40, pos: [ 4, 5 ], charges: [ 4 ], metal: true, symbol: "Zr" },
	NIOBIUM:       { name: "NIOBIUM",       number: 41, pos: [ 5, 5 ], charges: [ 3, 5 ], metal: true, symbol: "Nb" },
	MOLYBDENUM:    { name: "MOLYBDENUM",    number: 42, pos: [ 6, 5 ], charges: [ 2, 6 ], metal: true, symbol: "Mo" },
	TECHNETIUM:    { name: "TECHNETIUM",    number: 43, pos: [ 7, 5 ], charges: [ 7 ], metal: true, symbol: "Tc" },
	RUTHENIUM:     { name: "RUTHENIUM",     number: 44, pos: [ 8, 5 ], charges: [ 2, 3 ], metal: true, symbol: "Ru" },
	RHODIUM:       { name: "RHODIUM",       number: 45, pos: [ 9, 5 ], charges: [ 2, 3 ], metal: true, symbol: "Rh" },
	PALLADIUM:     { name: "PALLADIUM",     number: 46, pos: [ 10, 5 ], charges: [ 2, 3 ], metal: true, symbol: "Pd" },
	SILVER:        { name: "SILVER",        number: 47, pos: [ 11, 5 ], charges: [ 1 ], metal: true, symbol: "Ag" },
	CADMIUM:       { name: "CADMIUM",       number: 48, pos: [ 12, 5 ], charges: [ 2 ], metal: true, symbol: "Cd" },
	INDIUM:        { name: "INDIUM",        number: 49, pos: [ 13, 5 ], charges: [ 3 ], metal: true, symbol: "In" },
	TIN:           { name: "TIN",           number: 50, pos: [ 14, 5 ], charges: [ -4, 2, 4 ], metal: true, symbol: "Sn" },
	ANTIMONY:      { name: "ANTIMONY",      number: 51, pos: [ 15, 5 ], charges: [ 5, -3 ], metal: true, symbol: "Sb" },
	TELLURIUM:     { name: "TELLURIUM",     number: 52, pos: [ 16, 5 ], charges: [ -2 ], metal: true, symbol: "Te" },
	IODINE:        { name: "IODINE",        number: 53, pos: [ 17, 5 ], charges: [ -1 ], metal: false, symbol: "I" },
	XENON:         { name: "XENON",         number: 54, pos: [ 18, 5 ], charges: [], metal: false, symbol: "Xe" },
	CESIUM:        { name: "CESIUM",        number: 55, pos: [ 1, 6 ], charges: [ 1 ], metal: true, symbol: "Cs" },
	BARIUM:        { name: "BARIUM",        number: 56, pos: [ 2, 6 ], charges: [ 2 ], metal: true, symbol: "Ba" },
	HAFNIUM:       { name: "HAFNIUM",       number: 72, pos: [ 4, 6 ], charges: [ 4 ], metal: true, symbol: "Hf" },
	TANTALUM:      { name: "TANTALUM",      number: 73, pos: [ 5, 6 ], charges: [ 5 ], metal: true, symbol: "Ta" },
	TUNGSTEN:      { name: "TUNGSTEN",      number: 74, pos: [ 6, 6 ], charges: [ 2, 6 ], metal: true, symbol: "W" },
	RHENIUM:       { name: "RHENIUM",       number: 75, pos: [ 7, 6 ], charges: [ 7, -1 ], metal: true, symbol: "Re" },
	OSMIUM:        { name: "OSMIUM",        number: 76, pos: [ 8, 6 ], charges: [ 2, 3 ], metal: true, symbol: "Os" },
	IRIDIUM:       { name: "IRIDIUM",       number: 77, pos: [ 9, 6 ], charges: [ 2, 3 ], metal: true, symbol: "Ir" },
	PLATINUM:      { name: "PLATINUM",      number: 78, pos: [ 10, 6 ], charges: [ 2, 3 ], metal: true, symbol: "Pt" },
	GOLD:          { name: "GOLD",          number: 79, pos: [ 11, 6 ], charges: [ 1, 3 ], metal: true, symbol: "Au" },
	MERCURY:       { name: "MERCURY",       number: 80, pos: [ 12, 6 ], charges: [ 1, 2 ], metal: true, symbol: "Hg" },
	THALLIUM:      { name: "THALLIUM",      number: 81, pos: [ 13, 6 ], charges: [ 3 ], metal: true, symbol: "Tl" },
	LEAD:          { name: "LEAD",          number: 82, pos: [ 14, 6 ], charges: [ 2, 4 ], metal: true, symbol: "Pb" },
};

export const METALS = [ PERIODIC_TABLE.LITHIUM, PERIODIC_TABLE.BERYLLIUM, PERIODIC_TABLE.SODIUM, PERIODIC_TABLE.MAGNESIUM, PERIODIC_TABLE.ALUMINIUM, PERIODIC_TABLE.POTASSIUM, PERIODIC_TABLE.CALCIUM, PERIODIC_TABLE.SCANDIUM, PERIODIC_TABLE.TITANIUM, PERIODIC_TABLE.VANADIUM, PERIODIC_TABLE.CHROMIUM, PERIODIC_TABLE.MANGANESE, PERIODIC_TABLE.IRON, PERIODIC_TABLE.COBALT, PERIODIC_TABLE.NICKEL, PERIODIC_TABLE.COPPER, PERIODIC_TABLE.ZINC, PERIODIC_TABLE.GALLIUM, PERIODIC_TABLE.RUBIDIUM, PERIODIC_TABLE.STRONTIUM, PERIODIC_TABLE.YTTRIUM, PERIODIC_TABLE.ZIRCONIUM, PERIODIC_TABLE.NIOBIUM, PERIODIC_TABLE.MOLYBDENUM, PERIODIC_TABLE.TECHNETIUM, PERIODIC_TABLE.RUTHENIUM, PERIODIC_TABLE.RHODIUM, PERIODIC_TABLE.PALLADIUM, PERIODIC_TABLE.SILVER, PERIODIC_TABLE.CADMIUM, PERIODIC_TABLE.INDIUM, PERIODIC_TABLE.TIN, PERIODIC_TABLE.IODINE, PERIODIC_TABLE.CESIUM, PERIODIC_TABLE.BARIUM, PERIODIC_TABLE.HAFNIUM, PERIODIC_TABLE.TANTALUM, PERIODIC_TABLE.TUNGSTEN, PERIODIC_TABLE.RHENIUM, PERIODIC_TABLE.OSMIUM, PERIODIC_TABLE.IRIDIUM, PERIODIC_TABLE.PLATINUM, PERIODIC_TABLE.GOLD, PERIODIC_TABLE.MERCURY, PERIODIC_TABLE.THALLIUM, PERIODIC_TABLE.LEAD];
export type Metals = typeof PERIODIC_TABLE.HYDROGEN | typeof PERIODIC_TABLE.LITHIUM | typeof PERIODIC_TABLE.BERYLLIUM | typeof PERIODIC_TABLE.BORON | typeof PERIODIC_TABLE.SODIUM | typeof PERIODIC_TABLE.MAGNESIUM | typeof PERIODIC_TABLE.ALUMINIUM | typeof PERIODIC_TABLE.SILICON | typeof PERIODIC_TABLE.POTASSIUM | typeof PERIODIC_TABLE.CALCIUM | typeof PERIODIC_TABLE.SCANDIUM | typeof PERIODIC_TABLE.TITANIUM | typeof PERIODIC_TABLE.VANADIUM | typeof PERIODIC_TABLE.CHROMIUM | typeof PERIODIC_TABLE.MANGANESE | typeof PERIODIC_TABLE.IRON | typeof PERIODIC_TABLE.COBALT | typeof PERIODIC_TABLE.NICKEL | typeof PERIODIC_TABLE.COPPER | typeof PERIODIC_TABLE.ZINC | typeof PERIODIC_TABLE.GALLIUM | typeof PERIODIC_TABLE.GERMANIUM | typeof PERIODIC_TABLE.ARSENIC | typeof PERIODIC_TABLE.RUBIDIUM | typeof PERIODIC_TABLE.STRONTIUM | typeof PERIODIC_TABLE.YTTRIUM | typeof PERIODIC_TABLE.ZIRCONIUM | typeof PERIODIC_TABLE.NIOBIUM | typeof PERIODIC_TABLE.MOLYBDENUM | typeof PERIODIC_TABLE.TECHNETIUM | typeof PERIODIC_TABLE.RUTHENIUM | typeof PERIODIC_TABLE.RHODIUM | typeof PERIODIC_TABLE.PALLADIUM | typeof PERIODIC_TABLE.SILVER | typeof PERIODIC_TABLE.CADMIUM | typeof PERIODIC_TABLE.INDIUM | typeof PERIODIC_TABLE.TIN | typeof PERIODIC_TABLE.ANTIMONY | typeof PERIODIC_TABLE.TELLURIUM | typeof PERIODIC_TABLE.IODINE | typeof PERIODIC_TABLE.CESIUM | typeof PERIODIC_TABLE.BARIUM | typeof PERIODIC_TABLE.HAFNIUM | typeof PERIODIC_TABLE.TANTALUM | typeof PERIODIC_TABLE.TUNGSTEN | typeof PERIODIC_TABLE.RHENIUM | typeof PERIODIC_TABLE.OSMIUM | typeof PERIODIC_TABLE.IRIDIUM | typeof PERIODIC_TABLE.PLATINUM | typeof PERIODIC_TABLE.GOLD | typeof PERIODIC_TABLE.MERCURY | typeof PERIODIC_TABLE.THALLIUM | typeof PERIODIC_TABLE.LEAD;

export const METALLOIDS = [ PERIODIC_TABLE.BORON, PERIODIC_TABLE.SILICON, PERIODIC_TABLE.GERMANIUM, PERIODIC_TABLE.ARSENIC, PERIODIC_TABLE.ANTIMONY, PERIODIC_TABLE.TELLURIUM ];
export type Metalloids = typeof PERIODIC_TABLE.BORON | typeof PERIODIC_TABLE.SILICON | typeof PERIODIC_TABLE.GERMANIUM | typeof PERIODIC_TABLE.ARSENIC | typeof PERIODIC_TABLE.ANTIMONY | typeof PERIODIC_TABLE.TELLURIUM;

export const BONDABLE_NONMETALS = [ PERIODIC_TABLE.HYDROGEN, PERIODIC_TABLE.CARBON, PERIODIC_TABLE.NITROGEN, PERIODIC_TABLE.OXYGEN, PERIODIC_TABLE.FLUORINE, PERIODIC_TABLE.PHOSPHORUS, PERIODIC_TABLE.SULFUR, PERIODIC_TABLE.CHLORINE, PERIODIC_TABLE.SELENIUM, PERIODIC_TABLE.BROMINE, PERIODIC_TABLE.IODINE ];
export type BondableNonMetals = typeof PERIODIC_TABLE.HYDROGEN | typeof PERIODIC_TABLE.CARBON | typeof PERIODIC_TABLE.NITROGEN | typeof PERIODIC_TABLE.OXYGEN | typeof PERIODIC_TABLE.FLUORINE | typeof PERIODIC_TABLE.PHOSPHORUS | typeof PERIODIC_TABLE.SULFUR | typeof PERIODIC_TABLE.CHLORINE | typeof PERIODIC_TABLE.SELENIUM | typeof PERIODIC_TABLE.BROMINE | typeof PERIODIC_TABLE.IODINE;

export const NOBLE_GASES = [ PERIODIC_TABLE.NEON, PERIODIC_TABLE.ARGON, PERIODIC_TABLE.HELIUM, PERIODIC_TABLE.KRYPTON, PERIODIC_TABLE.XENON ];
export type NobleGases = typeof PERIODIC_TABLE.NEON | typeof PERIODIC_TABLE.ARGON | typeof PERIODIC_TABLE.HELIUM | typeof PERIODIC_TABLE.KRYPTON | typeof PERIODIC_TABLE.XENON;

export const NONMETALS = BONDABLE_NONMETALS.concat(NOBLE_GASES);
export type NonMetals = BondableNonMetals | NobleGases;

export const HOFBrINClS = [ PERIODIC_TABLE.HYDROGEN, PERIODIC_TABLE.OXYGEN, PERIODIC_TABLE.FLUORINE, PERIODIC_TABLE.BROMINE, PERIODIC_TABLE.IODINE, PERIODIC_TABLE.NITROGEN, PERIODIC_TABLE.CHLORINE ];
export type HOFBrINCl = typeof PERIODIC_TABLE.HYDROGEN | typeof PERIODIC_TABLE.OXYGEN | typeof PERIODIC_TABLE.FLUORINE |  typeof PERIODIC_TABLE.BROMINE |  typeof PERIODIC_TABLE.IODINE | typeof PERIODIC_TABLE.NITROGEN | typeof PERIODIC_TABLE.CHLORINE;

export function compareElements(el1: PeriodicElement, el2: PeriodicElement): boolean {
	return el1.symbol == el2.symbol;
}

export function compareQuantifiedElements(el1: QuantifiedPeriodicElement, el2: QuantifiedPeriodicElement): boolean {
	return el1.element.symbol == el2.element.symbol && el1.quantity == el2.quantity;
}

export function getFromSymbol(symbol: string): PeriodicElement | null {
	const elements = Object.values(PERIODIC_TABLE);
	return elements.find(el => el.symbol == symbol) || null;
}

interface CombinationResult {
	rawPrefix: string;
	prefix: string;
	elementString: string;
	element: PeriodicElement;
	result: string;
	moddedPrefix: boolean;
}

export function combineSuffix(prefix: number, element: PeriodicElement, mono: boolean = false): CombinationResult {
	const rawPrefix = Nomenclature.PREFIX_MAP[<Nomenclature.ElementPrefixRange> prefix];
	const moddedPrefix = Nomenclature.MODDED_PREFIX_MAP[<Nomenclature.ElementPrefixRange> prefix];
	const elString = element.name.toLowerCase();
	const chosenPrefix = (elString.startsWith("o") || elString.startsWith("a")) ? moddedPrefix : rawPrefix;
	const monoMask = prefix == 1 && !mono ? "" : chosenPrefix;

	return {
		"rawPrefix": rawPrefix,
		"prefix": monoMask,
		"elementString": elString,
		"element": element,
		"result": monoMask + elString,
		"moddedPrefix": rawPrefix != chosenPrefix
	}
}