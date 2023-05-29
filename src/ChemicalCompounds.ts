import { Nomenclature } from "./Nomenclature";
import { Metals, NonMetals, PERIODIC_TABLE, PeriodicElement, compareElements, compareQuantifiedElements } from "./Elements";
import { swapObj } from "./Util";

export const QUANTITY_SUBSCRIPTS: Record<number, string> = {
    0: "₀",
    1: "₁",
    2: "₂",
    3: "₃",
    4: "₄",
    5: "₅",
    6: "₆",
    7: "₇",
    8: "₈",
    9: "₉",
    10: "₁₀"
};

export type Subscripts = typeof QUANTITY_SUBSCRIPTS[keyof typeof QUANTITY_SUBSCRIPTS];

export const SUBSCRIPT_TO_NUM: Record<Subscripts, number> = swapObj(QUANTITY_SUBSCRIPTS);

export interface ChemistryObject {
    chemicalFormula: string;
    name: string;
}

export interface QuantifiedPeriodicElement<C extends PeriodicElement = PeriodicElement> {
    element: C;
    quantity: number;
}

export class Bondable<C extends PeriodicElement = PeriodicElement> implements ChemistryObject {
    public elements: QuantifiedPeriodicElement<C>[];
    public charges: number[];
    public quantity?: number;
    public _name?: string;

    constructor(elements: QuantifiedPeriodicElement<C>[], charges: number[], name?: string) {
        this.elements = elements
        this.charges = charges;
        this._name = name;
    }

    public get chemicalFormula(): string {
        let result = "";
        this.elements.forEach(el => result += el.element.symbol + (el.quantity != 1 ? QUANTITY_SUBSCRIPTS[el.quantity] : ""));
        return result;
    }

    public get name(): string {
        if (this.elements.length == 1) return this.elements[0].element.name;
        return this._name!;
    }
    
    public get singletonElement(): PeriodicElement {
        return this.elements[0].element;
    }

    public get actsLikeMetal(): boolean {
        return (this.isMultivalent && this.singletonElement.metal) || this.primaryCharge > 0;
    }

    public get primaryCharge(): number {
        return this.charges[0];
    }

    public get primaryQuantity(): number {
        return this.quantity || this.elements[0].quantity;
    }

    public get isMultivalent(): boolean {
        return this.charges.length > 1;
    }

    public isSingleton(strict = false): boolean {
        return this.elements.length == 1 && (strict ? this.elements[0].quantity == 1 : true);
    }

    public getCovalentName(mono: boolean = false, suffixed: boolean = false, index: number = 0): string {
        if (this.isSingleton()) {
            const quantifiedElement = this.elements[index];
            let prefix = "";
            let elementName = suffixed ? Nomenclature.ELEMENT_TO_ANION[quantifiedElement.element.name] : quantifiedElement.element.name;
            
            if (quantifiedElement.quantity == 1) {
                prefix = mono ? Nomenclature.PREFIX_MAP[1] : "";
            } else {
                prefix = Nomenclature.PREFIX_MAP[<Nomenclature.ElementPrefixRange> quantifiedElement.quantity] || "";
            }
    
            if (elementName.startsWith("o") || elementName.startsWith("a")) {
                return prefix.substring(0, prefix.length - 2) + elementName;
            } else {
                return prefix + elementName;
            }
        } else {
            return this._name!;
        }
    }

    public clone(): Bondable {
        const copy = new Bondable(this.elements, this.charges, this.name);
        copy.quantity = this.primaryQuantity;
        return copy;
    }

    public static fromElement<C extends PeriodicElement>(element: C, quantity: number = 1, charge?: number): Bondable<C> {
        return new Bondable([{ element, quantity }], charge ? [ charge ] : element.charges);
    }
}

abstract class ChemicalCompound implements ChemistryObject {
    public bondable1: Bondable;
    public bondable2: Bondable;
    public _name?: string;

    constructor(bondable1: Bondable, bondable2: Bondable, name?: string) {
        this.bondable1 = bondable1;
        this.bondable2 = bondable2;
        this._name = name;
    }

    public get name(): string {
        if (this._name) return this._name;

        let result = "";
        return result;
    }

    public get chemicalFormula(): string {
        return this.bondable1.chemicalFormula + this.bondable2.chemicalFormula;
    }
}

export class IonicCompound extends ChemicalCompound implements ChemistryObject {
    constructor(metal: Bondable<Metals>, nonmetal: Bondable<NonMetals>) {
        super(metal, nonmetal);
    }

    public get name(): string {
        const anionEnding = Nomenclature.ELEMENT_TO_ANION[this.nonmetal.singletonElement.name] || this.nonmetal.singletonElement.name;
        return `${this.metal.singletonElement.name} ${anionEnding}`;
    }

