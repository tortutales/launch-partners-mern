// @packages
import MockAdapter from 'axios-mock-adapter';
import _ from 'lodash';
import axios from 'axios';

// @scripts
import { config } from '../config';
import { constants } from '../core';

import {
    copyObjInCamelCase,
    decodeBase64String
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

const mockSecurityGetAllUsers = (mockAdapter) => {
    const url = config.services.security.getAllUsers;

    mockAdapter.onGet(url).reply(() =>
        createHttpResponse({
            data: config.mockData.securityGetAllUsersSvcResponse
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
                mockSecurityGetAllUsers(mockAdapter);
                mockSecurityLoginSvc(mockAdapter);
                mockSecurityUpdateUserSvc(mockAdapter);
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
