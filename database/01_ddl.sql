/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     24/08/2025 11:23:20 a. m.                    */
/*==============================================================*/


/*==============================================================*/
/* Table: tareas                                                */
/*==============================================================*/
create table tareas (
   cod_tarea            serial not null,
   cod_usuario          int4                 not null,
   nombre               varchar(100)         not null,
   fecha                date                 not null,
   estado               varchar(50)          not null,
   constraint pk_tareas primary key (cod_tarea)
);

-- set table ownership
alter table tareas owner to cesar
;
/*==============================================================*/
/* Table: usuarios                                              */
/*==============================================================*/
create table usuarios (
   cod_usuario          serial not null,
   nombre               varchar(120)         not null,
   correo               varchar(100)         not null,
   contrasena           varchar(80)          not null,
   rol                  varchar(50)          not null,
   constraint pk_usuarios primary key (cod_usuario)
);

-- set table ownership
alter table usuarios owner to cesar
;
alter table tareas
   add constraint fk_tareas_reference_usuarios foreign key (cod_usuario)
      references usuarios (cod_usuario)
      on delete restrict on update restrict;

