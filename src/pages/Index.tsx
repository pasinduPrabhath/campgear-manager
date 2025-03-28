
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tent, Lightbulb, Battery, Sparkles } from "lucide-react";
import { equipments } from "@/data/equipments";
import EquipmentCard from "@/components/EquipmentCard";

const Index = () => {
  // Get 4 featured items
  const featuredEquipment = equipments.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-forest-dark text-white">
        <div 
          className="absolute inset-0 bg-black opacity-40 z-10"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay"
          }}
        ></div>
        <div className="container relative z-20 py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Quality Camping Gear <span className="text-secondary">For Rent</span>
          </h1>
          <p className="text-lg md:text-xl max-w-xl mb-8">
            Explore the outdoors without the expense of buying equipment. 
            Rent high-quality camping gear for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/equipment">
              <Button size="lg" className="font-semibold">
                Browse Equipment
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="font-semibold">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Equipment</h2>
            <Link to="/equipment">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEquipment.map((equipment) => (
              <EquipmentCard key={equipment.id} equipment={equipment} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Browse By Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/equipment?category=tent" className="group">
              <div className="bg-secondary/10 hover:bg-secondary/20 rounded-lg p-8 text-center transition-all">
                <div className="inline-flex items-center justify-center p-4 bg-secondary/20 rounded-full mb-4 group-hover:bg-secondary/30 transition-colors">
                  <Tent className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tents & Shelters</h3>
                <p className="text-muted-foreground">High-quality tents for your camping adventures.</p>
              </div>
            </Link>
            <Link to="/equipment?category=torch" className="group">
              <div className="bg-secondary/10 hover:bg-secondary/20 rounded-lg p-8 text-center transition-all">
                <div className="inline-flex items-center justify-center p-4 bg-secondary/20 rounded-full mb-4 group-hover:bg-secondary/30 transition-colors">
                  <Lightbulb className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lighting</h3>
                <p className="text-muted-foreground">Stay illuminated with our range of camping lights.</p>
              </div>
            </Link>
            <Link to="/equipment?category=powerBank" className="group">
              <div className="bg-secondary/10 hover:bg-secondary/20 rounded-lg p-8 text-center transition-all">
                <div className="inline-flex items-center justify-center p-4 bg-secondary/20 rounded-full mb-4 group-hover:bg-secondary/30 transition-colors">
                  <Battery className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Power Solutions</h3>
                <p className="text-muted-foreground">Keep your devices charged in the wilderness.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Renting with CampGear is easy. Follow these steps to get equipped for your next adventure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Your Gear</h3>
              <p className="text-muted-foreground">
                Browse our wide range of quality camping equipment and add items to your cart.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Rental Dates</h3>
              <p className="text-muted-foreground">
                Pick your rental start and end dates. Complete payment and upload your payment slip.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Your Adventure</h3>
              <p className="text-muted-foreground">
                Pick up your gear and enjoy your camping trip! Return everything when you're done.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button>Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <div className="inline-flex items-center justify-center p-4 bg-primary-foreground/10 rounded-full mb-6">
            <Sparkles className="h-8 w-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Browse our equipment collection and book now!
          </p>
          <Link to="/equipment">
            <Button size="lg" variant="secondary" className="font-semibold">
              Start Browsing
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
