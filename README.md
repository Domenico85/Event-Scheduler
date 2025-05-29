# 📅 Event Scheduler

A modern, interactive event scheduling application built with React and Tailwind CSS. Manage your events with style and never miss an important appointment again!

![Event Scheduler Demo](https://img.shields.io/badge/React-18+-blue?logo=react) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3+-38B2AC?logo=tailwind-css) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🗓️ **Interactive Calendar**

- Beautiful monthly calendar view with intuitive navigation
- Click any date to select and view events
- Visual event indicators on calendar days
- Today's date highlighting
- Smooth month-to-month navigation

### 📝 **Comprehensive Event Management**

- **Create Events**: Add new events with detailed information
- **Edit Events**: Modify existing events seamlessly
- **Delete Events**: Remove events with confirmation
- **Event Categories**: Organize with Work, Personal, Health, Social, and Other categories
- **Priority Levels**: Set High, Medium, or Low priority with color coding

### 🔔 **Smart Notifications**

- Automatic reminders for events within 15 minutes
- Real-time monitoring of upcoming events
- Dismissible notification system
- Non-intrusive popup notifications

### 🎨 **Modern Design**

- Responsive design that works on all devices
- Beautiful gradient backgrounds and modern styling
- Smooth animations and hover effects
- Color-coded categories and priority indicators
- Clean, intuitive user interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/event-scheduler.git
   cd event-scheduler
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

## 🛠️ Built With

- **React** - Frontend framework for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Beautiful icon library
- **JavaScript ES6+** - Modern JavaScript features

## 📖 Usage Guide

### Creating an Event

1. Click the **"Add Event"** button in the header
2. Fill in the event details:
   - **Title**: Name of your event
   - **Date**: When the event occurs
   - **Time**: Start time of the event
   - **Duration**: How long the event lasts (in minutes)
   - **Description**: Optional details about the event
   - **Category**: Type of event (Work, Personal, Health, Social, Other)
   - **Priority**: Importance level (High, Medium, Low)
3. Click **"Create"** to save the event

### Managing Events

- **View Events**: Click on any calendar date to see events for that day
- **Edit Events**: Click the edit icon (✏️) on any event card
- **Delete Events**: Click the trash icon (🗑️) to remove an event
- **Navigate Calendar**: Use the arrow buttons to move between months

### Understanding Visual Cues

- **Event Categories**: Each category has its own color (Blue for Work, Green for Personal, etc.)
- **Priority Levels**: Events have colored left borders (Red for High, Yellow for Medium, Green for Low)
- **Today's Date**: Highlighted with a blue border and background
- **Selected Date**: Shows with a purple border and background

## 🎯 Key Components

### EventScheduler (Main Component)

The main application component that handles:

- Calendar rendering and navigation
- Event state management
- Form handling for creating/editing events
- Notification system
- Date selection and event filtering

### Event Data Structure

```javascript
{
  id: 1,
  title: "Team Meeting",
  date: "2025-05-30",
  time: "10:00",
  duration: "60",
  description: "Weekly team sync",
  category: "work",
  priority: "high"
}
```

## 🔧 Customization

### Adding New Categories

To add new event categories, modify the `getCategoryColor` function:

```javascript
const getCategoryColor = (category) => {
  const colors = {
    work: "bg-blue-500",
    personal: "bg-green-500",
    health: "bg-red-500",
    social: "bg-purple-500",
    other: "bg-gray-500",
    // Add your new category here
    newCategory: "bg-pink-500",
  };
  return colors[category] || colors.other;
};
```

### Customizing Notification Timing

Change the notification trigger time by modifying the time difference check:

```javascript
// Current: 15 minutes before event
const timeDiff = eventDateTime.getTime() - now.getTime();
return timeDiff > 0 && timeDiff <= 15 * 60 * 1000; // 15 minutes

// Example: 30 minutes before event
return timeDiff > 0 && timeDiff <= 30 * 60 * 1000; // 30 minutes
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full calendar view with sidebar
- **Tablet**: Adapted layout with touch-friendly controls
- **Mobile**: Stacked layout for optimal mobile experience

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Known Issues & Limitations

- Events are stored in local state (resets on page refresh)
- No data persistence to backend/database
- No recurring event support
- Limited to single-day events

## 🔮 Future Enhancements

- [ ] **Data Persistence**: Save events to localStorage or backend database
- [ ] **Recurring Events**: Support for daily, weekly, monthly recurring events
- [ ] **Multi-day Events**: Events spanning multiple days
- [ ] **Event Search**: Search and filter events by title or category
- [ ] **Export/Import**: Export events to calendar formats (ICS, Google Calendar)
- [ ] **Theme Customization**: Dark mode and custom color themes
- [ ] **Drag & Drop**: Drag events between dates
- [ ] **Timezone Support**: Handle different timezones
- [ ] **Event Sharing**: Share events with other users
- [ ] **Integration**: Connect with Google Calendar, Outlook, etc.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lucide React** for the beautiful icons
- **Tailwind CSS** for the utility-first styling approach
- **React Community** for the excellent documentation and resources

## 📞 Support

If you have questions or need help:

- Open an issue on GitHub
- Check the documentation above
- Review the code comments for implementation details

---

**Made by DomDev with ❤️ using React and Tailwind CSS**

_Happy Scheduling! 🎉_
