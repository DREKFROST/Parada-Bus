/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     23/2/2024 12:35:21                           */
/*==============================================================*/


drop table if exists BUS;

drop table if exists CHOFER;

drop table if exists COOPERATIVA;

drop table if exists DISPOSITIVO;

drop table if exists PARADA;

drop table if exists REGISTRO;

drop table if exists REGISTRO_UBICACION;

drop table if exists UBICACION;

/*==============================================================*/
/* Table: BUS                                                   */
/*==============================================================*/
create table BUS
(
   ID_BUS               int not null AUTO_INCREMENT,
   ID_CHOFER            int not null,
   COLOR_BUS            varchar(25) not null,
   PLACA_BUS            varchar(7) not null,
   NUMERO_BUS           int not null,
   CAPACIDAD            int not null,
   RUTA_BUS             varchar(25) not null,
   ESTADO_BUS           varchar(25) not null,
   primary key (ID_BUS)
);

/*==============================================================*/
/* Table: CHOFER                                                */
/*==============================================================*/
create table CHOFER
(
   ID_CHOFER            int not null AUTO_INCREMENT,
   ID_COOPERATIVA       int not null,
   NOMBRE_CHOFER        varchar(25) not null,
   APELLIDO_CHOFER      varchar(25) not null,
   CEDULA_CHOFER        varchar(10) not null,
   TELEFONO_CHOFER      varchar(25) not null,
   CORREO_CHOFER        varchar(25) not null,
   ESTADO_CHOFER        varchar(25) not null,
   primary key (ID_CHOFER)
);

/*==============================================================*/
/* Table: COOPERATIVA                                           */
/*==============================================================*/
create table COOPERATIVA
(
   ID_COOPERATIVA       int not null AUTO_INCREMENT,
   NOMBRE_COOPERATIVA   varchar(25) not null,
   TELEFONO_COOPERATIVA varchar(10) not null,
   DIRECCION_COOPERATIVA varchar(25) not null,
   USUARIO varchar(25) not null,
   PASSWORD varchar(25) not null,
   primary key (ID_COOPERATIVA)
);

/*==============================================================*/
/* Table: DISPOSITIVO                                           */
/*==============================================================*/
create table DISPOSITIVO
(
   ID_DISPOSITIVO       int not null AUTO_INCREMENT,
   MARCA_DISPOSITIVO    varchar(25) not null,
   FECHA_ADQUISICION    date not null,
   ESTADO_DISPOSITIVO   varchar(25) not null,
   primary key (ID_DISPOSITIVO)
);

/*==============================================================*/
/* Table: PARADA                                                */
/*==============================================================*/
create table PARADA
(
   ID_PARADA            int not null AUTO_INCREMENT,
   NOMBRE_PARADA        varchar(25) not null,
   ESTADO_PARADA        varchar(25) not null,
   SERIE_PANTALLA       varchar(25) not null,
   primary key (ID_PARADA)
);

/*==============================================================*/
/* Table: REGISTRO                                              */
/*==============================================================*/
create table REGISTRO
(
   ID_BUS               int not null,
   ID_PARADA            int not null,
   FECHA_LLEGADA        datetime not null,
   primary key (ID_BUS, ID_PARADA)
);

alter table REGISTRO comment 'Registro de paradas';

/*==============================================================*/
/* Table: REGISTRO_UBICACION                                    */
/*==============================================================*/
create table REGISTRO_UBICACION
(
   ID_BUS               int not null,
   ID_DISPOSITIVO       int not null,
   FECHA_UBICACION      datetime not null,
   primary key (ID_BUS, ID_DISPOSITIVO)
);

/*==============================================================*/
/* Table: UBICACION                                             */
/*==============================================================*/
create table UBICACION
(
   ID_UBICACION         int not null AUTO_INCREMENT,
   ID_DISPOSITIVO       int not null,
   LATITUD              varchar(9),
   LONGITUD             varchar(9),
   primary key (ID_UBICACION)
);

alter table BUS add constraint FK_MANEJA foreign key (ID_CHOFER)
      references CHOFER (ID_CHOFER) on delete restrict on update restrict;

alter table CHOFER add constraint FK_CONTRATA foreign key (ID_COOPERATIVA)
      references COOPERATIVA (ID_COOPERATIVA) on delete restrict on update restrict;

alter table REGISTRO add constraint FK_REGISTRO foreign key (ID_PARADA)
      references PARADA (ID_PARADA) on delete restrict on update restrict;

alter table REGISTRO add constraint FK_REGISTRO2 foreign key (ID_BUS)
      references BUS (ID_BUS) on delete restrict on update restrict;

alter table REGISTRO_UBICACION add constraint FK_REGISTRO_UBICACION foreign key (ID_DISPOSITIVO)
      references DISPOSITIVO (ID_DISPOSITIVO) on delete restrict on update restrict;

alter table REGISTRO_UBICACION add constraint FK_REGISTRO_UBICACION2 foreign key (ID_BUS)
      references BUS (ID_BUS) on delete restrict on update restrict;

alter table UBICACION add constraint FK_ALMACENA foreign key (ID_DISPOSITIVO)
      references DISPOSITIVO (ID_DISPOSITIVO) on delete restrict on update restrict;

