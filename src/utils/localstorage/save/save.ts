export default function save(key: string, data: any): void {
  if (data == null) {
    localStorage.setItem(key, '');
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
