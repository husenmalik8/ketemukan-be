const { nanoid } = require('nanoid');

exports.up = (pgm) => {
  const now = new Date().toISOString();

  const categories = [
    'Elektronik',
    'Dokumen & Identitas',
    'Aksesori & Pakaian',
    'Tas & Dompet',
    'Kunci',
    'Uang & Kartu',
    'Buku & Alat Tulis',
    'Perhiasan & Barang Berharga',
    'Hewan Peliharaan',
    'Lainnya',
  ];

  const values = categories
    .map((name) => {
      const id = `category-${nanoid(16)}`;
      return `('${id}', '${name.replace(/'/g, "''")}', '${now}', '${now}')`;
    })
    .join(',\n');

  pgm.sql(`
    INSERT INTO categories (id, name, created_at, updated_at) VALUES
    ${values};
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DELETE FROM categories
    WHERE name IN (
      'Elektronik',
      'Dokumen & Identitas',
      'Aksesori & Pakaian',
      'Tas & Dompet',
      'Kunci',
      'Uang & Kartu',
      'Buku & Alat Tulis',
      'Perhiasan & Barang Berharga',
      'Hewan Peliharaan',
      'Lainnya'
    );
  `);
};
