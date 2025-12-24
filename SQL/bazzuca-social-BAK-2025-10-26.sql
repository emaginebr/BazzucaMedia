CREATE TABLE public.clients (
    client_id bigint NOT NULL,
    user_id bigint NOT NULL,
    name character varying(80) NOT NULL,
    active boolean DEFAULT true NOT NULL
);

--
-- TOC entry 221 (class 1259 OID 17377)
-- Name: clients_client_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.clients_client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 4457 (class 0 OID 0)
-- Dependencies: 221
-- Name: clients_client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.clients_client_id_seq OWNED BY public.clients.client_id;


--
-- TOC entry 220 (class 1259 OID 17363)
-- Name: posts; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.posts (
    post_id bigint NOT NULL,
    network_id bigint NOT NULL,
    client_id bigint NOT NULL,
    schedule_date timestamp without time zone NOT NULL,
    post_type integer NOT NULL,
    s3_key character varying(255) NOT NULL,
    title character varying(80) NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    description text NOT NULL
);

--
-- TOC entry 219 (class 1259 OID 17362)
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.posts_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4458 (class 0 OID 0)
-- Dependencies: 219
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;


--
-- TOC entry 218 (class 1259 OID 17354)
-- Name: social_networks; Type: TABLE; Schema: public; Owner: doadmin
--

CREATE TABLE public.social_networks (
    network_id bigint NOT NULL,
    client_id bigint NOT NULL,
    network_key integer NOT NULL,
    url character varying(180) NOT NULL,
    "user" character varying(255),
    password character varying(255),
    active boolean DEFAULT true NOT NULL,
    access_token character varying(255),
    access_secret character varying(255)
);

--
-- TOC entry 217 (class 1259 OID 17353)
-- Name: social_networks_network_id_seq; Type: SEQUENCE; Schema: public; Owner: doadmin
--

CREATE SEQUENCE public.social_networks_network_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 4459 (class 0 OID 0)
-- Dependencies: 217
-- Name: social_networks_network_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: doadmin
--

ALTER SEQUENCE public.social_networks_network_id_seq OWNED BY public.social_networks.network_id;


--
-- TOC entry 4289 (class 2604 OID 17381)
-- Name: clients client_id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.clients ALTER COLUMN client_id SET DEFAULT nextval('public.clients_client_id_seq'::regclass);


--
-- TOC entry 4287 (class 2604 OID 17366)
-- Name: posts post_id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.posts ALTER COLUMN post_id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);


--
-- TOC entry 4285 (class 2604 OID 17357)
-- Name: social_networks network_id; Type: DEFAULT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.social_networks ALTER COLUMN network_id SET DEFAULT nextval('public.social_networks_network_id_seq'::regclass);


--
-- TOC entry 4450 (class 0 OID 17378)
-- Dependencies: 222
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: doadmin
--

INSERT INTO public.clients (client_id, user_id, name, active) VALUES (1, 18, 'Pandora Vault', true);
INSERT INTO public.clients (client_id, user_id, name, active) VALUES (2, 18, 'EasySLA', true);
INSERT INTO public.clients (client_id, user_id, name, active) VALUES (4, 18, 'Emagine', true);
INSERT INTO public.clients (client_id, user_id, name, active) VALUES (3, 18, 'Bazzuca Media', true);


--
-- TOC entry 4448 (class 0 OID 17363)
-- Dependencies: 220
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: doadmin
--

