import { CD70, CG125, GS150, HondaDelux } from "../assets"

export class Category
{
    static getCategories()
    {
        return [
            "CD 70",
            "CD 100",
            "YB 100",
            "GS 110",
            "CG 125",
            "YBR 125",
            "Deluxe",
            "GS 150",
            "CB 150"
        ]
    }

    static getCategoriesForLandingPage()
    {
        return [
            {
                img: CD70,
                label: "CD 70"
            },
            {
                img: CG125,
                label: "CG 125"
            },
            {
                img: GS150,
                label: "GS 150"
            },
            {
                img: HondaDelux,
                label: "Honda Delux"
            }
        ]
    }
}