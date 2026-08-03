export function sendSuccess(res, payload, status = 200) {
  return res.status(status).json({ success: true, data: payload });
}

export function sendError(res, message, status = 500) {
  return res.status(status).json({ success: false, error: message });
}
