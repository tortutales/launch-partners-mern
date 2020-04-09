export const initialState = {
    permissionsSearchValue: '',
    role: {
        description: {
            value: '',
            isValid: false
        },
        roleId: {
            value: null,
            isValid: true
        },
        permissions: {
            value: [],
            isValid: true
        },
        users: {
            value: [],
            isValid: true
        }
    },
    showErrors: false,
    tabIndex: 0,
    usersSearchValue: ''
};
