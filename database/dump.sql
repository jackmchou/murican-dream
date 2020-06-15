--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."ppeCartItems" DROP CONSTRAINT uniqconst_productid;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT uniqconst_mdproductid;
ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public."ppeOrders" DROP CONSTRAINT "ppeOrders_pkey";
ALTER TABLE ONLY public."ppeCarts" DROP CONSTRAINT "ppeCarts_pkey";
ALTER TABLE ONLY public."ppeCartItems" DROP CONSTRAINT "ppeCartItems_pkey";
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE ONLY public."ppeProducts" DROP CONSTRAINT "PPEproducts_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public."ppeProducts" ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public."ppeOrders" ALTER COLUMN "ppeOrderId" DROP DEFAULT;
ALTER TABLE public."ppeCarts" ALTER COLUMN "ppeCartId" DROP DEFAULT;
ALTER TABLE public."ppeCartItems" ALTER COLUMN "ppeCartItemId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."ppeOrders_ppeOrderId_seq";
DROP TABLE public."ppeOrders";
DROP SEQUENCE public."ppeCarts_ppeCartId_seq";
DROP TABLE public."ppeCarts";
DROP SEQUENCE public."ppeCartItems_ppeCartItemId_seq";
DROP TABLE public."ppeCartItems";
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP SEQUENCE public."PPEproducts_productId_seq";
DROP TABLE public."ppeProducts";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ppeProducts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ppeProducts" (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: PPEproducts_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."PPEproducts_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: PPEproducts_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."PPEproducts_productId_seq" OWNED BY public."ppeProducts"."productId";


--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "addressOne" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    "zipCode" text NOT NULL,
    "cardMonth" text NOT NULL,
    "cardYear" text NOT NULL,
    "cardCVV" text NOT NULL,
    "addressTwo" text
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: ppeCartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ppeCartItems" (
    "ppeCartItemId" integer NOT NULL,
    "ppeCartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL
);


--
-- Name: ppeCartItems_ppeCartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ppeCartItems_ppeCartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ppeCartItems_ppeCartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ppeCartItems_ppeCartItemId_seq" OWNED BY public."ppeCartItems"."ppeCartItemId";


--
-- Name: ppeCarts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ppeCarts" (
    "ppeCartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: ppeCarts_ppeCartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ppeCarts_ppeCartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ppeCarts_ppeCartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ppeCarts_ppeCartId_seq" OWNED BY public."ppeCarts"."ppeCartId";


--
-- Name: ppeOrders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ppeOrders" (
    "ppeOrderId" integer NOT NULL,
    "ppeCartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "addressOne" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    "zipCode" text NOT NULL,
    "cardMonth" text NOT NULL,
    "cardYear" text NOT NULL,
    "cardCVV" text NOT NULL,
    "addressTwo" text
);


--
-- Name: ppeOrders_ppeOrderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ppeOrders_ppeOrderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ppeOrders_ppeOrderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ppeOrders_ppeOrderId_seq" OWNED BY public."ppeOrders"."ppeOrderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: ppeCartItems ppeCartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ppeCartItems" ALTER COLUMN "ppeCartItemId" SET DEFAULT nextval('public."ppeCartItems_ppeCartItemId_seq"'::regclass);


--
-- Name: ppeCarts ppeCartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ppeCarts" ALTER COLUMN "ppeCartId" SET DEFAULT nextval('public."ppeCarts_ppeCartId_seq"'::regclass);


--
-- Name: ppeOrders ppeOrderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ppeOrders" ALTER COLUMN "ppeOrderId" SET DEFAULT nextval('public."ppeOrders_ppeOrderId_seq"'::regclass);


