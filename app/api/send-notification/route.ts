import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // 이메일 전송을 위한 transporter 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 관리자에게 보내는 이메일
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: '새로운 견적 요청이 접수되었습니다',
      html: `
        <h2>새로운 견적 요청</h2>
        <p><strong>회사명:</strong> ${formData.companyName}</p>
        <p><strong>담당자:</strong> ${formData.contactName}</p>
        <p><strong>이메일:</strong> ${formData.email}</p>
        <p><strong>전화번호:</strong> ${formData.phone}</p>
        <p><strong>서비스:</strong> ${Object.entries(formData.services)
          .filter(([_, v]) => v)
          .map(([k]) => k)
          .join(', ')}</p>
        <p><strong>예산:</strong> ${formData.budget}</p>
        <p><strong>프로젝트 설명:</strong></p>
        <p>${formData.projectDescription}</p>
      `,
    };

    // 신청자에게 보내는 이메일
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: '견적 요청이 접수되었습니다',
      html: `
        <h2>견적 요청 접수 완료</h2>
        <p>${formData.contactName}님, 견적 요청이 정상적으로 접수되었습니다.</p>
        <p>빠른 시일 내에 검토 후 연락드리도록 하겠습니다.</p>
        <br/>
        <p>감사합니다.</p>
      `,
    };

    // 이메일 전송
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', error);
    return NextResponse.json(
      { error: '이메일 전송에 실패했습니다.' },
      { status: 500 }
    );
  }
} 