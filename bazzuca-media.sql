CREATE TABLE clients (
    client_id bigint NOT NULL,
    user_id bigint NOT NULL,
    name character varying(80) NOT NULL,
    active boolean DEFAULT true NOT NULL
);
--
CREATE TABLE posts (
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
CREATE TABLE social_networks (
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
CREATE SEQUENCE post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
--
CREATE SEQUENCE social_network_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
--
CREATE SEQUENCE client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
--
ALTER SEQUENCE client_id_seq OWNED         BY clients.client_id;
ALTER SEQUENCE social_network_id_seq OWNED BY social_networks.network_id;
ALTER SEQUENCE post_id_seq OWNED           BY posts.post_id;
--
ALTER TABLE ONLY clients         ALTER COLUMN client_id  SET DEFAULT nextval('client_id_seq'::regclass);
ALTER TABLE ONLY posts           ALTER COLUMN post_id    SET DEFAULT nextval('post_id_seq'::regclass);
ALTER TABLE ONLY social_networks ALTER COLUMN network_id SET DEFAULT nextval('social_network_id_seq'::regclass);
--
SELECT pg_catalog.setval('client_id_seq', 1, true);
SELECT pg_catalog.setval('post_id_seq', 1, true);
SELECT pg_catalog.setval('social_network_id_seq', 1, true);
--
ALTER TABLE ONLY clients         ADD CONSTRAINT clients_pkey             PRIMARY KEY (client_id);
ALTER TABLE ONLY posts           ADD CONSTRAINT posts_pkey               PRIMARY KEY (post_id);
ALTER TABLE ONLY social_networks ADD CONSTRAINT social_networks_pkey     PRIMARY KEY (network_id);
--
ALTER TABLE ONLY posts           ADD CONSTRAINT fk_client_post           FOREIGN KEY (client_id)  REFERENCES public.clients(client_id) NOT VALID;
ALTER TABLE ONLY social_networks ADD CONSTRAINT fk_client_social_network FOREIGN KEY (client_id)  REFERENCES public.clients(client_id) NOT VALID;
ALTER TABLE ONLY posts           ADD CONSTRAINT fk_network_post          FOREIGN KEY (network_id) REFERENCES public.social_networks(network_id);