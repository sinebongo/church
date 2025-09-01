const db = require('../../../database/db.cjs');
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const stmt = db.prepare(
    `SELECT * FROM church_members WHERE name_and_surname LIKE ? OR parish LIKE ?`
  );
  const results = stmt.all(`%${search}%`, `%${search}%`);
  return NextResponse.json(results);
}


// Add a new member
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name_and_surname, parish, biblical_scripture, hymn, church_id } = body;
  if (!name_and_surname || !parish || !biblical_scripture || !hymn) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const stmt = db.prepare(
    `INSERT INTO church_members (name_and_surname, parish, biblical_scripture, hymn, church_id) VALUES (?, ?, ?, ?, ?)`
  );
  const info = stmt.run(name_and_surname, parish, biblical_scripture, hymn, church_id || null);
  return NextResponse.json({ id: info.lastInsertRowid });
}

// Update a member
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const body = await req.json();
  const { name_and_surname, parish, biblical_scripture, hymn, church_id } = body;
  const stmt = db.prepare(
    `UPDATE church_members SET name_and_surname=?, parish=?, biblical_scripture=?, hymn=?, church_id=? WHERE id=?`
  );
  const info = stmt.run(name_and_surname, parish, biblical_scripture, hymn, church_id || null, id);
  if (info.changes === 0) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

// Delete a member
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const stmt = db.prepare(`DELETE FROM church_members WHERE id=?`);
  const info = stmt.run(id);
  if (info.changes === 0) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
