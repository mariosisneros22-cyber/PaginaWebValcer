const images = import.meta.glob(
  "../assets/images/index/clients/*.jpg",
  { eager: true }
);

const names = [
  "Cliente 1",
  "Cliente 2",
  "Cliente 3",
  "Cliente 4",
  "Cliente 5",
];

export const clients = Object.values(images).map((mod, index) => ({
  name: names[index] ?? `Cliente ${index + 1}`,
  logo: (mod as any).default,
}));

