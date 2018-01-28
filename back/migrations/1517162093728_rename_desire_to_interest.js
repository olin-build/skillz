exports.up = (pgm) => {
    pgm.renameColumn('person_skill', 'desire', 'interest')
};

exports.down = (pgm) => {
    pgm.renameColumn('person_skill', 'interest', 'desire')
};
