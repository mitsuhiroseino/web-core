export default function load<R = any>(key: string): R | null {
  const data = sessionStorage.getItem(key);
  if (data == null || data === '') {
    return null;
  } else {
    return JSON.parse(data);
  }
}
