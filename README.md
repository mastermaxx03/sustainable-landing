# Sustainable Fashion Supply Chain Visualization

A 3D interactive globe visualizing fashion supply chain emissions across the world. Built with Next.js 14, Three.js, and React Three Fiber.

## Features

- **Interactive 3D Globe**: Explore fashion manufacturing emissions across countries
- **Multiple View Modes**:
  - Supply Chain: View countries and their supply chain routes
  - Heat Map: Visualize emission intensity by country
  - Factory View: See individual factory locations
- **Real-time Emission Counter**: Watch daily global fashion emissions tick up
- **Country Details**: Click any country to see detailed emissions data, factories, and materials
- **Supply Chain Routes**: Explore step-by-step emission breakdowns for major trade routes
- **Botanical Tech Aesthetic**: Climate-focused design inspired by Watershed and Earth observation systems

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Three.js + @react-three/fiber + @react-three/drei
- Framer Motion (animations)
- Tailwind CSS
- Context API (state management)

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
sustainable-landing/
├── app/
│   ├── layout.jsx          # Root layout with providers
│   ├── page.jsx            # Main page
│   └── globals.css         # Global styles & design system
├── components/
│   ├── Globe.jsx           # 3D Earth with markers & arcs
│   ├── EmissionCounter.jsx # Real-time counter
│   ├── Sidebar.jsx         # Country details panel
│   ├── RouteDetails.jsx    # Supply chain timeline
│   ├── ViewModeToggle.jsx  # View mode switcher
│   ├── LoadingSequence.jsx # Animated loading screen
│   └── Footer.jsx          # Footer with attribution
├── context/
│   ├── AppStateContext.jsx # UI state management
│   ├── DataContext.jsx     # Data loading & storage
│   └── CameraContext.jsx   # 3D camera controls
└── lib/
    ├── data.js             # Country & supply chain data
    └── api.js              # Mock API functions
```

## Design System

### Colors (CSS Variables)

- Background: Dark teal-black palette
- Primary: Teal-mint spectrum (#14B8A6, #5EEAD4)
- Emissions: Green (low) → Amber (medium) → Red (high)

### Typography

- Primary: Space Grotesk (300-900 weight)
- Monospace: JetBrains Mono (for numbers)

### Interactions

- Click countries to view details
- Click supply chain arcs to see route breakdown
- Toggle view modes to explore different perspectives
- Camera auto-rotates and can be manually controlled

## TODO: Future Enhancements

- Add retry logic for failed API calls
- Implement actual comparison view bar charts
- Add more granular factory data
- Real-time data integration

## Credits

Built by Animesh Srivastava
Data sources: IEA, Higg MSI, GHG Protocol
