import JobDashboard from "../components/JobDashboard";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navigation />
      <main className="flex-grow pt-24 pb-12">
        <JobDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
