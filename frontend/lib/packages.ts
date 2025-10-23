// frontend/lib/packages.ts

export type ActivityDetail = { name: string; description: string };

export type Pkg = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  highlights: string[];      // Short, emoji-rich chips for cards/list pages
  included: ActivityDetail[]; // Full activity list for detail pages (if you choose to show it)
  location?: string;
};

export async function getPackages(): Promise<Pkg[]> {
  return [
    {
      id: 1,
      title: 'Nature Package',
      subtitle: 'Outdoor & Scenic Explorers',
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
      highlights: [
        '🏔️ Table Mountain Hike',
        '🌿 Kirstenbosch Gardens',
        '🌊 Cape Point Nature Reserve',
        '🚗 Chapman’s Peak Drive',
        '🐧 Boulders Beach Penguins',
        '🌅 Signal Hill Sunset Picnic',
      ],
      included: [
        {
          name: 'Table Mountain Hike',
          description:
            'Trek up via Platteklip Gorge or Skeleton Gorge for sweeping views of the city and ocean.',
        },
        {
          name: 'Kirstenbosch National Botanical Gardens',
          description:
            'Explore indigenous flora and walk the “Boomslang” tree canopy walkway.',
        },
        {
          name: 'Cape Point Nature Reserve',
          description:
            'Visit the lighthouse and rugged cliffs where the Atlantic and Indian Oceans meet.',
        },
        {
          name: "Chapman's Peak Drive",
          description:
            'Iconic coastal route with dramatic viewpoints and photo stops.',
        },
        {
          name: 'Boulders Beach',
          description:
            'See the famous African penguin colony up close on sheltered sands.',
        },
        {
          name: 'Signal Hill Sunset Picnic',
          description:
            'Relax with golden-hour views across the city and Atlantic Seaboard.',
        },
      ],
      location: 'Cape Town, South Africa',
    },
    {
      id: 2,
      title: 'Adventure Package',
      subtitle: 'Thrill-seekers itinerary',
      image:
        'https://images.unsplash.com/photo-1506968430777-bf7784a87f22?q=80&w=1200&auto=format&fit=crop',
      highlights: [
        '🦈 Shark Cage Diving',
        '🪂 Paragliding (Lion’s Head)',
        '🏜️ Sandboarding (Atlantis Dunes)',
        '🛶 Sea Kayaking (False Bay)',
        '🧗 Abseiling (Table Mountain)',
        '🏄‍♂️ Surfing (Muizenberg)',
      ],
      included: [
        {
          name: 'Shark Cage Diving (Gansbaai)',
          description:
            'Day trip to meet great whites safely with expert crews and marine briefings.',
        },
        {
          name: 'Paragliding',
          description:
            'Launch from Lion’s Head or Signal Hill and soar above the Atlantic Seaboard with pro pilots.',
        },
        {
          name: 'Sandboarding (Atlantis Dunes)',
          description:
            'Ride striking white dunes just 45 minutes outside the city.',
        },
        {
          name: 'Sea Kayaking (False Bay)',
          description:
            'Paddle alongside dolphins and seals; whales are possible in season.',
        },
        {
          name: 'Abseiling off Table Mountain',
          description:
            'One of the world’s highest commercial abseils—pure vertical thrills.',
        },
        {
          name: 'Surfing (Muizenberg Beach)',
          description:
            'A gentle, beginner-friendly break with board and wetsuit rentals nearby.',
        },
      ],
      location: 'Cape Town, South Africa',
    },
    {
      id: 3,
      title: 'Culture & Urban Style',
      subtitle: 'City lovers & culture enthusiasts',
      image:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
      highlights: [
        '🏘️ Bo-Kaap Walking Tour',
        '🎨 Zeitz MOCAA',
        '⚓ V&A Waterfront',
        '🏰 Castle of Good Hope',
        '🎭 Woodstock Street Art & Market',
        '🍸 Long & Bree Street Nightlife',
      ],
      included: [
        {
          name: 'Robben Island Tour',
          description:
            'Ferry to the UNESCO site to learn about its history and Nelson Mandela’s imprisonment.',
        },
        {
          name: 'Bo-Kaap Walking Tour',
          description:
            'Discover colourful streets, Cape Malay culture, and traditional cuisine.',
        },
        {
          name: 'Zeitz MOCAA & V&A Waterfront',
          description:
            'Visit Africa’s largest contemporary art museum, then browse and dine at the Waterfront.',
        },
        {
          name: 'Castle of Good Hope',
          description:
            'Explore the oldest surviving colonial building in South Africa.',
        },
        {
          name: 'Woodstock Street Art & Food Market',
          description:
            'Wander vibrant murals and sample local, artisanal bites.',
        },
        {
          name: 'Long Street & Bree Street Nightlife',
          description:
            'Experience buzzy bars, cafés, and live music in the city’s urban heart.',
        },
      ],
      location: 'Cape Town, South Africa',
    },
  ];
}
