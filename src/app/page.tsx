import { CookieBanner, FloatingTips, Header, LandscapeCover, Preloader } from "@/components/sites/era/Chrome";
import { EraMotion } from "@/components/sites/era/EraMotion";
import { BookingModal, MobileMenu } from "@/components/sites/era/Modals";
import { Amenities, ApartmentInfo, ApartmentTypes } from "@/components/sites/era/sections/Apartments";
import { BenefitsIntro, BenefitsSlider, Quote } from "@/components/sites/era/sections/Benefits";
import { Architecture, Cta, Facts, Footer, Interior } from "@/components/sites/era/sections/Closing";
import { Hero } from "@/components/sites/era/sections/Hero";
import { LocationTrack, MasterPlan } from "@/components/sites/era/sections/Location";

export default function HomePage() {
  return (
    <div className="transition-wrapper">
      <LandscapeCover />
      <Preloader />
      <CookieBanner />
      <main className="transition-container">
        <Header />
        <Hero />
        <BenefitsIntro />
        <BenefitsSlider />
        <Quote />
        <LocationTrack />
        <MasterPlan />
        <ApartmentTypes />
        <ApartmentInfo />
        <Amenities />
        <Interior />
        <Architecture />
        <Facts />
        <Cta />
        <Footer />
        <BookingModal />
        <MobileMenu />
        <FloatingTips />
      </main>
      <EraMotion />
    </div>
  );
}
