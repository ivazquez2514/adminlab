import FormActions from './form-actions.enum';

const permissions = {
    movements: {
        SuperAdministrador: [],
        Administrador: [
            FormActions.LIST,
            FormActions.DETAIL,
            FormActions.UPDATE,
            FormActions.DELETE
        ],
        Encargado: [
            FormActions.LIST,
            FormActions.DETAIL
        ],
        Consultor: []
    },
    cabinets: {
        SuperAdministrador: [],
        Administrador: [
            FormActions.LIST,
            FormActions.DETAIL
        ],
        Encargado: [
            FormActions.LIST
        ],
        Consultor: [
            FormActions.LIST,
            FormActions.DETAIL
        ]
    },
    collaborators: {
        SuperAdministrador: [
            FormActions.DETAIL,
            FormActions.UPDATE,
            FormActions.DELETE
        ],
        Administrador: [
            FormActions.LIST,
            FormActions.DETAIL,
            FormActions.UPDATE,
            FormActions.DELETE
        ],
        Encargado: [],
        Consultor: []
    },
    areas: {
        SuperAdministrador: [
            FormActions.LIST,
            FormActions.DETAIL,
            FormActions.UPDATE,
            FormActions.DELETE
        ],
        Administrador: [],
        Encargado: [],
        Consultor: []
    },
    patientRecords: {
        SuperAdministrador: [],
        Administrador: [
            FormActions.LIST,
            FormActions.DETAIL,
            FormActions.UPDATE,
            FormActions.DELETE
        ],
        Encargado: [
            FormActions.LIST,
            FormActions.DETAIL,
            FormActions.UPDATE,
            FormActions.DELETE
        ],
        Consultor: []
    }
}

export default permissions;