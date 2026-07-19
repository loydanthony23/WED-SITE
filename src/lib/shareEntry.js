// Guests who scan the table QR code should land straight on the photo
// uploader — not the invitation intro. The QR points to
// <site>/#shared-moments; #share / #upload and ?share / ?upload also work.
export function isDirectShareEntry() {
  if (typeof window === "undefined") return false;
  const hash = window.location.hash.toLowerCase();
  if (hash === "#shared-moments" || hash === "#share" || hash === "#upload") {
    return true;
  }
  const q = new URLSearchParams(window.location.search);
  return q.has("share") || q.has("upload");
}

// Fired by any "Share a photo" trigger (navbar, section CTA). The globally
// mounted UploadModal listens for it and opens.
export const OPEN_UPLOAD_EVENT = "wed:open-upload";

// Fired by the uploader after at least one photo lands, so the live gallery
// refetches right away instead of waiting for its next poll.
export const MOMENT_UPLOADED_EVENT = "wed:moment-uploaded";

export function openUploadModal() {
  window.dispatchEvent(new Event(OPEN_UPLOAD_EVENT));
}
