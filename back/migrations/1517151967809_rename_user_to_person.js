var fs = require('fs')
var path = require('path')

exports.up = (pgm) => {
    pgm.sql(`
    ALTER TABLE "user" RENAME TO person;
    ALTER TABLE user_skill RENAME TO person_skill;
    ALTER TABLE person_skill RENAME COLUMN user_id TO person_id;

    ALTER INDEX user_pkey RENAME TO person_pkey;
    ALTER INDEX user_skill_pkey RENAME TO person_skill_pkey;
    ALTER INDEX user_skill_user_id_skill_id_idx RENAME TO person_skill_person_id_skill_id_idx;

    ALTER SEQUENCE user_id_seq RENAME TO person_id_seq;
    ALTER SEQUENCE user_skill_id_seq RENAME TO person_skill_id_seq;

    ALTER TABLE person_skill RENAME CONSTRAINT user_skill_desire_check TO person_skill_desire_check;
    ALTER TABLE person_skill RENAME CONSTRAINT user_skill_experience_check TO person_skill_experience_check;
    ALTER TABLE person_skill RENAME CONSTRAINT user_skill_skill_id_fkey TO person_skill_skill_id_fkey;
    ALTER TABLE person_skill RENAME CONSTRAINT user_skill_user_id_fkey TO person_skill_person_id_fkey;
    `)
};

exports.down = (pgm) => {
    pgm.sql(`
    ALTER TABLE person RENAME TO "user";
    ALTER TABLE person_skill RENAME TO user_skill;
    ALTER TABLE user_skill RENAME COLUMN person_id TO user_id;

    ALTER INDEX person_pkey RENAME TO user_pkey;
    ALTER INDEX person_skill_pkey RENAME TO user_skill_pkey;
    ALTER INDEX person_skill_person_id_skill_id_idx RENAME TO user_skill_user_id_skill_id_idx;

    ALTER SEQUENCE person_id_seq RENAME TO user_id_seq;
    ALTER SEQUENCE person_skill_id_seq RENAME TO user_skill_id_seq;

    ALTER TABLE user_skill RENAME CONSTRAINT person_skill_desire_check TO user_skill_desire_check;
    ALTER TABLE user_skill RENAME CONSTRAINT person_skill_experience_check TO user_skill_experience_check;
    ALTER TABLE user_skill RENAME CONSTRAINT person_skill_skill_id_fkey TO user_skill_skill_id_fkey;
    ALTER TABLE user_skill RENAME CONSTRAINT person_skill_person_id_fkey TO user_skill_user_id_fkey;
    `)
};