--
-- Name: ppeProducts productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ppeProducts" ALTER COLUMN "productId" SET DEFAULT nextval('public."PPEproducts_productId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price, quantity) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-03-09 19:35:39.508588-07
2	2020-03-09 19:38:19.045051-07
3	2020-03-09 19:40:51.17456-07
4	2020-03-09 19:41:11.237226-07
5	2020-03-09 19:43:49.915313-07
6	2020-03-09 19:49:54.900126-07
7	2020-03-09 19:53:56.130161-07
8	2020-03-09 19:58:12.275701-07
9	2020-03-09 20:00:50.413126-07
10	2020-03-09 20:02:26.691471-07
11	2020-03-09 20:02:40.553802-07
12	2020-03-09 20:02:53.442272-07
13	2020-03-09 20:09:29.874385-07
14	2020-03-10 08:47:10.858922-07
15	2020-03-10 12:45:35.366819-07
16	2020-03-10 13:03:03.573147-07
17	2020-03-10 13:03:27.634544-07
18	2020-03-10 13:05:09.903233-07
19	2020-03-10 13:05:41.120426-07
20	2020-03-10 15:15:24.147822-07
21	2020-03-10 15:51:45.522436-07
22	2020-03-10 15:52:53.183833-07
23	2020-03-10 17:48:53.431151-07
24	2020-03-10 17:50:48.030637-07
25	2020-03-10 17:53:35.371795-07
26	2020-03-10 18:11:15.753096-07
27	2020-03-11 11:05:55.507979-07
28	2020-04-06 09:31:38.340298-07
29	2020-04-09 18:31:10.979791-07
30	2020-04-10 05:42:21.641765-07
31	2020-04-10 06:09:33.505737-07
32	2020-04-13 16:17:43.91105-07
33	2020-04-15 14:35:08.877762-07
34	2020-04-16 19:55:00.892205-07
35	2020-04-17 09:27:02.5725-07
36	2020-04-18 15:02:12.500266-07
37	2020-04-24 16:50:24.546282-07
39	2020-05-02 09:52:05.175395-07
40	2020-05-03 06:55:27.845959-07
41	2020-05-03 07:44:06.358065-07
42	2020-05-03 07:45:46.912908-07
43	2020-05-05 16:23:50.68821-07
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "addressOne", "createdAt", city, state, "zipCode", "cardMonth", "cardYear", "cardCVV", "addressTwo") FROM stdin;
\.


--
-- Data for Name: ppeCartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ppeCartItems" ("ppeCartItemId", "ppeCartId", "productId", price, quantity) FROM stdin;
180	24	2	50	1
181	25	1	50	1
182	26	1	50	1
65	16	1	50	2
67	18	1	50	1
183	27	5	10000	8
186	28	5	10000	8
187	29	2	50	2
189	30	2	50	4
190	31	3	7500	3
95	20	2	50	1
96	21	1	50	3
99	22	6	300	1
100	22	3	7500	1
191	32	2	50	9
192	33	1	50	13
199	34	5	10000	2
200	34	3	7500	2
201	35	5	10000	2
202	35	3	7500	2
\.


--
-- Data for Name: ppeCarts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ppeCarts" ("ppeCartId", "createdAt") FROM stdin;
1	2020-05-02 06:52:40.902399-07
2	2020-05-02 07:22:33.776256-07
3	2020-05-03 06:30:40.361616-07
4	2020-05-03 07:27:41.05456-07
5	2020-05-03 07:34:05.712695-07
6	2020-05-03 07:40:03.584452-07
7	2020-05-04 16:50:11.357947-07
8	2020-05-06 09:34:46.218972-07
9	2020-05-09 10:27:46.669468-07
10	2020-05-10 08:49:00.94396-07
11	2020-05-11 08:53:11.886592-07
12	2020-05-11 16:23:12.120281-07
13	2020-05-13 11:47:33.119024-07
14	2020-05-24 09:28:25.073527-07
15	2020-05-26 08:54:39.908178-07
16	2020-06-02 12:10:36.442097-07
17	2020-06-02 12:11:45.695732-07
18	2020-06-02 12:49:33.186901-07
19	2020-06-02 13:44:06.850972-07
20	2020-06-03 10:06:13.832887-07
21	2020-06-03 11:50:12.139235-07
22	2020-06-03 16:02:39.973001-07
23	2020-06-04 06:38:57.796693-07
24	2020-06-07 09:03:49.734906-07
25	2020-06-08 16:52:42.163849-07
26	2020-06-08 17:00:43.659595-07
27	2020-06-10 12:50:29.65312-07
28	2020-06-10 17:28:10.289283-07
29	2020-06-12 11:41:47.914064-07
30	2020-06-13 13:10:55.700314-07
31	2020-06-14 13:38:12.296275-07
32	2020-06-14 16:09:31.407418-07
33	2020-06-14 18:36:53.120524-07
34	2020-06-15 10:34:44.523245-07
35	2020-06-15 14:41:10.598156-07
\.


