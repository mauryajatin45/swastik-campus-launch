import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { enquiryAPI, galleryAPI, achievementsAPI, leadershipAPI } from "../../services/api";
import {
  LogOut,
  MessageSquare,
  Image,
  Download,
  Trash2,
  Search,
  Upload,
  X,
  RefreshCw,
  Newspaper,
  Plus,
  Edit,
  Star,
  StarOff,
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  GraduationCap,
  BookOpen,
  Mail,
} from "lucide-react";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  inquiry_type: string;
  message?: string;
  status: string;
  created_at: string;
  medium?: string;
  contact_number_2?: string;
  admission_standard?: string;
  stream_group?: string;
  student_name?: string;
  date_of_birth?: string;
  residential_address?: string;
  caste?: string;
  subcaste?: string;
  religion?: string;
  last_school_name?: string;
  board?: string;
  last_school_district?: string;
  last_school_state?: string;
  last_standard?: string;
  last_year?: string;
  result_percentage?: string;
  father_occupation?: string;
  mother_occupation?: string;
}

interface GalleryPhoto {
  id: number;
  title: string;
  category: string;
  cloudinary_url: string;
  created_at: string;
}

interface AchievementItem {
  id: number;
  title: string;
  type: string;
  excerpt: string;
  content: string;
  image_url: string;
  event_date: string | null;
  event_time: string | null;
  event_location: string | null;
  is_featured: boolean;
  created_at: string;
}

