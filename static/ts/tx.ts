/* eslint-disable */
// @ts-ignore
import Long from "long";
import {configure, Reader, util, Writer} from "protobufjs/minimal";

export const protobufPackage = "thesis.thesis";

export interface MsgAddCertificate {
  creator: string;
  hash: string;
  address: string;
}

export interface MsgAddCertificateResponse {
  id: Long;
}

export interface MsgCreateDocument {
  creator: string;
  files: string[];
}

export interface MsgCreateDocumentResponse {
  id: Long;
}

export interface MsgAddUsers {
  creator: string;
  documentId: string;
  role: string;
  addresses: string[];
}

export interface MsgAddUsersResponse {
  id: Long;
}

export interface MsgRemoveUsers {
  creator: string;
  documentId: string;
  role: string;
  addresses: string[];
}

export interface MsgRemoveUsersResponse {
  id: Long;
}

export interface MsgEditFiles {
  creator: string;
  documentId: string;
  files: string[];
}

export interface MsgEditFilesResponse {
  id: Long;
}

export interface MsgSignDocument {
  creator: string;
  documentId: string;
  lastEditHeight: Long;
}

export interface MsgSignDocumentResponse {
  id: Long;
}

export interface MsgRejectDocument {
  creator: string;
  documentId: string;
  reason: string;
}

export interface MsgRejectDocumentResponse {
  id: Long;
}


export interface MsgRejectSignature {
  creator: string;
  documentId: string;
}

export interface MsgRejectSignatureResponse {
  id: Long;
}

export interface MsgAuthorize {
  creator: string;
  accountId: string;
}

export interface MsgAuthorizeResponse {
  id: Long;
}

function createBaseMsgAddCertificate(): MsgAddCertificate {
  return { creator: "", hash: "", address: "" };
}

