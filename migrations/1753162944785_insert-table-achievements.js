const { nanoid } = require('nanoid');

exports.up = (pgm) => {
  const now = new Date().toISOString();
  const dummyPicture = 'https://picsum.photos/200';

  const achievements = [
    // found_items
    {
      name: 'Bounty Hunter',
      description:
        'Kamu sudah berhasil menemukan 10 barang — pencarianmu dimulai!',
      condition_type: 'found_items',
      condition_value: 10,
    },
    {
      name: 'Sharp Eye',
      description: 'Matamu tajam! Kamu berhasil menemukan 20 barang.',
      condition_type: 'found_items',
      condition_value: 20,
    },
    {
      name: 'Tracking Master',
      description:
        'Kamu adalah ahli dalam menemukan barang — 50 pencapaian hebat!',
      condition_type: 'found_items',
      condition_value: 50,
    },
    {
      name: 'Legend of the Found',
      description:
        'Kamu adalah legenda di dunia barang hilang. Tak tertandingi.',
      condition_type: 'found_items',
      condition_value: 100,
    },

    // lost_items
    {
      name: 'Where Is It?',
      description:
        '"Loh, ilang lagi?" — kayaknya kamu kurang update sama barang sendiri 😅',
      condition_type: 'lost_items',
      condition_value: 5,
    },
    {
      name: 'The Forgetful',
      description:
        'Kamu dan barangmu tampaknya sering beda jalan. Hati-hati, ya!',
      condition_type: 'lost_items',
      condition_value: 10,
    },
    {
      name: 'Lost Master',
      description:
        'Saat orang lain kehilangan kunci, kamu kehilangan satu kota.',
      condition_type: 'lost_items',
      condition_value: 20,
    },
    {
      name: 'Help me!',
      description:
        'Kamu perlu GPS buat hidupmu sendiri. 100 kali kehilangan, serius? 😭',
      condition_type: 'lost_items',
      condition_value: 100,
    },

    // comments
    {
      name: 'Helpful Citizen',
      description:
        'Baru 5 komentar, tapi udah mulai peduli. Warga yang layak dicontoh 👍',
      condition_type: 'comments',
      condition_value: 5,
    },
    {
      name: 'Quick Responder',
      description: 'Gak perlu disuruh, langsung bantu jawab. Mantap!',
      condition_type: 'comments',
      condition_value: 10,
    },
    {
      name: 'Lost & Found Friend',
      description:
        'Kamu selalu hadir waktu orang lain kehilangan. Baik banget sih 😢',
      condition_type: 'comments',
      condition_value: 20,
    },
    {
      name: 'Comment Champion',
      description:
        'Kamu udah kayak admin, tapi tanpa gaji. Tetap setia bantuin! 🫡',
      condition_type: 'comments',
      condition_value: 50,
    },
    {
      name: 'Keyboard Hero',
      description: 'Menolong tanpa jubah, cuma modal keyboard dan niat baik 💻',
      condition_type: 'comments',
      condition_value: 75,
    },
    {
      name: 'Golden Citizen',
      description:
        'Kamu layak dikasih penghargaan RT. Seratus komentar penuh empati 🥇',
      condition_type: 'comments',
      condition_value: 100,
    },
  ];

  const values = achievements
    .map((a) => {
      const id = `achievement-${nanoid(16)}`;
      return `('${id}', '${a.name.replace(
        /'/g,
        "''"
      )}', '${a.description.replace(/'/g, "''")}', '${dummyPicture}', '${
        a.condition_type
      }', ${a.condition_value}, '${now}', '${now}')`;
    })
    .join(',\n');

  pgm.sql(`
    INSERT INTO achievements (id, name, description, picture_url, condition_type, condition_value, created_at, updated_at)
    VALUES
    ${values};
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('achievements');
};
