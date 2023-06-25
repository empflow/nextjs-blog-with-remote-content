import {
  allowedOriginsDev,
  allowedOriginsProd,
} from "../config/allowedOrigins";

export default function getAllowedOrigins() {
  return process.env.NODE_ENV === "production"
    ? allowedOriginsProd
    : allowedOriginsDev;
}
