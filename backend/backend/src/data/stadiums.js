/**
 * Static reference data for simulated World Cup venues.
 * Loosely modeled on a realistic multi-host tournament footprint.
 */
const STADIUMS = [
  {
    id: 'stad-001',
    name: 'MetLife Stadium',
    city: 'New York/New Jersey',
    country: 'USA',
    capacity: 82500,
    match: 'Final — Team A vs Team B',
  },
  {
    id: 'stad-002',
    name: 'AT&T Stadium',
    city: 'Dallas',
    country: 'USA',
    capacity: 80000,
    match: 'Semi-Final — Team C vs Team D',
  },
  {
    id: 'stad-003',
    name: 'Estadio Azteca',
    city: 'Mexico City',
    country: 'Mexico',
    capacity: 87000,
    match: 'Group Stage — Team E vs Team F',
  },
  {
    id: 'stad-004',
    name: 'BC Place',
    city: 'Vancouver',
    country: 'Canada',
    capacity: 54500,
    match: 'Round of 16 — Team G vs Team H',
  },
  {
    id: 'stad-005',
    name: 'SoFi Stadium',
    city: 'Los Angeles',
    country: 'USA',
    capacity: 70000,
    match: 'Quarter-Final — Team I vs Team J',
  },
  {
    id: 'stad-006',
    name: 'Estadio BBVA',
    city: 'Monterrey',
    country: 'Mexico',
    capacity: 53500,
    match: 'Group Stage — Team K vs Team L',
  },
];

module.exports = { STADIUMS };
