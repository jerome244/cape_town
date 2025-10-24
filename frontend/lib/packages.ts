// frontend/lib/packages.ts

export type ActivityDetail = { name: string; description: string };

export type Pkg = {
  id: number;
  title: string;
  subtitle: string;
  image: string;          // first frame / fallback
  images?: string[];      // optional slideshow sources (2+ to auto-rotate)
  included: ActivityDetail[];
  location?: string;
};

export async function getPackages(): Promise<Pkg[]> {
  return [
    {
      id: 1,
      title: 'Nature Package',
      subtitle: 'Outdoor & Scenic Explorers',
      image: '/images/nature/chapmans-peak-drive.jpg',
      images: [
        '/images/nature/chapmans-peak-drive.jpg',
        '/images/nature/cape-point-nature-reserve.jpg',
        '/images/nature/skeleton-gorge.png',
        '/images/nature/kirstenbosch.jpg',
        '/images/nature/platteklip-gorge.webp',
        '/images/nature/boulders-penguins.jpg',
        '/images/nature/signal-hill-sunset.jpg',
      ],
      included: [
        {
          name: '🏔️ Table Mountain Hike',
          description:
            'Trek up via Platteklip Gorge or Skeleton Gorge for sweeping views of the city and ocean.',
        },
        {
          name: '🌿 Kirstenbosch National Botanical Gardens',
          description:
            'Explore indigenous flora and walk the “Boomslang” tree canopy walkway.',
        },
        {
          name: '🌊 Cape Point Nature Reserve',
          description:
            'Visit the lighthouse and rugged cliffs where the Atlantic and Indian Oceans meet.',
        },
        {
          name: "🚗 Chapman's Peak Drive",
          description:
            'Iconic coastal route with dramatic viewpoints and photo stops.',
        },
        {
          name: '🐧 Boulders Beach (Penguins)',
          description:
            'See the famous African penguin colony up close on sheltered sands.',
        },
        {
          name: '🌅 Signal Hill Sunset Picnic',
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
  // cover image (first one shown)
  image: '/images/adventure/Paragliding.jpg',
  // carousel images used by PackageCard
  images: [
    '/images/adventure/Paragliding.jpg',
    '/images/adventure/SA15a-Kayak-Simons-Town.jpg',
    '/images/adventure/Sandboarding.webp',
    '/images/adventure/shark-diving-2-days.webp',
    '/images/adventure/Surfing.jpg',
    '/images/adventure/L7-5--1523539421415797.jpg',
  ],
      included: [
        {
          name: '🦈 Shark Cage Diving (Gansbaai)',
          description:
            'Day trip to meet great whites safely with expert crews and marine briefings.',
        },
        {
          name: '🪂 Paragliding (Lion’s Head / Signal Hill)',
          description:
            'Launch with pro pilots and soar above the Atlantic Seaboard.',
        },
        {
          name: '🏜️ Sandboarding (Atlantis Dunes)',
          description:
            'Ride striking white dunes just 45 minutes outside the city.',
        },
        {
          name: '🛶 Sea Kayaking (False Bay)',
          description:
            'Paddle alongside dolphins and seals; whales are possible in season.',
        },
        {
          name: '🧗 Abseiling off Table Mountain',
          description:
            'One of the world’s highest commercial abseils—pure vertical thrills.',
        },
        {
          name: '🏄‍♂️ Surfing (Muizenberg Beach)',
          description:
            'A gentle, beginner-friendly break with board and wetsuit rentals nearby.',
        },
      ],
      location: 'Cape Town, South Africa',
    },
    {
  id: 3, // or whatever id that card uses
  title: 'Culture & Urban Style',
  subtitle: 'City lovers & culture enthusiasts',
  image: '/images/culture/Long-Street.jpg', // cover shown first
  images: [
    '/images/culture/Long-Street.jpg',
    '/images/culture/woodstock-street-art-lauren-YS.webp',
    '/images/culture/castlegoodhope.jpg',
    '/images/culture/images.jpg',                     // V&A (day)
    '/images/culture/victoria-alfred-waterfront.jpg',// V&A (night)
    '/images/culture/zeitz-mocaa.jpg',
    '/images/culture/bo-kaap.jpg',
    '/images/culture/banner_RobbenIsland.jpg',
  ],
      included: [
        {
          name: '⛴️ Robben Island Tour',
          description:
            'Ferry to the UNESCO site to learn about its history and Nelson Mandela’s imprisonment.',
        },
        {
          name: '🏘️ Bo-Kaap Walking Tour',
          description:
            'Discover colourful streets, Cape Malay culture, and traditional cuisine.',
        },
        {
          name: '🎨 Zeitz MOCAA & ⚓ V&A Waterfront',
          description:
            'Visit Africa’s largest contemporary art museum, then browse and dine at the Waterfront.',
        },
        {
          name: '🏰 Castle of Good Hope',
          description:
            'Explore the oldest surviving colonial building in South Africa.',
        },
        {
          name: '🎭 Woodstock Street Art & Food Market',
          description:
            'Wander vibrant murals and sample local, artisanal bites.',
        },
        {
          name: '🍸 Long Street & Bree Street Nightlife',
          description:
            'Experience buzzy bars, cafés, and live music in the city’s urban heart.',
        },
      ],
      location: 'Cape Town, South Africa',
    },
  ];
}
