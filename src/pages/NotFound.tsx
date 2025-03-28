
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Compass } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted inline-flex items-center justify-center p-6 rounded-full mb-6">
          <Compass className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground max-w-md mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/">
            <Button size="lg">Go to Homepage</Button>
          </Link>
          <Link to="/equipment">
            <Button variant="outline" size="lg">Browse Equipment</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
