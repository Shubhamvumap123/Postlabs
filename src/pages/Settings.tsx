import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { User, Bell, Smartphone } from "lucide-react";
import { useTheme } from "next-themes";

const Settings = () => {
  const [name, setName] = useState("");
  const [notifications, setNotifications] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) setName(savedName);

    const savedNotifs = localStorage.getItem("notifications");
    if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userName", name);
    localStorage.setItem("notifications", JSON.stringify(notifications));
    toast.success("Settings saved successfully");
  };

  return (
    <div className="min-h-screen bg-background font-['Inter_Tight',Verdana,sans-serif]">
      <Navigation />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
            Settings
          </h1>

          <div className="space-y-6">
            {/* Profile Section */}
            <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Profile</h2>
                  <p className="text-sm text-muted-foreground">Manage your public profile information</p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Display Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </section>

            {/* Notifications Section */}
            <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                  <p className="text-sm text-muted-foreground">Configure how you receive alerts</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-foreground">
                    Push Notifications
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Receive notifications about your tasks
                  </p>
                </div>
                <div
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${notifications ? 'bg-primary' : 'bg-input'}`}
                  onClick={() => {
                    setNotifications(!notifications);
                    // Auto-save logic for toggle
                    localStorage.setItem("notifications", JSON.stringify(!notifications));
                    toast.success(`Notifications ${!notifications ? 'enabled' : 'disabled'}`);
                  }}
                >
                  <motion.div
                    className="bg-background w-4 h-4 rounded-full shadow-sm"
                    animate={{ x: notifications ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
            </section>

            {/* Appearance Section */}
            <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
                  <p className="text-sm text-muted-foreground">Customize the interface theme</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {['light', 'dark', 'system'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`
                      flex flex-col items-center gap-2 p-4 rounded-lg border transition-all
                      ${theme === t
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border hover:border-primary/50 hover:bg-accent/50'}
                    `}
                  >
                    <div className="w-full aspect-video rounded-md bg-muted overflow-hidden relative border border-border">
                      {t === 'light' && <div className="absolute inset-0 bg-white" />}
                      {t === 'dark' && <div className="absolute inset-0 bg-zinc-950" />}
                      {t === 'system' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white to-zinc-950" />
                      )}
                    </div>
                    <span className="text-sm font-medium capitalize">{t}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
