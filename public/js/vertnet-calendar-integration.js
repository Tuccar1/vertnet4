/**
 * VERTNET GENEVE - Takvim Entegrasyonu
 * Bu dosya, admin paneli ile chatbot arasındaki real-time bağlantıyı sağlar.
 */

class VertnetCalendarIntegration {
    constructor(config = {}) {
        this.config = {
            adminUserId: config.adminUserId || 1,
            apiBase: config.apiBase || 'https://panel.chatdeskiyo.com/api',
            wsUrl: config.wsUrl || 'wss://panel.chatdeskiyo.com/ws/calendar',
            enableLogs: config.enableLogs || false,
            ...config
        };
        
        this.ws = null;
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 10;
        this.availabilityCache = new Map();
        this.pendingAppointments = new Map();
        
        this.listeners = {
            'availabilityUpdate': [],
            'appointmentBooked': [],
            'connectionChange': [],
            'error': []
        };
        
        this.init();
    }
    
    init() {
        this.log('Takvim entegrasyonu başlatılıyor...');
        this.connectWebSocket();
        this.setupFlowiseHooks();
        window.addEventListener('beforeunload', () => this.cleanup());
        this.log('Takvim entegrasyonu hazır.');
    }
    
    connectWebSocket() {
        try {
            const token = this.generateToken();
            const wsUrl = `${this.config.wsUrl}?token=${token}&type=flowise&adminId=${this.config.adminUserId}`;
            
            this.ws = new WebSocket(wsUrl);
            
            this.ws.onopen = () => {
                this.isConnected = true;
                this.reconnectAttempts = 0;
                this.log('WebSocket bağlantısı kuruldu.');
                this.emit('connectionChange', { connected: true });
                
                this.sendWebSocketMessage({
                    type: 'GET_INITIAL_AVAILABILITY',
                    data: { days: 7 }
                });
            };
            
            this.ws.onmessage = (event) => {
                this.handleWebSocketMessage(event.data);
            };
            
            this.ws.onclose = (event) => {
                this.isConnected = false;
                this.log(`WebSocket bağlantısı kesildi: ${event.code}`);
                this.emit('connectionChange', { connected: false });
                
                if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
                    this.scheduleReconnect();
                }
            };
            
            this.ws.onerror = (error) => {
                this.log('WebSocket hatası:', error);
                this.emit('error', { type: 'websocket', error });
            };
            
        } catch (error) {
            this.log('WebSocket bağlantı hatası:', error);
            this.emit('error', { type: 'connection', error });
        }
    }
    
    scheduleReconnect() {
        const delay = Math.min(1000 * Math.pow(1.5, this.reconnectAttempts), 30000);
        this.reconnectAttempts++;
        
        this.log(`${delay}ms sonra yeniden bağlanmaya çalışılıyor...`);
        
        setTimeout(() => {
            if (!this.isConnected) {
                this.connectWebSocket();
            }
        }, delay);
    }
    
    handleWebSocketMessage(message) {
        try {
            const data = JSON.parse(message);
            this.log('WebSocket mesajı alındı:', data);
            
            switch (data.type) {
                case 'AVAILABILITY_UPDATE':
                    this.handleAvailabilityUpdate(data.data);
                    break;
                case 'CALENDAR_SLOT_UPDATE':
                    this.handleSlotUpdate(data.data);
                    break;
                case 'APPOINTMENT_CONFIRMED':
                    this.handleAppointmentConfirmation(data.data);
                    break;
                case 'INITIAL_AVAILABILITY':
                    this.handleInitialAvailability(data.data);
                    break;
                case 'ERROR':
                    this.log('Sunucu hatası:', data.data);
                    this.emit('error', { type: 'server', data: data.data });
                    break;
            }
        } catch (error) {
            this.log('Mesaj parse hatası:', error);
        }
    }
    
    handleAvailabilityUpdate(data) {
        this.availabilityCache.set(data.date, data.slots);
        setTimeout(() => this.availabilityCache.delete(data.date), 60 * 60 * 1000);
        this.updateCalendarUI();
        this.emit('availabilityUpdate', data);
    }
    
    handleSlotUpdate(slotData) {
        const date = slotData.slot_date;
        const currentSlots = this.availabilityCache.get(date) || [];
        
        const index = currentSlots.findIndex(s => s.id === slotData.id);
        if (index >= 0) {
            currentSlots[index] = { ...currentSlots[index], ...slotData };
        } else {
            currentSlots.push(slotData);
        }
        
        this.availabilityCache.set(date, currentSlots);
        this.updateCalendarUI();
    }
    
    handleInitialAvailability(data) {
        Object.entries(data.slots).forEach(([date, slots]) => {
            this.availabilityCache.set(date, slots);
        });
        this.updateCalendarUI();
        this.log('İlk takvim verileri yüklendi.');
    }
    
    handleAppointmentConfirmation(appointment) {
        this.emit('appointmentBooked', appointment);
        this.showAppointmentConfirmation(appointment);
        this.pendingAppointments.delete(appointment.slotId);
    }
    
    updateCalendarUI() {
        const calendarWidget = document.getElementById('vertnet-calendar-widget');
        if (calendarWidget) {
            this.renderCalendarWidget(calendarWidget);
        }
        this.updateFlowiseChatUI();
    }
    
    updateFlowiseChatUI() {
        const chatContainer = document.querySelector('[id*="flowise"], .chat-container, iframe');
        if (!chatContainer) return;
        this.injectCalendarButtons(chatContainer);
    }
    
    injectCalendarButtons(container) {
        let widget = container.querySelector('.vertnet-calendar-widget');
        
        if (!widget) {
            widget = document.createElement('div');
            widget.className = 'vertnet-calendar-widget';
            widget.innerHTML = this.getCalendarWidgetHTML();
            container.appendChild(widget);
        }
        
        this.updateWidgetSlots(widget);
    }
    
    getCalendarWidgetHTML() {
        return `
            <div class="calendar-widget" style="
                margin: 15px 0;
                padding: 15px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 12px;
                color: white;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <div>
                        <div style="font-size: 14px; opacity: 0.9;">📅 CANLI TAKVİM</div>
                        <div style="font-size: 16px; font-weight: bold;">Müsait Zamanlar</div>
                    </div>
                    <div class="connection-status" style="
                        display: flex;
                        align-items: center;
                        font-size: 12px;
                        background: rgba(255, 255, 255, 0.2);
                        padding: 4px 8px;
                        border-radius: 12px;
                    ">
                        <div class="status-dot" style="
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            background: #10b981;
                            margin-right: 6px;
                            animation: pulse 2s infinite;
                        "></div>
                        <span>Canlı</span>
                    </div>
                </div>
                
                <div class="slots-container" style="
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 8px;
                    margin: 15px 0;
                "></div>
                
                <style>
                    @keyframes pulse {
                        0% { opacity: 1; }
                        50% { opacity: 0.5; }
                        100% { opacity: 1; }
                    }
                </style>
            </div>
        `;
    }
    
    updateWidgetSlots(widget) {
        const slotsContainer = widget.querySelector('.slots-container');
        if (!slotsContainer) return;
        
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        
        const todaySlots = this.availabilityCache.get(today) || [];
        const tomorrowSlots = this.availabilityCache.get(tomorrow) || [];
        
        const availableSlots = [
            ...todaySlots.filter(s => s.status === 'available').slice(0, 2),
            ...tomorrowSlots.filter(s => s.status === 'available').slice(0, 2)
        ];
        
        if (availableSlots.length === 0) {
            slotsContainer.innerHTML = `
                <div style="grid-column: span 2; text-align: center; padding: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                    <div style="font-size: 14px; margin-bottom: 5px;">🎯 Özel Randevu</div>
                    <div style="font-size: 12px; opacity: 0.8;">Size özel zaman ayıralım!</div>
                    <button class="request-custom-slot" style="
                        margin-top: 8px;
                        background: white;
                        color: #667eea;
                        border: none;
                        padding: 6px 12px;
                        border-radius: 6px;
                        font-size: 12px;
                        cursor: pointer;
                    ">Özel Zaman İste</button>
                </div>
            `;
        } else {
            let slotsHTML = '';
            availableSlots.forEach(slot => {
                const isToday = slot.slot_date === today;
                const timeStr = slot.start_time.substring(0, 5);
                
                slotsHTML += `
                    <div class="calendar-slot slot-available" data-slot-id="${slot.id}" style="
                        padding: 10px;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        background: #10b981;
                        transition: transform 0.2s;
                    " onclick="window.vertnetCalendar?.bookSlot('${slot.id}')">
                        <div style="font-size: 11px; opacity: 0.9;">${isToday ? 'BUGÜN' : 'YARIN'}</div>
                        <div style="font-size: 16px; font-weight: bold; margin: 4px 0;">${timeStr}</div>
                        <div style="font-size: 10px; opacity: 0.8;">Müsait</div>
                    </div>
                `;
            });
            slotsContainer.innerHTML = slotsHTML;
        }
    }
    
    async bookSlot(slotId) {
        try {
            const isAvailable = await this.checkSlotAvailability(slotId);
            if (!isAvailable) {
                this.showError('Bu slot artık müsait değil.');
                return;
            }
            this.showBookingForm(slotId);
        } catch (error) {
            this.log('Slot booking error:', error);
            this.showError('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
    
    async checkSlotAvailability(slotId) {
        try {
            const response = await fetch(`${this.config.apiBase}/calendar/slot/${slotId}/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Vertnet-Source': 'chatbot'
                }
            });
            const data = await response.json();
            return data.isAvailable === true;
        } catch (error) {
            return false;
        }
    }
    
    showBookingForm(slotId) {
        const slotDate = this.findSlotDate(slotId);
        if (!slotDate) return;
        
        const modalHTML = `
            <div id="vertnet-booking-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                padding: 20px;
            ">
                <div style="
                    background: white;
                    border-radius: 16px;
                    width: 100%;
                    max-width: 400px;
                    max-height: 90vh;
                    overflow-y: auto;
                ">
                    <div style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 20px;
                        border-radius: 16px 16px 0 0;
                    ">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <h3 style="margin: 0; font-size: 18px;">🎯 Randevu Oluştur</h3>
                            <button id="close-booking-modal" style="
                                background: rgba(255, 255, 255, 0.2);
                                border: none;
                                color: white;
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                cursor: pointer;
                                font-size: 20px;
                            ">×</button>
                        </div>
                        <div style="margin-top: 10px; font-size: 14px; opacity: 0.9;">
                            ${this.formatDate(slotDate.date)} • ${slotDate.time}
                        </div>
                    </div>
                    
                    <div style="padding: 20px;">
                        <form id="booking-form">
                            <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Adınız Soyadınız *</label>
                                <input type="text" name="fullName" required style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid #e5e7eb;
                                    border-radius: 8px;
                                    font-size: 14px;
                                    box-sizing: border-box;
                                " placeholder="Adınız Soyadınız">
                            </div>
                            
                            <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Telefon *</label>
                                <input type="tel" name="phone" required style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid #e5e7eb;
                                    border-radius: 8px;
                                    font-size: 14px;
                                    box-sizing: border-box;
                                " placeholder="+41 XX XXX XX XX">
                            </div>
                            
                            <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">E-posta</label>
                                <input type="email" name="email" style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid #e5e7eb;
                                    border-radius: 8px;
                                    font-size: 14px;
                                    box-sizing: border-box;
                                " placeholder="ornek@email.com">
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Konu</label>
                                <textarea name="topic" rows="3" style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid #e5e7eb;
                                    border-radius: 8px;
                                    font-size: 14px;
                                    resize: vertical;
                                    box-sizing: border-box;
                                " placeholder="Görüşmek istediğiniz konu..."></textarea>
                            </div>
                            
                            <div style="display: flex; gap: 10px;">
                                <button type="button" id="cancel-booking" style="
                                    flex: 1;
                                    padding: 14px;
                                    background: #f3f4f6;
                                    color: #374151;
                                    border: none;
                                    border-radius: 8px;
                                    font-weight: 500;
                                    cursor: pointer;
                                ">İptal</button>
                                <button type="submit" style="
                                    flex: 1;
                                    padding: 14px;
                                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                                    color: white;
                                    border: none;
                                    border-radius: 8px;
                                    font-weight: 500;
                                    cursor: pointer;
                                ">Randevu Al</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        document.getElementById('close-booking-modal').onclick = () => this.closeBookingModal();
        document.getElementById('cancel-booking').onclick = () => this.closeBookingModal();
        document.getElementById('booking-form').onsubmit = async (e) => {
            e.preventDefault();
            await this.submitBooking(slotId, e.target);
        };
    }
    
    async submitBooking(slotId, form) {
        const formData = new FormData(form);
        const bookingData = {
            slotId: slotId,
            fullName: formData.get('fullName'),
            phone: formData.get('phone'),
            email: formData.get('email') || '',
            topic: formData.get('topic') || '',
            visitorId: this.getVisitorId(),
            sessionId: this.getSessionId(),
            source: 'vertnetgeneve_chatbot',
            timestamp: new Date().toISOString()
        };
        
        if (!bookingData.fullName || !bookingData.phone) {
            this.showError('Lütfen adınızı ve telefon numaranızı girin.');
            return;
        }
        
        try {
            this.showLoading('Randevunuz oluşturuluyor...');
            
            const response = await fetch(`${this.config.apiBase}/appointments/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Vertnet-Source': 'website'
                },
                body: JSON.stringify(bookingData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showSuccess('Randevunuz başarıyla oluşturuldu!');
                this.closeBookingModal();
                
                // Track the appointment
                if (window.vertnetTracker) {
                    window.vertnetTracker.trackFormSubmission({
                        ...bookingData,
                        formType: 'appointment_booking',
                        appointmentId: result.appointmentId
                    });
                }
                
                this.sendWebSocketMessage({
                    type: 'APPOINTMENT_BOOKED',
                    data: {
                        slotId: slotId,
                        appointmentId: result.appointmentId,
                        customerName: bookingData.fullName
                    }
                });
            } else {
                this.showError(result.error || 'Randevu oluşturulamadı.');
            }
        } catch (error) {
            this.log('Booking error:', error);
            this.showError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        } finally {
            this.hideLoading();
        }
    }
    
    showFullCalendar() {
        window.open('https://panel.chatdeskiyo.com/calendar/public', '_blank');
    }
    
    requestCustomSlot() {
        if (window.vertnetTracker) {
            window.vertnetTracker.trackEvent('custom_slot_request', {
                timestamp: new Date().toISOString()
            });
        }
        this.showSuccess('Özel zaman talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.');
    }
    
    setupFlowiseHooks() {
        this.setupFlowiseFrameListener();
    }
    
    setupFlowiseFrameListener() {
        const checkFrame = setInterval(() => {
            const flowiseFrame = document.querySelector('iframe[src*="flowise"]');
            if (flowiseFrame) {
                clearInterval(checkFrame);
                flowiseFrame.onload = () => {
                    this.log('Flowise iframe yüklendi.');
                };
            }
        }, 1000);
    }
    
    // Utility functions
    generateToken() {
        return btoa(JSON.stringify({
            type: 'flowise_client',
            adminId: this.config.adminUserId,
            domain: window.location.hostname,
            timestamp: Date.now()
        }));
    }
    
    getVisitorId() {
        return localStorage.getItem('vertnet_visitor_id') || 
               `vis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    getSessionId() {
        return sessionStorage.getItem('vertnet_session_id') || 
               `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    findSlotDate(slotId) {
        for (const [date, slots] of this.availabilityCache.entries()) {
            const slot = slots.find(s => s.id == slotId);
            if (slot) {
                return { date: date, time: slot.start_time.substring(0, 5) };
            }
        }
        return null;
    }
    
    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    sendWebSocketMessage(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        }
    }
    
    showError(message) {
        alert('❌ ' + message);
    }
    
    showSuccess(message) {
        alert('✅ ' + message);
    }
    
    showLoading(message = 'İşleniyor...') {
        const loadingHTML = `
            <div id="vertnet-loading" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 100000;
            ">
                <div style="
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    text-align: center;
                ">
                    <div style="
                        width: 40px;
                        height: 40px;
                        border: 3px solid #e5e7eb;
                        border-top-color: #667eea;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 15px;
                    "></div>
                    <div style="color: #374151;">${message}</div>
                </div>
            </div>
            <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
        `;
        document.body.insertAdjacentHTML('beforeend', loadingHTML);
    }
    
    hideLoading() {
        const loading = document.getElementById('vertnet-loading');
        if (loading) loading.remove();
    }
    
    closeBookingModal() {
        const modal = document.getElementById('vertnet-booking-modal');
        if (modal) modal.remove();
    }
    
    cleanup() {
        if (this.ws) this.ws.close(1000, 'Page closing');
    }
    
    log(...args) {
        if (this.config.enableLogs) {
            console.log('[Vertnet Calendar]', ...args);
        }
    }
    
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
    
    on(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].push(callback);
        }
    }
}

window.VertnetCalendarIntegration = VertnetCalendarIntegration;

document.addEventListener('DOMContentLoaded', () => {
    const adminId = window.vertnetConfig?.adminId || 1;
    
    window.vertnetCalendar = new VertnetCalendarIntegration({
        adminUserId: parseInt(adminId),
        enableLogs: window.location.hostname === 'localhost'
    });
    
    console.log('Vertnet Calendar Integration loaded for admin:', adminId);
});
