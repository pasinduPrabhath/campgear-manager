
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarClock, CreditCard, Package, ArrowRight, Users, FileCheck, ThumbsUp, ShieldCheck } from "lucide-react";

const HowItWorks = () => {
  return (
    <Layout>
      {/* Hero section */}
      <section className="bg-muted py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">How Our Rental Process Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've made renting camping equipment simple and hassle-free. Follow these steps to get equipped for your next adventure.
          </p>
        </div>
      </section>

      {/* Steps section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <CalendarClock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Choose Rental Dates</h3>
              <p className="text-muted-foreground">
                Select the dates when you'll need the equipment. Our calendar shows real-time availability.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Select Your Equipment</h3>
              <p className="text-muted-foreground">
                Browse our catalog and add the items you need to your cart. All equipment is quality-checked.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Complete Payment</h3>
              <p className="text-muted-foreground">
                Complete the checkout process and upload your payment slip. We'll confirm your order promptly.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Link to="/equipment">
              <Button size="lg">
                Start Browsing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional info section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What to Expect</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm flex">
              <div className="mr-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <FileCheck className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Pickup Process</h3>
                <p className="text-muted-foreground">
                  Once your order is confirmed, you can pick up your equipment from our store on the start date. 
                  Bring a valid ID and the security deposit.
                </p>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm flex">
              <div className="mr-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <ThumbsUp className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Return Process</h3>
                <p className="text-muted-foreground">
                  Return the equipment by the end date in good condition. We'll inspect the items and 
                  refund your security deposit if everything is in order.
                </p>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm flex">
              <div className="mr-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  All our equipment is thoroughly cleaned and checked before each rental to ensure 
                  you receive items in excellent condition.
                </p>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm flex">
              <div className="mr-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
                <p className="text-muted-foreground">
                  Our team is available to answer any questions and provide guidance on equipment 
                  usage. We're here to ensure you have a great outdoor experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">What forms of payment do you accept?</h3>
              <p className="text-muted-foreground">
                We accept bank transfers, mobile money, and cash payments. For online bookings, 
                you'll need to upload proof of payment.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">What if I need to extend my rental period?</h3>
              <p className="text-muted-foreground">
                Contact us as soon as possible if you need to extend your rental. We'll check if the 
                equipment is available and provide pricing for the additional days.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Is there a security deposit?</h3>
              <p className="text-muted-foreground">
                Yes, we require a security deposit that will be refunded when you return all equipment 
                in good condition. The amount varies based on what you're renting.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">What if equipment is damaged during my rental?</h3>
              <p className="text-muted-foreground">
                If equipment is damaged beyond normal wear and tear, a portion of your security deposit 
                may be retained to cover repairs or replacement.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Can I cancel my reservation?</h3>
              <p className="text-muted-foreground">
                Cancellations made at least 48 hours before the rental start date will receive a full refund. 
                Later cancellations may be subject to a cancellation fee.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Still have questions? Contact our team for assistance.
            </p>
            <Link to="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
