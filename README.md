# Smart Disaster Agent (SDA) - Safety Bridge Flow

<!-- Insert Logo Here -->

## GitHub Repository

View our project on GitHub: [Smart Disaster Agent Repository](https://github.com/your-username/safety-bridge-flow)

## About

Smart Disaster Agent (SDA) is an advanced disaster management platform developed by Team Synapse. It leverages AI and real-time data to connect citizens with authorities during emergencies, enabling efficient resource allocation and coordinated disaster response. The Safety Bridge Flow implementation provides a comprehensive solution for incident reporting, resource allocation, and emergency response.

## Key Features

- **Real-time Alerts** - Multi-channel, geo-targeted notifications to affected populations
- **Community Reporting** - Citizen-submitted incidents with text, images, video, and GPS coordinates
- **Resource Management** - AI-based allocation of food, water, shelter, and medical supplies
- **Authority Dashboard** - Interactive maps, live metrics, and comprehensive analytics
- **Cross-platform Support** - Web and mobile interfaces for citizens and authorities

## System Architecture

<!-- Insert Architecture Diagram Here -->

## Tech Stack

### Backend
- Supabase (PostgreSQL)
- Supabase Edge Functions
- Supabase Realtime for live updates
- Supabase Storage for media files

### Frontend
- Web: React.js, TypeScript
- Mobile: Flutter

### AI/ML Components
- NLP for incident classification and severity assessment
- AI-based resource allocation algorithms
- Geospatial analysis for proximity-based resource allocation

### Maps & Visualization
- Mapbox GL for interactive maps and geospatial visualization

## Database Migrations

If you encounter a "row-level security policy" error during registration, you need to apply the database migration:

1. Ensure you have the necessary environment variables in your `.env` file:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## Email Verification

The application requires email verification for new user registrations:

1. When a user registers, they will receive a verification email with a link
2. Users must click the verification link before they can log in
3. If a user attempts to log in with an unverified email, they will see an error message
4. The system offers to resend the verification email if needed

To test the email verification flow, you can use the provided test script:

```bash
node test-email-verification.js
```

2. Run the migration script:
   ```bash
   node supabase/apply-migration.js
   ```

This will add the necessary row-level security policies to allow user registration.

## Project Structure

```
safety-bridge-flow/
├── src/                      # React web application source
│   ├── components/           # Reusable UI components
│   │   └── layout/           # Layout components including AuthorityLayout
│   ├── pages/                # Page components
│   │   ├── authority/        # Authority dashboard pages
│   │   └── public/           # Public pages
├── supabase/                 # Supabase configuration and migrations
│   ├── migrations/           # Database migrations
│   └── schema.sql            # Database schema
│   ├── lib/                  # Utility libraries
│   │   ├── api/              # API service modules
│   │   ├── storage.ts        # Storage utilities
│   │   ├── realtime.ts       # Real-time subscription utilities
│   │   └── edge-functions.ts # Edge function clients
│   └── hooks/                # Custom React hooks
├── flutter_app/              # Flutter mobile application
│   └── lib/
│       ├── screens/          # App screens
│       ├── widgets/          # Reusable widgets
│       ├── services/         # API services
│       └── models/           # Data models
└── supabase/                 # Supabase configuration
    ├── functions/            # Edge functions
    │   ├── classify-incident/
    │   └── allocate-resources/
    └── schema.sql            # Database schema
```

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- Flutter SDK (latest stable)
- Supabase account
- Mapbox account (for map features)

### Web Dashboard Setup

```sh
# Clone the repository
git clone https://github.com/your-username/safety-bridge-flow.git
cd safety-bridge-flow

# Install dependencies
npm install

# Create a .env file in the root directory with your Supabase and Mapbox credentials
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token

# Start the development server
npm run dev
```

### Flutter App Setup

```sh
# Navigate to the Flutter app directory
cd flutter_app

# Install Flutter dependencies
flutter pub get

# Create a .env file in the Flutter app directory with your Supabase credentials
# SUPABASE_URL=your_supabase_url
# SUPABASE_ANON_KEY=your_supabase_anon_key

# Run the app
flutter run
```

### Supabase Setup

1. Create a new Supabase project

2. Run the schema.sql file in the Supabase SQL editor to set up your database tables

3. Deploy Edge Functions
   ```bash
   supabase functions deploy classify-incident
   supabase functions deploy allocate-resources
   ```

4. Set up storage buckets
   - Create a `media` bucket for incident media uploads
   - Set appropriate permissions for authenticated users

## Usage

### For Citizens (Mobile App)

- Register an account with your location details
- Receive real-time alerts based on your location
- Report incidents with our easy-to-use form (text, photos, videos)
- Track status of your reported incidents
- View your profile and incident history

### For Authorities (Web Dashboard)

- Comprehensive dashboard with incident, resource, and alert management
- Real-time incident monitoring with map visualization
- AI-powered incident classification and resource allocation
- Detailed incident views with resource allocation controls

- Access comprehensive dashboard with real-time data
- Manage and allocate resources based on AI recommendations
- Respond to citizen reports and coordinate rescue operations
- Analyze disaster patterns and prepare for future events
- Generate detailed reports for post-disaster assessment

## Screenshots

<!-- Insert Dashboard Screenshot -->

<!-- Insert Mobile App Screenshot -->

<!-- Insert Reporting Interface Screenshot -->

## Roadmap & Future Scope

- [ ] Integration with IoT sensors for environmental monitoring
- [ ] Blockchain implementation for transparent resource tracking
- [ ] Offline functionality for areas with limited connectivity
- [ ] AR/VR training modules for emergency responders
- [ ] Multi-language support for global deployment
- [ ] Satellite imagery integration for damage assessment

## Team Synapse

<!-- Team Member 1 -->
<!-- Team Member 2 -->
<!-- Team Member 3 -->
<!-- Team Member 4 -->
<!-- Team Member 5 -->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
