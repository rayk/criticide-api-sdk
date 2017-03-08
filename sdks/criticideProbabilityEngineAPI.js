'use strict';

var util = require('util');
var restletUtils = require('../restletUtils');
var securityUtils = require('../securityUtils');

/**
 * @class CriticideProbabilityEngineAPI
 * @param {string} [endpoint] - The API endpoint
 */
function CriticideProbabilityEngineAPI(endpoint) {
  if (restletUtils.isDefined(endpoint) && (!restletUtils.isString(endpoint) || restletUtils.isString(endpoint) && endpoint.length === 0)) {
    throw new Error('endpoint parameter must be a non-empty string.');
  }

  this.globalSecurity = {};
  this.securityConfigurations = {};
  this.endpoint = restletUtils.stripTrailingSlash(endpoint || 'https://api.criticide.io/next_version');
}

/**
 * Sets up the authentication to be performed through API token
 *
 * @method
 * @name CriticideProbabilityEngineAPI#setApiToken
 * @param {string} tokenName - the name of the query parameter or header based on the location parameter.
 * @param {string} tokenValue - the value of the token
 * @param {string} location - the location of the token, either 'HEADER' or 'QUERY'.
 * If undefined it defaults to 'header'.
 */
CriticideProbabilityEngineAPI.prototype.configureGlobalApiToken = function(tokenName, tokenValue, location) {
  if (restletUtils.isUndefined(location)) {
    util.log('No location defined, it defaults to \'HEADER\'');
    location = 'HEADER';
  }

  if (location.toUpperCase() !== 'HEADER' && location.toUpperCase() !== 'QUERY') {
    throw new Error('Unknown location: ' + location);
  }

  this.globalSecurity = {
    type: 'API_KEY',
    placement: location.toUpperCase(),
    name: tokenName,
    token: tokenValue
  };
};

/**
 * Sets up the authentication to be performed through oAuth2 protocol
 * meaning that the Authorization header will contain a Bearer token.
 *
 * @method
 * @param token - the oAuth token to use
 */
CriticideProbabilityEngineAPI.prototype.configureGlobalOAuth2Token = function (token) {
  this.globalSecurity = {
    type: 'OAUTH2',
    token: 'Bearer ' + token
  };
};

/**
 * Sets up the authentication to be performed through basic auth.
 *
 * @method
 * @name CriticideProbabilityEngineAPI#setBasicAuth
 * @param {string} username - the user's username
 * @param {string} key - the user's key or password
 */
CriticideProbabilityEngineAPI.prototype.configureGlobalBasicAuthentication = function(username, key) {
  this.globalSecurity = {
    type: 'BASIC',
    token: 'Basic ' + new Buffer(username + ':' + key).toString('base64')
  };
};


/**
 * 
 * @method
 * @name CriticideProbabilityEngineAPI#postDatasource
 * @param {object} body - the payload; is of type: DataResourceDefinition; has the following structure:
{
  "credential" : null,
  "label" : "sample label",
  "provider" : null,
  "reference" : "sample reference",
  "uri" : "sample uri",
  "workspace" : "sample workspace"
}
 * @param {object} config - the configuration object containing the query parameters and additional headers.
 * @param {object} config.headers - headers to use for the request in addition to the default ones.
 * @param {object} config.queryParameters - query parameters to use for the request in addition to the default ones.
 * @param {Function} callback - the callback called after request completion with the following parameters:
 *  - error if any technical error occured or if the response's status does not belong to the 2xx range. In that case the error would have the following structure:
{
  status : 400,
  message : 'The request cannot be fulfilled due to XXX'
}
 *  - body of the response auto-extracted from the response if the status is in the 2xx range.
 *  - response the technical (low-level) node response (c.f. https://nodejs.org/api/http.html#http_http_incomingmessage)
 */
CriticideProbabilityEngineAPI.prototype.postDatasource = function(body, config, callback) {
  restletUtils.executeRequest.call(this, 'POST',
    this.endpoint + '/data-source',
    callback,
    securityUtils.addSecurityConfiguration(config, this.globalSecurity, this.securityConfigurations),
    body
  );
};

/**
 * 
 * @method
 * @name CriticideProbabilityEngineAPI#getServiceaccount
 * @param {object} config - the configuration object containing the query parameters and additional headers.
 * @param {object} config.headers - headers to use for the request in addition to the default ones.
 * @param {object} config.queryParameters - query parameters to use for the request in addition to the default ones.
 * @param {Function} callback - the callback called after request completion with the following parameters:
 *  - error if any technical error occured or if the response's status does not belong to the 2xx range. In that case the error would have the following structure:
{
  status : 400,
  message : 'The request cannot be fulfilled due to XXX'
}
 *  - body of the response auto-extracted from the response if the status is in the 2xx range.
 *    - Status code : 200 - 200 response - Payload :
{
  "accountId" : "sample accountId",
  "created" : null,
  "label" : "sample label",
  "revisionDatetime" : null,
  "revisionNumber" : 1,
  "status" : "sample status",
  "workspace" : [ ],
  "workspaceLimit" : 1
}
 *  - response the technical (low-level) node response (c.f. https://nodejs.org/api/http.html#http_http_incomingmessage)
 */
CriticideProbabilityEngineAPI.prototype.getServiceaccount = function(config, callback) {
  restletUtils.executeRequest.call(this, 'GET',
    this.endpoint + '/service-account',
    callback,
    securityUtils.addSecurityConfiguration(config, this.globalSecurity, this.securityConfigurations)
  );
};

module.exports = CriticideProbabilityEngineAPI;
