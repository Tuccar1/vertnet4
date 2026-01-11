/**
 * VertNet Geneve Configuration
 * Bu dosya, tüm VertNet entegrasyonları için config ayarlarını içerir.
 */

window.vertnetConfig = {
    // Admin ID (Paneldeki admin kullanıcı ID'si)
    adminId: 1,
    
    // API Endpoints
    apiEndpoints: {
        panel: 'https://panel.chatdeskiyo.com/api',
        websocket: 'wss://panel.chatdeskiyo.com/ws',
        calendar: 'https://panel.chatdeskiyo.com/api/calendar',
        appointments: 'https://panel.chatdeskiyo.com/api/appointments',
        track: 'https://panel.chatdeskiyo.com/api/track'
    },
    
    // Chatbot Settings
    chatbot: {
        enableCalendar: true,
        showAppointmentButton: true,
        realtimeUpdates: true,
        autoInjectWidget: true
    },
    
    // Calendar Settings
    calendar: {
        daysToShow: 7,
        slotDuration: 30,
        workingHours: {
            start: '09:00',
            end: '18:00',
            timezone: 'Europe/Zurich'
        },
        colors: {
            available: '#10b981',
            busy: '#ef4444',
            booked: '#8b5cf6',
            unavailable: '#9ca3af'
        }
    },
    
    // Tracking Settings
    tracking: {
        enable: true,
        endpoint: 'https://panel.chatdeskiyo.com/api/track',
        sessionTimeout: 30 * 60 * 1000,
        pageViewTracking: true,
        eventTracking: true,
        clickTracking: true,
        scrollTracking: true
    },
    
    // UI Settings
    ui: {
        theme: 'light',
        language: 'fr',
        animations: true,
        sounds: false
    },
    
    // Debug Settings
    debug: {
        enabled: window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1',
        logLevel: 'info'
    }
};

console.log('VertNet Config loaded:', window.vertnetConfig);
