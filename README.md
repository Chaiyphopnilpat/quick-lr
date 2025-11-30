# Omega AI Command Center

**Decision Transparency Engine v2.0**

A sophisticated dual AI system combining Crystal Energy AGI Optimization with Autonomous Web Browser capabilities.

## Features

### 1. Omega AGI Crystal Simulator

Simulates an AGI (Artificial General Intelligence) system optimizing piezoelectric crystal efficiency for energy harvesting through iterative learning.

**Key Features:**
- Real-time efficiency optimization visualization
- Dual learning modes: Stable Optimization vs Creative Mutation
- Interactive Lambda (curiosity) parameter control (0.0-0.9)
- Live charts showing:
  - Efficiency progression toward target (99.99%)
  - Energy output (nanojoules)
  - Piezoelectric coefficient evolution
- Detailed activity log with timestamp tracking
- Convergence detection and status indicators

**Scientific Basis:**
- Piezoelectric energy harvesting simulation
- $$E_{out} = \eta \times P_{wave} \times d_{crystal} \times A \times t$$
- Where:
  - $$\eta$$ = Efficiency (target: 0.9999)
  - $$P_{wave}$$ = Acoustic pressure (1.0 Pa)
  - $$d_{crystal}$$ = Piezoelectric coefficient (starts at 300 nC/N)
  - $$A$$ = Crystal surface area (0.001 m²)
  - $$t$$ = Time interval (1.0 s)

**AGI Behavior:**
- **Stable Optimization**: Gradual improvements when far from target
- **Creative Mutation**: Explores new crystal structures near convergence
- Lambda parameter controls exploration vs exploitation balance

### 2. Autonomous Web Browser AI

An AI-powered browser automation system with natural language command processing in Thai and English.

**Capabilities:**
- Natural language command parsing (Thai/English)
- Autonomous navigation and interaction
- Visual feedback with cursor simulation
- Real-time action logging
- Simulated web page rendering

**Supported Commands:**

**Thai:**
- `ไปที่ google.com` - Navigate to website
- `ค้นหา "AI news"` - Search for term
- `คลิกที่ ปุ่ม` - Click element
- `ดึงข้อมูล` - Extract page data
- `เลื่อนหน้า` - Scroll page

**English:**
- `go to google.com` - Navigate to website
- `search "AI news"` - Search for term
- `click button` - Click element
- `extract data` - Extract page data
- `scroll down` - Scroll page

**Quick Commands:**
- เปิดเว็บ (Open web)
- ค้นหา (Search)
- คลิก (Click)
- ดึงข้อมูล (Extract data)

## Architecture

\`\`\`
omega-ai-command-center/
├── app/
│   ├── layout.tsx              # Root layout with dark theme
│   ├── page.tsx                # Main entry point
│   └── globals.css             # Global styles & animations
├── components/
│   ├── ai-command-center.tsx   # Main dashboard with tabs
│   ├── omega-agi-simulator.tsx # AGI crystal simulator
│   ├── auto-ai-browser.tsx     # Browser automation core
│   ├── browser-preview.tsx     # Browser UI with chrome
│   ├── command-input.tsx       # Natural language input
│   ├── action-history.tsx      # Action log sidebar
│   ├── simulated-webpage.tsx   # Mock web pages
│   └── ai-action-indicator.tsx # Action status cards
└── components/ui/              # shadcn/ui components
\`\`\`

## Design System

**Color Palette:**
- Primary: `oklch(0.72 0.19 180)` - Cyan
- Accent: `oklch(0.65 0.22 145)` - Green
- Background: `oklch(0.08 0.01 240)` - Deep dark blue
- Card: `oklch(0.11 0.015 240)` - Dark blue-gray

**Animations:**
- `pulse-glow` - Glowing effect for convergence state
- `cursor-blink` - Terminal-style cursor
- `grid-pulse` - Animated background grid
- `float` - Floating elements
- `data-flow` - Data streaming effect

**Typography:**
- Sans: Geist
- Mono: Geist Mono

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Usage

### AGI Simulator

1. Click the **Omega AGI Crystal** tab
2. Adjust Lambda (curiosity) slider (0-0.9)
   - Lower: More stable, slower convergence
   - Higher: More creative, faster but volatile
3. Click **Start** to begin optimization
4. Watch real-time charts and activity log
5. System auto-stops at 99.99% efficiency

### Autonomous Browser

1. Click the **Autonomous Browser** tab
2. Type command in Thai or English
3. Press Enter or click send button
4. Watch AI execute actions automatically
5. Review action history in right sidebar

**Example Workflows:**

1. **Simple Navigation:**
   \`\`\`
   ไปที่ google.com
   \`\`\`

2. **Search Task:**
   \`\`\`
   ค้นหา "artificial intelligence" ใน Google
   \`\`\`

3. **Complex Automation:**
   \`\`\`
   go to google.com then search for "AI news"
   \`\`\`

## Configuration

### Environment Variables

The system uses Statsig for experimentation (optional):
- `EXPERIMENTATION_CONFIG_ITEM_KEY`
- `NEXT_PUBLIC_STATSIG_CLIENT_KEY`
- `STATSIG_SERVER_API_KEY`

### AGI Constants

Modify in `omega-agi-simulator.tsx`:
\`\`\`typescript
const DEFAULT_LAMBDA = 0.8
const DEFAULT_TARGET = 0.9999
const DEFAULT_PIEZO = 300.0
const ACOUSTIC_PRESSURE = 1.0
const CRYSTAL_SURFACE_AREA = 0.001
const TIME_INTERVAL = 1.0
\`\`\`

## API Integration

The system is designed to integrate with real backend services:

### AGI Simulator API (Future)
\`\`\`typescript
POST /api/agi/simulate
{
  "lambda": 0.8,
  "target": 0.9999,
  "initialCoef": 300.0
}
\`\`\`

### Browser Automation API (Future)
\`\`\`typescript
POST /api/browser/execute
{
  "command": "search 'AI news'",
  "language": "th"
}
\`\`\`

## Performance

- **AGI Simulator**: Real-time updates at 10-100ms intervals
- **Browser Automation**: Actions execute in 800-1200ms
- **Chart Rendering**: Optimized for 50-point datasets
- **Log Storage**: Last 100 actions retained in memory

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast dark theme
- Focus indicators on all controls

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers supported

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Future Enhancements

### AGI Simulator
- [ ] Export simulation data to CSV
- [ ] Custom crystal material presets
- [ ] Multi-objective optimization
- [ ] Neural network visualization
- [ ] Comparison mode (multiple runs)

### Autonomous Browser
- [ ] Real Playwright integration
- [ ] Screenshot capture
- [ ] Form filling automation
- [ ] Multi-tab support
- [ ] Session recording/replay
- [ ] API endpoint generation

### General
- [ ] User authentication
- [ ] Saved configurations
- [ ] Collaborative features
- [ ] Mobile app version
- [ ] Voice commands

## Credits

**Architect**: Chaiyaphop Nilapaet  
**Framework**: Next.js by Vercel  
**UI Components**: shadcn/ui  
**Design System**: v0 by Vercel  

## License

Part of the Architects Reality Engine ecosystem.

## Status

Production Ready - v2.0.0  
Last Updated: 2025-01-30

---

Built with passion for AI transparency and autonomous systems.
\`\`\`

```json file="" isHidden
