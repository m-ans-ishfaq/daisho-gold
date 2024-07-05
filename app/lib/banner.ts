import { Banner1, Banner2, Banner3 } from "../assets";

export class Banner
{
    static async fetchBanners()
    {
        return [Banner1, Banner2, Banner3];
    }
}