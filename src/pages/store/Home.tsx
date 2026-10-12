import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button, Heading, Text } from "@radix-ui/themes";
import { FiArrowRight, FiTruck } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../data/categories";
import { imageAsset } from "../../assets/images";
import { PageHeading } from "../../components/ui";

const heroImages = [
  "tv_stand_category.jpeg",
  "sleeper_couch_category.jpeg",
  "headboard_category.jpeg",
];

export function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setHeroIndex((index) => (index + 1) % heroImages.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="order-2 md:order-1"
        >
          <Text as="p" size="2" color="grass" className="mb-4 uppercase tracking-[0.24em]">
            Furniture for living
          </Text>
          <Heading size="9" className="mb-5 max-w-xl text-balance leading-tight">
            Make room for the things that feel like home.
          </Heading>
          <Text as="p" size="4" color="gray" className="mb-8 max-w-lg leading-7">
            Discover thoughtfully selected furniture for every corner of your home.
            Find your piece, then order directly with our team on WhatsApp.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Button size="3" asChild>
              <Link to="/shop">Explore the collection <FiArrowRight /></Link>
            </Button>
            <Button size="3" variant="outline" color="gray" asChild>
              <Link to="/about">Our story</Link>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-slate-600">
            <FiTruck className="text-xl text-[#c98756]" />
            <span>Friendly service, delivery and installation support</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-1 relative min-h-[340px] overflow-hidden rounded-3xl border border-[#e7e1d6] bg-[#eeeae0] md:order-2 md:min-h-[530px]"
        >
          <motion.img
            key={heroIndex}
            src={imageAsset(heroImages[heroIndex])}
            alt="Featured Sani Enterprise furniture"
            className="absolute inset-0 size-full object-cover"
            initial={{ opacity: 0.2, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/5" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-amber-200">The collection</span>
              <p className="mt-1 text-2xl font-medium">Pieces made for everyday</p>
            </div>
            <div className="flex gap-2">
              {heroImages.map((image, index) => (
                <button
                  key={image}
                  aria-label={`Show featured image ${index + 1}`}
                  aria-pressed={index === heroIndex}
                  onClick={() => setHeroIndex(index)}
                  className={`size-2.5 rounded-full transition-colors ${
                    index === heroIndex ? "bg-amber-300" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-[#e7e1d6] bg-[#eeece5]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <PageHeading
            eyebrow="Find your fit"
            title="Shop by room and style"
            description="Browse our furniture categories and explore the pieces that make a house feel like yours."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.slice(0, 8).map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.04 }}
              >
                <Link
                  to={`/shop/${category.key}`}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-[#e2ddd2] bg-[#e7e2d8]"
                >
                  <img
                    src={imageAsset(category.panelImage)}
                    alt={category.label}
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-medium">{category.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" color="gray" asChild>
              <Link to="/shop">View all categories <FiArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
