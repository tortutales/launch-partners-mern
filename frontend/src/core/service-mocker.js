// @packages
import MockAdapter from 'axios-mock-adapter';
import _ from 'lodash';
import axios from 'axios';

// @scripts
import { config } from '../config';
import { constants } from '../core';

import {
    addMasterDataItem,
    copyObjInCamelCase,
    decodeBase64String,
    deleteMasterDataItem,
    encodeBase64String,
    getMaxFromArray,
    paginateArray,
    updateMasterDataItem
} from '../util';

// @constants
const HTTP_SUCCESS_CODE = 200;

const getParams = (call) => {
    const params = copyObjInCamelCase(
        call.params || JSON.parse(call.data).params || JSON.parse(call.data)
    );

    if (params.sortKey) {
        params.sortKey = _.lowerFirst(params.sortKey);
    }

    return params;
};

const createHttpResponse = ({
    data = null,
    httpCode = HTTP_SUCCESS_CODE,
    message = null,
    messageType = null,
    success = true
}) => ([httpCode, {
    data,
    message,
    messageType,
    success
}]);

const mockGenericSearchSvc = (mockAdapter, url, items) => {
    mockAdapter.onPost(url).reply((call) => {
        const {
            pageNumber,
            pageSize,
            sortDirection,
            sortKey
        } = getParams(call);

        const pageCount = Math.ceil(items.length / pageSize);

        const paginatedArray = paginateArray({
            pageNumber,
            pageSize,
            sortDirection,
            sortKey,
            source: items
        });

        return createHttpResponse({
            data: {
                items: paginatedArray,
                pageCount,
                pageNumber,
                pageSize,
                recordCount: items.length,
                sortDirection,
                sortKey
            }
        });
    });
};

const mockAppSettingGetAllSvc = (mockAdapter) => {
    const url = config.services.setting.getAll;

    mockAdapter.onGet(url).reply(() =>
        createHttpResponse({
            data: config.mockData.appSettingGetAllSvcResponse
        }));
};

const mockAppSettingSaveSvc = (mockAdapter) => {
    const url = config.services.setting.save;

    mockAdapter.onPatch(url).reply((call) => {
        const settings = getParams(call);

        return createHttpResponse({
            data: settings,
            message: config.text.appSettings.saveSuccess,
            messageType: 'success'
        });
    });
};

const mockLogSearchSvc = (mockAdapter) => {
    mockGenericSearchSvc(
        mockAdapter,
        config.services.log.search,
        config.mockData.logSearchSvcResponse
    );
};

const mockMasterDataDeleteSvc = (mockAdapter) => {
    const url = config.services.masterData.delete;

    mockAdapter.onDelete(url).reply((call) => {
        const { masterDataId } = getParams(call);
        config.mockData.masterDataSvcResponse = deleteMasterDataItem(
            config.mockData.masterDataSvcResponse, masterDataId
        );
        return createHttpResponse({
            data: {
                success: true,
                masterDataId
            },
            message: config.text.notifications.delete,
            messageType: constants.notificationType.SUCCESS
        });
    });
};

const mockMasterDataUpdateSvc = (mockAdapter) => {
    const url = config.services.masterData.update;

    mockAdapter.onPatch(url).reply((call) => {
        const {
            code,
            description,
            id,
            masterDataId
        } = getParams(call);

        const item = {
            code,
            description,
            id,
            masterDataId
        };

        const result = updateMasterDataItem(config.mockData.masterDataSvcResponse, item);

        if (result.result === true) {
            config.mockData.masterDataSvcResponse = result.masterData;

            return createHttpResponse({
                data: result.item,
                message: config.text.notifications.update,
                messageType: constants.notificationType.SUCCESS
            });
        }

        return createHttpResponse({
            message: result.result,
            messageType: constants.notificationType.ERROR,
            success: false
        });
    });
};

const mockMasterDataGetAllSvc = (mockAdapter) => {
    const url = config.services.masterData.getAll;

    mockAdapter.onGet(url).reply(() =>
        createHttpResponse({
            data: config.mockData.masterDataSvcResponse
        }));
};

const mockMasterDataInsertSvc = (mockAdapter) => {
    const url = config.services.masterData.insert;

    mockAdapter.onPut(url).reply((call) => {
        const {
            code,
            description,
            id,
            parentId
        } = getParams(call);

        const item = {
            addPermission: null,
            autoId: false,
            children: null,
            code,
            deletePermission: null,
            description,
            editPermission: null,
            id,
            masterDataId: null,
            parentId
        };

        const result = addMasterDataItem(config.mockData.masterDataSvcResponse, item);

        if (result.result === true) {
            config.mockData.masterDataSvcResponse = result.masterData;

            return createHttpResponse({
                data: result.item,
                message: config.text.notifications.insert,
                messageType: constants.notificationType.SUCCESS
            });
        }

        return createHttpResponse({
            message: result.result,
            messageType: constants.notificationType.ERROR,
            success: false
        });
    });
};

