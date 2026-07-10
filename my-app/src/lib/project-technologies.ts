export const PROJECT_TECHNOLOGIES = [
  "React",
  "Node.js",
  "Flutter",
  "Laravel",
  "Vue.js",
  "WordPress",
  "Next.js",
  "Tailwind CSS",
  "Firebase",
  "PostgreSQL",
] as const;

export function isProjectTechnology(value: string) {
  return PROJECT_TECHNOLOGIES.some((technology) => technology === value);
}
