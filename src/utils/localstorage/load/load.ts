export default function load<R = any>(key: string): R | null {
  const data = localStorage.getItem(key);
  if (data == null || data === '') {
    return null;
  } else {
    return JSON.parse(data);
  }
}
