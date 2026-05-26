import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Client {
  id: string;
  name: string;
  email?: string;
  company?: string;
  phone?: string;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ClientsSection = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/clients");

      if (!res.ok) {
        throw new Error(`Failed to fetch clients: ${res.statusText}`);
      }

      const data = await res.json();
      // Handle both direct array and nested array response
      const clientList = Array.isArray(data) ? data : (data.clients || data.data || []);
      setClients(clientList);
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError(err instanceof Error ? err.message : "Failed to load clients");
      // Keep previous state on error (graceful degradation)
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and polling setup
  useEffect(() => {
    fetchClients();

    // Poll every 15 seconds for new clients
    const interval = setInterval(() => {
      fetchClients();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // If no clients and not loading, show empty state
  if (clients.length === 0 && !loading) {
    return (
      <div className="mt-10">
        <h3 className="text-xl font-heading font-semibold mb-5">Clientes</h3>
        <p className="text-sm text-muted-foreground text-center py-8">
          Clientes em breve...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 overflow-hidden">
      <h3 className="text-xl font-heading font-semibold mb-5">Clientes</h3>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-6">
        {clients.map((client) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.08 }}
            className="w-20 h-20 rounded-lg bg-secondary/50 border border-border flex items-center justify-center overflow-hidden hover:border-primary/40 transition-colors"
            title={client.company || client.name}
          >
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  // Fallback to initials if logo fails to load
                  const element = e.currentTarget;
                  element.style.display = "none";
                  const parent = element.parentElement;
                  if (parent && !parent.querySelector(".fallback-initials")) {
                    const fallback = document.createElement("div");
                    fallback.className = "fallback-initials text-center text-xs font-semibold text-primary";
                    fallback.textContent = client.name.slice(0, 2).toUpperCase();
                    parent.appendChild(fallback);
                  }
                }}
              />
            ) : (
              <div className="text-center text-xs font-semibold text-primary">
                {client.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {error && (
        <p className="text-xs text-destructive text-center mt-4">
          Erro ao carregar clientes
        </p>
      )}
    </div>
  );
};

export default ClientsSection;
