import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { enquiryAPI, galleryAPI } from "../../services/api";
import {
  LogOut,
  MessageSquare,
  Image,
  Download,
  Trash2,
  Search,
  Calendar,
  Upload,
  X,
  Filter,
  RefreshCw,
} from "lucide-react";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  inquiry_type: string;
  message: string;
  status: "new" | "contacted" | "converted" | "closed";
  created_at: string;
}

interface GalleryPhoto {
  id: number;
  title: string;
  category: string;
  cloudinary_url: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"enquiries" | "gallery">("enquiries");

  // Enquiry states
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enquiryLoading, setEnquiryLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  // Gallery states
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Campus");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (activeTab === "enquiries") {
      fetchEnquiries();
    } else {
      fetchGallery();
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

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-sky-blue/20 text-sky-blue";
      case "contacted":
        return "bg-orange/20 text-orange";
      case "converted":
        return "bg-green/20 text-green";
      case "closed":
        return "bg-muted-foreground/20 text-muted-foreground";
      default:
        return "bg-gray-100 text-gray-600";
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
        <div className="flex gap-4 mb-6">
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
        </div>

        {/* Enquiries Tab */}
        {activeTab === "enquiries" && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {/* Filters */}
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
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
                placeholder="From Date"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
                placeholder="To Date"
              />
              <button
                onClick={fetchEnquiries}
                className="flex items-center gap-2 px-4 py-2 bg-pale-blue text-navy rounded-lg hover:bg-sky-blue/20 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg hover:bg-green/90 transition-colors disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                {isExporting ? "Exporting..." : "Export Excel"}
              </button>
            </div>

            {/* Table */}
            {enquiryLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground mt-4">Loading enquiries...</p>
              </div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No enquiries found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-navy">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Contact</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Message</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-navy">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="border-b border-border hover:bg-pale-gray/50">
                        <td className="py-3 px-4 font-medium">{enquiry.name}</td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <p>{enquiry.email}</p>
                            <p className="text-muted-foreground">{enquiry.phone}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 capitalize">{enquiry.inquiry_type}</td>
                        <td className="py-3 px-4">
                          <p className="max-w-[200px] truncate text-sm text-muted-foreground">
                            {enquiry.message || "-"}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={enquiry.status}
                            onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)} border-0 cursor-pointer`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {new Date(enquiry.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDeleteEnquiry(enquiry.id)}
                            className="text-red-accent hover:bg-red-accent/10 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
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
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-xl text-navy">
                Gallery Photos ({photos.length})
              </h2>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-dark transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload Photo
              </button>
            </div>

            {/* Gallery Grid */}
            {galleryLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground mt-4">Loading photos...</p>
              </div>
            ) : photos.length === 0 ? (
              <div className="text-center py-12">
                <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No photos uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="group relative rounded-xl overflow-hidden">
                    <img
                      src={photo.cloudinary_url}
                      alt={photo.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <p className="text-white font-medium text-sm">{photo.title}</p>
                      <p className="text-white/70 text-xs">{photo.category}</p>
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="absolute top-2 right-2 p-2 bg-red-accent text-white rounded-lg hover:bg-red-accent/80 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="absolute top-2 left-2 bg-navy/80 text-white text-xs px-2 py-1 rounded-full">
                      {photo.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-navy/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-xl text-navy">Upload Photo</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-pale-gray rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Title</label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
                  placeholder="Enter photo title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
                >
                  <option value="Campus">Campus</option>
                  <option value="Events">Events</option>
                  <option value="Sports">Sports</option>
                  <option value="Activities">Activities</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
                  required
                />
              </div>

              {uploadFile && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(uploadFile)}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-navy text-white py-3 rounded-lg font-medium hover:bg-navy-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    Upload Photo
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
