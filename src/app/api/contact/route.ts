import { NextResponse } from 'next/server';

/**
 * HƯỚNG DẪN CẤU HÌNH GOOGLE APPS SCRIPT CHO GOOGLE SHEET:
 * 
 * 1. Tạo một bảng tính Google Sheet mới.
 * 2. Chọn Tiện ích mở rộng (Extensions) > Apps Script.
 * 3. Xóa mã nguồn mặc định và dán đoạn mã sau vào:
 * 
 * ```javascript
 * function doPost(e) {
 *   try {
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     var data = JSON.parse(e.postData.contents);
 *     
 *     // Ghi các cột: Họ Tên, Số Điện Thoại, Email, Loại BĐS, Lời Nhắn, Thời Gian Gửi
 *     sheet.appendRow([
 *       data.fullName,
 *       data.phone,
 *       data.email,
 *       data.propertyType,
 *       data.message,
 *       data.submittedAt
 *     ]);
 *     
 *     return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 * ```
 * 
 * 4. Nhấp vào Triển khai (Deploy) > Triển khai mới (New deployment).
 * 5. Chọn loại triển khai là "Ứng dụng web" (Web app).
 * 6. Cấu hình:
 *    - Thực thi dưới danh nghĩa: "Tôi" (Execute as: Me).
 *    - Ai có quyền truy cập: "Mọi người" (Who has access: Anyone).
 * 7. Nhấp Triển khai, cấp quyền truy cập tài khoản Google, sao chép URL Ứng dụng web được tạo ra.
 * 8. Dán URL này vào biến môi trường NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL trong tệp .env.local.
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, propertyType, message } = body;

    // Xác thực các trường bắt buộc
    if (!fullName || !phone || !email) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    // Cơ chế fallback: Nếu chưa cấu hình Webhook URL, ghi log tại local console
    if (!webhookUrl) {
      console.log('=== ĐĂNG KÝ TƯ VẤN MẪU (Chưa cấu hình Google Sheets Webhook) ===');
      console.log('Họ và Tên:', fullName);
      console.log('Số Điện Thoại:', phone);
      console.log('Email:', email);
      console.log('Loại BĐS:', propertyType === 'apartment' ? 'Căn hộ chung cư' : 'Văn phòng làm việc');
      console.log('Lời nhắn:', message);
      console.log('Thời gian gửi:', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));
      console.log('===============================================================');

      return NextResponse.json({
        success: true,
        mock: true,
        message: 'Gửi yêu cầu giả lập thành công. Hãy cấu hình biến môi trường NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL để kết nối Google Sheet.'
      });
    }

    // Chuyển tiếp yêu cầu tới Google Apps Script Web App
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        phone,
        email,
        propertyType: propertyType === 'apartment' ? 'Căn hộ chung cư' : 'Văn phòng làm việc',
        message: message || '',
        submittedAt: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets Webhook phản hồi với mã lỗi: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi gửi thông tin liên hệ:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ nội bộ' }, { status: 500 });
  }
}
