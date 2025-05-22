/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     10/05/2025 11:19:24 a. m.                    */
/*==============================================================*/


/*==============================================================*/
/* Table: tareas                                                */
/*==============================================================*/
create table tareas (
   cod_tarea            serial not null,
   cod_usuario          int2                 null,
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
   contrasena           varchar(20)          not null,
   constraint pk_usuarios primary key (cod_usuario)
);

-- set table ownership
alter table usuarios owner to cesar
;
/*==============================================================*/
/* Table: usuarios_tareas                                       */
/*==============================================================*/
create table usuarios_tareas (
   cod_usuario          int4                 null,
   cod_tarea            int4                 null
);

-- set table ownership
alter table usuarios_tareas owner to cesar
;
alter table usuarios_tareas
   add constraint fk_usuarios_ref_usuarios foreign key (cod_usuario)
      references usuarios (cod_usuario)
      on delete restrict on update restrict;

alter table usuarios_tareas
   add constraint fk_usuarios_ref_tareas foreign key (cod_tarea)
      references tareas (cod_tarea)
      on delete restrict on update restrict;

