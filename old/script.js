document.addEventListener('DOMContentLoaded', () => {
  const toast = document.getElementById('toast');

  // Helper: Show Toast
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // Handle generic copy buttons
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Скопировано в буфер обмена!');
        }).catch(() => {
          showToast('Ошибка при копировании');
        });
      }
    });
  });
});