export const MsgAddCertificate = {
  encode(
    message: MsgAddCertificate,
    writer: Writer = Writer.create()
  ): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgAddCertificate {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddCertificate();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): MsgAddCertificate {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      hash: isSet(object.hash) ? String(object.hash) : "",
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: MsgAddCertificate): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.hash !== undefined && (obj.hash = message.hash);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddCertificate>, I>>(
    object: I
  ): MsgAddCertificate {
    const message = createBaseMsgAddCertificate();
    // @ts-ignore
    message.creator = object.creator ?? "";
    // @ts-ignore
    message.hash = object.hash ?? "";
    // @ts-ignore
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseMsgAddCertificateResponse(): MsgAddCertificateResponse {
  return { id: Long.UZERO };
}

export const MsgAddCertificateResponse = {
  encode(
    message: MsgAddCertificateResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAddCertificateResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddCertificateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddCertificateResponse {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgAddCertificateResponse): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddCertificateResponse>, I>>(
    object: I
  ): MsgAddCertificateResponse {
    const message = createBaseMsgAddCertificateResponse();
    message.id =

    // @ts-ignore
      object.id !== undefined && object.id !== null
    // @ts-ignore
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgCreateDocument(): MsgCreateDocument {
  return { creator: "", files: [] };
}

export const MsgCreateDocument = {
  encode(
    message: MsgCreateDocument,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.files) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateDocument {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): MsgCreateDocument {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      files: Array.isArray(object?.files)
        ? object.files.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: MsgCreateDocument): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.files) {
      obj.files = message.files.map((e) => e);
    } else {
      obj.files = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateDocument>, I>>(
    object: I
  ): MsgCreateDocument {
    const message = createBaseMsgCreateDocument();
    // @ts-ignore
    message.creator = object.creator ?? "";
    // @ts-ignore
    message.files = object.files?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgCreateDocumentResponse(): MsgCreateDocumentResponse {
  return { id: Long.UZERO };
}

export const MsgCreateDocumentResponse = {
  encode(
    message: MsgCreateDocumentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateDocumentResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDocumentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDocumentResponse {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgCreateDocumentResponse): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateDocumentResponse>, I>>(
    object: I
  ): MsgCreateDocumentResponse {
    const message = createBaseMsgCreateDocumentResponse();
    message.id =
    // @ts-ignore
      object.id !== undefined && object.id !== null
    // @ts-ignore
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgAddUsers(): MsgAddUsers {
  return { creator: "", documentId: "", role: "", addresses: [] };
}

export const MsgAddUsers = {
  encode(
    message: MsgAddUsers,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.documentId !== "") {
      writer.uint32(18).string(message.documentId);
    }
    if (message.role !== "") {
      writer.uint32(26).string(message.role);
    }
    for (const v of message.addresses) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddUsers {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddUsers();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): MsgAddUsers {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      documentId: isSet(object.documentId) ? String(object.documentId) : "",
      role: isSet(object.role) ? String(object.role) : "",
      addresses: Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: MsgAddUsers): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.documentId !== undefined && (obj.documentId = message.documentId);
    message.role !== undefined && (obj.role = message.role);
    if (message.addresses) {
      obj.addresses = message.addresses.map((e) => e);
    } else {
      obj.addresses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddUsers>, I>>(
    object: I
  ): MsgAddUsers {
    const message = createBaseMsgAddUsers();
    // @ts-ignore
    message.creator = object.creator ?? "";
    // @ts-ignore
    message.documentId = object.documentId ?? "";
    // @ts-ignore
    message.role = object.role ?? "";
    // @ts-ignore
    message.addresses = object.addresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgAddUsersResponse(): MsgAddUsersResponse {
  return { id: Long.UZERO };
}

export const MsgAddUsersResponse = {
  encode(
    message: MsgAddUsersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddUsersResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddUsersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddUsersResponse {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgAddUsersResponse): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddUsersResponse>, I>>(
    object: I
  ): MsgAddUsersResponse {
    const message = createBaseMsgAddUsersResponse();
    message.id =
    // @ts-ignore
      object.id !== undefined && object.id !== null
    // @ts-ignore
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgRemoveUsers(): MsgRemoveUsers {
  return { creator: "", documentId: "", role: "", addresses: [] };
}

export const MsgRemoveUsers = {
  encode(
    message: MsgRemoveUsers,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.documentId !== "") {
      writer.uint32(18).string(message.documentId);
    }
    if (message.role !== "") {
      writer.uint32(26).string(message.role);
    }
    for (const v of message.addresses) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveUsers {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveUsers();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): MsgRemoveUsers {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      documentId: isSet(object.documentId) ? String(object.documentId) : "",
      role: isSet(object.role) ? String(object.role) : "",
      addresses: Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: MsgRemoveUsers): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.documentId !== undefined && (obj.documentId = message.documentId);
    message.role !== undefined && (obj.role = message.role);
    if (message.addresses) {
      obj.addresses = message.addresses.map((e) => e);
    } else {
      obj.addresses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveUsers>, I>>(
    object: I
  ): MsgRemoveUsers {
    const message = createBaseMsgRemoveUsers();
    // @ts-ignore
    message.creator = object.creator ?? "";
    // @ts-ignore
    message.documentId = object.documentId ?? "";
    // @ts-ignore
    message.role = object.role ?? "";
    // @ts-ignore
    message.addresses = object.addresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgRemoveUsersResponse(): MsgRemoveUsersResponse {
  return { id: Long.UZERO };
}

export const MsgRemoveUsersResponse = {
  encode(
    message: MsgRemoveUsersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRemoveUsersResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveUsersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveUsersResponse {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgRemoveUsersResponse): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveUsersResponse>, I>>(
    object: I
  ): MsgRemoveUsersResponse {
    const message = createBaseMsgRemoveUsersResponse();
    message.id =
    // @ts-ignore
      object.id !== undefined && object.id !== null
    // @ts-ignore
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgEditFiles(): MsgEditFiles {
  return { creator: "", documentId: "", files: [] };
}

export const MsgEditFiles = {
  encode(
    message: MsgEditFiles,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.documentId !== "") {
      writer.uint32(18).string(message.documentId);
    }
    for (const v of message.files) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEditFiles {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEditFiles();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): MsgEditFiles {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      documentId: isSet(object.documentId) ? String(object.documentId) : "",
      files: Array.isArray(object?.files)
        ? object.files.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: MsgEditFiles): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.documentId !== undefined && (obj.documentId = message.documentId);
    if (message.files) {
      obj.files = message.files.map((e) => e);
    } else {
      obj.files = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEditFiles>, I>>(
    object: I
  ): MsgEditFiles {
    const message = createBaseMsgEditFiles();
    // @ts-ignore
    message.creator = object.creator ?? "";
    // @ts-ignore
    message.documentId = object.documentId ?? "";
    // @ts-ignore
    message.files = object.files?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgEditFilesResponse(): MsgEditFilesResponse {
  return { id: Long.UZERO };
}

export const MsgEditFilesResponse = {
  encode(
    message: MsgEditFilesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgEditFilesResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEditFilesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEditFilesResponse {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgEditFilesResponse): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEditFilesResponse>, I>>(
    object: I
  ): MsgEditFilesResponse {
    const message = createBaseMsgEditFilesResponse();
    message.id =
    // @ts-ignore
      object.id !== undefined && object.id !== null
    // @ts-ignore
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgSignDocument(): MsgSignDocument {
  return { creator: "", documentId: "", lastEditHeight: Long.UZERO };
}

export const MsgSignDocument = {
  encode(
    message: MsgSignDocument,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.documentId !== "") {
      writer.uint32(18).string(message.documentId);
    }
    if (!message.lastEditHeight.isZero()) {
      writer.uint32(24).uint64(message.lastEditHeight);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSignDocument {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.documentId = reader.string();
          break;
        case 3:
          message.lastEditHeight = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSignDocument {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      documentId: isSet(object.documentId) ? String(object.documentId) : "",
      lastEditHeight: isSet(object.lastEditHeight)
        ? Long.fromValue(object.lastEditHeight)
        : Long.UZERO,
    };
  },

  toJSON(message: MsgSignDocument): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.documentId !== undefined && (obj.documentId = message.documentId);
    message.lastEditHeight !== undefined &&
      (obj.lastEditHeight = (message.lastEditHeight || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSignDocument>, I>>(
    object: I
  ): MsgSignDocument {
    const message = createBaseMsgSignDocument();
    // @ts-ignore
    message.creator = object.creator ?? "";
    // @ts-ignore
    message.documentId = object.documentId ?? "";
    message.lastEditHeight =
    // @ts-ignore
      object.lastEditHeight !== undefined && object.lastEditHeight !== null
    // @ts-ignore
        ? Long.fromValue(object.lastEditHeight)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgSignDocumentResponse(): MsgSignDocumentResponse {
  return { id: Long.UZERO };
}

export const MsgSignDocumentResponse = {
  encode(
    message: MsgSignDocumentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSignDocumentResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignDocumentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSignDocumentResponse {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgSignDocumentResponse): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSignDocumentResponse>, I>>(
    object: I
  ): MsgSignDocumentResponse {
    const message = createBaseMsgSignDocumentResponse();
    message.id =
    // @ts-ignore
      object.id !== undefined && object.id !== null
    // @ts-ignore
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};


function createBaseMsgRejectDocument(): MsgRejectDocument {
  return { creator: "", documentId: "", reason: "" };
}

export const MsgRejectDocument = {
  encode(
    message: MsgRejectDocument,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.documentId !== "") {
      writer.uint32(18).string(message.documentId);
    }
    if (message.reason !== "") {
      writer.uint32(26).string(message.reason);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRejectDocument {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRejectDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.documentId = reader.string();
          break;
        case 3:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRejectDocument {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      documentId: isSet(object.documentId) ? String(object.documentId) : "",
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: MsgRejectDocument): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.documentId !== undefined && (obj.documentId = message.documentId);
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRejectDocument>, I>>(
    object: I
  ): MsgRejectDocument {
    const message = createBaseMsgRejectDocument();
     // @ts-ignore
    message.creator = object.creator ?? "";
     // @ts-ignore
    message.documentId = object.documentId ?? "";
     // @ts-ignore
    message.reason = object.reason ?? "";
    return message;
  },
};

function createBaseMsgRejectDocumentResponse(): MsgRejectDocumentResponse {
  return { id: Long.UZERO };
}

export const MsgRejectDocumentResponse = {
  encode(
    message: MsgRejectDocumentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRejectDocumentResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRejectDocumentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRejectDocumentResponse {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgRejectDocumentResponse): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRejectDocumentResponse>, I>>(
    object: I
  ): MsgRejectDocumentResponse {
    const message = createBaseMsgRejectDocumentResponse();
    message.id =
         // @ts-ignore
      object.id !== undefined && object.id !== null
           // @ts-ignore
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};


function createBaseMsgRejectSignature(): MsgRejectSignature {
  return { creator: "", documentId: "" };
}

export const MsgRejectSignature = {
  encode(
    message: MsgRejectSignature,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.documentId !== "") {
      writer.uint32(18).string(message.documentId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRejectSignature {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRejectSignature();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): MsgRejectSignature {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      documentId: isSet(object.documentId) ? String(object.documentId) : "",
    };
  },

  toJSON(message: MsgRejectSignature): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.documentId !== undefined && (obj.documentId = message.documentId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRejectSignature>, I>>(
    object: I
  ): MsgRejectSignature {
    const message = createBaseMsgRejectSignature();
    // @ts-ignore
    message.creator = object.creator ?? "";
    // @ts-ignore
    message.documentId = object.documentId ?? "";
    return message;
  },
};

function createBaseMsgRejectSignatureResponse(): MsgRejectSignatureResponse {
  return { id: Long.UZERO };
}

export const MsgRejectSignatureResponse = {
  encode(
    message: MsgRejectSignatureResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgRejectSignatureResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRejectSignatureResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRejectSignatureResponse {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgRejectSignatureResponse): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRejectSignatureResponse>, I>>(
    object: I
  ): MsgRejectSignatureResponse {
    const message = createBaseMsgRejectSignatureResponse();
    message.id =
    // @ts-ignore
      object.id !== undefined && object.id !== null
    // @ts-ignore
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgAuthorize(): MsgAuthorize {
  return { creator: "", accountId: "" };
}

export const MsgAuthorize = {
  encode(
    message: MsgAuthorize,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.accountId !== "") {
      writer.uint32(18).string(message.accountId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAuthorize {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.accountId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAuthorize {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      accountId: isSet(object.accountId) ? String(object.accountId) : "",
    };
  },

  toJSON(message: MsgAuthorize): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.accountId !== undefined && (obj.accountId = message.accountId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAuthorize>, I>>(
    object: I
  ): MsgAuthorize {
    const message = createBaseMsgAuthorize();
    // @ts-ignore
    message.creator = object.creator ?? "";
    // @ts-ignore
    message.accountId = object.accountId ?? "";
    return message;
  },
};

function createBaseMsgAuthorizeResponse(): MsgAuthorizeResponse {
  return { id: Long.UZERO };
}

export const MsgAuthorizeResponse = {
  encode(
    message: MsgAuthorizeResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgAuthorizeResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorizeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAuthorizeResponse {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgAuthorizeResponse): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAuthorizeResponse>, I>>(
    object: I
  ): MsgAuthorizeResponse {
    const message = createBaseMsgAuthorizeResponse();
    message.id =
    // @ts-ignore
      object.id !== undefined && object.id !== null
    // @ts-ignore
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  AddCertificate(
    request: MsgAddCertificate
  ): Promise<MsgAddCertificateResponse>;
  CreateDocument(
    request: MsgCreateDocument
  ): Promise<MsgCreateDocumentResponse>;
  AddUsers(request: MsgAddUsers): Promise<MsgAddUsersResponse>;
  RemoveUsers(request: MsgRemoveUsers): Promise<MsgRemoveUsersResponse>;
  EditFiles(request: MsgEditFiles): Promise<MsgEditFilesResponse>;
  SignDocument(request: MsgSignDocument): Promise<MsgSignDocumentResponse>;
  RejectSignature(
    request: MsgRejectSignature
  ): Promise<MsgRejectSignatureResponse>;
  Authorize(request: MsgAuthorize): Promise<MsgAuthorizeResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  RejectDocument(
    request: MsgRejectDocument
  ): Promise<MsgRejectDocumentResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AddCertificate = this.AddCertificate.bind(this);
    this.CreateDocument = this.CreateDocument.bind(this);
    this.AddUsers = this.AddUsers.bind(this);
    this.RemoveUsers = this.RemoveUsers.bind(this);
    this.EditFiles = this.EditFiles.bind(this);
    this.SignDocument = this.SignDocument.bind(this);
    this.RejectSignature = this.RejectSignature.bind(this);
    this.Authorize = this.Authorize.bind(this);
    this.RejectDocument = this.RejectDocument.bind(this);
  }
  AddCertificate(
    request: MsgAddCertificate
  ): Promise<MsgAddCertificateResponse> {
    const data = MsgAddCertificate.encode(request).finish();
    const promise = this.rpc.request(
      "thesis.thesis.Msg",
      "AddCertificate",
      data
    );
    return promise.then((data) =>
      MsgAddCertificateResponse.decode(new Reader(data))
    );
  }

  CreateDocument(
    request: MsgCreateDocument
  ): Promise<MsgCreateDocumentResponse> {
    const data = MsgCreateDocument.encode(request).finish();
    const promise = this.rpc.request(
      "thesis.thesis.Msg",
      "CreateDocument",
      data
    );
    return promise.then((data) =>
      MsgCreateDocumentResponse.decode(new Reader(data))
    );
  }

  AddUsers(request: MsgAddUsers): Promise<MsgAddUsersResponse> {
    const data = MsgAddUsers.encode(request).finish();
    const promise = this.rpc.request("thesis.thesis.Msg", "AddUsers", data);
    return promise.then((data) =>
      MsgAddUsersResponse.decode(new Reader(data))
    );
  }

  RemoveUsers(request: MsgRemoveUsers): Promise<MsgRemoveUsersResponse> {
    const data = MsgRemoveUsers.encode(request).finish();
    const promise = this.rpc.request("thesis.thesis.Msg", "RemoveUsers", data);
    return promise.then((data) =>
      MsgRemoveUsersResponse.decode(new Reader(data))
    );
  }

  EditFiles(request: MsgEditFiles): Promise<MsgEditFilesResponse> {
    const data = MsgEditFiles.encode(request).finish();
    const promise = this.rpc.request("thesis.thesis.Msg", "EditFiles", data);
    return promise.then((data) =>
      MsgEditFilesResponse.decode(new Reader(data))
    );
  }

  SignDocument(request: MsgSignDocument): Promise<MsgSignDocumentResponse> {
    const data = MsgSignDocument.encode(request).finish();
    const promise = this.rpc.request("thesis.thesis.Msg", "SignDocument", data);
    return promise.then((data) =>
      MsgSignDocumentResponse.decode(new Reader(data))
    );
  }

  RejectSignature(
    request: MsgRejectSignature
  ): Promise<MsgRejectSignatureResponse> {
    const data = MsgRejectSignature.encode(request).finish();
    const promise = this.rpc.request(
      "thesis.thesis.Msg",
      "RejectSignature",
      data
    );
    return promise.then((data) =>
      MsgRejectSignatureResponse.decode(new Reader(data))
    );
  }

  Authorize(request: MsgAuthorize): Promise<MsgAuthorizeResponse> {
    const data = MsgAuthorize.encode(request).finish();
    const promise = this.rpc.request("thesis.thesis.Msg", "Authorize", data);
    return promise.then((data) =>
      MsgAuthorizeResponse.decode(new Reader(data))
    );
  }
  RejectDocument(
    request: MsgRejectDocument
  ): Promise<MsgRejectDocumentResponse> {
    const data = MsgRejectDocument.encode(request).finish();
    const promise = this.rpc.request(
      "thesis.thesis.Msg",
      "RejectDocument",
      data
    );
    return promise.then((data) =>
      MsgRejectDocumentResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
