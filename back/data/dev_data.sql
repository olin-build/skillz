--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: skillz
--

COPY "person" (id, first_name, last_name, github_login, homepage_url, bio, pronouns) FROM stdin;
1	Oliver	Steele	osteele	\N	\N	\N
2	Franklin	Olin	frank_olin	https://olin.build	\N	\N
\.


--
-- Data for Name: person_skill; Type: TABLE DATA; Schema: public; Owner: skillz
--

COPY person_skill (id, person_id, skill_id, experience, desire, note, instructor) FROM stdin;
3	1	1	5	3	\N	t
12	1	6	3	\N	\N	\N
17	1	11	3	\N	\N	\N
14	1	5	4	\N	\N	\N
16	1	8	1	\N	\N	\N
15	1	4	1	3	\N	\N
8	1	14	4	\N	\N	\N
5	1	2	4	\N	\N	\N
10	1	3	2	\N	\N	\N
19	2	7	5	\N	\N	\N
13	1	12	5	\N	\N	\N
11	1	9	3	\N	\N	\N
9	1	10	4	\N	\N	\N
20	2	10	5	\N	\N	\N
21	2	6	2	\N	\N	\N
6	1	7	1	2	\N	\N
7	1	13	5	2	\N	\N
18	2	13	\N	\N	\N	\N
\.
