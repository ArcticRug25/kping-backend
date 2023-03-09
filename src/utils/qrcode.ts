import QRCode from 'qrcode'

// 根据 code 生成二维码
export const generateQRCode = async (code: string) => {
  return await QRCode.toDataURL(code, {
    errorCorrectionLevel: 'L',
  })
}

// 将二维码转换为 base64
export const generateQRCodeBase64 = async (code: string) => {
  const qrCode = await generateQRCode(code)
  return qrCode.replace(/^data:image\/\w+;base64,/, '')
}
