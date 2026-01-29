# Campaign Tracker Frontend

A modern Next.js frontend application for managing marketing campaigns with full CRUD operations, interactive dashboard, and currency conversion features.

## Tech Stack

- **Framework**: Next.js 14.0.4 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules with custom styles
- **Charts**: Recharts
- **HTTP Client**: Axios
- **React**: 18.2.0

## Project Overview

This frontend provides a clean and intuitive interface for:
- Creating, viewing, updating, and deleting campaigns
- Viewing dashboard with data visualization (pie charts, bar charts)
- Converting campaign budgets to different currencies
- Real-time updates when CRUD operations are performed

## Local Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running (see backend README)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd frontend-socialbooster-demo
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, update this to your backend API URL.

### Step 4: Run Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
frontend-socialbooster-demo/
├── app/
│   ├── campaigns/
│   │   ├── [id]/
│   │   │   ├── page.tsx          # Campaign detail view
│   │   │   └── edit/
│   │   │       └── page.tsx      # Edit campaign form
│   │   └── new/
│   │       └── page.tsx          # Create campaign form
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard with charts
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Campaigns list
│   └── globals.css               # Global styles
├── lib/
│   └── api.ts                    # API client functions
├── types/
│   └── index.ts                  # TypeScript types
├── package.json
├── tsconfig.json
└── README.md
```

## Features

### 1. Campaign Management (CRUD)

- **Create**: `/campaigns/new` - Form to create new campaigns
- **Read**: `/` - List all campaigns with details
- **Update**: `/campaigns/[id]/edit` - Edit existing campaigns
- **Delete**: Delete button on campaigns list and detail pages
- **View Details**: `/campaigns/[id]` - View full campaign details

### 2. Dashboard

- **Route**: `/dashboard`
- **Features**:
  - Total campaigns count
  - Total budget summary
  - Active campaigns count
  - Number of platforms
  - Pie chart: Campaigns by status
  - Bar chart: Budget by platform
  - Auto-refreshes every 30 seconds

### 3. Currency Conversion

- **Location**: Campaign detail page (`/campaigns/[id]`)
- **Feature**: Convert campaign budget to multiple currencies (USD, EUR, GBP, INR)
- **API Integration**: Uses exchange rate API from backend

## Pages and Routes

| Route | Description |
|-------|-------------|
| `/` | Campaigns list page |
| `/dashboard` | Dashboard with charts and statistics |
| `/campaigns/new` | Create new campaign |
| `/campaigns/[id]` | View campaign details |
| `/campaigns/[id]/edit` | Edit campaign |

## API Integration

The frontend communicates with the backend API through the `lib/api.ts` module:

- `getCampaigns()` - Fetch all campaigns
- `getCampaign(id)` - Fetch single campaign
- `createCampaign(data)` - Create new campaign
- `updateCampaign(id, data)` - Update campaign
- `deleteCampaign(id)` - Delete campaign
- `getStats()` - Fetch dashboard statistics
- `convertBudget(id)` - Convert campaign budget to currencies

## Testing Guide

### Manual Testing Steps

1. **Create Campaign**:
   - Navigate to `/campaigns/new`
   - Fill in all required fields
   - Submit form
   - Verify campaign appears in list

2. **View Campaigns**:
   - Navigate to `/`
   - Verify all campaigns are displayed
   - Check that status badges are colored correctly

3. **View Campaign Details**:
   - Click on any campaign name or "View" button
   - Verify all details are displayed correctly
   - Test currency conversion feature

4. **Edit Campaign**:
   - Navigate to campaign detail page
   - Click "Edit Campaign"
   - Modify fields
   - Save changes
   - Verify updates are reflected

5. **Delete Campaign**:
   - Click "Delete" button on any campaign
   - Confirm deletion
   - Verify campaign is removed from list

6. **Dashboard**:
   - Navigate to `/dashboard`
   - Verify all statistics are displayed
   - Check that charts render correctly
   - Create/edit/delete a campaign
   - Return to dashboard and verify charts update

7. **Currency Conversion**:
   - Navigate to any campaign detail page
   - Click "Convert Budget" button
   - Verify currency conversions are displayed
   - Check that exchange rates are shown

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Set environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
5. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Add new site from Git
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
7. Deploy

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### CORS Errors

- Ensure backend CORS settings include your frontend domain
- Check `NEXT_PUBLIC_API_URL` is set correctly

### API Connection Issues

- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` environment variable
- Ensure backend CORS allows your frontend origin

### Charts Not Rendering

- Check browser console for errors
- Verify dashboard stats API is returning data
- Ensure Recharts library is installed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
