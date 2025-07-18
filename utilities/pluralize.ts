// функция для правильного склонения слова: "дней"
export function getDayLabel(days: number): string {
  const mod10 = days % 10;
  const mod100 = days % 100;

  if (mod10 === 1 && mod100 !== 11) return "день";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "дня";
  return "дней";
}

// функция для правильного склонения слова: "год"
export function getYearLabel(years: number): string {
  const mod10 = years % 10;
  const mod100 = years % 100;

  if (mod10 === 1 && mod100 !== 11) return "год";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "года";
  return "лет";
}

// функция для правильного склонения слова: "год" с предлогом "от"
export function getYearLabel2(years: number): string {
  const mod10 = years % 10;
  const mod100 = years % 100;

  if (mod10 === 1 && mod100 !== 11) return "года";
  return "лет";
}

// функция для правильного склонения слова: "человек" с предлогом "от"
export function getGroupLabel(years: number): string {
  const mod10 = years % 10;
  const mod100 = years % 100;

  if (mod10 === 1 && mod100 !== 11) return "человека";
  return "людей";
}
