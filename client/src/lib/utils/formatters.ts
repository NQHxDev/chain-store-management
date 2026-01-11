export function formatDate(dateString: string): string {
   const date = new Date(dateString);
   return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   }).format(date);
}

export function formatPhoneNumber(phone: string): string {
   return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
}
