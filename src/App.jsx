import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Edit3, Trash2, Bell, X, Check } from 'lucide-react';

const EventScheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      date: "2025-05-30",
      time: "10:00",
      duration: "60",
      description: "Weekly team sync",
      category: "work",
      priority: "high"
    },
    {
      id: 2,
      title: "Dentist Appointment",
      date: "2025-06-02",
      time: "14:30",
      duration: "30",
      description: "Regular checkup",
      category: "personal",
      priority: "medium"
    }
  ]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '60',
    description: '',
    category: 'personal',
    priority: 'medium'
  });

  // Check for upcoming events and create notifications
  useEffect(() => {
    const checkUpcomingEvents = () => {
      const now = new Date();
      const upcoming = events.filter(event => {
        const eventDateTime = new Date(`${event.date}T${event.time}`);
        const timeDiff = eventDateTime.getTime() - now.getTime();
        return timeDiff > 0 && timeDiff <= 15 * 60 * 1000; // 15 minutes
      });

      upcoming.forEach(event => {
        const notificationId = `${event.id}-${event.date}-${event.time}`;
        if (!notifications.find(n => n.id === notificationId)) {
          setNotifications(prev => [...prev, {
            id: notificationId,
            message: `Upcoming: ${event.title} at ${event.time}`,
            type: 'reminder',
            timestamp: now
          }]);
        }
      });
    };

    const interval = setInterval(checkUpcomingEvents, 60000); // Check every minute
    checkUpcomingEvents(); // Initial check
    return () => clearInterval(interval);
  }, [events, notifications]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
      time: '',
      duration: '60',
      description: '',
      category: 'personal',
      priority: 'medium'
    });
    setShowEventForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      duration: event.duration,
      description: event.description,
      category: event.category,
      priority: event.priority
    });
    setShowEventForm(true);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setNotifications(prev => prev.filter(n => !n.id.startsWith(eventId)));
  };

  const handleFormSubmit = () => {
    if (!formData.title || !formData.date || !formData.time) return;
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...formData, id: editingEvent.id }
          : event
      ));
    } else {
      const newEvent = {
        ...formData,
        id: Math.max(...events.map(e => e.id), 0) + 1
      };
      setEvents([...events, newEvent]);
    }
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const dismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getCategoryColor = (category) => {
    const colors = {
      work: 'bg-blue-500',
      personal: 'bg-green-500',
      health: 'bg-red-500',
      social: 'bg-purple-500',
      other: 'bg-gray-500'
    };
    return colors[category] || colors.other;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'border-l-red-500',
      medium: 'border-l-yellow-500',
      low: 'border-l-green-500'
    };
    return colors[priority] || colors.medium;
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div key={notification.id} className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg shadow-lg max-w-sm animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800">{notification.message}</p>
              </div>
              <button
                onClick={() => dismissNotification(notification.id)}
                className="text-yellow-600 hover:text-yellow-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Event Scheduler</h1>
                <p className="text-gray-600">Manage your events and stay organized</p>
              </div>
            </div>
            <button
              onClick={handleAddEvent}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Event</span>
            </button>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center font-semibold text-gray-600 bg-gray-50 rounded-lg">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="p-4"></div>;
                }
                
                const dayEvents = getEventsForDate(day);
                const isToday = day.toDateString() === today.toDateString();
                const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                
                return (
                  <div
                    key={index}
                    onClick={() => handleDateClick(day)}
                    className={`p-3 min-h-24 cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                      isToday ? 'border-indigo-500 bg-indigo-50' :
                      isSelected ? 'border-purple-500 bg-purple-50' :
                      'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-1 ${
                      isToday ? 'text-indigo-600' : 'text-gray-700'
                    }`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs px-2 py-1 rounded text-white truncate ${getCategoryColor(event.category)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {selectedDate ? `Events for ${selectedDate.toLocaleDateString()}` : 'Upcoming Events'}
            </h3>
            
            <div className="space-y-3">
              {(selectedDate ? getEventsForDate(selectedDate) : events.slice(0, 5)).map(event => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border-l-4 bg-gray-50 hover:bg-gray-100 transition-colors ${getPriorityColor(event.priority)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{event.title}</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time} ({event.duration}min)
                      </div>
                      {event.description && (
                        <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                      )}
                      <div className="flex items-center mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs text-white ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1 ml-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button
                onClick={() => setShowEventForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  required
                  min="15"
                  max="480"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Event description (optional)"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="health">Health</option>
                    <option value="social">Social</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEventForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFormSubmit}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingEvent ? 'Update' : 'Create'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventScheduler;