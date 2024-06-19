export const ROWS_DEFAULT = 5;
export const ROWS_OPTIONS = [5,10, 25, 50];

export interface PageEvent {
    first: number | any;
    rows: number | any;
    page: number | any;
    pageCount: number | any;
}


export const MSG_CRUD = {
    MsgActualizadaRegistrada: 'Información Registrada o Actualizada.',
    MsgAgregarComentario: 'Ingresar comentario',
}

export const Perfiles = {
    PerfilGerente:2073,
}

export const KeysLocalStorage ={
    InfoUsuario:"usuarioSession",
    Token:"accessToken"
}