const mockSecurityInsertRoleSvc = (mockAdapter) => {
    const url = config.services.security.insertRole;

    mockAdapter.onPut(url).reply((call) => {
        const payload = getParams(call);
        const maxRoleId = getMaxFromArray({
            defaultValue: 0,
            maxKey: 'roleId',
            source: config.mockData.securityGetAllRolesSvcResponse
        });

        const role = Object.assign({}, payload, {
            roleId: maxRoleId + 1,
            users: payload.users
                .map(userId => config.mockData.securityGetAllUsersSvcResponse.find(x => x.userId === userId)),
            permissions: payload.permissions
                .map(permissionId =>
                    config.mockData.securityGetAllPermissionsSvcResponse.find(x => x.permissionId === permissionId))
        });

        config.mockData.securityGetAllRolesSvcResponse.push(role);
        return createHttpResponse({
            data: {
                role,
                success: true
            }
        });
    });
};

const mockSecurityDeleteRoleSvc = (mockAdapter) => {
    const url = config.services.security.deleteRole;

    mockAdapter.onDelete(url).reply((call) => {
        const { roleId } = getParams(call);
        return createHttpResponse({
            data: {
                success: true,
                roleId
            },
            message: config.text.notifications.delete,
            messageType: constants.notificationType.SUCCESS
        });
    });
};

const mockSecurityGetAllPermissions = (mockAdapter) => {
    const url = config.services.security.getAllPermissions;

    mockAdapter.onGet(url).reply(() =>
        createHttpResponse({
            data: config.mockData.securityGetAllPermissionsSvcResponse
        }));
};

const mockSecurityGetAllUsers = (mockAdapter) => {
    const url = config.services.security.getAllUsers;

    mockAdapter.onGet(url).reply(() =>
        createHttpResponse({
            data: config.mockData.securityGetAllUsersSvcResponse
        }));
};

const mockSecurityGetAllRoles = (mockAdapter) => {
    const url = config.services.security.getAllRoles;

    mockAdapter.onGet(url).reply(() =>
        createHttpResponse({
            data: config.mockData.securityGetAllRolesSvcResponse
        }));
};

const mockSecurityLoginSvc = (mockAdapter) => {
    const url = config.services.security.login;

    mockAdapter.onPost(url).reply((call) => {
        const { email, password } = getParams(call);
        const { loginEmail, loginPassword } = config.settings.serviceMocker;

        const success =
            (email === loginEmail) &&
            (password === decodeBase64String(loginPassword));

        return createHttpResponse({
            data: success ? config.mockData.securityLoginSvcResponse : null,
            message: success ? null : config.text.loginPage.invalidCredentials,
            messageType: success ? null : constants.notificationType.ERROR,
            success
        });
    });
};

const mockSecurityUpdateLanguageSvc = (mockAdapter) => {
    const url = config.services.security.updateLanguage;

    mockAdapter.onPost(url).reply((call) => {
        const { languageCode } = getParams(call);

        return createHttpResponse({ data: languageCode });
    });
};

const mockSecurityUpdateRoleSvc = (mockAdapter) => {
    const url = config.services.security.updateRole;

    mockAdapter.onPatch(url).reply((call) => {
        const payload = getParams(call);
        const role = Object.assign({}, payload, {
            users: payload.users
                .map(userId => config.mockData.securityGetAllUsersSvcResponse.find(x => x.userId === userId)),
            permissions: payload.permissions
                .map(permissionId =>
                    config.mockData.securityGetAllPermissionsSvcResponse.find(x => x.permissionId === permissionId))
        });
        return createHttpResponse({ data: role });
    });
};

const mockSecuritySendPasswordRecoveryCodeSvc = (mockAdapter) => {
    const url = config.services.security.sendPasswordRecoveryCode;

    mockAdapter.onPost(url).reply(() =>
        createHttpResponse({
            message: config.text.passwordRecovery.verificationCodeSent,
            messageType: constants.notificationType.INFO
        }));
};

const mockSecurityVerifyPasswordRecoveryCodeSvc = (mockAdapter) => {
    const url = config.services.security.verifyPasswordRecoveryCode;

    mockAdapter.onPost(url).reply((call) => {
        const { code } = getParams(call);
        const validCode = decodeBase64String(config.settings.serviceMocker.passwordRecoveryCode);
        const success = code === validCode;

        return createHttpResponse({
            data: success ? config.mockData.securityVerifyPasswordRecoveryCodeSvcResponse : null,
            message: success
                ? config.text.passwordRecovery.verificationSuccess
                : config.text.passwordRecovery.verificationFail,
            messageType: success
                ? constants.notificationType.SUCCESS
                : constants.notificationType.ERROR,
            success
        });
    });
};