    public get metal(): Bondable<Metals> {
        return this.bondable1;
    };

    public get nonmetal(): Bondable<NonMetals> {
        return this.bondable2;
    };
}

export class CovalentCompound extends ChemicalCompound implements ChemistryObject {
    constructor(nonmetal1: Bondable<NonMetals>, nonmetal2: Bondable<NonMetals>) {
        super(nonmetal1, nonmetal2);
    }

    public get name(): string {
        return `${this.nonmetal1.getCovalentName()} ${this.nonmetal2.getCovalentName(true, true)}`;
    }

    public get nonmetal1(): Bondable<NonMetals> {
        return this.bondable1;
    }

    public get nonmetal2(): Bondable<NonMetals> {
        return this.bondable2;
    }
}

export type PolyatomicNames = "NITRATE" | "NITRITE" | "CHROMATE" | "DICHROMATE" | "CYANIDE" | "THIOCYANATE" | "PERMANGANATE" | "HYDROXIDE" | "PEROXIDE" | "AMIDE" | "SULFATE" | "SULFITE" | "PHOSPHITE" | "PHOSPHATE" | "HYDROGEN PHOSPHATE" | "DIHYDROGEN PHOSPHATE" | "ACETATE" | "PERCHLORATE" | "CHLORATE" | "CHLORITE" | "HYPOCHLORITE" | "PERIODATE" | "IODATE" | "IODITE" | "HYPOIODITE" | "PERBROMATE" | "BROMATE" | "BROMITE" | "HYPOBROMITE" | "CARBONATE" | "HYDROGEN CARBONATE" | "HYDROGEN SULFATE" | "HYDROGEN SULFITE" | /*"HYDROGEN SULFIDE" |*/ "AMMONIUM";

