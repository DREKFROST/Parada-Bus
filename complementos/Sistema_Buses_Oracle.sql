/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     20/2/2024 19:01:48                           */
/*==============================================================*/


alter table BUS
   drop constraint FK_BUS_MANEJA_CHOFER;

alter table CHOFER
   drop constraint FK_CHOFER_CONTRATA_COOPERAT;

alter table REGISTRO
   drop constraint FK_REGISTRO_REGISTRO_PARADA;

alter table REGISTRO
   drop constraint FK_REGISTRO_REGISTRO2_BUS;

alter table REGISTRO_UBICACION
   drop constraint FK_REGISTRO_REGISTRO__DISPOSIT;

alter table REGISTRO_UBICACION
   drop constraint FK_REGISTRO_REGISTRO__BUS;

alter table UBICACION
   drop constraint FK_UBICACIO_ALMACENA_DISPOSIT;

drop index MANEJA_FK;

drop table BUS cascade constraints;

drop index CONTRATA_FK;

drop table CHOFER cascade constraints;

drop table COOPERATIVA cascade constraints;

drop table DISPOSITIVO cascade constraints;

drop table PARADA cascade constraints;

drop index REGISTRO_FK;

drop index REGISTRO2_FK;

drop table REGISTRO cascade constraints;

drop index REGISTRO_UBICACION_FK;

drop index REGISTRO_UBICACION2_FK;

drop table REGISTRO_UBICACION cascade constraints;

drop index ALMACENA_FK;

drop table UBICACION cascade constraints;

DROP SEQUENCE SEQ_BUS;
DROP SEQUENCE SEQ_CHOFER;
DROP SEQUENCE SEQ_DISPOSITIVO;
DROP SEQUENCE SEQ_PARADA;
DROP SEQUENCE SEQ_COOPERATIVA;
DROP SEQUENCE SEQ_UBICACION;

CREATE SEQUENCE SEQ_BUS
   START WITH 1
   INCREMENT BY 1;

CREATE SEQUENCE SEQ_CHOFER
   START WITH 1
   INCREMENT BY 1;

CREATE SEQUENCE SEQ_DISPOSITIVO
   START WITH 1
   INCREMENT BY 1;

CREATE SEQUENCE SEQ_PARADA
   START WITH 1
   INCREMENT BY 1;

CREATE SEQUENCE SEQ_COOPERATIVA
   START WITH 1
   INCREMENT BY 1;

CREATE SEQUENCE SEQ_UBICACION
   START WITH 1
   INCREMENT BY 1;

/*==============================================================*/
/* Table: BUS                                                   */
/*==============================================================*/
create table BUS 
(
   ID_BUS               INTEGER              DEFAULT SEQ_BUS.nextval,
   ID_CHOFER            INTEGER              not null,
   COLOR_BUS            VARCHAR2(25)         not null,
   PLACA_BUS            VARCHAR2(7)          not null,
   NUMERO_BUS           INTEGER              not null,
   CAPACIDAD            INTEGER              not null,
   RUTA_BUS             VARCHAR2(25)         not null,
   ESTADO_BUS           VARCHAR2(25)         not null,
   constraint PK_BUS primary key (ID_BUS)
);

/*==============================================================*/
/* Index: MANEJA_FK                                             */
/*==============================================================*/
create index MANEJA_FK on BUS (
   ID_CHOFER ASC
);

/*==============================================================*/
/* Table: CHOFER                                                */
/*==============================================================*/
create table CHOFER 
(
   ID_CHOFER            INTEGER              DEFAULT SEQ_CHOFER.nextval,
   ID_COOPERATIVA       INTEGER              not null,
   NOMBRE_CHOFER        VARCHAR2(25)         not null,
   APELLIDO_CHOFER      VARCHAR2(25)         not null,
   CEDULA_CHOFER        varchar2(10)         not null,
   TELEFONO_CHOFER      VARCHAR2(25)         not null,
   CORREO_CHOFER        VARCHAR2(25)         not null,
   ESTADO_CHOFER        VARCHAR2(25)         not null,
   constraint PK_CHOFER primary key (ID_CHOFER)
);

/*==============================================================*/
/* Index: CONTRATA_FK                                           */
/*==============================================================*/
create index CONTRATA_FK on CHOFER (
   ID_COOPERATIVA ASC
);

/*==============================================================*/
/* Table: COOPERATIVA                                           */
/*==============================================================*/
create table COOPERATIVA 
(
   ID_COOPERATIVA       INTEGER              DEFAULT SEQ_COOPERATIVA.nextval,
   NOMBRE_COOPERATIVA   VARCHAR2(25)         not null,
   TELEFONO_COOPERATIVA VARCHAR2(10)         not null,
   DIRECCION_COOPERATIVA VARCHAR2(25)         not null,
   USUARIO varchar2(25) not null,
   PASSWORD varchar2(25) not null,
   constraint PK_COOPERATIVA primary key (ID_COOPERATIVA)
);

