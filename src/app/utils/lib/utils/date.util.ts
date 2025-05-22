export function getYearsSince(initYear: number): {year: number}[] {
  const array = []
  while(initYear <= new Date().getFullYear()) {
    array.push({ year: initYear })
    initYear++
  }
  array.sort((a,b)=> a.year < b.year ? 1 : -1)
  return array
}

