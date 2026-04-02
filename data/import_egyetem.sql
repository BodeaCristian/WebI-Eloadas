SET NAMES utf8mb4;
USE egyetem;

-- Clean tables before import (respect FK order)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE eloadas;
TRUNCATE TABLE mozi;
TRUNCATE TABLE film;
SET FOREIGN_KEY_CHECKS = 1;

-- film.txt (tab-separated, first line is header)
LOAD DATA LOCAL INFILE 'data/film.txt'
INTO TABLE film
CHARACTER SET utf8mb4
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@id, @cim, @ev, @hossz)
SET
  id = CAST(@id AS UNSIGNED),
  cim = @cim,
  ev = CAST(@ev AS UNSIGNED),
  hossz = CAST(REPLACE(@hossz, '\r', '') AS UNSIGNED);

-- mozi.txt
LOAD DATA LOCAL INFILE 'data/mozi.txt'
INTO TABLE mozi
CHARACTER SET utf8mb4
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@id, @nev, @varos, @ferohely)
SET
  id = CAST(@id AS UNSIGNED),
  nev = @nev,
  varos = @varos,
  ferohely = CAST(REPLACE(@ferohely, '\r', '') AS UNSIGNED);

-- eloadas.txt uses YYYY.MM.DD, so load to temp first and convert date.
CREATE TEMPORARY TABLE tmp_eloadas (
  filmid INT,
  moziid INT,
  datum_raw VARCHAR(20),
  nezoszam INT,
  bevetel INT
);

LOAD DATA LOCAL INFILE 'data/eloadas.txt'
INTO TABLE tmp_eloadas
CHARACTER SET utf8mb4
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@filmid, @moziid, @datum_raw, @nezoszam, @bevetel)
SET
  filmid = CAST(@filmid AS UNSIGNED),
  moziid = CAST(@moziid AS UNSIGNED),
  datum_raw = REPLACE(@datum_raw, '\r', ''),
  nezoszam = CAST(@nezoszam AS UNSIGNED),
  bevetel = CAST(REPLACE(@bevetel, '\r', '') AS UNSIGNED);

INSERT INTO eloadas (filmid, moziid, datum, nezoszam, bevetel)
SELECT
  filmid,
  moziid,
  STR_TO_DATE(datum_raw, '%Y.%m.%d') AS datum,
  nezoszam,
  bevetel
FROM tmp_eloadas;

DROP TEMPORARY TABLE tmp_eloadas;
