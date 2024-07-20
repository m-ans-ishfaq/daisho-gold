import { BannerComponent } from "./containers/banner";
import { Categories } from "./containers/categories";
import { Featured } from "./containers/featured";
import { Newsletter } from "./containers/newsletter";
import { ShortFeatures } from "./containers/short-features";
import { Banner } from "../../lib/banner";
import { dbConnect } from "@/lib/dbConnect";
import { CategoriesByParts } from "./containers/parts";

export default async function Home() {

  const bannerImages = await Banner.fetchBanners();
  dbConnect()
  return (
    <main>
      <div className="relative w-full h-[calc(9/16*100vw-8px)]">
        <BannerComponent images={bannerImages} />
        <a href="#products" className="text-black tracking-widest bg-white hover:bg-opacity-100 font-bold bg-opacity-85 text-[100%] px-[4%] py-[1%] absolute z-[1001] hidden md:flex bottom-[30%] left-[8.5%]">
            SHOP NOW
        </a>
      </div>
      <Categories />
      <ShortFeatures />
      <CategoriesByParts />
      <Featured />
      <Newsletter />
    </main>
  );
}
