export type IUploadFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

export type ICloudinaryResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  tags: string[]; // Change to string[] if tags are expected to be strings
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  overwritten: boolean;
  original_filename: string;
  original_extension: string;
  api_key: string;
};
