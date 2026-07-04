import { z } from "zod";

export const createAssetSchema = z.object({
  name: z.string().min(2),
  assetType: z.string().min(2),
  description: z.string().optional(),

  latitude: z.number(),
  longitude: z.number(),
});