export interface Contribution {
  id?: string;
  title: string;       // e.g., "पौधरोपण अभियान"
  description: string; // Details about event
  location: string;    // e.g., "Chetru Bagli, Kangra H.P"
  date: string;        // e.g., "2025-07-28"
  imageUrl?: string;   // Banner / photo
}