INSERT INTO public.posts (post_id, network_id, client_id, schedule_date, post_type, s3_key, title, status, description) VALUES (4, 6, 4, '2025-07-01 03:00:00', 1, 'https://emagine.nyc3.digitaloceanspaces.com/bazzucasocial/Emagine1.mp4', '[Emagine] Felipe 1', 1, 'https://pandoravault.com
Zero trust, zero knowledge, 100% encrypted.
Pandora Vault is how privacidade should workshop. #privacy #datasecurity #encryption #vault #pandoravault');
INSERT INTO public.posts (post_id, network_id, client_id, schedule_date, post_type, s3_key, title, status, description) VALUES (9, 4, 1, '2025-07-10 09:30:00', 1, 'https://emagine.nyc3.digitaloceanspaces.com/bazzucasocial/PandoraVault4.mp4', '[Pandora] Ana 4', 1, 'Zero trust, zero knowledge, 100% encrypted.
Pandora Vault is how privacidade should workshop. #privacy #datasecurity #encryption #vault #pandoravault');
INSERT INTO public.posts (post_id, network_id, client_id, schedule_date, post_type, s3_key, title, status, description) VALUES (3, 4, 1, '2025-07-02 18:00:00', 1, 'https://emagine.nyc3.digitaloceanspaces.com/bazzucasocial/PandoraVault2.mp4', '[Pandora] China 2', 1, 'Zero trust, zero knowledge, 100% encrypted.
Pandora Vault is how privacidade should workshop. #privacy #datasecurity #encryption #vault #pandoravault');
INSERT INTO public.posts (post_id, network_id, client_id, schedule_date, post_type, s3_key, title, status, description) VALUES (1, 2, 1, '2025-07-02 19:00:00', 1, 'https://emagine.nyc3.digitaloceanspaces.com/bazzucasocial/PandoraVault2.mp4', '[Pandora] China 2', 1, 'https://pandoravault.com
Zero trust, zero knowledge, 100% encrypted.
Pandora Vault is how privacidade should workshop. #privacy #datasecurity #encryption #vault #pandoravault');
INSERT INTO public.posts (post_id, network_id, client_id, schedule_date, post_type, s3_key, title, status, description) VALUES (5, 6, 4, '2025-07-03 09:00:00', 1, 'https://emagine.nyc3.digitaloceanspaces.com/bazzucasocial/Emagine2.mp4', '[Emagine] China 2', 1, 'https://pandoravault.com
Zero trust, zero knowledge, 100% encrypted.
Pandora Vault is how privacidade should workshop. #privacy #datasecurity #encryption #vault #pandoravault');
INSERT INTO public.posts (post_id, network_id, client_id, schedule_date, post_type, s3_key, title, status, description) VALUES (8, 7, 4, '2025-07-01 14:18:53.306', 1, 'https://emagine.nyc3.digitaloceanspaces.com/bazzucasocial/Emagine1.mp4', '[Emagine] Felipe 1', 1, 'Zero trust, zero knowledge, 100% encrypted.
Pandora Vault is how privacidade should workshop. #privacy #datasecurity #encryption #vault #pandoravault');
INSERT INTO public.posts (post_id, network_id, client_id, schedule_date, post_type, s3_key, title, status, description) VALUES (6, 2, 1, '2025-07-10 09:00:00', 1, 'https://emagine.nyc3.digitaloceanspaces.com/bazzucasocial/PandoraVault4.mp4', '[Pandora] Ana 4', 1, 'https://pandoravault.com
Zero trust, zero knowledge, 100% encrypted.
Pandora Vault is how privacidade should workshop. #privacy #datasecurity #encryption #vault #pandoravault');
INSERT INTO public.posts (post_id, network_id, client_id, schedule_date, post_type, s3_key, title, status, description) VALUES (2, 2, 1, '2025-07-08 09:00:00', 1, 'https://emagine.nyc3.digitaloceanspaces.com/bazzucasocial/PandoraVault3.mp4', '[Pandora] Erike 3', 1, 'https://pandoravault.com
Zero trust, zero knowledge, 100% encrypted.
Pandora Vault is how privacidade should workshop. #privacy #datasecurity #encryption #vault #pandoravault');
INSERT INTO public.posts (post_id, network_id, client_id, schedule_date, post_type, s3_key, title, status, description) VALUES (7, 4, 1, '2025-07-08 09:30:00', 1, 'https://emagine.nyc3.digitaloceanspaces.com/bazzucasocial/PandoraVault3.mp4', '[Pandora] Erike 3', 1, 'https://pandoravault.com
Zero trust, zero knowledge, 100% encrypted.
Pandora Vault is how privacidade should workshop. #privacy #datasecurity #encryption #vault #pandoravault');


--
-- TOC entry 4446 (class 0 OID 17354)
-- Dependencies: 218
-- Data for Name: social_networks; Type: TABLE DATA; Schema: public; Owner: doadmin
--

INSERT INTO public.social_networks (network_id, client_id, network_key, url, "user", password, active, access_token, access_secret) VALUES (5, 2, 4, 'sdasdas', 'sdadas', 'asdasd', true, NULL, NULL);
INSERT INTO public.social_networks (network_id, client_id, network_key, url, "user", password, active, access_token, access_secret) VALUES (2, 1, 1, '@pandoravault4', 'pandoravault4@gmail.com', '', true, NULL, NULL);
INSERT INTO public.social_networks (network_id, client_id, network_key, url, "user", password, active, access_token, access_secret) VALUES (4, 1, 2, '@pandoravault4', 'pandoravault4@gmail.com', '', true, NULL, NULL);
INSERT INTO public.social_networks (network_id, client_id, network_key, url, "user", password, active, access_token, access_secret) VALUES (3, 1, 5, '@pandoravault4', 'pandoravault4@gmail.com', '', true, NULL, NULL);
INSERT INTO public.social_networks (network_id, client_id, network_key, url, "user", password, active, access_token, access_secret) VALUES (6, 4, 1, '@landim32official', '@landim32official', NULL, true, NULL, NULL);
INSERT INTO public.social_networks (network_id, client_id, network_key, url, "user", password, active, access_token, access_secret) VALUES (7, 4, 2, '@dev.landim', 'landim32@gmail.com', NULL, true, NULL, NULL);
INSERT INTO public.social_networks (network_id, client_id, network_key, url, "user", password, active, access_token, access_secret) VALUES (8, 3, 1, '@BazzucaMedia', NULL, NULL, true, NULL, NULL);
INSERT INTO public.social_networks (network_id, client_id, network_key, url, "user", password, active, access_token, access_secret) VALUES (9, 3, 2, '@BazzucaMedia', NULL, NULL, true, NULL, NULL);
INSERT INTO public.social_networks (network_id, client_id, network_key, url, "user", password, active, access_token, access_secret) VALUES (10, 3, 4, 'BazzucaMedia', NULL, NULL, true, NULL, NULL);
INSERT INTO public.social_networks (network_id, client_id, network_key, url, "user", password, active, access_token, access_secret) VALUES (11, 3, 5, '@BazzucaMedia', NULL, NULL, true, NULL, NULL);


--
-- TOC entry 4460 (class 0 OID 0)
-- Dependencies: 221
-- Name: clients_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.clients_client_id_seq', 4, true);


--
-- TOC entry 4461 (class 0 OID 0)
-- Dependencies: 219
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 9, true);


--
-- TOC entry 4462 (class 0 OID 0)
-- Dependencies: 217
-- Name: social_networks_network_id_seq; Type: SEQUENCE SET; Schema: public; Owner: doadmin
--

SELECT pg_catalog.setval('public.social_networks_network_id_seq', 11, true);


--
-- TOC entry 4296 (class 2606 OID 17383)
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (client_id);


--
-- TOC entry 4294 (class 2606 OID 17371)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- TOC entry 4292 (class 2606 OID 17361)
-- Name: social_networks social_networks_pkey; Type: CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.social_networks
    ADD CONSTRAINT social_networks_pkey PRIMARY KEY (network_id);


--
-- TOC entry 4298 (class 2606 OID 17389)
-- Name: posts fk_client_post; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT fk_client_post FOREIGN KEY (client_id) REFERENCES public.clients(client_id) NOT VALID;


--
-- TOC entry 4297 (class 2606 OID 17384)
-- Name: social_networks fk_client_social_network; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.social_networks
    ADD CONSTRAINT fk_client_social_network FOREIGN KEY (client_id) REFERENCES public.clients(client_id) NOT VALID;


--
-- TOC entry 4299 (class 2606 OID 17372)
-- Name: posts fk_network_post; Type: FK CONSTRAINT; Schema: public; Owner: doadmin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT fk_network_post FOREIGN KEY (network_id) REFERENCES public.social_networks(network_id);

