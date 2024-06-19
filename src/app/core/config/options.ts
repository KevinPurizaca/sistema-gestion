export const ROWS_DEFAULT = 10;
export const ROWS_OPTIONS = [10, 25, 50];

export interface PageEvent {
    first: number | any;
    rows: number | any;
    page: number | any;
    pageCount: number | any;
}


export const MSG_CRUD = {
    MSG_ACTUALIZADA: 'Información Actualizada.',
    MSG_REGISTRADA:  'Información Registrada.',
    MsgActualizadaRegistrada: 'Información Registrada o Actualizada.',
    MSG_ELIMINADA:  'Información Eliminada.',
    MSG_APROBADO:   'Información Aprobado.',
    MSG_PREGUNTA_ELIMINAR:  '¿Desea eliminar el registro?' 
}

export const Perfiles = {
    Perfil1:1,
    Perfil2:3
}