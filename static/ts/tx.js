"use strict";
exports.__esModule = true;
exports.MsgClientImpl = exports.MsgRejectSignatureResponse = exports.MsgRejectSignature = exports.MsgSignDocumentResponse = exports.MsgSignDocument = exports.MsgEditFilesResponse = exports.MsgEditFiles = exports.MsgRemoveUsersResponse = exports.MsgRemoveUsers = exports.MsgAddUsersResponse = exports.MsgAddUsers = exports.MsgCreateDocumentResponse = exports.MsgCreateDocument = exports.MsgAddCertificateResponse = exports.MsgAddCertificate = exports.protobufPackage = void 0;
/* eslint-disable */
// @ts-ignore
var long_1 = require("long");
var minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "thesis.thesis";
function createBaseMsgAddCertificate() {
    return { creator: "", hash: "", address: "" };
}
exports.MsgAddCertificate = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.hash !== "") {
            writer.uint32(18).string(message.hash);
        }
        if (message.address !== "") {
            writer.uint32(26).string(message.address);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgAddCertificate();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.hash = reader.string();
                    break;
                case 3:
                    message.address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : "",
            hash: isSet(object.hash) ? String(object.hash) : "",
            address: isSet(object.address) ? String(object.address) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.hash !== undefined && (obj.hash = message.hash);
        message.address !== undefined && (obj.address = message.address);
        return obj;
    }
};
function createBaseMsgAddCertificateResponse() {
    return { id: 0 };
}
exports.MsgAddCertificateResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgAddCertificateResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? long_1["default"].fromValue(object.id) : long_1["default"].UZERO
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || long_1["default"].UZERO).toString());
        return obj;
    }
};
function createBaseMsgCreateDocument() {
    return { creator: "", files: [] };
}
exports.MsgCreateDocument = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        for (var _i = 0, _a = message.files; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgCreateDocument();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.files.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : "",
            files: Array.isArray(object === null || object === void 0 ? void 0 : object.files)
                ? object.files.map(function (e) { return String(e); })
                : []
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        if (message.files) {
            obj.files = message.files.map(function (e) { return e; });
        }
        else {
            obj.files = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseMsgCreateDocument();
        // @ts-ignore
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        // @ts-ignore
        message.files = ((_b = object.files) === null || _b === void 0 ? void 0 : _b.map(function (e) { return e; })) || [];
        return message;
    }
};
function createBaseMsgCreateDocumentResponse() {
    return { id: long_1["default"].UZERO };
}
exports.MsgCreateDocumentResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgCreateDocumentResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? long_1["default"].fromValue(object.id) : long_1["default"].UZERO
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || long_1["default"].UZERO).toString());
        return obj;
    }
};
function createBaseMsgAddUsers() {
    return { creator: "", documentId: "", role: "", addresses: [] };
}
exports.MsgAddUsers = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.documentId !== "") {
            writer.uint32(18).string(message.documentId);
        }
        if (message.role !== "") {
            writer.uint32(26).string(message.role);
        }
        for (var _i = 0, _a = message.addresses; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(34).string(v);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgAddUsers();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.documentId = reader.string();
                    break;
                case 3:
                    message.role = reader.string();
                    break;
                case 4:
                    message.addresses.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : "",
            documentId: isSet(object.documentId) ? String(object.documentId) : "",
            role: isSet(object.role) ? String(object.role) : "",
            addresses: Array.isArray(object === null || object === void 0 ? void 0 : object.addresses)
                ? object.addresses.map(function (e) { return String(e); })
                : []
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.documentId !== undefined && (obj.documentId = message.documentId);
        message.role !== undefined && (obj.role = message.role);
        if (message.addresses) {
            obj.addresses = message.addresses.map(function (e) { return e; });
        }
        else {
            obj.addresses = [];
        }
        return obj;
    }
};
function createBaseMsgAddUsersResponse() {
    return { id: long_1["default"].UZERO };
}
exports.MsgAddUsersResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgAddUsersResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? long_1["default"].fromValue(object.id) : long_1["default"].UZERO
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || long_1["default"].UZERO).toString());
        return obj;
    }
};
function createBaseMsgRemoveUsers() {
    return { creator: "", documentId: "", role: "", addresses: [] };
}
exports.MsgRemoveUsers = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.documentId !== "") {
            writer.uint32(18).string(message.documentId);
        }
        if (message.role !== "") {
            writer.uint32(26).string(message.role);
        }
        for (var _i = 0, _a = message.addresses; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(34).string(v);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgRemoveUsers();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.documentId = reader.string();
                    break;
                case 3:
                    message.role = reader.string();
                    break;
                case 4:
                    message.addresses.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : "",
            documentId: isSet(object.documentId) ? String(object.documentId) : "",
            role: isSet(object.role) ? String(object.role) : "",
            addresses: Array.isArray(object === null || object === void 0 ? void 0 : object.addresses)
                ? object.addresses.map(function (e) { return String(e); })
                : []
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.documentId !== undefined && (obj.documentId = message.documentId);
        message.role !== undefined && (obj.role = message.role);
        if (message.addresses) {
            obj.addresses = message.addresses.map(function (e) { return e; });
        }
        else {
            obj.addresses = [];
        }
        return obj;
    }
};
function createBaseMsgRemoveUsersResponse() {
    return { id: long_1["default"].UZERO };
}
exports.MsgRemoveUsersResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgRemoveUsersResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? long_1["default"].fromValue(object.id) : long_1["default"].UZERO
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || long_1["default"].UZERO).toString());
        return obj;
    }
};
function createBaseMsgEditFiles() {
    return { creator: "", documentId: "", files: [] };
}
exports.MsgEditFiles = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.documentId !== "") {
            writer.uint32(18).string(message.documentId);
        }
        for (var _i = 0, _a = message.files; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgEditFiles();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.documentId = reader.string();
                    break;
                case 3:
                    message.files.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : "",
            documentId: isSet(object.documentId) ? String(object.documentId) : "",
            files: Array.isArray(object === null || object === void 0 ? void 0 : object.files)
                ? object.files.map(function (e) { return String(e); })
                : []
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.documentId !== undefined && (obj.documentId = message.documentId);
        if (message.files) {
            obj.files = message.files.map(function (e) { return e; });
        }
        else {
            obj.files = [];
        }
        return obj;
    }
};
function createBaseMsgEditFilesResponse() {
    return { id: long_1["default"].UZERO };
}
exports.MsgEditFilesResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgEditFilesResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? long_1["default"].fromValue(object.id) : long_1["default"].UZERO
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || long_1["default"].UZERO).toString());
        return obj;
    }
};
function createBaseMsgSignDocument() {
    return { creator: "", documentId: "", files: [] };
}
exports.MsgSignDocument = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.documentId !== "") {
            writer.uint32(18).string(message.documentId);
        }
        for (var _i = 0, _a = message.files; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgSignDocument();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.documentId = reader.string();
                    break;
                case 3:
                    message.files.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : "",
            documentId: isSet(object.documentId) ? String(object.documentId) : "",
            files: Array.isArray(object === null || object === void 0 ? void 0 : object.files)
                ? object.files.map(function (e) { return String(e); })
                : []
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.documentId !== undefined && (obj.documentId = message.documentId);
        if (message.files) {
            obj.files = message.files.map(function (e) { return e; });
        }
        else {
            obj.files = [];
        }
        return obj;
    }
};
function createBaseMsgSignDocumentResponse() {
    return { id: long_1["default"].UZERO };
}
exports.MsgSignDocumentResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgSignDocumentResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? long_1["default"].fromValue(object.id) : long_1["default"].UZERO
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || long_1["default"].UZERO).toString());
        return obj;
    }
};
function createBaseMsgRejectSignature() {
    return { creator: "", documentId: "" };
}
exports.MsgRejectSignature = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.documentId !== "") {
            writer.uint32(18).string(message.documentId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgRejectSignature();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.documentId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : "",
            documentId: isSet(object.documentId) ? String(object.documentId) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.documentId !== undefined && (obj.documentId = message.documentId);
        return obj;
    }
};
function createBaseMsgRejectSignatureResponse() {
    return { id: long_1["default"].UZERO };
}
exports.MsgRejectSignatureResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgRejectSignatureResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? long_1["default"].fromValue(object.id) : long_1["default"].UZERO
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || long_1["default"].UZERO).toString());
        return obj;
    }
};
var MsgClientImpl = /** @class */ (function () {
    function MsgClientImpl(rpc) {
        this.rpc = rpc;
        this.AddCertificate = this.AddCertificate.bind(this);
        this.CreateDocument = this.CreateDocument.bind(this);
        this.AddUsers = this.AddUsers.bind(this);
        this.RemoveUsers = this.RemoveUsers.bind(this);
        this.EditFiles = this.EditFiles.bind(this);
        this.SignDocument = this.SignDocument.bind(this);
        this.RejectSignature = this.RejectSignature.bind(this);
    }
    MsgClientImpl.prototype.AddCertificate = function (request) {
        var data = exports.MsgAddCertificate.encode(request).finish();
        var promise = this.rpc.request("thesis.thesis.Msg", "AddCertificate", data);
        return promise.then(function (data) {
            return exports.MsgAddCertificateResponse.decode(new minimal_1.Reader(data));
        });
    };
    MsgClientImpl.prototype.CreateDocument = function (request) {
        var data = exports.MsgCreateDocument.encode(request).finish();
        var promise = this.rpc.request("thesis.thesis.Msg", "CreateDocument", data);
        return promise.then(function (data) {
            return exports.MsgCreateDocumentResponse.decode(new minimal_1.Reader(data));
        });
    };
    MsgClientImpl.prototype.AddUsers = function (request) {
        var data = exports.MsgAddUsers.encode(request).finish();
        var promise = this.rpc.request("thesis.thesis.Msg", "AddUsers", data);
        return promise.then(function (data) {
            return exports.MsgAddUsersResponse.decode(new minimal_1.Reader(data));
        });
    };
    MsgClientImpl.prototype.RemoveUsers = function (request) {
        var data = exports.MsgRemoveUsers.encode(request).finish();
        var promise = this.rpc.request("thesis.thesis.Msg", "RemoveUsers", data);
        return promise.then(function (data) {
            return exports.MsgRemoveUsersResponse.decode(new minimal_1.Reader(data));
        });
    };
    MsgClientImpl.prototype.EditFiles = function (request) {
        var data = exports.MsgEditFiles.encode(request).finish();
        var promise = this.rpc.request("thesis.thesis.Msg", "EditFiles", data);
        return promise.then(function (data) {
            return exports.MsgEditFilesResponse.decode(new minimal_1.Reader(data));
        });
    };
    MsgClientImpl.prototype.SignDocument = function (request) {
        var data = exports.MsgSignDocument.encode(request).finish();
        var promise = this.rpc.request("thesis.thesis.Msg", "SignDocument", data);
        return promise.then(function (data) {
            return exports.MsgSignDocumentResponse.decode(new minimal_1.Reader(data));
        });
    };
    MsgClientImpl.prototype.RejectSignature = function (request) {
        var data = exports.MsgRejectSignature.encode(request).finish();
        var promise = this.rpc.request("thesis.thesis.Msg", "RejectSignature", data);
        return promise.then(function (data) {
            return exports.MsgRejectSignatureResponse.decode(new minimal_1.Reader(data));
        });
    };
    return MsgClientImpl;
}());
exports.MsgClientImpl = MsgClientImpl;
if (minimal_1.util.Long !== long_1["default"]) {
    minimal_1.util.Long = long_1["default"];
    (0, minimal_1.configure)();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
