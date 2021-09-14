export function removeChat() {
  const iframe = document.getElementById('hubspot-messages-iframe-container');
  if (iframe) iframe.parentNode.removeChild(iframe);
}