--
-- Data for Name: ppeOrders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ppeOrders" ("ppeOrderId", "ppeCartId", name, "creditCard", "addressOne", "createdAt", city, state, "zipCode", "cardMonth", "cardYear", "cardCVV", "addressTwo") FROM stdin;
6	25	K	1234	123	2020-06-08 17:00:00.94232-07	LA	CA	92457	06	23	784	321
7	26	K	1234	123	2020-06-08 17:00:48.566246-07	LA	CA	92457	06	23	784	\N
8	31	ewfawef	7578657867867867	ewfawfew	2020-06-14 13:56:02.486329-07	ewafwefwef	KY	95994	10	2022	655	
9	32	grdgdgrd	7837863873738738	dgdrgrdg	2020-06-14 17:17:15.844043-07	thth	MD	37378	11	2021	3763	
10	34	Walter White	8758657678678678	sdsadsad	2020-06-15 14:35:55.41809-07	asdasdsa	AR	68777	03	2022	877	
11	35	Walter White	4664654654658788	123 Blue Majik St	2020-06-15 14:42:12.924095-07	Albuquerque	NM	95684	02	2024	545	
\.


--
-- Data for Name: ppeProducts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ppeProducts" ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Surgical Mask	50	/images/surgicalmask.png	Designed to prevent infections in patients and treating personnel	Pop-up venmo listicle keytar hoodie flannel kogi sartorial echo park pinterest man bun put a bird on it prism yr. Sriracha echo park tumeric, williamsburg brooklyn viral wayfarers food truck hell of blog irony meditation. Single-origin coffee meditation fanny pack hashtag keytar raclette chillwave plaid fixie iceland raw denim mustache tumeric literally. Blue bottle gluten-free shaman adaptogen everyday carry tumeric echo park you probably haven't heard of them actually pop-up hot chicken ennui stumptown kombucha ethical. Yr literally godard flexitarian hammock, XOXO tilde squid authentic stumptown. Unicorn offal jean shorts lo-fi pork belly.
3	Respirator	7500	/images/respirator.png	Designed to protect the wearer from inhaling hazardous atmospheres	Trust fund tacos tumeric fanny pack, kogi tofu mustache venmo small batch. Beard dreamcatcher direct trade 3 wolf moon, humblebrag vaporware fingerstache. Fixie palo santo flexitarian glossier keytar gochujang snackwave. Ethical pop-up meggings, succulents banh mi migas shoreditch jianbing tousled before they sold out forage typewriter raclette humblebrag skateboard. Four dollar toast 8-bit taiyaki paleo poutine kinfolk everyday carry cronut austin authentic. Try-hard next level jean shorts, tacos wolf hexagon aesthetic fixie distillery. Man braid vaporware squid street art farm-to-table heirloom 90's fingerstache vegan keytar cornhole enamel pin hashtag man bun.
4	Gloves	100	/images/gloves.png	Protect hands against cold or heat, damage by friction, abrasion or chemicals, and disease	Trust fund tacos tumeric fanny pack, kogi tofu mustache venmo small batch. Beard dreamcatcher direct trade 3 wolf moon, humblebrag vaporware fingerstache. Fixie palo santo flexitarian glossier keytar gochujang snackwave. Ethical pop-up meggings, succulents banh mi migas shoreditch jianbing tousled before they sold out forage typewriter raclette humblebrag skateboard. Four dollar toast 8-bit taiyaki paleo poutine kinfolk everyday carry cronut austin authentic. Try-hard next level jean shorts, tacos wolf hexagon aesthetic fixie distillery. Man braid vaporware squid street art farm-to-table heirloom 90's fingerstache vegan keytar cornhole enamel pin hashtag man bun.
5	Hazmat Suit	10000	/images/hazmat.png	Whole-body garment worn as protection against hazardous materials	Disrupt chambray listicle adaptogen. Raclette offal asymmetrical subway tile post-ironic yr. Semiotics yr enamel pin cliche microdosing bicycle rights. Franzen af asymmetrical cornhole meditation. Neutra trust fund everyday carry intelligentsia shabby chic gochujang schlitz, poke pok pok retro ennui photo booth. Pork belly paleo gentrify mustache, locavore meggings blog.
6	Hand Sanitizer	300	/images/handsanitizer.png	Alcohol based liquid gel used to protect against germs and viruses	Pop-up venmo listicle keytar hoodie flannel kogi sartorial echo park pinterest man bun put a bird on it prism yr. Sriracha echo park tumeric, williamsburg brooklyn viral wayfarers food truck hell of blog irony meditation. Single-origin coffee meditation fanny pack hashtag keytar raclette chillwave plaid fixie iceland raw denim mustache tumeric literally. Blue bottle gluten-free shaman adaptogen everyday carry tumeric echo park you probably haven't heard of them actually pop-up hot chicken ennui stumptown kombucha ethical. Yr literally godard flexitarian hammock, XOXO tilde squid authentic stumptown. Unicorn offal jean shorts lo-fi pork belly.
2	N95 Mask	50	/images/n95mask.png	A particulate-filtering facepiece respirator that meets the U.S N95 classification of air filtration	Disrupt chambray listicle adaptogen. Raclette offal asymmetrical subway tile post-ironic yr. Semiotics yr enamel pin cliche microdosing bicycle rights. Franzen af asymmetrical cornhole meditation. Neutra trust fund everyday carry intelligentsia shabby chic gochujang schlitz, poke pok pok retro ennui photo booth. Pork belly paleo gentrify mustache, locavore meggings blog.
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Money	999999999	/images/money.png	The Money	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
2	Freedom	0	/images/freedomeagle.jpg	The Freedom	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
3	House	9000	/images/whitepicketfence.jpg	The House	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
4	Car	45000	/images/car.png	The Car	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
5	Food	500	/images/food.jpg	Sustenance	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
6	National Parks	100	/images/parks.jpg	The views	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
7	Guns	1500	/images/guns.png	The Rights	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
8	Health Care	2500	/images/healthcare.png	Health?	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
9	Car 2	90000	/images/car2.png	The second car	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
10	Car 3	180000	/images/car3.png	The third car	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
11	Wife	999999999	/images/wife.jpg	The partner	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
12	Husband	999999999	/images/husband.jpg	The partner	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
13	Big House 1	27500	/images/brickhouse.png	The Big House	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
14	Big House 2	39900	/images/carhouse.png	The Bigger House	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
15	Big House 3	25000	/images/greyhouse.png	The Bigger House	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
16	Big House 4	32499	/images/poolhouse.png	The even bigger house	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
17	Big House 5	35000	/images/southernhouse.png	The 2nd biggest house	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
18	Big House 6	40000	/images/modernhouse.png	The biggest house	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
19	Shake Weight	2999	/images/shake-weight.jpg	Dynamic Inertia technology ignites muscles in arms, shoulders, and chest.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
20	ShamWow	2595	/images/shamwow.jpg	It's like a chamois, towel, and sponge, all in one! Soaks up to 10x it's weight in any liquid!	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
21	Snuggie	2900	/images/snuggie.jpg	Super-Soft Fleece with pockets! One Size fits all Adults! Keeps you Warm & Your Hands-Free!	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
22	Wax Vac	999	/images/wax-vac.jpg	Gentle way to remove ear wax. Safe and hygienic. Reduces the risk of painful infections.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
23	Ostrich Pillow	9900	/images/ostrich-pillow.jpg	Create your own snugly space in the world and feel-good anywhere with the ultimate cocoon pillow.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
24	Tater Mitts	830	/images/tater-mitts.jpg	8 Seconds is all you need with Tater Mitts. Quickly and easily prepare all your favorite potato dishes with Tater Mitts.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock\\n.Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
\.


