--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: skill; Type: TABLE; Schema: public; Owner: skillz
--

CREATE TABLE skill (
    id integer NOT NULL,
    name text,
    description text,
    url text
);


ALTER TABLE skill OWNER TO skillz;

--
-- Name: skill_id_seq; Type: SEQUENCE; Schema: public; Owner: skillz
--

CREATE SEQUENCE skill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE skill_id_seq OWNER TO skillz;

--
-- Name: skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skillz
--

ALTER SEQUENCE skill_id_seq OWNED BY skill.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: skillz
--

CREATE TABLE "user" (
    id integer NOT NULL,
    first_name text,
    last_name text,
    github_login text,
    homepage_url text,
    bio text,
    pronouns text
);


ALTER TABLE "user" OWNER TO skillz;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: skillz
--

CREATE SEQUENCE user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO skillz;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skillz
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- Name: user_skill; Type: TABLE; Schema: public; Owner: skillz
--

CREATE TABLE user_skill (
    id integer NOT NULL,
    user_id integer NOT NULL,
    skill_id integer NOT NULL,
    experience integer,
    desire integer,
    note text,
    instructor boolean,
    CONSTRAINT user_skill_desire_check CHECK (((0 <= desire) AND (desire <= 3))),
    CONSTRAINT user_skill_experience_check CHECK (((0 <= experience) AND (experience <= 5)))
);


ALTER TABLE user_skill OWNER TO skillz;

--
-- Name: user_skill_id_seq; Type: SEQUENCE; Schema: public; Owner: skillz
--

CREATE SEQUENCE user_skill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_skill_id_seq OWNER TO skillz;

--
-- Name: user_skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skillz
--

ALTER SEQUENCE user_skill_id_seq OWNED BY user_skill.id;


--
-- Name: skill id; Type: DEFAULT; Schema: public; Owner: skillz
--

ALTER TABLE ONLY skill ALTER COLUMN id SET DEFAULT nextval('skill_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: skillz
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: user_skill id; Type: DEFAULT; Schema: public; Owner: skillz
--

ALTER TABLE ONLY user_skill ALTER COLUMN id SET DEFAULT nextval('user_skill_id_seq'::regclass);


--
-- Data for Name: skill; Type: TABLE DATA; Schema: public; Owner: skillz
--

COPY skill (id, name, description, url) FROM stdin;
1	Python	\N	\N
2	Flask	\N	\N
3	Go	\N	\N
4	Rust	\N	\N
5	React	\N	\N
6	JavaScript	\N	\N
7	CSS	\N	\N
8	SASS	\N	\N
9	Heroku	\N	\N
10	HTML	\N	\N
11	SQL	\N	\N
12	MongoDB	\N	\N
13	AWS	Amazon Web Services	\N
14	Docker	\N	\N
\.


--
-- Name: skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skillz
--

SELECT pg_catalog.setval('skill_id_seq', 14, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skillz
--

SELECT pg_catalog.setval('user_id_seq', 2, true);


--
-- Name: user_skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skillz
--

SELECT pg_catalog.setval('user_skill_id_seq', 21, true);


--
-- Name: skill skill_pkey; Type: CONSTRAINT; Schema: public; Owner: skillz
--

ALTER TABLE ONLY skill
    ADD CONSTRAINT skill_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: skillz
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_skill user_skill_pkey; Type: CONSTRAINT; Schema: public; Owner: skillz
--

ALTER TABLE ONLY user_skill
    ADD CONSTRAINT user_skill_pkey PRIMARY KEY (id);


--
-- Name: user_skill_user_id_skill_id_idx; Type: INDEX; Schema: public; Owner: skillz
--

CREATE UNIQUE INDEX user_skill_user_id_skill_id_idx ON user_skill USING btree (user_id, skill_id);


--
-- Name: user_skill user_skill_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: skillz
--

ALTER TABLE ONLY user_skill
    ADD CONSTRAINT user_skill_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES skill(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_skill user_skill_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: skillz
--

ALTER TABLE ONLY user_skill
    ADD CONSTRAINT user_skill_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;



--
-- PostgreSQL database dump complete
--