export const POLYATOMICS: Record<PolyatomicNames, Bondable<NonMetals>> = {
    "NITRATE": new Bondable([
        { "element": PERIODIC_TABLE.NITROGEN, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 3 }], [ -1 ], "NITRATE"),
    "NITRITE": new Bondable([
        { "element": PERIODIC_TABLE.NITROGEN, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 2 }], [ -1 ], "NITRITE"),
    "CHROMATE": new Bondable([
        { "element": PERIODIC_TABLE.CHROMIUM, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 4 }], [ -2 ], "CHROMATE"),
    "DICHROMATE": new Bondable([
        { "element": PERIODIC_TABLE.CHROMIUM, "quantity": 2 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 7 }], [ -2 ], "DICHROMATE"),
    "CYANIDE": new Bondable([
        { "element": PERIODIC_TABLE.CARBON, "quantity": 1 },
        { "element": PERIODIC_TABLE.NITROGEN, "quantity": 1 }], [ -1 ], "CYANIDE"),
    "THIOCYANATE": new Bondable([
        { "element": PERIODIC_TABLE.SULFUR, "quantity": 1 },
        { "element": PERIODIC_TABLE.CARBON, "quantity": 1 },
        { "element": PERIODIC_TABLE.NITROGEN, "quantity": 1 }], [ -1 ], "THIOCYANATE"),
    "PERMANGANATE": new Bondable([
        { "element": PERIODIC_TABLE.MANGANESE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 4 }], [ -1 ], "PERMANGANATE"),
    "HYDROXIDE": new Bondable([
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 1 },
        { "element": PERIODIC_TABLE.HYDROGEN, "quantity": 1 }], [ -1 ], "HYDROXIDE"),
    "PEROXIDE": new Bondable([
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 2 }], [ -2 ], "PEROXIDE"),
    "AMIDE": new Bondable([
        { "element": PERIODIC_TABLE.NITROGEN, "quantity": 1 },
        { "element": PERIODIC_TABLE.HYDROGEN, "quantity": 2 }], [ -1 ], "AMIDE"),
    "SULFATE": new Bondable([
        { "element": PERIODIC_TABLE.SULFUR, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 4 }], [ -2 ], "SULFATE"),
    "SULFITE": new Bondable([
        { "element": PERIODIC_TABLE.SULFUR, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 3 }], [ -2 ], "SULFITE"),
    "PHOSPHATE": new Bondable([
        { "element": PERIODIC_TABLE.PHOSPHORUS, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 4 }], [ -3 ], "PHOSPHATE"),
    "PHOSPHITE": new Bondable([
        { "element": PERIODIC_TABLE.PHOSPHORUS, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 3 }], [ -3 ], "PHOSPHITE"),
    "HYDROGEN PHOSPHATE": new Bondable([
        { "element": PERIODIC_TABLE.HYDROGEN, "quantity": 1 },
        { "element": PERIODIC_TABLE.PHOSPHORUS, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 4 }], [ -2 ], "HYDROGEN PHOSPHATE"),
    "DIHYDROGEN PHOSPHATE": new Bondable([
        { "element": PERIODIC_TABLE.HYDROGEN, "quantity": 2 },
        { "element": PERIODIC_TABLE.PHOSPHORUS, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 4 }], [ -1 ], "DIHYDROGEN PHOSPHATE"),
    "ACETATE": new Bondable([
        { "element": PERIODIC_TABLE.CARBON, "quantity": 2 },
        { "element": PERIODIC_TABLE.HYDROGEN, "quantity": 3 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 2 }], [ -1 ], "ACETATE"),
    "PERCHLORATE": new Bondable([
        { "element": PERIODIC_TABLE.CHLORINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 4 }], [ -1 ], "PERCHLORATE"),
    "CHLORATE": new Bondable([
        { "element": PERIODIC_TABLE.CHLORINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 3 }], [ -1 ], "CHLORATE"),
    "CHLORITE": new Bondable([
        { "element": PERIODIC_TABLE.CHLORINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 2 }], [ -1 ], "CHLORITE"),
    "HYPOCHLORITE": new Bondable([
        { "element": PERIODIC_TABLE.CHLORINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 1 }], [ -1 ], "HYPOCHLORITE"),
    "PERIODATE": new Bondable([
        { "element": PERIODIC_TABLE.IODINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 4 }], [ -1 ], "PERIODATE"),
    "IODATE": new Bondable([
        { "element": PERIODIC_TABLE.IODINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 3 }], [ -1 ], "IODATE"),
    "IODITE": new Bondable([
        { "element": PERIODIC_TABLE.IODINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 2 }], [ -1 ], "IODITE"),
    "HYPOIODITE": new Bondable([
        { "element": PERIODIC_TABLE.IODINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 1 }], [ -1 ], "HYPOIODITE"),
    "PERBROMATE": new Bondable([
        { "element": PERIODIC_TABLE.BROMINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 4 }], [ -1 ], "PERBROMATE"),
    "BROMATE": new Bondable([
        { "element": PERIODIC_TABLE.BROMINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 3 }], [ -1 ], "BROMATE"),
    "BROMITE": new Bondable([
        { "element": PERIODIC_TABLE.BROMINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 2 }], [ -1 ], "BROMITE"),
    "HYPOBROMITE": new Bondable([
        { "element": PERIODIC_TABLE.BROMINE, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 1 }], [ -1 ], "HYPOBROMITE"),
    "CARBONATE": new Bondable([
        { "element": PERIODIC_TABLE.CARBON, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 3 }], [ -2 ], "CARBONATE"),
    "HYDROGEN CARBONATE": new Bondable([
        { "element": PERIODIC_TABLE.HYDROGEN, "quantity": 1 },
        { "element": PERIODIC_TABLE.CARBON, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 3 }], [ -1 ], "HYDROGEN CARBONATE"),
    "HYDROGEN SULFATE": new Bondable([
        { "element": PERIODIC_TABLE.HYDROGEN, "quantity": 1 },
        { "element": PERIODIC_TABLE.SULFUR, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 4 }], [ -1 ], "HYDROGEN SULFATE"),
    "HYDROGEN SULFITE": new Bondable([
        { "element": PERIODIC_TABLE.HYDROGEN, "quantity": 1 },
        { "element": PERIODIC_TABLE.SULFUR, "quantity": 1 },
        { "element": PERIODIC_TABLE.OXYGEN, "quantity": 3 }], [ -1 ], "HYDROGEN SULFITE"),
    // "HYDROGEN SULFIDE": new Bondable([
    //     { "element": PERIODIC_TABLE.HYDROGEN, "quantity": 1 },
    //     { "element": PERIODIC_TABLE.SULFUR, "quantity": 1 }], -1, "HYDROGEN SULFIDE"),
    "AMMONIUM": new Bondable([
        { "element": PERIODIC_TABLE.NITROGEN, "quantity": 1 },
        { "element": PERIODIC_TABLE.HYDROGEN, "quantity": 4 }], [ 1 ], "AMMONIUM")
}

export function getPolyatomic(quantifiedElement: QuantifiedPeriodicElement[]): Bondable | null {
    const polyatomics = Object.values(POLYATOMICS);
    const found = polyatomics.find(pa => {
        let equals = true;
        if (pa.elements.length == quantifiedElement.length) {
            for (let i = 0;i < quantifiedElement.length;i++) {
                equals &&= compareQuantifiedElements(pa.elements[i], quantifiedElement[i]);
            }
            return equals;
        } else {
            return false;
        }
    }) || null;

    if (found) {
        return found.clone();
    } else return null;
}