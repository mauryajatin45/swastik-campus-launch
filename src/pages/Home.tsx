import {
  HeroSection,
  AccreditationSection,
  WhyChooseUsSection,
  StatisticsSection,
  PrincipalMessageSection,
  ProgramsSection,
  NewsUpdatesSection,
  CoreValuesSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  FixedSideCTA,
} from "@/components/home";

const Home = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AccreditationSection />
      <WhyChooseUsSection />
      <StatisticsSection />
      <PrincipalMessageSection />
      <ProgramsSection />
      <NewsUpdatesSection />
      <CoreValuesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <FixedSideCTA />
    </main>
  );
};

export default Home;