--
-- Name: PPEproducts_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."PPEproducts_productId_seq"', 1, false);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 206, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 43, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 11, true);


--
-- Name: ppeCartItems_ppeCartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ppeCartItems_ppeCartItemId_seq"', 202, true);


--
-- Name: ppeCarts_ppeCartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ppeCarts_ppeCartId_seq"', 35, true);


--
-- Name: ppeOrders_ppeOrderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ppeOrders_ppeOrderId_seq"', 11, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: ppeProducts PPEproducts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ppeProducts"
    ADD CONSTRAINT "PPEproducts_pkey" PRIMARY KEY ("productId");


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: ppeCartItems ppeCartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ppeCartItems"
    ADD CONSTRAINT "ppeCartItems_pkey" PRIMARY KEY ("ppeCartItemId");


--
-- Name: ppeCarts ppeCarts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ppeCarts"
    ADD CONSTRAINT "ppeCarts_pkey" PRIMARY KEY ("ppeCartId");


--
-- Name: ppeOrders ppeOrders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ppeOrders"
    ADD CONSTRAINT "ppeOrders_pkey" PRIMARY KEY ("ppeOrderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: cartItems uniqconst_mdproductid; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT uniqconst_mdproductid UNIQUE ("cartId", "productId");


--
-- Name: ppeCartItems uniqconst_productid; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ppeCartItems"
    ADD CONSTRAINT uniqconst_productid UNIQUE ("ppeCartId", "productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

