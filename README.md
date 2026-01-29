# Campaign Tracker System - Full Stack Demo Project

A complete full-stack web application for managing marketing campaigns with CRUD operations, data visualization, and third-party API integration.

## 🎯 Project Overview

This project demonstrates a production-ready Campaign Tracker System built for digital marketing agencies. It includes:

- **Full CRUD functionality** (Create, Read, Update, Delete) for campaigns
- **Interactive dashboard** with data visualization (pie charts, bar charts)
- **Third-party API integration** (Currency Exchange API)
- **RESTful APIs** using Django REST Framework
- **Modern frontend** built with Next.js and TypeScript
- **Production-ready deployment** configuration

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Next.js       │  HTTP   │   Django REST   │  SQL    │   PostgreSQL    │
│   Frontend      │ ──────> │   Framework     │ ──────> │   (Supabase)    │
│   (Vercel)      │         │   Backend       │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                      │
                                      │ HTTP
                                      ▼
                            ┌─────────────────┐
                            │ Exchange Rate   │
                            │ API             │
                            └─────────────────┘
```

## 📁 Project Structure

```
Full Stack Project/
├── backend-socialbooster-demo/     # Django backend
│   ├── campaigns/                  # Campaign app
│   ├── socialbooster/              # Django project settings
│   ├── requirements.txt            # Python dependencies
│   ├── manage.py                   # Django management script
│   └── README.md                   # Backend documentation
│
├── frontend-socialbooster-demo/    # Next.js frontend
│   ├── app/                        # Next.js app directory
│   ├── lib/                        # API client utilities
│   ├── types/                      # TypeScript type definitions
│   ├── package.json                # Node.js dependencies
│   └── README.md                   # Frontend documentation
│
├── API_DOCUMENTATION.md            # Complete API reference
├── DEPLOYMENT_CHECKLIST.md         # Deployment guide
├── SCREEN_RECORDING_SCRIPT.md      # Demo script
└── README.md                       # This file
```

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 4.2.7
- **API**: Django REST Framework 3.14.0
- **Database**: PostgreSQL (Supabase)
- **Python**: 3.8+

### Frontend
- **Framework**: Next.js 14.0.4
- **Language**: TypeScript
- **Charts**: Recharts 2.10.3
- **HTTP Client**: Axios 1.6.2
- **React**: 18.2.0

### Deployment
- **Backend**: Render / Railway / AWS
- **Frontend**: Vercel / Netlify
- **Database**: Supabase

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL database (local or Supabase)
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend-socialbooster-demo

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend-socialbooster-demo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your backend API URL

# Run development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

## 📋 Features

### ✅ CRUD Operations

- **Create**: Add new marketing campaigns with all required fields
- **Read**: View all campaigns in a table, view individual campaign details
- **Update**: Edit campaign information (full or partial updates)
- **Delete**: Remove campaigns with confirmation

### 📊 Data Visualization

- **Dashboard Page**: `/dashboard`
- **Pie Chart**: Campaigns distribution by status (Active, Paused, Completed)
- **Bar Chart**: Budget allocation by platform (Google Ads, Meta, LinkedIn, etc.)
- **Statistics Cards**: Total campaigns, total budget, active campaigns count
- **Real-time Updates**: Charts automatically refresh when data changes

### 🌐 Third-Party API Integration

- **Currency Exchange API**: Convert campaign budgets to multiple currencies
- **Location**: Campaign detail page (`/campaigns/{id}`)
- **Features**:
  - Convert USD budget to EUR, GBP, INR
  - Display live exchange rates
  - Show conversions in a clean grid layout

## 🔌 API Endpoints

### Campaign CRUD

- `POST /api/campaigns/` - Create campaign
- `GET /api/campaigns/` - List all campaigns
- `GET /api/campaigns/{id}/` - Get campaign details
- `PUT /api/campaigns/{id}/` - Update campaign (full)
- `PATCH /api/campaigns/{id}/` - Update campaign (partial)
- `DELETE /api/campaigns/{id}/` - Delete campaign

### Dashboard & Utilities

- `GET /api/campaigns/stats/` - Get dashboard statistics
- `GET /api/campaigns/{id}/convert_budget/` - Convert budget to currencies

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Campaigns list page |
| `/dashboard` | Dashboard with charts and statistics |
| `/campaigns/new` | Create new campaign form |
| `/campaigns/[id]` | View campaign details |
| `/campaigns/[id]/edit` | Edit campaign form |

## 🧪 Testing

### Backend Testing

```bash
cd backend-socialbooster-demo
python manage.py test
```

### Frontend Testing

```bash
cd frontend-socialbooster-demo
npm run build  # Test production build
```

### Manual Testing Guide

See the testing sections in:
- [Backend README](./backend-socialbooster-demo/README.md#testing-guide)
- [Frontend README](./frontend-socialbooster-demo/README.md#testing-guide)

## 🚢 Deployment

### Backend Deployment

**Render:**
1. Connect GitHub repository
2. Create PostgreSQL database
3. Set environment variables
4. Deploy

**Railway:**
1. Connect GitHub repository
2. Add PostgreSQL service
3. Set environment variables
4. Deploy

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for detailed steps.

### Frontend Deployment

**Vercel:**
1. Import GitHub repository
2. Set `NEXT_PUBLIC_API_URL` environment variable
3. Deploy

**Netlify:**
1. Import GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy

## 📚 Documentation

- [Backend README](./backend-socialbooster-demo/README.md) - Backend setup and API details
- [Frontend README](./frontend-socialbooster-demo/README.md) - Frontend setup and features
- [API Documentation](./API_DOCUMENTATION.md) - Complete API reference
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Production deployment guide
- [Screen Recording Script](./SCREEN_RECORDING_SCRIPT.md) - Demo presentation script

## 🎬 Demo Video Script

See [SCREEN_RECORDING_SCRIPT.md](./SCREEN_RECORDING_SCRIPT.md) for a complete 3-5 minute demo script covering all features.

## 🔒 Security Considerations

- Environment variables for sensitive data
- CORS configured for frontend domain
- Input validation on all forms
- SQL injection protection (Django ORM)
- XSS protection enabled
- CSRF protection enabled

## 🐛 Troubleshooting

### Backend Issues

- **Database connection errors**: Check `.env` file and database credentials
- **CORS errors**: Update `CORS_ALLOWED_ORIGINS` in `settings.py`
- **Migration errors**: Run `python manage.py migrate`

### Frontend Issues

- **API connection errors**: Verify `NEXT_PUBLIC_API_URL` is set correctly
- **Build errors**: Check TypeScript errors with `npm run build`
- **Chart rendering issues**: Ensure backend stats API is accessible

## 📝 Environment Variables

### Backend (.env)

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=socialbooster
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🤝 Contributing

This is a demo project. For production use:

1. Add authentication and authorization
2. Implement rate limiting
3. Add comprehensive error handling
4. Set up monitoring and logging
5. Add unit and integration tests
6. Implement CI/CD pipeline

## 📄 License

MIT License

## 👤 Author

Built as a full-stack demo project showcasing:
- Django REST Framework backend development
- Next.js frontend development
- RESTful API design
- Data visualization
- Third-party API integration
- Production deployment

## 🎯 Project Requirements Met

✅ **Backend**: Django with REST APIs (Django REST Framework)  
✅ **Database**: PostgreSQL (Supabase compatible)  
✅ **Frontend**: Next.js with clean, usable UI  
✅ **CRUD**: Full CRUD functionality (UI + REST APIs)  
✅ **Dashboard**: Data visualization with charts  
✅ **Third-Party API**: Currency exchange integration  
✅ **Deployment**: Production-ready configuration  
✅ **Documentation**: Complete README files and guides  
✅ **Testing**: Step-by-step testing instructions  

---

**Ready for deployment and demonstration!** 🚀
