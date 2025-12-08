import { useState, useEffect } from "react";
import { X, User, Mail, Phone, MessageSquare, Send } from "lucide-react";
import { enquiryAPI } from "../services/api";
import { useToast } from "@/hooks/use-toast";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnquiryModal = ({ isOpen, onClose }: EnquiryModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry_type: "admission",
    message: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await enquiryAPI.submit(formData);
      toast({
        title: "Enquiry Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiry_type: "admission",
        message: "",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy to-navy-dark p-6 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-heading font-bold text-white">
            Enquire Now
          </h2>
          <p className="text-white/70 text-sm mt-1">
            Fill in your details and we'll contact you shortly
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 bg-pale-gray border border-border rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 bg-pale-gray border border-border rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 bg-pale-gray border border-border rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Inquiry Type
            </label>
            <select
              value={formData.inquiry_type}
              onChange={(e) =>
                setFormData({ ...formData, inquiry_type: e.target.value })
              }
              className="w-full px-4 py-3 bg-pale-gray border border-border rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
            >
              <option value="admission">Admission Inquiry</option>
              <option value="campus_visit">Campus Visit</option>
              <option value="fee_structure">Fee Structure</option>
              <option value="general">General Question</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Message (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={3}
                className="w-full pl-12 pr-4 py-3 bg-pale-gray border border-border rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all resize-none"
                placeholder="Any specific questions?"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange to-orange-light text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit Enquiry
              </>
            )}
          </button>

          <p className="text-center text-muted-foreground text-xs">
            We respect your privacy. Your information is safe with us.
          </p>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
