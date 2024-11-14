DROP DATABASE IF EXISTS andrainjato;

CREATE DATABASE IF NOT EXISTS andrainjato;
USE andrainjato;
# -----------------------------------------------------------------------------
#       TABLE : COMMENTAIRE
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS COMMENTAIRE
 (
   IDCOMS BIGINT(9) NOT NULL  ,
   IDCOMSREACT BIGINT(9) NOT NULL  ,
   IDUSER INTEGER(9) NOT NULL  ,
   IDCOMS_REPONDRE BIGINT(9) NOT NULL  ,
   IDUSER_COMS INTEGER(9) NOT NULL  ,
   IDPUB SMALLINT(9) NOT NULL  ,
   COMS_CONTENU VARCHAR(255) NULL  ,
   DATE_COMS DATETIME NULL  
   , PRIMARY KEY (IDCOMS) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : USER
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS USER
 (
   IDUSER INTEGER(9) NOT NULL  ,
   PSEUDO CHAR(32) NULL  ,
   PASSWORD CHAR(64) NULL  ,
   EMAIL CHAR(64) NULL  
   , PRIMARY KEY (IDUSER) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : PUB_REACTION
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS PUB_REACTION
 (
   IDPUBREACT BIGINT(9) NOT NULL  ,
   IDPUB SMALLINT(9) NOT NULL  ,
   IDUSER INTEGER(9) NOT NULL  ,
   TYPEPUBREACT CHAR(32) NULL  
   , PRIMARY KEY (IDPUBREACT) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : COMS_REACTION
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS COMS_REACTION
 (
   IDCOMSREACT BIGINT(9) NOT NULL  ,
   TYPECOMSREACT CHAR(32) NULL  
   , PRIMARY KEY (IDCOMSREACT) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : PUB
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS PUB
 (
   IDPUB SMALLINT(9) NOT NULL  ,
   IDUSER INTEGER(9) NOT NULL  ,
   CONTENU VARCHAR(1025) NULL  ,
   DATEPUB DATETIME NULL  
   , PRIMARY KEY (IDPUB) 
 ) 
 comment = "";


# -----------------------------------------------------------------------------
#       CREATION DES REFERENCES DE TABLE
# -----------------------------------------------------------------------------


ALTER TABLE COMMENTAIRE 
  ADD FOREIGN KEY FK_COMMENTAIRE_COMS_REACTION (IDCOMSREACT)
      REFERENCES COMS_REACTION (IDCOMSREACT) ;


ALTER TABLE COMMENTAIRE 
  ADD FOREIGN KEY FK_COMMENTAIRE_USER (IDUSER)
      REFERENCES USER (IDUSER) ;


ALTER TABLE COMMENTAIRE 
  ADD FOREIGN KEY FK_COMMENTAIRE_COMMENTAIRE (IDCOMS_REPONDRE)
      REFERENCES COMMENTAIRE (IDCOMS) ;


ALTER TABLE COMMENTAIRE 
  ADD FOREIGN KEY FK_COMMENTAIRE_USER1 (IDUSER_COMS)
      REFERENCES USER (IDUSER) ;


ALTER TABLE COMMENTAIRE 
  ADD FOREIGN KEY FK_COMMENTAIRE_PUB (IDPUB)
      REFERENCES PUB (IDPUB) ;


ALTER TABLE PUB_REACTION 
  ADD FOREIGN KEY FK_PUB_REACTION_PUB (IDPUB)
      REFERENCES PUB (IDPUB) ;


ALTER TABLE PUB_REACTION 
  ADD FOREIGN KEY FK_PUB_REACTION_USER (IDUSER)
      REFERENCES USER (IDUSER) ;


ALTER TABLE PUB 
  ADD FOREIGN KEY FK_PUB_USER (IDUSER)
      REFERENCES USER (IDUSER) ;