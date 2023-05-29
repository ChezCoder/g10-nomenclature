export const variations: Record<string, string[]> = {
    "INTRO.IDENTIFICATION.START": [
        "Firstly",
        "First",
        "To start",
        "In order to start",
        "To begin",
        "In order to begin",
        "In the beginning",
        "In the start"
    ],
    "INTRO.IDENTIFICATION.TO_IDENTIFY": [
        "identify",
        "figure out",
        "look closely",
        "see"
    ],
    "INTRO.IDENTIFICATION.TO_CHECK_THE_FOLLOWING": [
        "following",
        "given",
        "inputted"
    ]
}

export const commonExplainationScript = {
    "VALIDATION": {
        "FORMULA": "Unfortunately, the formula you provided contains a symbol that I don't recognize. I wasn't programmed with knowledge of a chemical named [B]{symbol}[/].",
        "COMPOUND": "Unfortunately, the chemical name you provided contains chemicals that I don't recognize. I wasn't programmed with knowledge of [B]{name}[/].",
        "COMMON": "I have information for all chemicals from [U]Hydrogen to Lead[/], [I]not including the Lanthanoids or Actinoids[/]. Sorry for the inconvenience!"
    },
    "INTRO": {
        "IDENTIFICATION": "{INTRO.IDENTIFICATION.START}, we will {INTRO.IDENTIFICATION.TO_IDENTIFY} if the {INTRO.IDENTIFICATION.TO_CHECK_THE_FOLLOWING} compound is a [B]Ionic[/] or [B]Covalent[/] compound. An [B]Ionic[/] compound has the [U]metal[/] as the [B]cation[/] and [U]non-metal[/] as the [B]anion[/]. In ionic compounds, [U]metals will [B]give[/] electrons[/] and [U]non-metals will [B]take[/] electrons[/]. In covalent compounds, [I]two non-metals share electrons[/] to form a covalent bond.",

        "CONTAINS_POLYATOMIC": "Before starting, notice this compound has more than 2 elements in it's formula, which means it contains a polyatomic.",
        "CONTAINS_POLYATOMIC_CATION": "Looking closely, [B]{CATION_F}[/] seems to be a [U]{CATION}[/] molecule.",
        "CONTAINS_POLYATOMIC_ANION": "Looking closely, [B]{ANION_F}[/] seems to be a [U]{ANION}[/] molecule.",

        "IS_METAL_AND_NONMETAL": "In this case, [B]{CATION}[/] is a [U]metal[/] and [B]{ANION}[/] is a [U]non-metal[/], which means this compound is [B]ionic[/].",
        "IS_METAL_AND_POLYATOMIC": "In this case, [B]{CATION}[/] is a [U]metal[/] and [B]{ANION}[/] is a [U]polyatomic[/], which means this compound is [B]ionic[/].",
        "IS_POLYATOMIC_AND_NONMETAL": "In this case, [B]{CATION}[/] is a polyatomic that gives electrons, and acts like a metal, and [B]{ANION}[/] is a [B]non-metal[/], which makes this compound an [B]ionic[/] compound.",
        
        // TODO re record molecular and covalent problem smhs
        "IS_NONMETAL_AND_NONMETAL": "In this case, both [B]{CATION}[/] and [B]{ANION}[/] are [U]non-metals[/], which makes this compound [B]covalent[/].",
        "IS_NONMETAL_AND_POLYATOMIC": "In this case, [B]{CATION}[/] is a [U]non-metal[/], and [B]{ANION}[/] is a [B]polyatomic[/], which makes this compound a [B]covalent[/] compound."
    }
}