import { z } from "zod";

export const createAssetSchema = z.object({
  name: z.string().min(2, "Name is required"),

  assetType: z.string().min(
    2,
    "Asset Type is required"
  ),

  description: z.string().optional(),

  latitude: z
    .number()
    .min(-90)
    .max(90),

  longitude: z
    .number()
    .min(-180)
    .max(180),
});