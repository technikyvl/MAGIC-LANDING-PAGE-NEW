import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Walidacja danych
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      );
    }

    // Walidacja emaila
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Nieprawidłowy adres email' },
        { status: 400 }
      );
    }

    // Logowanie danych (tymczasowe rozwiązanie)
    console.log('=== NOWA WIADOMOŚĆ Z FORMULARZA ===');
    console.log('Imię:', name);
    console.log('Email:', email);
    console.log('Wiadomość:', message);
    console.log('Data:', new Date().toLocaleString('pl-PL'));
    console.log('=====================================');

    // Sprawdź czy są skonfigurowane zmienne środowiskowe dla emaila
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Jeśli są skonfigurowane, wyślij email
      const nodemailer = await import('nodemailer');
      
      const transporter = nodemailer.default.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'kontakt@magiclife.pl',
        subject: `Nowa wiadomość z formularza kontaktowego - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #FF5A3D; border-bottom: 2px solid #FF5A3D; padding-bottom: 10px;">
              Nowa wiadomość z formularza kontaktowego
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Dane kontaktowe:</h3>
              <p><strong>Imię:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0;">Wiadomość:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 12px; color: #666;">
              <p>Wiadomość została wysłana z formularza kontaktowego na stronie magiclife.pl</p>
              <p>Data: ${new Date().toLocaleString('pl-PL')}</p>
            </div>
          </div>
        `,
        text: `
          Nowa wiadomość z formularza kontaktowego
          
          Imię: ${name}
          Email: ${email}
          
          Wiadomość:
          ${message}
          
          Data: ${new Date().toLocaleString('pl-PL')}
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email wysłany pomyślnie!');
    } else {
      console.log('Email nie został wysłany - brak konfiguracji EMAIL_USER i EMAIL_PASS');
    }

    return NextResponse.json(
      { message: 'Wiadomość została wysłana pomyślnie!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Błąd wysyłania wiadomości:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.' },
      { status: 500 }
    );
  }
}
