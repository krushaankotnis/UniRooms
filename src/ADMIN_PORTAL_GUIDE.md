# UniRooms Admin Portal Guide

## Overview
The UniRooms Admin Portal provides comprehensive platform management capabilities with a modern, clean interface matching the main UniRooms design language (blue and white color scheme with rounded cards and smooth shadows).

## Access the Admin Portal
Navigate to the Admin Portal by:
1. Click "Admin" link in the header navigation
2. Or visit the Admin Login page directly

**Admin Login Credentials:**
- Any email/password combination will work for demo purposes
- In production, implement proper authentication

## Admin Portal Features

### 1. Dashboard (Home)
**Path:** Admin Dashboard
**Features:**
- **Overview Cards**: Total Students, Total Hostel Owners, Total Hostels, Total Bookings
- **User Growth Chart**: Line chart showing monthly student and owner registrations
- **Booking Trends**: Bar chart displaying monthly booking statistics
- **Hostel Status**: Pie chart showing approval status distribution
- **Recent Activity**: Live feed of platform activities (new registrations, bookings, hostels)

### 2. User Management
**Path:** Admin → User Management
**Features:**
- View all registered users (Students & Owners)
- Search users by name or email
- Filter by role (Student/Owner) and status (Active/Suspended)
- Actions: Edit, Suspend, Activate, Delete users
- Statistics: Total Students, Total Owners, Active Users

### 3. Hostel Management
**Path:** Admin → Hostel Management
**Features:**
- View all hostel listings
- Search by hostel name, location, or owner
- Filter by status (Approved/Pending/Rejected)
- Actions: View Details, Edit, Approve, Reject, Delete
- Statistics: Total Hostels, Approved, Pending, Rejected

### 4. Booking Management
**Path:** Admin → Booking Management
**Features:**
- View all hostel bookings
- Search by booking ID, hostel name, or student name
- Filter by status (Confirmed/Pending/Completed/Cancelled)
- Actions: View Details, Confirm, Cancel bookings
- Statistics: Total Bookings, Confirmed, Pending, Total Revenue

### 5. Reviews & Feedback
**Path:** Admin → Reviews & Feedback
**Features:**
- View all student reviews
- Search reviews by hostel, student, or comment text
- Filter by star rating (1-5 stars)
- Actions: View Full Review, Delete inappropriate reviews
- Statistics: Total Reviews, Average Rating, Flagged Reviews, Monthly Reviews
- Flag system for inappropriate content

### 6. Settings
**Path:** Admin → Settings
**Three Main Tabs:**

#### Profile Settings
- Update admin name and email
- Change password functionality
- Account security options

#### Website Configuration
- Site name and tagline
- Contact and support emails
- Phone number
- Business address
- Logo and theme customization (future implementation)

#### Feature Management
- Toggle platform features on/off:
  - Allow New Registrations
  - Email Verification Requirement
  - Reviews System
  - Booking System
  - Maintenance Mode
- Danger Zone: Clear cache, Reset settings

## Navigation

### Sidebar Menu
The admin portal features a persistent sidebar with the following sections:
- 🏠 Dashboard
- 👥 User Management
- 🏢 Hostel Management
- 📅 Booking Management
- 💬 Reviews & Feedback
- ⚙️ Settings

### Top Bar
- Search functionality (global search)
- Notification bell with alerts
- Admin profile dropdown

## Design Elements

### Color Scheme
- Primary: Blue (#3b82f6)
- Background: White and Light Gray
- Accent: Various pastels for stats and charts
- Text: Dark Gray (#1f2937) and Medium Gray (#6b7280)

### Components
- **Cards**: Rounded corners with subtle shadows
- **Tables**: Responsive with alternating row colors
- **Charts**: Interactive using Recharts library
- **Badges**: Color-coded status indicators
- **Buttons**: Primary (Blue), Destructive (Red), Ghost variants

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile devices
- Responsive grid layouts
- Touch-friendly interface elements

## User Flow & Redirects

### Complete Redirect Flow:

1. **Student Journey:**
   - Landing Page → Select "I am a Student"
   - Student Sign-Up → Student Login Page
   - Student Login → Search & Browse Page

2. **Hostel Owner Journey:**
   - Landing Page → Select "I am a Hostel Owner"
   - Owner Sign-Up → Owner Login Page
   - Owner Login → Owner Dashboard

3. **Admin Journey:**
   - Header → Click "Admin"
   - Admin Login → Admin Dashboard

### Logout Behavior
All user types (Student, Owner, Admin) are redirected to the Landing Page upon logout.

## Data & Statistics

### Mock Data Included:
- 480 Total Students
- 85 Total Hostel Owners
- 98 Total Hostels
- 135 Total Bookings
- 245 Total Reviews
- ₹10.2L Total Revenue

### Charts & Analytics:
- 6-month user growth trends
- Monthly booking statistics
- Hostel approval status distribution
- Recent activity timeline

## Security Features

1. **Admin-Only Access**: Admin pages are protected and separate from public routes
2. **Warning Message**: Unauthorized access attempts are logged (UI notification)
3. **Secure Actions**: Confirmation required for destructive actions
4. **Session Management**: Logout clears all admin session data

## Technical Implementation

### Technologies Used:
- **React**: Component-based UI
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Data visualization
- **Shadcn/UI**: Component library
- **Lucide Icons**: Icon system

### File Structure:
```
/components
  ├── AdminLogin.tsx
  ├── AdminLayout.tsx (Shared layout with sidebar)
  ├── AdminDashboard.tsx
  ├── AdminUserManagement.tsx
  ├── AdminHostelManagement.tsx
  ├── AdminBookingManagement.tsx
  ├── AdminReviews.tsx
  └── AdminSettings.tsx
```

## Future Enhancements

Potential additions for production deployment:
1. Real authentication with JWT tokens
2. Role-based access control (Super Admin, Moderator)
3. Export data to CSV/PDF
4. Email notifications for admin actions
5. Audit log for tracking admin activities
6. Advanced analytics and reporting
7. Bulk operations for user/hostel management
8. Two-factor authentication for admin login
9. Activity logs and user behavior tracking
10. Integration with payment gateways

## Notes

- All data is currently mock data for demonstration
- In production, connect to a real backend API
- Implement proper authentication and authorization
- Add data validation and error handling
- Set up rate limiting for security
- Regular security audits recommended

---

**Last Updated:** November 3, 2025
**Version:** 1.0.0