const mockSecurityUpdateMyPassword = (mockAdapter) => {
    const url = config.services.security.updateMyPassword;

    mockAdapter.onPatch(url).reply((call) => {
        const {
            currentPassword,
            newPassword
        } = getParams(call);

        const validPassword = decodeBase64String(config.settings.serviceMocker.loginPassword);

        if (currentPassword === validPassword) {
            config.settings.serviceMocker.loginPassword = encodeBase64String(newPassword);

            return createHttpResponse({
                message: config.text.settingsPage.passwordUpdated,
                messageType: constants.notificationType.SUCCESS
            });
        }

        return createHttpResponse({
            message: config.text.settingsPage.currentPasswordInvalid,
            messageType: constants.notificationType.ERROR
        });
    });
};

const mockSecurityUpdatePwdUsingRecoveryTokenSvc = (mockAdapter) => {
    const url = config.services.security.updatePasswordUsingRecoveryToken;

    mockAdapter.onPatch(url).reply((call) => {
        const { recoveryToken } = getParams(call);
        const response = config.mockData.securityVerifyPasswordRecoveryCodeSvcResponse;
        const success = recoveryToken === response.recoveryToken;

        return createHttpResponse({
            message: success
                ? config.text.passwordRecovery.recoverPasswordSuccess
                : config.text.passwordRecovery.recoverPasswordFail,
            messageType: success
                ? constants.notificationType.SUCCESS
                : constants.notificationType.ERROR,
            success
        });
    });
};

const mockSecurityInsertUserSvc = (mockAdapter) => {
    const url = config.services.security.insertUser;

    mockAdapter.onPut(url).reply((call) => {
        const user = getParams(call);
        const maxUserId = getMaxFromArray({
            defaultValue: 0,
            maxKey: 'userId',
            source: config.mockData.securityGetAllUsersSvcResponse
        });

        user.accessFailedCount = 0;
        user.emailConfirmed = false;
        user.lockoutEnabled = false;
        user.lockoutEndDate = null;
        user.password = null;
        user.permissions = [];
        user.roles = [];
        user.userId = maxUserId + 1;

        config.mockData.securityGetAllUsersSvcResponse.push(user);

        return createHttpResponse({ data: user });
    });
};

const mockSecurityUpdateUserSvc = (mockAdapter) => {
    const url = config.services.security.updateUser;

    mockAdapter.onPatch(url).reply((call) => {
        const modifiedUser = getParams(call);
        const storedUser = config.mockData.securityGetAllUsersSvcResponse.find(
            u => u.userId === modifiedUser.userId
        );

        return createHttpResponse({
            data: Object.assign({}, storedUser, modifiedUser)
        });
    });
};

export const initializeServiceMocker = () => {
    if (config.settings.serviceMocker.isEnabled) {
        const mockAdapter = new MockAdapter(
            axios, {
                delayResponse: config.settings.serviceMocker.delayResponse
            }
        );

        const serviceMocker = {
            replyWithMockData: () => {
                mockAdapter.reset();
                mockAppSettingGetAllSvc(mockAdapter);
                mockAppSettingSaveSvc(mockAdapter);
                mockLogSearchSvc(mockAdapter);
                mockMasterDataDeleteSvc(mockAdapter);
                mockMasterDataGetAllSvc(mockAdapter);
                mockMasterDataInsertSvc(mockAdapter);
                mockMasterDataUpdateSvc(mockAdapter);
                mockSecurityDeleteRoleSvc(mockAdapter);
                mockSecurityGetAllPermissions(mockAdapter);
                mockSecurityGetAllRoles(mockAdapter);
                mockSecurityGetAllUsers(mockAdapter);
                mockSecurityInsertRoleSvc(mockAdapter);
                mockSecurityInsertUserSvc(mockAdapter);
                mockSecurityLoginSvc(mockAdapter);
                mockSecuritySendPasswordRecoveryCodeSvc(mockAdapter);
                mockSecurityUpdateLanguageSvc(mockAdapter);
                mockSecurityUpdateMyPassword(mockAdapter);
                mockSecurityUpdatePwdUsingRecoveryTokenSvc(mockAdapter);
                mockSecurityUpdateRoleSvc(mockAdapter);
                mockSecurityUpdateUserSvc(mockAdapter);
                mockSecurityVerifyPasswordRecoveryCodeSvc(mockAdapter);
            },
            replyWithNetworkError: () => {
                mockAdapter.reset();
                mockAdapter.onAny().networkError();
            }
        };

        serviceMocker.replyWithMockData();
        return serviceMocker;
    }

    return null;
};
