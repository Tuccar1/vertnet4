import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, history, sessionId } = await request.json()

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    // SessionId'yi garanti altına al
    const finalSessionId = sessionId || `default_session`

    const CHATFLOW_ID = process.env.FLOWISE_CHATFLOW_ID || '3fadc7bf-109d-4649-af1f-c66773105a26'
    const FLOWISE_BASE_URL = process.env.FLOWISE_API_URL || 'https://flowise.chatdeskiyo.com'
    const FLOWISE_API_URL = `${FLOWISE_BASE_URL}/api/v1/prediction/${CHATFLOW_ID}`

    try {
      // Konuşma geçmişini mesajın içine ekle - bu en güvenilir yöntem
      let questionWithContext = message
      
      if (history && Array.isArray(history) && history.length > 0) {
        const conversationHistory = history
          .filter(msg => msg && msg.content && msg.content.trim())
          .slice(-20)
          .map(msg => `${msg.role === 'user' ? 'Kullanıcı' : 'Asistan'}: ${msg.content.trim()}`)
          .join('\n')
        
        if (conversationHistory) {
          questionWithContext = `[KONUŞMA GEÇMİŞİ - Bu bilgileri HATIRLA ve TEKRAR SORMA]\n${conversationHistory}\n\n[YENİ MESAJ]\nKullanıcı: ${message}\n\nÖNEMLİ: Yukarıdaki konuşma geçmişinde kullanıcı zaten isim, telefon, hizmet türü, tarih gibi bilgiler verdiyse bunları TEKRAR SORMA. Sadece eksik bilgileri sor.`
        }
      }

      const requestBody: any = {
        question: questionWithContext,
        sessionId: finalSessionId,
        overrideConfig: {
          sessionId: finalSessionId,
        }
      }

      console.log('Flowise Request - SessionId:', finalSessionId, 'History Length:', history?.length || 0)

      const response = await fetch(FLOWISE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Flowise API Error:', response.status, errorText)
        throw new Error(`Flowise API error: ${response.status} - ${errorText.substring(0, 200)}`)
      }

      const data = await response.json()
      const botResponse = data?.answer || 
                        data?.text || 
                        data?.response || 
                        data?.message ||
                        (typeof data === 'string' ? data : null) ||
                        JSON.stringify(data)

      if (!botResponse || (typeof botResponse === 'string' && botResponse.trim() === '')) {
        throw new Error('Empty or invalid response from Flowise API')
      }

      return NextResponse.json({ answer: String(botResponse), sessionId: finalSessionId })
    } catch (error: any) {
      console.error('Flowise Error:', error.message)
      return NextResponse.json(
        { 
          error: 'Internal server error',
          details: error.message || 'Unknown error'
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}
