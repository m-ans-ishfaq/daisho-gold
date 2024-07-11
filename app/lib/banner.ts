import { Banner1, Banner2 } from "../assets";

export class Banner
{
    static async fetchBanners()
    {
        return [Banner1, Banner2];
    }
}