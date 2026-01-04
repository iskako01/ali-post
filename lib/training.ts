import db from './traningdb';

export function getTrainings() {
  const stmt = db.prepare('SELECT * FROM trainings');
  return stmt.all();
}
