import { useState, useEffect } from "react";
import { Copy, Check, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Guest {
  name: string;
  category: string;
  link: string;
}

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTngUFrMkO9_wLxEMS2lW4kMZmaP4NzOcqt1G5FLFLGvsanIbMcy3krdsQ0mo2dc154_cKvbF0TLzQ8/pub?gid=0&single=true&output=csv";

const Admin = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const response = await fetch(GOOGLE_SHEET_CSV_URL);
      const csvText = await response.text();
      
      const lines = csvText.split("\n");
      const parsedGuests: Guest[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const [name, category] = line.split(",");
          if (name) {
            const cleanName = name.trim();
            const slugName = cleanName.replace(/\s+/g, "_").replace(/[\/]/g, "-");
            parsedGuests.push({
              name: cleanName,
              category: category?.trim() || "",
              link: `${window.location.origin}/?to=${encodeURIComponent(slugName)}`
            });
          }
        }
      }
      
      setGuests(parsedGuests);
    } catch (error) {
      console.error("Error fetching guests:", error);
      toast.error("Gagal memuat data tamu");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (link: string, index: number) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedIndex(index);
      toast.success("Link berhasil disalin!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      toast.error("Gagal menyalin link");
    }
  };

  const copyAllLinks = async () => {
    const allLinks = filteredGuests.map(g => `${g.name}: ${g.link}`).join("\n");
    try {
      await navigator.clipboard.writeText(allLinks);
      toast.success(`${filteredGuests.length} link berhasil disalin!`);
    } catch (error) {
      toast.error("Gagal menyalin semua link");
    }
  };

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(guests.map(g => g.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-cream to-cream">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-script text-4xl md:text-5xl text-foreground mb-2">
            Admin Undangan
          </h1>
          <p className="text-muted-foreground font-display">
            Generate & kelola link undangan tamu
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-dusty-rose/20">
            <p className="text-3xl font-display text-foreground">{guests.length}</p>
            <p className="text-sm text-muted-foreground">Total Tamu</p>
          </div>
          {categories.slice(0, 3).map(cat => (
            <div key={cat} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-dusty-rose/20">
              <p className="text-3xl font-display text-foreground">
                {guests.filter(g => g.category === cat).length}
              </p>
              <p className="text-sm text-muted-foreground">{cat}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Cari nama atau kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-background/80 border-dusty-rose/30"
          />
          <div className="flex gap-2">
            <Button
              onClick={fetchGuests}
              variant="outline"
              className="border-dusty-rose/30 hover:bg-dusty-rose/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              onClick={copyAllLinks}
              className="bg-dusty-rose hover:bg-dusty-rose/90 text-white"
            >
              <Copy className="w-4 h-4 mr-2" />
              Salin Semua ({filteredGuests.length})
            </Button>
          </div>
        </div>

        {/* Guest Table */}
        <div className="bg-background/80 backdrop-blur-sm rounded-xl border border-dusty-rose/20 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-dusty-rose mb-4" />
              <p className="text-muted-foreground">Memuat data tamu...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-dusty-rose/10 border-b border-dusty-rose/20">
                    <th className="text-left p-4 font-display text-foreground">No</th>
                    <th className="text-left p-4 font-display text-foreground">Nama Tamu</th>
                    <th className="text-left p-4 font-display text-foreground">Kategori</th>
                    <th className="text-left p-4 font-display text-foreground">Link Undangan</th>
                    <th className="text-center p-4 font-display text-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map((guest, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-dusty-rose/10 hover:bg-dusty-rose/5 transition-colors"
                    >
                      <td className="p-4 text-muted-foreground">{index + 1}</td>
                      <td className="p-4 font-medium text-foreground">{guest.name}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-dusty-rose/20 text-dusty-rose font-medium">
                          {guest.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <code className="text-xs bg-muted/50 px-2 py-1 rounded text-muted-foreground break-all">
                          {guest.link}
                        </code>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(guest.link, index)}
                            className="hover:bg-dusty-rose/10"
                          >
                            {copiedIndex === index ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="hover:bg-dusty-rose/10"
                          >
                            <a href={guest.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          Data diambil dari Google Sheets • Refresh untuk update terbaru
        </p>
      </div>
    </div>
  );
};

export default Admin;
