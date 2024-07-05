import { BannerComponent } from "./containers/banner";
import { Categories } from "./containers/categories";
import { ShortFeatures } from "./containers/short-features";
import { Banner } from "./lib/banner";

export default async function Home() {

  const bannerImages = await Banner.fetchBanners();

  return (
    <main>
      <section className="w-full p-4 flex flex-col items-center">
        <div className="container flex flex-col-reverse xl:grid xl:grid-cols-3 gap-4">
          <Categories />
          <div className="h-full col-span-2">
            <BannerComponent images={bannerImages} />
          </div>
        </div>
      </section>
      <ShortFeatures />
    </main>
  );
}
