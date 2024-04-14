export default function save(key: string, data: any): void {
  if (data == null) {
    sessionStorage.setItem(key, '');
  } else {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}
