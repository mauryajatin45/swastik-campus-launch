import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { enquiryAPI } from "@/services/api";

const AdmissionForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Parent/Contact Info
    name: "",
    email: "",
    phone: "",
    contact_number_2: "",
    
    // Admission Details
    admission_standard: "",
    stream_group: "",
    
    // Student Information
    student_name: "",
    date_of_birth: "",
    residential_address: "",
    caste: "",
    subcaste: "",
    religion: "",
    
    // Previous Education
    last_school_name: "",
    board: "",
    last_school_district: "",
    last_school_state: "",
    last_standard: "",
    last_year: "",
    result_percentage: "",
    
    // Parent Details
    father_occupation: "",
    mother_occupation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await enquiryAPI.submit({
        ...formData,
        inquiry_type: "admission",
      });
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your admission inquiry. We will contact you shortly.",
      });
      
      // Reset form
      setFormData({
        name: "", email: "", phone: "", contact_number_2: "",
        admission_standard: "", stream_group: "",
        student_name: "", date_of_birth: "", residential_address: "",
        caste: "", subcaste: "", religion: "",
        last_school_name: "", board: "", last_school_district: "",
        last_school_state: "", last_standard: "", last_year: "",
        result_percentage: "", father_occupation: "", mother_occupation: "",
      });
      
      // Scroll to top
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-pale-gray py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy to-navy-dark text-white rounded-2xl p-8 mb-8">
          <button
            onClick={() => navigate("/admissions")}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Admissions
          </button>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Admission Inquiry Form</h1>
          <p className="text-white/80">Fill in the details below to apply for admission</p>
          <div className="mt-4 text-sm text-white/70">
            <p>📍 Narendra Modi Stadium Road, Motera, Ahmedabad</p>
            <p>📞 +91 7096 25 50 75 | ✉️ swastikmotera@gmail.com</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-8">
          {/* Section 1: Admission Details */}
          <div>
            <h2 className="text-xl font-heading font-bold text-navy mb-4 pb-2 border-b-2 border-sky-blue">
              1. Admission Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Admission Standard/Grade *
                </label>
                <select
                  name="admission_standard"
                  value={formData.admission_standard}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  required
                >
                  <option value="">Select Standard</option>
                  <option value="Nursery/Toddlers">Nursery/Toddlers</option>
                  <option value="Jr. K.G.">Jr. K.G.</option>
                  <option value="Sr. K.G.">Sr. K.G.</option>
                  <option value="Balvatika">Balvatika</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Stream/Group (If Applicable)
                </label>
                <input
                  type="text"
                  name="stream_group"
                  value={formData.stream_group}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="e.g., Science, Commerce"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Student Information */}
          <div>
            <h2 className="text-xl font-heading font-bold text-navy mb-4 pb-2 border-b-2 border-green">
              2. Student Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-navy mb-2">
                  Student's Full Name *
                </label>
                <input
                  type="text"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter student's full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Religion</label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter religion"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Caste</label>
                <input
                  type="text"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter caste"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Sub-caste</label>
                <input
                  type="text"
                  name="subcaste"
                  value={formData.subcaste}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter sub-caste"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-navy mb-2">
                  Residential Address *
                </label>
                <textarea
                  name="residential_address"
                  value={formData.residential_address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                  placeholder="Enter complete residential address"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 3: Previous Education */}
          <div>
            <h2 className="text-xl font-heading font-bold text-navy mb-4 pb-2 border-b-2 border-orange">
              3. Previous Education Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-navy mb-2">
                  Name of Last School
                </label>
                <input
                  type="text"
                  name="last_school_name"
                  value={formData.last_school_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter last school name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Board</label>
                <select
                  name="board"
                  value={formData.board}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                >
                  <option value="">Select Board</option>
                  <option value="GSEB">GSEB</option>
                  <option value="CBSE">CBSE</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  District
                </label>
                <input
                  type="text"
                  name="last_school_district"
                  value={formData.last_school_district}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter district"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="last_school_state"
                  value={formData.last_school_state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter state"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Last Studied Standard
                </label>
                <input
                  type="text"
                  name="last_standard"
                  value={formData.last_standard}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="e.g., Grade 5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Year</label>
                <input
                  type="text"
                  name="last_year"
                  value={formData.last_year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="e.g., 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Result in Percentage
                </label>
                <input
                  type="text"
                  name="result_percentage"
                  value={formData.result_percentage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="e.g., 85%"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Parent Details */}
          <div>
            <h2 className="text-xl font-heading font-bold text-navy mb-4 pb-2 border-b-2 border-sky-blue">
              4. Parent/Guardian Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Father's Occupation
                </label>
                <input
                  type="text"
                  name="father_occupation"
                  value={formData.father_occupation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter father's occupation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Mother's Occupation
                </label>
                <input
                  type="text"
                  name="mother_occupation"
                  value={formData.mother_occupation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter mother's occupation"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Contact Information */}
          <div>
            <h2 className="text-xl font-heading font-bold text-navy mb-4 pb-2 border-b-2 border-green">
              5. Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Parent/Guardian Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Contact Number 1 *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Contact Number 2
                </label>
                <input
                  type="tel"
                  name="contact_number_2"
                  value={formData.contact_number_2}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-pale-gray border border-border text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-navy text-white px-8 py-4 rounded-xl font-semibold hover:bg-navy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Admission Inquiry
                </>
              )}
            </button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              * Required fields must be filled
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdmissionForm;