interface LeadershipMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"enquiries" | "gallery" | "achievements" | "leadership">("enquiries");

  // Enquiry states
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enquiryLoading, setEnquiryLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  // Gallery states
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Campus");
  const [isUploading, setIsUploading] = useState(false);

  // News states
  const [AchievementItems, setAchievementItems] = useState<AchievementItem[]>([]);
  const [achievementsLoading, setachievementsLoading] = useState(false);
  const [showAchievementModal, setshowAchievementModal] = useState(false);
  const [editingAchievement, seteditingAchievement] = useState<AchievementItem | null>(null);
  const [achievementForm, setachievementForm] = useState({
    title: "",
    type: "Achievement",
    excerpt: "",
    content: "",
    is_featured: false,
  });
  const [achievementImage, setachievementImage] = useState<File | null>(null);
  const [isSavingAchievement, setisSavingAchievement] = useState(false);

  // Leadership states
  const [leadershipMembers, setLeadershipMembers] = useState<LeadershipMember[]>([]);
  const [leadershipLoading, setLeadershipLoading] = useState(false);
  const [showLeadershipModal, setShowLeadershipModal] = useState(false);
  const [editingMember, setEditingMember] = useState<LeadershipMember | null>(null);
  const [leadershipForm, setLeadershipForm] = useState({
    name: "",
    role: "",
    description: "",
    display_order: 0,
  });
  const [memberImage, setMemberImage] = useState<File | null>(null);
  const [isSavingMember, setIsSavingMember] = useState(false);

  useEffect(() => {
    if (activeTab === "enquiries") {
      fetchEnquiries();
    } else if (activeTab === "gallery") {
      fetchGallery();
    } else if (activeTab === "achievements") {
      fetchAchievements();
    } else {
      fetchLeadership();
    }
  }, [activeTab, statusFilter, fromDate, toDate]);

  const fetchEnquiries = async () => {
    setEnquiryLoading(true);
    try {
      const response = await enquiryAPI.getAll({
        status: statusFilter !== "all" ? statusFilter : undefined,
        from_date: fromDate || undefined,
        to_date: toDate || undefined,
        search: searchTerm || undefined,
      });
      setEnquiries(response.data);
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
    } finally {
      setEnquiryLoading(false);
    }
  };

  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const response = await galleryAPI.getAll();
      setPhotos(response.data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setGalleryLoading(false);
    }
  };

  const fetchAchievements = async () => {
    setachievementsLoading(true);
    try {
      const response = await achievementsAPI.getAll();
      setAchievementItems(response.data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setachievementsLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await enquiryAPI.updateStatus(id, newStatus);
      fetchEnquiries();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDeleteEnquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await enquiryAPI.delete(id);
      fetchEnquiries();
    } catch (error) {
      console.error("Failed to delete enquiry:", error);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await enquiryAPI.exportExcel({
        status: statusFilter !== "all" ? statusFilter : undefined,
        from_date: fromDate || undefined,
        to_date: toDate || undefined,
      });
    } catch (error) {
      console.error("Failed to export:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", uploadFile);
      formData.append("title", uploadTitle);
      formData.append("category", uploadCategory);

      await galleryAPI.upload(formData);
      setShowUploadModal(false);
      setUploadFile(null);
      setUploadTitle("");
      fetchGallery();
    } catch (error) {
      console.error("Failed to upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (id: number) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    try {
      await galleryAPI.delete(id);
      fetchGallery();
    } catch (error) {
      console.error("Failed to delete photo:", error);
    }
  };

  // News handlers
  const openAchievementModal = (news?: AchievementItem) => {
    if (news) {
      seteditingAchievement(news);
      setachievementForm({
        title: news.title,
        type: news.type,
        excerpt: news.excerpt,
        content: news.content || "",
        event_date: news.event_date || "",
        event_time: news.event_time || "",
        event_location: news.event_location || "",
        is_featured: news.is_featured,
      });
    } else {
      seteditingAchievement(null);
      setachievementForm({
        title: "",
        type: "achievements",
        excerpt: "",
        content: "",
        event_date: "",
        event_time: "",
        event_location: "",
        is_featured: false,
      });
    }
    setachievementImage(null);
    setshowAchievementModal(true);
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setisSavingAchievement(true);
    try {
      const formData = new FormData();
      formData.append("title", achievementForm.title);
      formData.append("type", achievementForm.type);
      formData.append("excerpt", achievementForm.excerpt);
      formData.append("content", achievementForm.content);
      formData.append("is_featured", achievementForm.is_featured.toString());
      if (achievementImage) {
        formData.append("image", achievementImage);
      }

      if (editingAchievement) {
        await achievementsAPI.update(editingAchievement.id, formData);
      } else {
        await achievementsAPI.create(formData);
      }

      setshowAchievementModal(false);
      fetchAchievements();
    } catch (error: any) {
      console.error("Failed to save achievement:", error);
      console.error("Error response:", error.response?.data);
      alert(`Failed to save achievement: ${error.response?.data?.details || error.response?.data?.error || error.message}`);
    } finally {
      setisSavingAchievement(false);
    }
  };

  const handleDeleteAchievement = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;
    try {
      await achievementsAPI.delete(id);
      fetchAchievements();
    } catch (error) {
      console.error("Failed to delete news:", error);
    }
  };

  const handleToggleFeatured = async (id: number, currentStatus: boolean) => {
    try {
      await achievementsAPI.toggleFeatured(id, !currentStatus);
      fetchAchievements();
    } catch (error) {
      console.error("Failed to toggle featured:", error);
    }
  };

  // Leadership handlers
  const fetchLeadership = async () => {
    setLeadershipLoading(true);
    try {
      const response = await leadershipAPI.getAll();
      setLeadershipMembers(response.data);
    } catch (error) {
      console.error("Failed to fetch leadership:", error);
    } finally {
      setLeadershipLoading(false);
    }
  };

  const openLeadershipModal = (member?: LeadershipMember) => {
    if (member) {
      setEditingMember(member);
      setLeadershipForm({
        name: member.name,
        role: member.role,
        description: member.description,
        display_order: member.display_order,
      });
    } else {
      setEditingMember(null);
      setLeadershipForm({
        name: "",
        role: "",
        description: "",
        display_order: leadershipMembers.length,
      });
    }
    setMemberImage(null);
    setShowLeadershipModal(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingMember(true);
    try {
      const formData = new FormData();
      formData.append("name", leadershipForm.name);
      formData.append("role", leadershipForm.role);
      formData.append("description", leadershipForm.description);
      formData.append("display_order", leadershipForm.display_order.toString());
      if (memberImage) {
        formData.append("image", memberImage);
      }

      if (editingMember) {
        await leadershipAPI.update(editingMember.id, formData);
      } else {
        await leadershipAPI.create(formData);
      }

      setShowLeadershipModal(false);
      fetchLeadership();
    } catch (error) {
      console.error("Failed to save member:", error);
    } finally {
      setIsSavingMember(false);
    }
  };

  const handleDeleteMember = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await leadershipAPI.delete(id);
      fetchLeadership();
    } catch (error) {
      console.error("Failed to delete member:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-sky-blue/20 text-sky-blue";
      case "contacted": return "bg-orange/20 text-orange";
      case "converted": return "bg-green/20 text-green";
      case "closed": return "bg-muted-foreground/20 text-muted-foreground";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Event": return "bg-orange text-white";
      case "Achievement": return "bg-green text-white";
      case "Activity": return "bg-sky-blue text-white";
      default: return "bg-navy text-white";
    }
  };

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-pale-gray">
      {/* Header */}
      <header className="bg-navy text-white py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-heading font-bold text-xl">Swastik Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-white/70 text-sm">Welcome, {admin?.username}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "enquiries"
                ? "bg-navy text-white shadow-lg"
                : "bg-white text-navy hover:bg-pale-blue"
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            Enquiries
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "gallery"
                ? "bg-navy text-white shadow-lg"
                : "bg-white text-navy hover:bg-pale-blue"
            }`}
          >
            <Image className="h-5 w-5" />
            Gallery
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "achievements"
                ? "bg-navy text-white shadow-lg"
                : "bg-white text-navy hover:bg-pale-blue"
            }`}
          >
            <Newspaper className="h-5 w-5" />
            Achievements
          </button>
          <button
            onClick={() => setActiveTab("leadership")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "leadership"
                ? "bg-navy text-white shadow-lg"
                : "bg-white text-navy hover:bg-pale-blue"
            }`}
          >
            <Users className="h-5 w-5" />
            Leadership Team
          </button>
        </div>

        {/* Enquiries Tab */}
        {activeTab === "enquiries" && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="px-4 py-2 border border-border rounded-lg" />
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="px-4 py-2 border border-border rounded-lg" />
              <button onClick={fetchEnquiries} className="flex items-center gap-2 px-4 py-2 bg-pale-blue text-navy rounded-lg hover:bg-sky-blue/20">
                <RefreshCw className="h-4 w-4" /> Refresh
              </button>
              <button onClick={handleExport} disabled={isExporting} className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg hover:bg-green/90 disabled:opacity-50">
                <Download className="h-4 w-4" /> {isExporting ? "Exporting..." : "Export Excel"}
              </button>
            </div>

            {enquiryLoading ? (
              <div className="text-center py-12"><div className="w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto"></div></div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="text-center py-12"><MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No enquiries found</p></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-navy">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Contact</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Medium</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Message</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map((enquiry) => (
                      <tr 
                        key={enquiry.id} 
                        onClick={() => {
                          setSelectedEnquiry(enquiry);
                          setShowEnquiryModal(true);
                        }}
                        className="border-b border-border hover:bg-pale-gray/50 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4 font-medium">{enquiry.name}</td>
                        <td className="py-3 px-4"><div className="text-sm"><p>{enquiry.email}</p><p className="text-muted-foreground">{enquiry.phone}</p></div></td>
                        <td className="py-3 px-4 capitalize">{enquiry.inquiry_type}</td>
                        <td className="py-3 px-4">
                          {enquiry.medium ? (
                            <span className="px-2 py-1 bg-sky-blue/10 text-sky-blue rounded-full text-xs font-medium capitalize">
                              {enquiry.medium}
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-xs">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4"><p className="max-w-[200px] truncate text-sm text-muted-foreground">{enquiry.message || "-"}</p></td>
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <select value={enquiry.status} onChange={(e) => handleStatusChange(enquiry.id, e.target.value)} className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)} border-0 cursor-pointer`}>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{new Date(enquiry.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => handleDeleteEnquiry(enquiry.id)} className="text-red-accent hover:bg-red-accent/10 p-2 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-xl text-navy">Gallery Photos ({photos.length})</h2>
              <button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-dark">
                <Upload className="h-4 w-4" /> Upload Photo
              </button>
            </div>

            {galleryLoading ? (
              <div className="text-center py-12"><div className="w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto"></div></div>
            ) : photos.length === 0 ? (
              <div className="text-center py-12"><Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No photos uploaded yet</p></div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="group relative rounded-xl overflow-hidden">
                    <img src={photo.cloudinary_url} alt={photo.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <p className="text-white font-medium text-sm">{photo.title}</p>
                      <p className="text-white/70 text-xs">{photo.category}</p>
                      <button onClick={() => handleDeletePhoto(photo.id)} className="absolute top-2 right-2 p-2 bg-red-accent text-white rounded-lg"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <span className="absolute top-2 left-2 bg-navy/80 text-white text-xs px-2 py-1 rounded-full">{photo.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* News Tab */}
        {activeTab === "achievements" && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-xl text-navy">Achievements ({AchievementItems.length})</h2>
              <button onClick={() => openAchievementModal()} className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-dark">
                <Plus className="h-4 w-4" /> Add Achievement
              </button>
            </div>

            {achievementsLoading ? (
              <div className="text-center py-12"><div className="w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto"></div></div>
            ) : AchievementItems.length === 0 ? (
              <div className="text-center py-12"><Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No news items yet</p></div>
            ) : (
              <div className="space-y-4">
                {AchievementItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-border rounded-xl hover:border-navy/30 transition-colors">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.title} className="w-32 h-24 object-cover rounded-lg flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>{item.type}</span>
                            {item.is_featured && <span className="px-2 py-0.5 bg-orange/20 text-orange rounded-full text-xs font-medium flex items-center gap-1"><Star className="h-3 w-3" /> Featured</span>}
                          </div>
                          <h3 className="font-heading font-bold text-navy">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.excerpt}</p>
                          {item.type === "Event" && item.event_date && (
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.event_date}</span>
                              {item.event_time && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.event_time}</span>}
                              {item.event_location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.event_location}</span>}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={() => handleToggleFeatured(item.id, item.is_featured)} className={`p-2 rounded-lg transition-colors ${item.is_featured ? "text-orange bg-orange/10" : "text-muted-foreground hover:bg-pale-gray"}`} title={item.is_featured ? "Remove from featured" : "Mark as featured"}>
                            {item.is_featured ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
                          </button>
                          <button onClick={() => openAchievementModal(item)} className="p-2 text-sky-blue hover:bg-sky-blue/10 rounded-lg"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => handleDeleteAchievement(item.id)} className="p-2 text-red-accent hover:bg-red-accent/10 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Leadership Tab */}
        {activeTab === "leadership" && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-xl text-navy">Leadership Team ({leadershipMembers.length})</h2>
              <button onClick={() => openLeadershipModal()} className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-dark">
                <Plus className="h-4 w-4" /> Add Team Member
              </button>
            </div>

            {leadershipLoading ? (
              <div className="text-center py-12"><div className="w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto"></div></div>
            ) : leadershipMembers.length === 0 ? (
              <div className="text-center py-12"><Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No team members yet</p></div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leadershipMembers.map((member) => (
                  <div key={member.id} className="border border-border rounded-xl p-4 hover:border-navy/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-blue to-green flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {member.image_url ? (
                          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl font-bold text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-navy truncate">{member.name}</h3>
                        <p className="text-sky-blue text-sm font-medium truncate">{member.role}</p>
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{member.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">Order: {member.display_order}</span>
                      <div className="ml-auto flex gap-2">
                        <button onClick={() => openLeadershipModal(member)} className="p-2 text-sky-blue hover:bg-sky-blue/10 rounded-lg">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteMember(member.id)} className="p-2 text-red-accent hover:bg-red-accent/10 rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Gallery Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-navy/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-xl text-navy">Upload Photo</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-pale-gray rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Title</label>
                <input type="text" value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg" placeholder="Enter photo title" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Category</label>
                <select value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg">
                  <option value="Campus">Campus</option>
                  <option value="Events">Events</option>
                  <option value="Sports">Sports</option>
                  <option value="Activities">Activities</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Image</label>
                <input type="file" accept="image/*" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} className="w-full px-4 py-2 border border-border rounded-lg" required />
              </div>
              {uploadFile && <img src={URL.createObjectURL(uploadFile)} alt="Preview" className="w-full h-40 object-cover rounded-lg" />}
              <button type="submit" disabled={isUploading} className="w-full bg-navy text-white py-3 rounded-lg font-medium hover:bg-navy-dark disabled:opacity-50 flex items-center justify-center gap-2">
                {isUploading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Uploading...</> : <><Upload className="h-5 w-5" /> Upload Photo</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* News Modal */}
      {showAchievementModal && (
        <div className="fixed inset-0 bg-navy/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-xl text-navy">{editingAchievement ? "Edit Achievement/Event" : "Add Achievement/Event"}</h3>
              <button onClick={() => setshowAchievementModal(false)} className="p-2 hover:bg-pale-gray rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSaveAchievement} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-navy mb-2">Title *</label>
                  <input type="text" value={achievementForm.title} onChange={(e) => setachievementForm({ ...achievementForm, title: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Type *</label>
                  <select
                    value={achievementForm.type}
                    onChange={(e) => setachievementForm({ ...achievementForm, type: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                    required
                  >
                    <option value="Achievement">Achievement</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="featured" checked={achievementForm.is_featured} onChange={(e) => setachievementForm({ ...achievementForm, is_featured: e.target.checked })} className="w-5 h-5 rounded" />
                  <label htmlFor="featured" className="text-sm font-medium text-navy">Mark as Featured</label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Short Description *</label>
                <textarea value={achievementForm.excerpt} onChange={(e) => setachievementForm({ ...achievementForm, excerpt: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" rows={2} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Full Content</label>
                <textarea value={achievementForm.content} onChange={(e) => setachievementForm({ ...achievementForm, content: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" rows={4} />
              </div>
              {achievementForm.type === "Event" && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-pale-gray rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Event Date</label>
                    <input type="date" value={achievementForm.event_date} onChange={(e) => setachievementForm({ ...achievementForm, event_date: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Event Time</label>
                    <input type="time" value={achievementForm.event_time} onChange={(e) => setachievementForm({ ...achievementForm, event_time: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Location</label>
                    <input type="text" value={achievementForm.event_location} onChange={(e) => setachievementForm({ ...achievementForm, event_location: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" placeholder="e.g. Main Hall" />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Image {!editingAchievement && "(Optional)"}</label>
                <input type="file" accept="image/*" onChange={(e) => setachievementImage(e.target.files?.[0] || null)} className="w-full px-4 py-2 border border-border rounded-lg" />
                {(achievementImage || editingAchievement?.image_url) && (
                  <img src={achievementImage ? URL.createObjectURL(achievementImage) : editingAchievement?.image_url} alt="Preview" className="w-full h-40 object-cover rounded-lg mt-2" />
                )}
              </div>
              <button type="submit" disabled={isSavingAchievement} className="w-full bg-navy text-white py-3 rounded-lg font-medium hover:bg-navy-dark disabled:opacity-50 flex items-center justify-center gap-2">
                {isSavingAchievement ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</> : editingAchievement ? "Update News/Event" : "Create News/Event"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Leadership Modal */}
      {showLeadershipModal && (
        <div className="fixed inset-0 bg-navy/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-xl text-navy">{editingMember ? "Edit Team Member" : "Add Team Member"}</h3>
              <button onClick={() => setShowLeadershipModal(false)} className="p-2 hover:bg-pale-gray rounded-lg"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSaveMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Name *</label>
                <input type="text" value={leadershipForm.name} onChange={(e) => setLeadershipForm({ ...leadershipForm, name: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Role/Title *</label>
                <input type="text" value={leadershipForm.role} onChange={(e) => setLeadershipForm({ ...leadershipForm, role: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Description *</label>
                <textarea value={leadershipForm.description} onChange={(e) => setLeadershipForm({ ...leadershipForm, description: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" rows={3} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Display Order</label>
                <input type="number" value={leadershipForm.display_order} onChange={(e) => setLeadershipForm({ ...leadershipForm, display_order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Photo (Optional)</label>
                <input type="file" accept="image/*" onChange={(e) => setMemberImage(e.target.files?.[0] || null)} className="w-full px-4 py-2 border border-border rounded-lg" />
                {(memberImage || editingMember?.image_url) && (
                  <img src={memberImage ? URL.createObjectURL(memberImage) : editingMember?.image_url || ""} alt="Preview" className="w-32 h-32 object-cover rounded-lg mt-2" />
                )}
              </div>
              <button type="submit" disabled={isSavingMember} className="w-full bg-navy text-white py-3 rounded-lg font-medium hover:bg-navy-dark disabled:opacity-50 flex items-center justify-center gap-2">
                {isSavingMember ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</> : editingMember ? "Update Team Member" : "Add Team Member"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Enquiry Detail Modal */}
      {showEnquiryModal && selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowEnquiryModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto my-8" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-navy to-navy-dark text-white p-6 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-heading font-bold">Enquiry Details</h3>
                  <p className="text-white/70 text-sm mt-1">ID #{selectedEnquiry.id} • {new Date(selectedEnquiry.created_at).toLocaleString()}</p>
                </div>
                <button onClick={() => setShowEnquiryModal(false)} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div className="bg-pale-gray rounded-xl p-5">
                <h4 className="font-heading font-bold text-navy text-lg mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-sky-blue/10 rounded-full flex items-center justify-center"><Mail className="h-4 w-4 text-sky-blue" /></div>
                  Contact Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground mb-1">Name</p><p className="font-medium text-navy">{selectedEnquiry.name}</p></div>
                  <div><p className="text-sm text-muted-foreground mb-1">Email</p><p className="font-medium text-navy">{selectedEnquiry.email}</p></div>
                  <div><p className="text-sm text-muted-foreground mb-1">Phone</p><p className="font-medium text-navy">{selectedEnquiry.phone}</p></div>
                  {selectedEnquiry.contact_number_2 && (<div><p className="text-sm text-muted-foreground mb-1">Alternate Phone</p><p className="font-medium text-navy">{selectedEnquiry.contact_number_2}</p></div>)}
                  <div><p className="text-sm text-muted-foreground mb-1">Inquiry Type</p><p className="font-medium text-navy capitalize">{selectedEnquiry.inquiry_type}</p></div>
                  {selectedEnquiry.medium && (<div><p className="text-sm text-muted-foreground mb-1">Preferred Medium</p><span className="inline-block px-3 py-1 bg-sky-blue/10 text-sky-blue rounded-full text-sm font-medium capitalize">{selectedEnquiry.medium}</span></div>)}
                </div>
                {selectedEnquiry.message && (
                  <div className="mt-4 pt-4 border-t border-border"><p className="text-sm text-muted-foreground mb-1">Message</p><p className="text-navy">{selectedEnquiry.message}</p></div>
                )}
              </div>

              {/* Admission Details - Only show if admission inquiry */}
              {selectedEnquiry.inquiry_type === 'admission' && (selectedEnquiry.admission_standard || selectedEnquiry.stream_group) && (
                <div className="bg-pale-blue rounded-xl p-5">
                  <h4 className="font-heading font-bold text-navy text-lg mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green/10 rounded-full flex items-center justify-center"><GraduationCap className="h-4 w-4 text-green" /></div>
                    Admission Details
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedEnquiry.admission_standard && (<div><p className="text-sm text-muted-foreground mb-1">Admission Standard</p><p className="font-medium text-navy">{selectedEnquiry.admission_standard}</p></div>)}
                    {selectedEnquiry.stream_group && (<div><p className="text-sm text-muted-foreground mb-1">Stream/Group</p><p className="font-medium text-navy">{selectedEnquiry.stream_group}</p></div>)}
                  </div>
                </div>
              )}

              {/* Student Information */}
              {selectedEnquiry.student_name && (
                <div className="bg-orange/5 rounded-xl p-5">
                  <h4 className="font-heading font-bold text-navy text-lg mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange/10 rounded-full flex items-center justify-center"><User className="h-4 w-4 text-orange" /></div>
                    Student Information
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><p className="text-sm text-muted-foreground mb-1">Student Name</p><p className="font-medium text-navy">{selectedEnquiry.student_name}</p></div>
                    {selectedEnquiry.date_of_birth && (<div><p className="text-sm text-muted-foreground mb-1">Date of Birth</p><p className="font-medium text-navy">{new Date(selectedEnquiry.date_of_birth).toLocaleDateString()}</p></div>)}
                    {selectedEnquiry.religion && (<div><p className="text-sm text-muted-foreground mb-1">Religion</p><p className="font-medium text-navy">{selectedEnquiry.religion}</p></div>)}
                    {selectedEnquiry.caste && (<div><p className="text-sm text-muted-foreground mb-1">Caste</p><p className="font-medium text-navy">{selectedEnquiry.caste}</p></div>)}
                    {selectedEnquiry.subcaste && (<div><p className="text-sm text-muted-foreground mb-1">Sub-caste</p><p className="font-medium text-navy">{selectedEnquiry.subcaste}</p></div>)}
                  </div>
                  {selectedEnquiry.residential_address && (
                    <div className="mt-4 pt-4 border-t border-border"><p className="text-sm text-muted-foreground mb-1">Residential Address</p><p className="text-navy">{selectedEnquiry.residential_address}</p></div>
                  )}
                </div>
              )}

              {/* Previous Education */}
              {selectedEnquiry.last_school_name && (
                <div className="bg-sky-blue/5 rounded-xl p-5">
                  <h4 className="font-heading font-bold text-navy text-lg mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-sky-blue/10 rounded-full flex items-center justify-center"><BookOpen className="h-4 w-4 text-sky-blue" /></div>
                    Previous Education
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><p className="text-sm text-muted-foreground mb-1">Last School</p><p className="font-medium text-navy">{selectedEnquiry.last_school_name}</p></div>
                    {selectedEnquiry.board && (<div><p className="text-sm text-muted-foreground mb-1">Board</p><p className="font-medium text-navy">{selectedEnquiry.board}</p></div>)}
                    {selectedEnquiry.last_school_district && (<div><p className="text-sm text-muted-foreground mb-1">District</p><p className="font-medium text-navy">{selectedEnquiry.last_school_district}</p></div>)}
                    {selectedEnquiry.last_school_state && (<div><p className="text-sm text-muted-foreground mb-1">State</p><p className="font-medium text-navy">{selectedEnquiry.last_school_state}</p></div>)}
                    {selectedEnquiry.last_standard && (<div><p className="text-sm text-muted-foreground mb-1">Last Standard</p><p className="font-medium text-navy">{selectedEnquiry.last_standard}</p></div>)}
                    {selectedEnquiry.last_year && (<div><p className="text-sm text-muted-foreground mb-1">Year</p><p className="font-medium text-navy">{selectedEnquiry.last_year}</p></div>)}
                    {selectedEnquiry.result_percentage && (<div><p className="text-sm text-muted-foreground mb-1">Result</p><p className="font-medium text-navy">{selectedEnquiry.result_percentage}</p></div>)}
                  </div>
                </div>
              )}

              {/* Parent Details */}
              {(selectedEnquiry.father_occupation || selectedEnquiry.mother_occupation) && (
                <div className="bg-green/5 rounded-xl p-5">
                  <h4 className="font-heading font-bold text-navy text-lg mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green/10 rounded-full flex items-center justify-center"><Users className="h-4 w-4 text-green" /></div>
                    Parent Details
                  </h4>
                   <div className="grid md:grid-cols-2 gap-4">
                    {selectedEnquiry.father_occupation && (<div><p className="text-sm text-muted-foreground mb-1">Father's Occupation</p><p className="font-medium text-navy">{selectedEnquiry.father_occupation}</p></div>)}
                    {selectedEnquiry.mother_occupation && (<div><p className="text-sm text-muted-foreground mb-1">Mother's Occupation</p><p className="font-medium text-navy">{selectedEnquiry.mother_occupation}</p></div>)}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-pale-gray p-6 sticky bottom-0 flex justify-end gap-3">
              <button onClick={() => setShowEnquiryModal(false)} className="px-6 py-2 bg-white border border-border text-navy rounded-lg font-medium hover:bg-pale-gray transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
