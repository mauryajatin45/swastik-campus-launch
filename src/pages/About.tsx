import { Quote } from "lucide-react";

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">About Us</span>
          <h1 className="section-title mt-4">Our School</h1>
          <p className="section-subtitle mx-auto mt-4">
            A legacy of academic excellence and holistic development since our founding.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Our History</span>
              <h2 className="section-title mt-4 mb-6">A Foundation Built on Excellence</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Swastik Education Campus was established with a singular purpose: to provide world-class 
                education that nurtures the intellectual, emotional, and social development of every child. 
                Our journey began with a vision to create an institution where traditional values meet 
                contemporary educational practices.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Over the years, we have grown from a small school to a comprehensive educational campus 
                serving hundreds of students from diverse backgrounds. Our alumni have gone on to excel 
                in various fields, from medicine and engineering to arts and entrepreneurship.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we continue to uphold our founding principles while embracing innovation in education, 
                ensuring our students are prepared to meet the challenges of the 21st century.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-12">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <span className="font-serif text-5xl font-bold text-primary">500+</span>
                  <p className="text-muted-foreground mt-2">Students</p>
                </div>
                <div>
                  <span className="font-serif text-5xl font-bold text-primary">50+</span>
                  <p className="text-muted-foreground mt-2">Faculty Members</p>
                </div>
                <div>
                  <span className="font-serif text-5xl font-bold text-primary">15+</span>
                  <p className="text-muted-foreground mt-2">Years of Excellence</p>
                </div>
                <div>
                  <span className="font-serif text-5xl font-bold text-primary">100%</span>
                  <p className="text-muted-foreground mt-2">Board Results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card-elevated p-10">
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Our Mission</span>
              <h3 className="font-serif text-2xl font-semibold text-secondary mt-4 mb-4">
                Nurturing Tomorrow's Leaders
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide a transformative educational experience that develops intellectual curiosity, 
                ethical leadership, and global citizenship. We are committed to fostering an environment 
                where every student can discover their unique potential and develop the skills necessary 
                to make meaningful contributions to society.
              </p>
            </div>
            <div className="card-elevated p-10">
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Our Vision</span>
              <h3 className="font-serif text-2xl font-semibold text-secondary mt-4 mb-4">
                Excellence in Education
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be recognized as a leading educational institution that sets the benchmark for academic 
                excellence, character development, and innovation in teaching. We envision a community of 
                learners who are empowered to think critically, act ethically, and lead with compassion 
                in an interconnected world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Leadership</span>
              <h2 className="section-title mt-4">Message from the Principal</h2>
            </div>
            
            <div className="card-elevated p-10 lg:p-16 relative">
              <Quote className="absolute top-8 left-8 text-accent/20" size={64} />
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="w-48 h-48 rounded-full bg-muted flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                    <span className="font-serif text-4xl text-secondary">P</span>
                  </div>
                </div>
                <div>
                  <blockquote className="text-lg text-foreground leading-relaxed mb-6 relative z-10">
                    "At Swastik Education Campus, we believe that education is not merely about academic 
                    achievement, but about developing well-rounded individuals who can contribute positively 
                    to society. Our commitment to excellence, combined with our nurturing environment, ensures 
                    that every child who walks through our doors receives the guidance and support they need 
                    to flourish."
                  </blockquote>
                  <div>
                    <p className="font-serif text-xl font-semibold text-secondary">Dr. [Principal Name]</p>
                    <p className="text-muted-foreground">Principal, Swastik Education Campus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
