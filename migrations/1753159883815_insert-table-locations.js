const { nanoid } = require('nanoid');

exports.up = (pgm) => {
  const now = new Date().toISOString();

  const locations = [
    'Aceh',
    'Sumatera Utara',
    'Sumatera Barat',
    'Riau',
    'Kepulauan Riau',
    'Jambi',
    'Bengkulu',
    'Sumatera Selatan',
    'Bangka Belitung',
    'Lampung',
    'DKI Jakarta',
    'Jawa Barat',
    'Banten',
    'Jawa Tengah',
    'DI Yogyakarta',
    'Jawa Timur',
    'Kalimantan Barat',
    'Kalimantan Tengah',
    'Kalimantan Selatan',
    'Kalimantan Timur',
    'Kalimantan Utara',
    'Sulawesi Utara',
    'Gorontalo',
    'Sulawesi Tengah',
    'Sulawesi Barat',
    'Sulawesi Selatan',
    'Sulawesi Tenggara',
    'Bali',
    'Nusa Tenggara Barat',
    'Nusa Tenggara Timur',
    'Maluku',
    'Maluku Utara',
    'Papua',
    'Papua Barat',
    'Papua Tengah',
    'Papua Pegunungan',
    'Papua Selatan',
    'Papua Barat Daya',
  ];

  const values = locations
    .map((name) => {
      const id = `location-${nanoid(16)}`;
      return `('${id}', '${name.replace(/'/g, "''")}', '${now}', '${now}')`;
    })
    .join(',\n');

  pgm.sql(`
    INSERT INTO locations (id, name, created_at, updated_at) VALUES
    ${values};
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DELETE FROM locations
    WHERE name IN (
      'Aceh',
      'Sumatera Utara',
      'Sumatera Barat',
      'Riau',
      'Kepulauan Riau',
      'Jambi',
      'Bengkulu',
      'Sumatera Selatan',
      'Bangka Belitung',
      'Lampung',
      'DKI Jakarta',
      'Jawa Barat',
      'Banten',
      'Jawa Tengah',
      'DI Yogyakarta',
      'Jawa Timur',
      'Kalimantan Barat',
      'Kalimantan Tengah',
      'Kalimantan Selatan',
      'Kalimantan Timur',
      'Kalimantan Utara',
      'Sulawesi Utara',
      'Gorontalo',
      'Sulawesi Tengah',
      'Sulawesi Barat',
      'Sulawesi Selatan',
      'Sulawesi Tenggara',
      'Bali',
      'Nusa Tenggara Barat',
      'Nusa Tenggara Timur',
      'Maluku',
      'Maluku Utara',
      'Papua',
      'Papua Barat',
      'Papua Tengah',
      'Papua Pegunungan',
      'Papua Selatan',
      'Papua Barat Daya'
    );
  `);
};
