export type Resource = {
    type: string;
    name: string;
    address: string;
    phone: string;
  };
  
  export const resources: Resource[] = [
    {
      type: "urgent_care",
      name: "QuickCare Urgent Care",
      address: "123 Main St, San Jose, CA",
      phone: "(408) 555-1111",
    },
    {
      type: "pharmacy",
      name: "HealthPlus Pharmacy",
      address: "456 Elm St, San Jose, CA",
      phone: "(408) 555-2222",
    },
    {
      type: "hospital",
      name: "Valley Medical Center",
      address: "751 S Bascom Ave, San Jose, CA",
      phone: "(408) 885-5000",
    },
  ];
  
  export function getSuggestedResources(urgency: string): Resource[] {
    const normalizedUrgency = urgency.toLowerCase().trim();
  
    if (normalizedUrgency === "emergency") {
      return resources.filter((r) => r.type === "hospital");
    }
  
    if (normalizedUrgency === "high") {
      return resources.filter(
        (r) => r.type === "urgent_care" || r.type === "hospital"
      );
    }
  
    if (normalizedUrgency === "medium") {
      return resources.filter(
        (r) => r.type === "urgent_care" || r.type === "pharmacy"
      );
    }
  
    return resources.filter((r) => r.type === "pharmacy");
  }