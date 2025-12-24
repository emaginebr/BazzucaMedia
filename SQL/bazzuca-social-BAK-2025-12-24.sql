--
-- PostgreSQL database dump
--

\restrict XdQcSzq2g5nWFXpGpnizg1FRazkFfe0OOnIA9aha3SZuYGXR9LgOZb1CdTMvV2q

-- Dumped from database version 17.7
-- Dumped by pg_dump version 17.6

-- Started on 2025-12-24 15:49:50

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4450 (class 0 OID 17378)
-- Dependencies: 222
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.clients (client_id, user_id, name, active) VALUES (1, 18, 'Pandora Vault', true);
INSERT INTO public.clients (client_id, user_id, name, active) VALUES (2, 18, 'EasySLA', true);
INSERT INTO public.clients (client_id, user_id, name, active) VALUES (4, 18, 'Emagine', true);
INSERT INTO public.clients (client_id, user_id, name, active) VALUES (3, 18, 'Bazzuca Media', true);


--
-- TOC entry 4448 (class 0 OID 17363)
-- Dependencies: 220
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
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
-- Data for Name: social_networks; Type: TABLE DATA; Schema: public; Owner: -
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
-- TOC entry 4459 (class 0 OID 0)
-- Dependencies: 221
-- Name: clients_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.clients_client_id_seq', 4, true);


--
-- TOC entry 4460 (class 0 OID 0)
-- Dependencies: 219
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 9, true);


--
-- TOC entry 4461 (class 0 OID 0)
-- Dependencies: 217
-- Name: social_networks_network_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.social_networks_network_id_seq', 11, true);


-- Completed on 2025-12-24 15:50:09

--
-- PostgreSQL database dump complete
--

\unrestrict XdQcSzq2g5nWFXpGpnizg1FRazkFfe0OOnIA9aha3SZuYGXR9LgOZb1CdTMvV2q