/*==============================================================*/
/* Table: DISPOSITIVO                                           */
/*==============================================================*/
create table DISPOSITIVO 
(
   ID_DISPOSITIVO       INTEGER              DEFAULT SEQ_DISPOSITIVO.nextval,
   MARCA_DISPOSITIVO    VARCHAR2(25)         not null,
   FECHA_ADQUISICION    DATE                 not null,
   ESTADO_DISPOSITIVO   VARCHAR2(25)         not null,
   constraint PK_DISPOSITIVO primary key (ID_DISPOSITIVO)
);

/*==============================================================*/
/* Table: PARADA                                                */
/*==============================================================*/
create table PARADA 
(
   ID_PARADA            INTEGER              DEFAULT SEQ_PARADA.nextval,
   NOMBRE_PARADA        VARCHAR2(25)         not null,
   ESTADO_PARADA        VARCHAR2(25)         not null,
   SERIE_PANTALLA       VARCHAR2(25)         not null,
   constraint PK_PARADA primary key (ID_PARADA)
);

/*==============================================================*/
/* Table: REGISTRO                                              */
/*==============================================================*/
create table REGISTRO 
(
   ID_BUS               INTEGER              not null,
   ID_PARADA            INTEGER              not null,
   FECHA_LLEGADA        DATE                 not null,
   constraint PK_REGISTRO primary key (ID_BUS, ID_PARADA)
);

comment on table REGISTRO is
'Registro de paradas';

/*==============================================================*/
/* Index: REGISTRO2_FK                                          */
/*==============================================================*/
create index REGISTRO2_FK on REGISTRO (
   ID_BUS ASC
);

/*==============================================================*/
/* Index: REGISTRO_FK                                           */
/*==============================================================*/
create index REGISTRO_FK on REGISTRO (
   ID_PARADA ASC
);

/*==============================================================*/
/* Table: REGISTRO_UBICACION                                    */
/*==============================================================*/
create table REGISTRO_UBICACION 
(
   ID_BUS               INTEGER              not null,
   ID_DISPOSITIVO       INTEGER              not null,
   FECHA_UBICACION      DATE                 not null,
   constraint PK_REGISTRO_UBICACION primary key (ID_BUS, ID_DISPOSITIVO)
);

/*==============================================================*/
/* Index: REGISTRO_UBICACION2_FK                                */
/*==============================================================*/
create index REGISTRO_UBICACION2_FK on REGISTRO_UBICACION (
   ID_BUS ASC
);

/*==============================================================*/
/* Index: REGISTRO_UBICACION_FK                                 */
/*==============================================================*/
create index REGISTRO_UBICACION_FK on REGISTRO_UBICACION (
   ID_DISPOSITIVO ASC
);

/*==============================================================*/
/* Table: UBICACION                                             */
/*==============================================================*/
create table UBICACION 
(
   ID_UBICACION         INTEGER             DEFAULT SEQ_UBICACION.nextval,
   ID_DISPOSITIVO       INTEGER              not null,
   LATITUD              VARCHAR2(9),
   LONGITUD             VARCHAR2(9),
   constraint PK_UBICACION primary key (ID_UBICACION)
);

/*==============================================================*/
/* Index: ALMACENA_FK                                           */
/*==============================================================*/
create index ALMACENA_FK on UBICACION (
   ID_DISPOSITIVO ASC
);

alter table BUS
   add constraint FK_BUS_MANEJA_CHOFER foreign key (ID_CHOFER)
      references CHOFER (ID_CHOFER);

alter table CHOFER
   add constraint FK_CHOFER_CONTRATA_COOPERAT foreign key (ID_COOPERATIVA)
      references COOPERATIVA (ID_COOPERATIVA);

alter table REGISTRO
   add constraint FK_REGISTRO_REGISTRO_PARADA foreign key (ID_PARADA)
      references PARADA (ID_PARADA);

alter table REGISTRO
   add constraint FK_REGISTRO_REGISTRO2_BUS foreign key (ID_BUS)
      references BUS (ID_BUS);

alter table REGISTRO_UBICACION
   add constraint FK_REGISTRO_REGISTRO__DISPOSIT foreign key (ID_DISPOSITIVO)
      references DISPOSITIVO (ID_DISPOSITIVO);

alter table REGISTRO_UBICACION
   add constraint FK_REGISTRO_REGISTRO__BUS foreign key (ID_BUS)
      references BUS (ID_BUS);

alter table UBICACION
   add constraint FK_UBICACIO_ALMACENA_DISPOSIT foreign key (ID_DISPOSITIVO)
      references DISPOSITIVO (ID_DISPOSITIVO);

