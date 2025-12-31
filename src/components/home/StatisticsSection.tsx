import { useScrollReveal, useCountUp } from "./hooks";

const stats = [
  { number: "25+", label: "Years of Excellence", color: "text-red-accent" },
  { number: "15000+", label: "Proud Students", color: "text-sky-blue" },
  { number: "50+", label: "Co-curricular Activities", color: "text-orange" },
];

// Stat card component with animated counter
const StatCard = ({ stat, isVisible }: { stat: { number: string; label: string; color: string }; isVisible: boolean }) => {
  // Parse the number and suffix
  const parseNumber = (numStr: string): { value: number; suffix: string } => {
    // Handle ratio format like "15:1"
    if (numStr.includes(':')) {
      const [first] = numStr.split(':');
      return { value: parseInt(first), suffix: ':1' };
    }
    // Handle numbers with + suffix like "15+", "2000+"
    const match = numStr.match(/^(\d+)(\+?)$/);
    if (match) {
      return { value: parseInt(match[1]), suffix: match[2] || '' };
    }
    return { value: 0, suffix: '' };
  };

  const { value, suffix } = parseNumber(stat.number);
  const animatedValue = useCountUp(value, 2000, isVisible);

  return (
    <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 group">
      <p className={`text-4xl md:text-5xl font-heading font-bold ${stat.color} mb-2`}>
        {animatedValue}{suffix}
      </p>
      <div className={`h-1 w-16 mx-auto rounded-full mb-3 group-hover:w-24 transition-all ${stat.color.replace('text-', 'bg-')}`} />
      <p className="text-muted-foreground font-medium">{stat.label}</p>
    </div>
  );
};

const StatisticsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-16 bg-pale-blue/50">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="w-full sm:w-auto sm:min-w-[200px] sm:max-w-[280px] flex-shrink-0">
                <StatCard stat={stat} isVisible={isVisible} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
